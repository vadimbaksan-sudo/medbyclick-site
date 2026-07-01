# MBC Token — Smart Contract Bytecode Audit Report
### Date: June 2026 | Analyst: Internal Pre-Audit
### Audit Type: Bytecode-level analysis (NOT a substitute for source code audit)

---

> **Scope:** Runtime bytecode analysis only. Source code was not available. This report identifies structural and functional findings from decompilation of the provided EVM bytecode. A full source-level audit by a named firm (Hacken, CertiK, Trail of Bits) is required before any exchange listing.

---

## Contract Metadata

| Parameter | Value |
|-----------|-------|
| Compiler | Solidity **0.8.20** |
| Base Library | **OpenZeppelin 5.x** (confirmed via custom error selectors) |
| IPFS Source Hash | `0x2817d9806d004deb80b52e6ef5bf6c15d7099fffb2878f4914c34cfbb343609e` |
| Total Supply | **100,000,000 × 10^18** (hard cap, confirmed) |
| Mint Function | **ABSENT** — supply cannot be inflated |
| ERC-20 Compliance | **FULL** — all 9 interface elements present |
| OZ 5.x Custom Errors | **ALL 8** confirmed |

---

## Function Map

| Selector | Function | Category |
|----------|----------|----------|
| `06fdde03` | `name()` | ERC-20 Standard |
| `095ea7b3` | `approve(address,uint256)` | ERC-20 Standard |
| `17d63605` | `setLimits(uint256,uint256,uint256)` | **CUSTOM — owner only** |
| `18160ddd` | `totalSupply()` | ERC-20 Standard |
| `189ae5f2` | `setExcluded(address,bool)` | **CUSTOM — owner only — NO EVENT** |
| `23b872dd` | `transferFrom(address,address,uint256)` | ERC-20 Standard |
| `313ce567` | `decimals()` | ERC-20 Standard |
| `3582ad23` | `setLimits(...)` variant | **CUSTOM** |
| `3f4ba83a` | `unpause()` | **Pausable — owner only** |
| `42966c68` | `burn(uint256)` | Extension |
| `5c975abb` | `paused()` | Pausable view |
| `70a08231` | `balanceOf(address)` | ERC-20 Standard |
| `715018a6` | `renounceOwnership()` | Ownable |
| `751039fc` | `removeLimits()` | **CUSTOM — one-way permanent** |
| `79cc6790` | `burnFrom(address,uint256)` | Extension |
| `8456cb59` | `pause()` | **Pausable — owner only** |
| `8c0b5e22` | `maxTransactionAmount()` | View |
| `8da5cb5b` | `owner()` | Ownable |
| `902d55a5` | `MAX_SUPPLY()` | Constant: 100M tokens |
| `95d89b41` | `symbol()` | ERC-20 Standard |
| `9fde54f5` | `antiBotEnabled()` | View |
| `a9059cbb` | `transfer(address,uint256)` | ERC-20 Standard |
| `aa4bde28` | `maxWallet()` | View |
| `ad5dff73` | `isExcluded(address)` | View |
| `dcafac09` | `cooldownTime()` | View |
| `dd62ed3e` | `allowance(address,address)` | ERC-20 Standard |
| `f2fde38b` | `transferOwnership(address)` | Ownable |

---

## Storage Layout

| Slot | Variable | Type | Notes |
|------|----------|------|-------|
| 0 | `_balances` | `mapping(address => uint256)` | balanceOf |
| 1 | `_allowances` | `mapping(address => mapping(address => uint256))` | allowance |
| 2 | `_totalSupply` | `uint256` | totalSupply() |
| 3 | `_name` | `string` | name() |
| 4 | `_symbol` | `string` | symbol() |
| 5 | `_owner` | `address` | owner() |
| 6 | `_maxTx` | `uint256` | maxTransactionAmount() |
| 7 | `_maxWallet` | `uint256` | maxWallet() |
| 8 | `_cooldownTime` | `uint256` | seconds between transfers per sender |
| 9 | `_flags` | `uint8 packed` | bit 0 = paused; bit 8 = antiBotEnabled |
| 10 | `_isExcluded` | `mapping(address => bool)` | isExcluded(address) |
| 11 | `_lastTransfer` | `mapping(address => uint256)` | cooldown timestamp per sender |

