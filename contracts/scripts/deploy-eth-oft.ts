import { ethers, network } from "hardhat";

/**
 * Deploys Contract B (MBCOFT.sol) — the Ethereum-side LayerZero OFT
 * mint/burn contract — per spec §4.2.
 *
 * Sepolia (testnet) ONLY. This script has no mainnet-Ethereum counterpart
 * and none should be added without a separate, explicit decision — see
 * docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md §4.2
 * and §4.5 ("No mainnet Ethereum deployment").
 *
 * REQUIRED env vars:
 *   LZ_ENDPOINT_ADDRESS — LayerZero EndpointV2 address on Sepolia.
 *   DELEGATE_ADDRESS    — address with owner/OApp-config rights over this OFT.
 *
 * This script has NOT been executed against any real network as part of
 * this task — see the PR description for the honest compiled/tested vs.
 * deployed status.
 */
async function main() {
  if (network.name !== "sepolia") {
    throw new Error(
      `Refusing to deploy MBCOFT to network "${network.name}" — this script is Sepolia-only per spec §4.2/§4.5 ` +
        `(no Ethereum mainnet deployment). Run with --network sepolia.`
    );
  }

  const lzEndpoint = process.env.LZ_ENDPOINT_ADDRESS;
  const delegate = process.env.DELEGATE_ADDRESS;
  if (!lzEndpoint) throw new Error("LZ_ENDPOINT_ADDRESS env var is required (LayerZero EndpointV2 on Sepolia)");
  if (!delegate) throw new Error("DELEGATE_ADDRESS env var is required (owner/OApp-config address for the OFT)");

  const [deployer] = await ethers.getSigners();
  console.log("Network:", network.name);
  console.log("Deploying MBCOFT (Contract B) with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");
  console.log("LayerZero endpoint:", lzEndpoint);
  console.log("Delegate/owner:", delegate);

  const MBCOFT = await ethers.getContractFactory("MBCOFT");
  const oft = await MBCOFT.deploy(lzEndpoint, delegate);
  await oft.waitForDeployment();
  const address = await oft.getAddress();

  console.log("\n=== MBCOFT (Contract B) Deployed on Sepolia ===");
  console.log("Contract address:", address);
  console.log("Name:", await oft.name());
  console.log("Symbol:", await oft.symbol());
  console.log("Total supply (should be 0 — mints only via verified LayerZero messages):", await oft.totalSupply());
  console.log("Bridge cap:", ethers.formatEther(await oft.BRIDGE_CAP()), "MBC");
  console.log("\nVerify:");
  console.log(`npx hardhat verify --network sepolia ${address} ${lzEndpoint} ${delegate}`);
  console.log(
    "\nRemaining manual steps (not automated by this script):\n" +
      "  1. MBCOFT.setPeer(<BNB eid>, addressToBytes32(<MBCOFTAdapter address>))\n" +
      "  2. MBCOFTAdapter.setPeer(<Ethereum eid>, addressToBytes32(<this MBCOFT address>)) (on BNB side)\n" +
      "  3. Configure LayerZero DVN/executor settings per LayerZero's standard OApp\n" +
      "     configuration docs before relying on this in production."
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
