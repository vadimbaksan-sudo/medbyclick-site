import { ethers, network } from "hardhat";

/**
 * Deploys Contract C (MBCOFTAdapter.sol) — the BNB Chain LayerZero OFT
 * Adapter lock side — per spec §4.3. Wraps the already-deployed Contract A
 * (MBCToken.sol) for omnichain transport without ever minting/burning it.
 *
 * REQUIRED env vars:
 *   MBC_TOKEN_ADDRESS   — address of the already-deployed Contract A on this network.
 *   LZ_ENDPOINT_ADDRESS — LayerZero EndpointV2 address on this network.
 *   DELEGATE_ADDRESS    — address with owner/OApp-config rights over this adapter
 *                          (recommended: the same Gnosis Safe as Contract A, or a
 *                          dedicated bridge-ops multisig — a deployment-time
 *                          decision, not something this contract enforces).
 *
 * This script has NOT been executed against any real network as part of
 * this task — see the PR description for the honest compiled/tested vs.
 * deployed status.
 */
async function main() {
  const tokenAddress = process.env.MBC_TOKEN_ADDRESS;
  const lzEndpoint = process.env.LZ_ENDPOINT_ADDRESS;
  const delegate = process.env.DELEGATE_ADDRESS;

  if (!tokenAddress) throw new Error("MBC_TOKEN_ADDRESS env var is required (Contract A's deployed address)");
  if (!lzEndpoint) throw new Error("LZ_ENDPOINT_ADDRESS env var is required (LayerZero EndpointV2 on this network)");
  if (!delegate) throw new Error("DELEGATE_ADDRESS env var is required (owner/OApp-config address for the adapter)");

  const [deployer] = await ethers.getSigners();
  console.log("Network:", network.name);
  console.log("Deploying MBCOFTAdapter (Contract C) with account:", deployer.address);
  console.log("Wrapping MBCToken at:", tokenAddress);
  console.log("LayerZero endpoint:", lzEndpoint);
  console.log("Delegate/owner:", delegate);

  const MBCOFTAdapter = await ethers.getContractFactory("MBCOFTAdapter");
  const adapter = await MBCOFTAdapter.deploy(tokenAddress, lzEndpoint, delegate);
  await adapter.waitForDeployment();
  const address = await adapter.getAddress();

  console.log("\n=== MBCOFTAdapter (Contract C) Deployed ===");
  console.log("Contract address:", address);
  console.log("\nVerify:");
  console.log(`npx hardhat verify --network ${network.name} ${address} ${tokenAddress} ${lzEndpoint} ${delegate}`);
  console.log(
    "\nRemaining manual steps (not automated by this script):\n" +
      "  1. From the Safe: MBCToken.setExempt(<this adapter address>, true)\n" +
      "  2. From the delegate: MBCOFTAdapter.setPeer(<Ethereum eid>, addressToBytes32(<MBCOFT address>))\n" +
      "  3. On the Ethereum side: MBCOFT.setPeer(<BNB eid>, addressToBytes32(<this adapter address>))\n" +
      "  4. Configure LayerZero DVN/executor settings for both OApps per LayerZero's\n" +
      "     standard OApp configuration docs before relying on this in production."
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
