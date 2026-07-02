// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MBCToken (Contract A) — canonical MedByClick Token on BNB Chain
/// @notice This is the ONLY contract in the MBC system that ever mints supply.
///         It mints the fixed 100,000,000 MBC supply exactly once, in the
///         constructor, to a Gnosis Safe multisig address. No function on
///         this contract — anywhere, under any role — can mint again.
///
///         This contract has zero awareness of Ethereum or LayerZero. The
///         bridge is a separate, external consumer (see MBCOFTAdapter.sol,
///         "Contract C") that interacts with this token purely through the
///         standard ERC-20 interface (transfer / transferFrom), the same as
///         any other holder. Keeping this contract bridge-agnostic keeps its
///         audit surface minimal and mirrors the "single canonical mint"
///         architecture decision in
///         docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md §1.
///
/// @dev Base: OpenZeppelin 5.x ERC20 + ERC20Burnable + Ownable, same base PR #2
///      used — reused per spec §4.1. Anti-whale mechanics (maxTxAmount,
///      maxWalletAmount, txCooldown, exclusion list) are reused from PR #2's
///      contracts/src/MBCToken.sol with the following remediations applied,
///      each tracing to a docs/CONTRACT_AUDIT.md finding:
///
///      - C-01 (CRITICAL, owner-bypassable pause): pause() / unpause() /
///        the `paused` state variable are REMOVED ENTIRELY. This is
///        "Option A (Best)" from docs/CONTRACT_AUDIT.md's own remediation
///        list ("Remove pause entirely. Anti-bot protection is sufficient").
///        There is no pause mechanism anywhere in this contract, so there is
///        nothing for an owner (or a compromised owner key) to bypass.
///
///      - H-01 (HIGH, setExempt/setExcluded emits no event): setExempt()
///        below emits `ExemptionUpdated` on every call, and the constructor
///        emits it once for the initial safe exemption. Every exemption
///        change is now visible to block explorers / Token Sniffer / DexTools
///        style monitoring, closing the "silent self-exemption before a dump"
///        vector described in H-01.
///
///      - H-02 (HIGH, setLimits can trap retail sellers): setLimits() is now
///        one-directional / loosen-only after the constructor sets the
///        initial values, per docs/CONTRACT_AUDIT.md's own suggested
///        alternative ("make limits one-directional — values can only
///        increase, never decrease after initial setting"). maxTxAmount and
///        maxWalletAmount may only be raised (or left unchanged), and
///        txCooldown may only be lowered (or left unchanged) — i.e. every
///        call can only make the token *easier* to trade than before, never
///        harder. The absolute floors from PR #2 (maxTx >= 0.1% of supply,
///        maxWallet >= 1% of supply) are kept as a belt-and-braces bound in
///        case a future owner is a fresh deployment with different initial
///        values. `removeLimits()` remains a one-way, permanent escape valve
///        (docs/CONTRACT_AUDIT.md M-02 — "positive for investors").
contract MBCToken is ERC20, ERC20Burnable, Ownable {
    /// @notice Fixed total supply: 100,000,000 MBC, 18 decimals. Minted once.
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10 ** 18;

    /// @dev Absolute floors — no owner action can ever push limits below
    ///      these, regardless of loosen/tighten direction. Mirrors the
    ///      floors already described in docs/CONTRACT_AUDIT.md's Function Map
    ///      (maxTx >= 0.1% of supply, maxWallet >= 1% of supply).
    uint256 public constant MIN_MAX_TX = TOTAL_SUPPLY / 1000; // 0.1% = 100,000 MBC
    uint256 public constant MIN_MAX_WALLET = TOTAL_SUPPLY / 100; // 1% = 1,000,000 MBC

    uint256 public maxTxAmount = TOTAL_SUPPLY / 100; // 1% = 1,000,000 MBC
    uint256 public maxWalletAmount = (TOTAL_SUPPLY * 3) / 100; // 3% = 3,000,000 MBC
    uint256 public txCooldown = 30; // 30 seconds

    /// @notice Once limits are permanently removed, this can never be re-enabled.
    bool public limitsEnabled = true;

    mapping(address => bool) public isExempt;
    mapping(address => uint256) public lastTxTime;

    /// @dev H-01 remediation: every exemption change is now logged.
    event ExemptionUpdated(address indexed account, bool exempt);
    event LimitsUpdated(uint256 maxTx, uint256 maxWallet, uint256 cooldown);
    event LimitsRemoved();

    /// @param safe The 3-of-5 Gnosis Safe multisig address that receives the
    ///        entire genesis mint. Must be a contract, not an EOA — see
    ///        docs/CONTRACT_AUDIT.md Pre-Listing Action Plan item ①.
    constructor(address safe) ERC20("MedByClick Token", "MBC") Ownable(safe) {
        require(safe != address(0), "MBC: safe is zero address");
        require(safe.code.length > 0, "MBC: safe must be a contract (Gnosis Safe), not an EOA");

        isExempt[safe] = true;
        emit ExemptionUpdated(safe, true);

        // The one and only mint this contract will ever perform.
        _mint(safe, TOTAL_SUPPLY);
    }

    /// @notice Update an address's exemption from anti-whale limits.
    /// @dev H-01 remediation: emits ExemptionUpdated (PR #2's version emitted
    ///      nothing here). Intended uses: the LayerZero bridge adapter
    ///      (Contract C) should be exempted so legitimate bridge locks are not
    ///      capped by maxWalletAmount/maxTxAmount, CEX deposit wallets, etc.
    ///      Per docs/CONTRACT_AUDIT.md's H-01 remediation note, the project
    ///      should also publish a public registry of exempted addresses.
    function setExempt(address account, bool exempt) external onlyOwner {
        isExempt[account] = exempt;
        emit ExemptionUpdated(account, exempt);
    }

    /// @notice Adjust anti-whale limits. Loosen-only after initial setup
    ///         (H-02 remediation) — every call must leave the token at least
    ///         as easy to trade as before, and can never trap sellers behind
    ///         a newly-tightened wall.
    /// @dev Loosen-only means: maxTx and maxWallet can only stay the same or
    ///      increase; cooldown can only stay the same or decrease. Combined
    ///      with the absolute MIN_MAX_TX / MIN_MAX_WALLET floors, this makes
    ///      the H-02 attack path (silently exempt self, then tighten limits
    ///      on everyone else) structurally impossible: the owner can never
    ///      make limits *more* restrictive than whatever they already are.
    function setLimits(uint256 _maxTx, uint256 _maxWallet, uint256 _cooldown) external onlyOwner {
        require(_maxTx >= MIN_MAX_TX, "MBC: maxTx below floor");
        require(_maxWallet >= MIN_MAX_WALLET, "MBC: maxWallet below floor");
        require(_maxTx >= maxTxAmount, "MBC: maxTx may only increase");
        require(_maxWallet >= maxWalletAmount, "MBC: maxWallet may only increase");
        require(_cooldown <= txCooldown, "MBC: cooldown may only decrease");

        maxTxAmount = _maxTx;
        maxWalletAmount = _maxWallet;
        txCooldown = _cooldown;
        emit LimitsUpdated(_maxTx, _maxWallet, _cooldown);
    }

    /// @notice Permanently and irreversibly disable all anti-whale limits.
    /// @dev One-way, matches docs/CONTRACT_AUDIT.md M-02 ("positive for
    ///      investors... limits cannot return to trap them"). This is itself
    ///      the ultimate "loosen" operation and is exempt from the
    ///      loosen-only bookkeeping in setLimits because there is nothing
    ///      left to tighten afterwards.
    function removeLimits() external onlyOwner {
        limitsEnabled = false;
        emit LimitsRemoved();
    }

    /// @dev No pause() / unpause() anywhere in this contract — C-01 removed
    ///      at the root instead of mitigated. Anti-whale gate below is the
    ///      only non-standard transfer restriction.
    function _update(address from, address to, uint256 value) internal override {
        if (limitsEnabled && from != address(0) && to != address(0)) {
            bool senderExempt = isExempt[from];
            bool recipientExempt = isExempt[to];

            if (!senderExempt && !recipientExempt) {
                require(value <= maxTxAmount, "MBC: exceeds max tx");
                require(balanceOf(to) + value <= maxWalletAmount, "MBC: exceeds max wallet");
                require(block.timestamp >= lastTxTime[from] + txCooldown, "MBC: cooldown active");
                lastTxTime[from] = block.timestamp;
            }
        }

        super._update(from, to, value);
    }
}