---

## Transfer Logic — Decompiled Pseudocode

```solidity
function _update(address from, address to, uint256 amount) internal {

    // ── PAUSE GATE ──────────────────────────────────────────────────
    if (paused()) {
        if (from != owner && to != owner) {
            revert("Pausable: paused");
        }
        // ⚠️ C-01: Owner bypasses their own pause
    }

    // ── ANTI-BOT GATE ───────────────────────────────────────────────
    if (antiBotEnabled() && from != address(0) && to != address(0)) {
        bool fromExcluded = isExcluded[from];
        bool toExcluded   = isExcluded[to];

        if (!fromExcluded && !toExcluded) {

            if (amount > _maxTx)
                revert("MBC: exceeds maxTx");          // floor: 0.1% supply

            if (balanceOf[to] + amount > _maxWallet)
                revert("MBC: exceeds max wallet");     // floor: 1% supply

            if (_lastTransfer[from] + _cooldownTime > block.timestamp)
                revert("MBC: cooldown active");

            _lastTransfer[from] = block.timestamp;
        }
        // ⚠️ H-01: Excluded addresses bypass ALL of the above silently
    }

    // ── BALANCE UPDATE ──────────────────────────────────────────────
    if (from == address(0)) {
        _totalSupply += amount;                        // MINT path
    } else {
        if (_balances[from] < amount)
            revert ERC20InsufficientBalance(from, _balances[from], amount);
        unchecked { _balances[from] -= amount; }
    }

    if (to == address(0)) {
        unchecked { _totalSupply -= amount; }         // BURN path (safe)
    } else {
        unchecked { _balances[to] += amount; }
    }

    emit Transfer(from, to, amount);
}
```

---

## Security Findings

### [CRITICAL] C-01 — Owner can freeze all non-owner transfers via `pause()`

**Status:** UNMITIGATED

**Description:**

The owner can call `pause()` at any time to freeze all token transfers for everyone except themselves. The guard in `_update()` is:

```
if paused() && from != owner && to != owner → revert
```

This means:
- Owner can sell/transfer tokens while all other users are frozen
- No timelock before activation
- No maximum pause duration
- No community veto
- A single `unpause()` call restores transfers — also owner-only

**Attack Path (rug pull):**
1. `owner.pause()` — all retail transfers frozen
2. `owner.transfer(owner_allocation, cex_deposit)` — succeeds (owner exempted)
3. Retail holders attempt to sell → `revert("Pausable: paused")`
4. `owner.unpause()` — or simply disappear

**Exchange Impact:** Any CEX compliance review will flag a live `pause()` function owned by a single EOA as a rug pull risk. This alone will block listing on MEXC, Gate.io, KuCoin, Bybit, OKX, and Binance.

**Remediation Options:**
- **Option A (Best):** Remove pause entirely. Anti-bot protection is sufficient
- **Option B:** Transfer ownership to 3-of-5 Gnosis Safe before listing (minimum)
- **Option C:** Add 72-hour timelock before pause activation
- **Option D:** After anti-bot phase, call `renounceOwnership()` permanently

---

### [HIGH] H-01 — `setExcluded()` emits no event

**Status:** UNMITIGATED

**Description:**

`setExcluded(address, bool)` writes to `isExcluded` mapping with no event emission:

```solidity
isExcluded[addr] = bool;
// no emit
```

No LOG opcodes found in the function body.

**Impact:**
- Owner can silently add any address to the exemption list before coordinating a large sell
- Cannot be monitored via event subscriptions or blockchain explorers
- Token Sniffer, DexTools, and other safety tools cannot detect this
- Forensic investigation post-incident is harder

**Remediation:**
```solidity
event ExclusionChanged(address indexed account, bool excluded);

function setExcluded(address account, bool excluded) external onlyOwner {
    _isExcluded[account] = excluded;
    emit ExclusionChanged(account, excluded);
}
```

Additionally: publish a public registry of all excluded addresses on the project website.

---

### [HIGH] H-02 — `setLimits()` can trap retail sellers

**Status:** UNMITIGATED

**Description:**

`setLimits(maxTx, maxWallet, cooldown)` enforces floor values but can be called at any time to tighten limits:

