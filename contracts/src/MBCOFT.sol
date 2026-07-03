// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Base contract from the LayerZero standard reference implementation:
//   package: @layerzerolabs/oft-evm
//   version pinned in contracts/package.json: ^4.0.1
//   source used here: node_modules/@layerzerolabs/oft-evm/contracts/OFT.sol
// LayerZero's "OFT" (as opposed to "OFT Adapter") is the correct variant for
// a chain that does NOT already have the token: it IS the ERC-20, and it
// mints on receipt of a verified LayerZero message / burns on send — never
// minting outside of that path. See
// docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md §1.2.
import { OFT } from "@layerzerolabs/oft-evm/contracts/OFT.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @title MBCOFT (Contract B) — Ethereum-side mint/burn OFT
/// @notice Deployed on Ethereum ONLY (testnet — Sepolia — for now; no
///         mainnet deployment per spec §4.2 / whitepaper §11.4 Phase 5 gate).
///         This contract IS the ERC-20 on Ethereum. It has:
///
///         - NO constructor mint. Total supply starts at zero.
///         - NO owner-callable mint function of any kind.
///         - The ONLY path that increases totalSupply() is `_credit`,
///           inherited from LayerZero's OFT base and invoked exclusively by
///           OFTCore's internal message-handling logic in response to a
///           verified LayerZero message from a registered peer (the BNB
///           Chain adapter, Contract C — configured post-deployment via
///           `setPeer`, restricted to the owner/delegate, standard LayerZero
///           OApp wiring, not custom code written here).
///
///         Because this is the only mint path, `totalSupply()` at any moment
///         IS "Ethereum outstanding" in the supply-invariant equation from
///         docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md
///         §1.3:
///
///           BNB circulating + BNB locked-in-adapter + ETH outstanding
///             == 100,000,000 MBC, always.
///
/// @dev Bridge cap (spec §4.2): enforces the whitepaper's existing
///      10,000,000 MBC (10% of supply) cap on cumulative Ethereum-outstanding
///      supply as a hard on-chain `require`, not just a documentation claim.
///      Implemented by overriding `_credit` — the sole mint path — to check
///      the post-mint totalSupply() against BRIDGE_CAP before minting.
contract MBCOFT is OFT {
    /// @notice Hard cap on Ethereum-outstanding MBC: 10% of the 100,000,000
    ///         fixed supply, per docs/WHITEPAPER.md §11.4 / §14.3.
    uint256 public constant BRIDGE_CAP = 10_000_000 * 10 ** 18;

    /// @param _lzEndpoint LayerZero EndpointV2 address on Ethereum (Sepolia
    ///        for the testnet deployment target in scope here).
    /// @param _delegate Address with owner/config rights over this OApp.
    constructor(
        address _lzEndpoint,
        address _delegate
    ) OFT("MedByClick Token", "MBC", _lzEndpoint, _delegate) Ownable(_delegate) {}

    /// @dev Overrides OFT._credit (the sole mint path on this contract) to
    ///      enforce BRIDGE_CAP as a hard on-chain require. Reverts if minting
    ///      `_amountLD` more would push totalSupply() above 10,000,000 MBC.
    ///      This is a `require`, not a silent clamp — a bridge transfer that
    ///      would exceed the cap fails outright rather than partially
    ///      crediting a smaller amount, matching spec §4.4's
    ///      "bridge-cap-enforcement test: attempting to lock/mint beyond
    ///      10,000,000 MBC outstanding on Ethereum must revert."
    function _credit(
        address _to,
        uint256 _amountLD,
        uint32 _srcEid
    ) internal virtual override returns (uint256 amountReceivedLD) {
        require(totalSupply() + _amountLD <= BRIDGE_CAP, "MBCOFT: exceeds 10,000,000 MBC bridge cap");
        return super._credit(_to, _amountLD, _srcEid);
    }
}
