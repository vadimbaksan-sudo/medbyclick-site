// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Base contract from the LayerZero standard reference implementation:
//   package: @layerzerolabs/oft-evm
//   version pinned in contracts/package.json: ^4.0.1
//   source used here: node_modules/@layerzerolabs/oft-evm/contracts/OFTAdapter.sol
// This is LayerZero's own "OFT Adapter" pattern for wrapping an existing,
// already-deployed, non-upgradable ERC-20 (Contract A, MBCToken.sol) for
// omnichain use — the exact case described in
// docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md §1.2,
// used deliberately instead of bespoke relayer/bridge logic to minimize the
// audit surface handed to Trail of Bits (see that report's §1.2 rationale and
// docs/CONTRACT_AUDIT.md §0.3).
import { OFTAdapter } from "@layerzerolabs/oft-evm/contracts/OFTAdapter.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @title MBCOFTAdapter (Contract C) — BNB Chain lock side of the bridge
/// @notice Deployed on BNB Chain alongside Contract A (MBCToken.sol). Wraps
///         the existing, already-canonical MBC token for LayerZero omnichain
///         transport WITHOUT ever minting or burning it:
///
///         - send-to-Ethereum: user's MBC is LOCKED here (transferred into
///           this contract, per OFTAdapter._debit -> safeTransferFrom), and a
///           LayerZero message authorizes an equivalent mint on Contract B
///           (Ethereum).
///         - return-from-Ethereum: on receipt of a verified burn message from
///           Contract B, the locked MBC is UNLOCKED (transferred back out of
///           this contract to the recipient, per OFTAdapter._credit ->
///           safeTransfer).
///
///         This contract's locked balance of Contract A tokens is, by
///         construction, always exactly equal to Contract B's outstanding
///         minted supply on Ethereum — that equality IS the supply invariant
///         described in the architecture decision report §1.3:
///
///           BNB circulating + BNB locked-in-this-adapter + ETH outstanding
///             == 100,000,000 MBC, always.
///
/// @dev No custom logic is added on top of LayerZero's stock OFTAdapter —
///      per the architecture decision, using the standard reference contract
///      unmodified (rather than a bespoke lock/unlock implementation) is the
///      deliberate choice that minimizes novel audit surface. The only
///      MedByClick-specific piece is the constructor wiring (which token,
///      which endpoint, which delegate/owner).
///
///      Operational note (not enforced on-chain, flagged for the deploy
///      runbook): after deployment, Contract A's owner (the Gnosis Safe)
///      should call `MBCToken.setExempt(address(thisAdapter), true)` so that
///      legitimate bridge locks are not capped by Contract A's
///      maxWalletAmount/maxTxAmount anti-whale limits. Without that
///      exemption, this adapter's locked balance could not exceed
///      maxWalletAmount even though the bridge's own cap (Contract B,
///      10,000,000 MBC) is higher.
contract MBCOFTAdapter is OFTAdapter {
    /// @param _token Address of Contract A (MBCToken.sol) on BNB Chain.
    /// @param _lzEndpoint LayerZero EndpointV2 address on BNB Chain.
    /// @param _delegate Address with owner/config rights over this OApp
    ///        (should be the same Gnosis Safe multisig as Contract A's owner,
    ///        or a dedicated bridge-ops multisig — a decision for deployment,
    ///        not this contract).
    constructor(
        address _token,
        address _lzEndpoint,
        address _delegate
    ) OFTAdapter(_token, _lzEndpoint, _delegate) Ownable(_delegate) {}
}