```
Floor: maxTx >= 100,000 MBC (0.1% of supply)
Floor: maxWallet >= 1,000,000 MBC (1% of supply)
```

**Attack Path:**
1. `owner.setExcluded(owner_wallet, true)` — silent (no event, see H-01)
2. `owner.setLimits(100_000, 1_000_000, 86_400)` — minimum maxTx + 24h cooldown
3. Retail holders: max 100,000 MBC per 24 hours per wallet
4. Owner (excluded): unlimited sells, no cooldown

**Remediation:**
- Add 48-hour timelock before `setLimits()` changes take effect
- Alternative: make limits one-directional — values can only increase, never decrease after initial setting

---

### [MEDIUM] M-01 — Cooldown is per-sender, bypassed with multi-wallet

**Status:** By Design (acknowledged limitation)

The cooldown tracks `_lastTransfer[from]`. A user with tokens in N wallets can sell from each wallet without triggering cooldown on the others. This provides soft protection against naive bots but not sophisticated actors.

**Remediation:** Document in whitepaper. Do not market as robust bot protection.

---

### [MEDIUM] M-02 — `removeLimits()` is permanent and one-directional

**Status:** Informational Risk

Once `removeLimits()` is called, it clears `antiBotEnabled` (slot 9, bit 8). No function re-enables this flag. The anti-bot system is permanently disabled. This is positive for investors (limits cannot return to trap them) but removes team recourse in a bot attack.

**Remediation:** Call `removeLimits()` on a publicly announced schedule (e.g., Day 30 post-TGE). This converts a risk into a commitment.

---

### [MEDIUM] M-03 — Ownership renouncement not yet scheduled

**Status:** Requires Planning

`renounceOwnership()` is present and functional. Until called, all C-01/H-01/H-02 risks remain active. CEX listing teams will require either renouncement or multi-sig before listing.

**Remediation:**
```
Phase 1 (TGE):    Transfer ownership to 3-of-5 Gnosis Safe
Phase 2 (Month 6): Call removeLimits() from multisig + publish tx
Phase 3 (Month 12): Renounce ownership from multisig + publish tx
```

---

### [LOW] L-01 — Two selectors dispatching to similar setLimits logic

**Status:** Requires Source Verification

Selectors `0x17d63605` and `0x3582ad23` both appear to route to setLimits-style code at different entry points. Without source code, cannot confirm if these are:
- Two function overloads with different parameter types
- A dispatch table artifact
- Different access control levels for the same logic

**Remediation:** Publish and verify source code on BscScan/Sourcify before TGE.

---

### [LOW] L-02 — Burn arithmetic in unchecked block

**Status:** SAFE — Standard OZ 5.x pattern

`totalSupply -= amount` in the burn path is inside an `unchecked` block. Safe because `amount <= balanceOf[from]` is verified before this point, and `totalSupply >= sum(balances)` is an invariant maintained by the contract. Not exploitable with Solidity 0.8.x.

---

### [LOW] L-03 — `burnFrom()` allows infinite approval bypass

**Status:** SAFE — Standard ERC-20 behavior

`burnFrom` calls `_spendAllowance` which skips allowance deduction when `allowance == type(uint256).max`. This is standard infinite-approval behavior. Not a vulnerability.

---

### [INFORMATIONAL] I-01 — Verify EVM version for BNB Chain compatibility

**Status:** Action Required

Solidity 0.8.20 defaults to `evmVersion = shanghai`, which includes the `PUSH0` opcode. BNB Chain may not support `PUSH0` depending on node version. Three `0x5f` bytes found in bytecode — verify these are not standalone `PUSH0` opcodes.

**Remediation:** Recompile with `--evm-version paris` for BNB Chain deployment if `PUSH0` is used.

---

### [INFORMATIONAL] I-02 — IPFS source hash present, not yet pinned

**Status:** Action Required

IPFS hash in bytecode metadata: `0x2817d9806d004deb80b52e6ef5bf6c15d7099fffb2878f4914c34cfbb343609e`

**Remediation:**
1. Pin IPFS content via Pinata or Infura IPFS
2. Verify source on BscScan ("Verify & Publish")
3. Submit to Sourcify.dev for independent verification

---

## ERC-20 Compliance Check

