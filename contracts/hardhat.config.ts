import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

// Ethereum — testnet only. No Ethereum mainnet network is defined anywhere in
// this config, deliberately, per
// docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md §4.2
// ("No Ethereum mainnet deployment until the whitepaper §11.4 Phase 5 gate is
// actually reached") and per the Developer task's explicit out-of-scope list.
const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL || "";

// BNB Chain — both mainnet and testnet are configured, since Contract A
// (canonical mint) and Contract C (bridge adapter) both live on BNB Chain per
// spec §4.1/§4.3. `npm run deploy:*:mainnet` scripts exist but are NOT
// invoked by anything in this repo/CI — a real broadcast requires manually
// running the script with a funded key, which was not done as part of this
// task (see PR description).
const BSC_MAINNET_RPC = process.env.BSC_MAINNET_RPC_URL || "https://bsc-rpc.publicnode.com";
const BSC_TESTNET_RPC = process.env.BSC_TESTNET_RPC_URL || "https://bsc-testnet-rpc.publicnode.com";

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY || "";
const BSCSCAN_KEY = process.env.BSCSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.22",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      // docs/CONTRACT_AUDIT.md finding I-01: BNB Chain may not support the
      // PUSH0 opcode depending on node version. Building with the `paris`
      // EVM target (pre-Shanghai) avoids emitting PUSH0 anywhere, which is
      // safe for both BNB Chain and Sepolia.
      evmVersion: "paris",
    },
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 97,
    },
    bsc: {
      url: BSC_MAINNET_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 56,
    },
    // Deliberately no `mainnet` (Ethereum) network entry — see note above.
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_KEY,
      bscTestnet: BSCSCAN_KEY,
      bsc: BSCSCAN_KEY,
    },
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
