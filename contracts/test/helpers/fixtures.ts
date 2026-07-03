import { ethers, network } from "hardhat";
import { addressToBytes32, Options } from "@layerzerolabs/lz-v2-utilities";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import type { MBCToken, MBCOFT, MBCOFTAdapter } from "../../typechain-types";

/** Arbitrary mock LayerZero endpoint IDs — real values don't matter for
 * EndpointV2Mock, they just need to be distinct and consistent between the
 * two wired-together mock endpoints. */
export const EID_BNB = 30102; // matches LayerZero's real BSC mainnet eid, for realism only
export const EID_ETH = 30101; // matches LayerZero's real Ethereum mainnet eid, for realism only

export const TOTAL_SUPPLY = ethers.parseUnits("100000000", 18);
export const BRIDGE_CAP = ethers.parseUnits("10000000", 18);

/** Standard executor lzReceive gas option used for every test send(). */
export function defaultOptions(): string {
  return Options.newOptions().addExecutorLzReceiveOption(200_000, 0).toHex();
}

export interface DeployedFixture {
  deployer: HardhatEthersSigner;
  user: HardhatEthersSigner;
  userB: HardhatEthersSigner;
  safeAddress: string;
  safeSigner: HardhatEthersSigner;
  token: MBCToken; // Contract A (BNB canonical)
  adapter: MBCOFTAdapter; // Contract C (BNB lock side)
  oft: MBCOFT; // Contract B (Ethereum mint/burn side)
}

/**
 * Deploys the full dual-chain system against two LayerZero EndpointV2Mock
 * instances wired together, matching LayerZero's own documented pattern for
 * local Hardhat testing of OFT/OFTAdapter pairs (both endpoints live in the
 * same Hardhat chain and relay messages synchronously — no real DVN/executor
 * network involved).
 *
 * Mints the full genesis supply to a `TestMultisigStub` contract standing in
 * for the production Gnosis Safe (impersonated in tests as `safeSigner`),
 * exempts the bridge adapter from Contract A's anti-whale limits (the
 * documented operational step from MBCOFTAdapter.sol's natspec), and returns
 * everything a test needs.
 */
export async function deployFixture(): Promise<DeployedFixture> {
  const [deployer, user, userB] = await ethers.getSigners();

  // --- Contract A: BNB Chain canonical token, minted to a Safe stand-in ---
  const TestMultisigStub = await ethers.getContractFactory("TestMultisigStub");
  const safeStub = await TestMultisigStub.deploy();
  await safeStub.waitForDeployment();
  const safeAddress = await safeStub.getAddress();

  await network.provider.request({ method: "hardhat_impersonateAccount", params: [safeAddress] });
  await network.provider.request({
    method: "hardhat_setBalance",
    params: [safeAddress, "0x56BC75E2D63100000"], // 100 ETH, for gas on impersonated txs
  });
  const safeSigner = await ethers.getSigner(safeAddress);

  const MBCToken = await ethers.getContractFactory("MBCToken");
  const token = (await MBCToken.deploy(safeAddress)) as unknown as MBCToken;
  await token.waitForDeployment();

  // --- Mock LayerZero endpoints, one per simulated chain ---
  const EndpointV2Mock = await ethers.getContractFactory("EndpointV2Mock");
  const endpointBNB = await EndpointV2Mock.deploy(EID_BNB);
  await endpointBNB.waitForDeployment();
  const endpointETH = await EndpointV2Mock.deploy(EID_ETH);
  await endpointETH.waitForDeployment();

  // --- Contract C: BNB Chain OFT Adapter (lock side), wraps Contract A ---
  const MBCOFTAdapter = await ethers.getContractFactory("MBCOFTAdapter");
  const adapter = (await MBCOFTAdapter.deploy(
    await token.getAddress(),
    await endpointBNB.getAddress(),
    deployer.address
  )) as unknown as MBCOFTAdapter;
  await adapter.waitForDeployment();

  // --- Contract B: Ethereum OFT (mint/burn side) ---
  const MBCOFT = await ethers.getContractFactory("MBCOFT");
  const oft = (await MBCOFT.deploy(await endpointETH.getAddress(), deployer.address)) as unknown as MBCOFT;
  await oft.waitForDeployment();

  // --- Wire the two mock endpoints together ---
  await endpointBNB.setDestLzEndpoint(await oft.getAddress(), await endpointETH.getAddress());
  await endpointETH.setDestLzEndpoint(await adapter.getAddress(), await endpointBNB.getAddress());

  // --- Register each side as the other's trusted peer ---
  await adapter.connect(deployer).setPeer(EID_ETH, addressToBytes32(await oft.getAddress()));
  await oft.connect(deployer).setPeer(EID_BNB, addressToBytes32(await adapter.getAddress()));

  // --- Operational step documented in MBCOFTAdapter.sol: exempt the bridge
  // adapter from Contract A's anti-whale limits so locked balances aren't
  // capped by maxWalletAmount/maxTxAmount (only the 10M bridge cap on
  // Contract B should gate bridge volume). ---
  await token.connect(safeSigner).setExempt(await adapter.getAddress(), true);

  return { deployer, user, userB, safeAddress, safeSigner, token, adapter, oft };
}

/** Bridges `amountLD` of MBC from `from` on BNB Chain to `to` on Ethereum. */
export async function bridgeToEthereum(
  fx: DeployedFixture,
  from: HardhatEthersSigner,
  to: string,
  amountLD: bigint
) {
  const sendParam = {
    dstEid: EID_ETH,
    to: addressToBytes32(to),
    amountLD,
    minAmountLD: amountLD,
    extraOptions: defaultOptions(),
    composeMsg: "0x",
    oftCmd: "0x",
  };
  const quotedFee = await fx.adapter.quoteSend(sendParam, false);
  // ethers v6 returns struct results as frozen Result objects; re-wrap as a
  // plain tuple/object before passing back into another call's ABI encoder,
  // otherwise ethers throws "Cannot assign to read only property" trying to
  // normalize the already-decoded Result in place.
  const fee = { nativeFee: quotedFee.nativeFee, lzTokenFee: quotedFee.lzTokenFee };
  await fx.token.connect(from).approve(await fx.adapter.getAddress(), amountLD);
  return fx.adapter.connect(from).send(sendParam, fee, from.address, { value: fee.nativeFee });
}

/** Bridges `amountLD` of MBC from `from` on Ethereum back to `to` on BNB Chain. */
export async function bridgeToBnb(fx: DeployedFixture, from: HardhatEthersSigner, to: string, amountLD: bigint) {
  const sendParam = {
    dstEid: EID_BNB,
    to: addressToBytes32(to),
    amountLD,
    minAmountLD: amountLD,
    extraOptions: defaultOptions(),
    composeMsg: "0x",
    oftCmd: "0x",
  };
  const quotedFee = await fx.oft.quoteSend(sendParam, false);
  const fee = { nativeFee: quotedFee.nativeFee, lzTokenFee: quotedFee.lzTokenFee };
  return fx.oft.connect(from).send(sendParam, fee, from.address, { value: fee.nativeFee });
}
