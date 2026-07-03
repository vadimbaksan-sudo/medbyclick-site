// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/// @dev TEST-ONLY re-export. Never deployed to any real network (BNB Chain,
///      Ethereum, or their testnets) — it exists purely so Hardhat compiles
///      LayerZero's own `EndpointV2Mock` (from the officially published
///      `@layerzerolabs/test-devtools-evm-hardhat` package) into this
///      project's artifacts, since Hardhat only compiles files under
///      `sources` (./src) plus whatever they import, and none of the
///      production contracts (MBCToken / MBCOFT / MBCOFTAdapter) import a
///      mock endpoint.
///
///      `EndpointV2Mock` simulates two wired-together LayerZero
///      EndpointV2 instances synchronously in a single local Hardhat chain
///      (no real relayer/DVN network), which is LayerZero's own documented
///      pattern for local OFT/OFTAdapter testing — see
///      contracts/test/*.test.ts for how it's used to drive the
///      supply-invariant, bridge-cap, and round-trip tests required by
///      docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md §4.4.
import "@layerzerolabs/test-devtools-evm-hardhat/contracts/mocks/EndpointV2Mock.sol";
