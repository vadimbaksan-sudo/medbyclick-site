import { ethers, network } from "hardhat";

/**
 * Deploys Contract A (MBCToken.sol) — the canonical BNB Chain token — per
 * spec §4.1. Mints the entire fixed 100,000,000 MBC supply, once, to the
 * 3-of-5 Gnosis Safe multisig address.
 *
 * REQUIRED env var: SAFE_ADDRESS — the Gnosis Safe address that will receive
 * the genesis mint. Must already be deployed (a contract, not an EOA) on the
 * target network before running this script — MBCToken's constructor
 * reverts otherwise.
 *
 * This script has NOT been executed against any real network as part of
 * this task (no funded testnet/mainnet deployer key available in this
 * environment) — see the PR description for the honest compiled/tested vs.
 * deployed status.
 */
async function main() {
  const safeAddress = process.env.SAFE_ADDRESS;
  if (!safeAddress) {
    throw new Error("SAFE_ADDRESS env var is required (the Gnosis Safe multisig that receives the genesis mint)");
  }

  const [deployer] = await ethers.getSigners();
  console.log("Network:", network.name);
  console.log("Deploying MBCToken (Contract A) with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "BNB");
  console.log("Genesis Safe address:", safeAddress);

  const MBCToken = await ethers.getContractFactory("MBCToken");
  const token = await MBCToken.deploy(safeAddress);
  await token.waitForDeployment();
  const address = await token.getAddress();

  console.log("\n=== MBCToken (Contract A) Deployed ===");
  console.log("Contract address:", address);
  console.log("Name:", await token.name());
  console.log("Symbol:", await token.symbol());
  console.log("Total supply:", ethers.formatEther(await token.totalSupply()), "MBC");
  console.log("Owner (should equal Safe):", await token.owner());
  console.log("\nVerify:");
  console.log(`npx hardhat verify --network ${network.name} ${address} ${safeAddress}`);
  console.log(
    "\nNext step: from the Safe, call setExempt(<MBCOFTAdapter address>, true) once Contract C is deployed,\n" +
      "so bridge locks are not capped by maxWalletAmount/maxTxAmount."
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