| Function / Event | Status |
|-----------------|--------|
| `totalSupply()` | ✅ Present |
| `balanceOf(address)` | ✅ Present |
| `transfer(address,uint256)` | ✅ Present |
| `transferFrom(address,address,uint256)` | ✅ Present |
| `approve(address,uint256)` | ✅ Present |
| `allowance(address,address)` | ✅ Present |
| `name()` | ✅ Present |
| `symbol()` | ✅ Present |
| `decimals()` | ✅ Present (returns 18) |
| `Transfer` event | ✅ Present |
| `Approval` event | ✅ Present |

---

## OpenZeppelin 5.x Custom Error Verification

| Selector | Error | Confirmed |
|----------|-------|-----------|
| `4b637e8f` | `ERC20InvalidSender(address)` | ✅ |
| `ec442f05` | `ERC20InvalidReceiver(address)` | ✅ |
| `391434e3` | `ERC20InsufficientBalance(address,uint256,uint256)` | ✅ |
| `7dc7a0d9` | `ERC20InsufficientAllowance(address,uint256,uint256)` | ✅ |
| `1e4fbdf7` | `OwnableInvalidOwner(address)` | ✅ |
| `118cdaa7` | `OwnableUnauthorizedAccount(address)` | ✅ |
| `e602df05` | `ERC20InvalidApprover(address)` | ✅ |
| `4a1406b1` | `ERC20InvalidSpender(address)` | ✅ |

All 8 OZ 5.x custom errors confirmed. **This is a legitimate OpenZeppelin 5.x based contract.**

---

## Critical Checks Summary

| Check | Result |
|-------|--------|
| `mint()` function (selector `40c10f19`) | ✅ NOT FOUND — safe |
| `mint(address,uint256)` (selector `4e6ec247`) | ✅ NOT FOUND — safe |
| `mint(uint256)` (selector `a0712d68`) | ✅ NOT FOUND — safe |
| MAX_SUPPLY = 100,000,000 × 10^18 | ✅ CONFIRMED in bytecode |
| `selfdestruct` opcode | Manual verification required |
| Fixed supply (no inflation possible) | ✅ CONFIRMED |

---

## Pre-Listing Action Plan

These must be completed before any exchange application:

| # | Action | Resolves | Priority |
|---|--------|----------|----------|
| ① | Transfer ownership to 3-of-5 Gnosis Safe | C-01, H-01, H-02, M-03 | **CRITICAL** |
| ② | Verify source code on BscScan + Sourcify | I-02, L-01 | **HIGH** |
| ③ | Publish full exclusion list publicly | H-01 (partial) | **HIGH** |
| ④ | Announce and execute `removeLimits()` on scheduled date | H-02, M-01, M-02 | **HIGH** |
| ⑤ | Commission full source-code audit (Hacken / CertiK) | All findings | **REQUIRED** |
| ⑥ | Verify `--evm-version paris` for BNB Chain build | I-01 | MEDIUM |
| ⑦ | Rewrite `setExcluded()` to emit event in next version | H-01 | MEDIUM |

---

## Final Verdict

| Metric | Value |
|--------|-------|
| Contract base | OpenZeppelin 5.x — legitimate foundation |
| Supply integrity | Hard cap confirmed, no inflation possible |
| ERC-20 compliance | Full |
| Critical findings | 1 (C-01: pause rug vector) |
| High findings | 2 (H-01, H-02: centralization vectors) |
| Medium findings | 3 |
| Low findings | 3 |
| Informational | 2 |
| **Risk level (current)** | **HIGH** |
| **Risk level (post-mitigations)** | **LOW** |

**Bottom line:** The contract is built on a legitimate OpenZeppelin foundation with a confirmed hard supply cap and full ERC-20 compliance. The findings are not bugs — they are centralization features that are standard in anti-bot launches. However, every one of them becomes a liability if the owner wallet is not transitioned to multisig or renounced before listing. The C-01 finding (unrestricted pause) is the single most important item to resolve. Any exchange compliance team will reject a listing where a single EOA can freeze all user transfers.

---

*This report was produced by bytecode analysis without access to source code. All findings should be re-verified in a full source-level audit before publication.*

*MedByClick Contract Audit Report — June 2026*
