import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying MBC Token with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  const MBCToken = await ethers.getContractFactory("MBCToken");
  const token = await MBCToken.deploy(deployer.address);

  await token.waitForDeployment();
  const address = await token.getAddress();

  console.log("\n=== MBC Token Deployed ===");
  console.log("Contract address:", address);
  console.log("Name:", await token.name());
  console.log("Symbol:", await token.symbol());
  console.log("Total supply:", ethers.formatEther(await token.totalSupply()), "MBC");
  console.log("Owner:", await token.owner());
  console.log("\nVerify on Etherscan:");
  console.log(`npx hardhat verify --network sepolia ${address} ${deployer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
