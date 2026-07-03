# Finding: Dual-Chain Token Architecture Decision (BNB Chain + Ethereum)

**Date:** 2026-07-02
**Filed by:** Web3 & Token Strategy
**Type:** Tokenomics/crypto-technical — routed to Vadim (CPWO)
**Related:** `docs/WHITEPAPER.md` §5.3, §11.4/Phase 5; `docs/TOKENOMICS.md` v1.1;
`docs/CONTRACT_AUDIT.md`; PR #2 (`MBC ERC-20 smart contract + Hardhat deploy
(Sepolia testnet)`); PR #3 (`MBC Token Whitepaper + обновление токеномики`)

## Summary

Vadim wants ERC-20 (Ethereum) for large-value transfers and BEP-20 (BNB Chain)
for everyday small payments — both live now, not "Ethereum later." This is
already the plan on paper: `docs/WHITEPAPER.md` §5.3 picks BNB Chain as the
native/canonical chain specifically because patients can't absorb $5–50
Ethereum gas on small consultation payments, and §11.4 ("Phase 5: Ethereum
Bridge + Uniswap") already commits to a LayerZero-powered bridge with a
10%-of-supply cap. The problem is not the plan — it's that **PR #2's actual
Solidity contract does not implement it.** It independently mints the full
100,000,000 MBC supply in its constructor on Ethereum, with zero relationship
to any BNB Chain contract. If a BNB Chain deployment (the direction PR #3
points toward) also independently mints 100,000,000, the project ends up
with 200,000,000 MBC across two unlinked contracts sharing one name — a
direct contradiction of the "100,000,000 fixed supply, no mint" claim already
published in `docs/TOKENOMICS.md` and (ironically) in PR #2's own new
whitepaper draft, which states in its own executive summary: *"No additional
tokens will ever be minted."*

**Decision: adopt a single-canonical-mint, lock-and-mint bridge architecture.
BNB Chain mints the fixed 100M supply once, at genesis. Ethereum never
independently mints — its balance is always 100% backed by MBC locked on BNB
Chain, moved via a LayerZero OFT Adapter.** This is not a new design — it is
already drafted, section-for-section, in PR #2's own bundled whitepaper
(`docs/MBC_Whitepaper.md` §16 "Bridge Strategy") and matches
`docs/WHITEPAPER.md` §11.4 almost exactly. The only thing missing is a contract
that actually implements it instead of contradicting it.

---

## 1. Architecture Decision

### 1.1 Canonical chain: BNB Chain (BEP-20)

BNB Chain mints the entire fixed supply of 100,000,000 MBC exactly once, in
the constructor, to a 3-of-5 Gnosis Safe (per `docs/CONTRACT_AUDIT.md` Pre-Listing
Action Plan item ①) — not an EOA. No function in the BNB Chain contract can
mint again, ever. This is what `docs/TOKENOMICS.md` §1 already states
("Blockchain: BNB Chain (native)... Mint Function: NONE — Permanently disabled")
and what `docs/WHITEPAPER.md` §5.3 already justifies on gas-cost grounds for
patient/doctor payments. Nothing here changes existing tokenomics or
whitepaper commitments — it reaffirms them as the anchor.

### 1.2 Ethereum side: LayerZero OFT Adapter (lock-and-mint), not an independent mint

For large-value transfers on Ethereum, the correct mechanism is **not** a
second contract that mints its own 100M. It is a **LayerZero OFT ("Omnichain
Fungible Token") Adapter pair**:

- An **OFT Adapter contract deployed on BNB Chain** wraps the existing,
  already-canonical BEP-20 MBC token. Users who want to move MBC to Ethereum
  send it to this adapter, which **locks** it (does not burn it — the BNB
  Chain token is not upgradable/burnable for this purpose, so lock, not
  burn, is correct here) and emits a LayerZero message.
- A **native OFT contract deployed on Ethereum** receives that LayerZero
  message and **mints** the equivalent amount — but *only* in response to a
  verified lock message from the BNB Chain adapter. It has no other mint
  path. No constructor mint. No owner-callable mint.
- To move back: burn on Ethereum → LayerZero message → unlock the same
  amount on the BNB Chain adapter.
- Net effect: at any moment, `BNB-circulating + BNB-locked-in-adapter +
  Ethereum-outstanding = 100,000,000`, always. Total supply never exceeds
  100M no matter how many times tokens cross the bridge.

This is exactly the "lock-and-mint" model already written into PR #2's own
`docs/MBC_Whitepaper.md` §16.1 ("User locks MBC in bridge contract on BNB
Chain → bridge relayer verifies lock transaction → equivalent MBC is minted
on Ethereum bridge contract") and is consistent with the LayerZero-powered
bridge already named in `docs/WHITEPAPER.md` §5.3 and §11.4. LayerZero's OFT
Adapter is the standard, audited reference pattern for exactly this
"wrap an existing non-upgradable token for omnichain use" case — recommending
it is not introducing a new primitive, it's implementing what's already
promised with the standard tool built for the job.

**Why lock-and-mint (OFT Adapter) and not a from-scratch bespoke bridge:**
`docs/CONTRACT_AUDIT.md` §0.3 already earmarks Trail of Bits — the most
expensive, most rigorous of the three candidate audit firms — specifically
for "the Ethereum bridge audit (LayerZero integration)... genuinely novel
cross-chain logic." Using LayerZero's own reference OFT Adapter
implementation instead of custom relayer logic minimizes that novel surface
area and gives the eventual ToB audit something well-precedented to review,
not a bespoke bridge invented from zero.

### 1.3 Supply invariant (the one rule that must never be violated)

> **At all times: BNB Chain circulating + BNB Chain locked-in-bridge +
> Ethereum outstanding = 100,000,000 MBC, exactly. No contract other than
> the BNB Chain genesis mint may ever call an internal mint that increases
> this total.**

Everything else in this decision — which contract goes where, what the
constructor does and doesn't do — is downstream of protecting this one
invariant. `docs/WHITEPAPER.md` §11.4 and §14.3 already state a 10%-of-supply
(10,000,000 MBC) cap on how much can be bridged to Ethereum at once — that
cap should be enforced in the Ethereum-side OFT contract as a hard `require`,
not left as a documentation-only claim.

---

## 2. Verdict on PR #2 — HOLD, merge-with-required-changes

**Do not merge PR #2 as-is.** Its Sepolia testnet deployment
(`0xaF95f1fe5f40Af4298cd9e116b3Eb479374c7D10`) can remain in place as a
throwaway test artifact — it's Sepolia, no real value is at risk, and it's
useful as a integration-test target for OFT Adapter work. But it must never
become, and must not be described anywhere as, the production Ethereum-side
contract, and it must never be redeployed to Ethereum mainnet in its current
form.

**Why:** `contracts/src/MBCToken.sol` in this PR is a standalone
OpenZeppelin `ERC20 + ERC20Burnable + Ownable` contract whose constructor is:

```solidity
constructor(address initialOwner)
    ERC20("MedByClick Token", "MBC")
    Ownable(initialOwner)
{
    isExempt[initialOwner] = true;
    _mint(initialOwner, TOTAL_SUPPLY);   // TOTAL_SUPPLY = 100,000,000 * 1e18
}
```

This mints the **entire** 100M supply, unconditionally, on Ethereum, with no
reference to any BNB Chain state. It is a second, independent genesis mint —
not a bridge. Notably, **this contradicts PR #2's own bundled documents**:
its `docs/MBC_Whitepaper.md` §16 "Bridge Strategy" explicitly describes
lock-and-mint (BNB Chain locks, Ethereum mints only the equivalent amount),
and its executive summary states "No additional tokens will ever be minted."
The contract and the whitepaper submitted in the same PR describe two
different, incompatible systems. This is a strong signal the contract was
generated as a generic "ERC-20 token" template and never actually reconciled
against the bridge design described in the accompanying docs.

**Required changes before any merge:**

1. `contracts/src/MBCToken.sol`'s constructor must not independently mint
   100M on Ethereum. Restructure the PR into two separate contracts (see
   §3 below): a BNB Chain canonical token (which can reuse most of this
   PR's anti-whale logic — `maxTxAmount`, `maxWalletAmount`, `txCooldown` are
   reasonable and already partially remediate `docs/CONTRACT_AUDIT.md`
   concerns) retargeted to BNB Chain, and a genuinely bridge-controlled OFT
   Adapter contract for Ethereum that has no standalone mint path.
2. Do not merge PR #2's bundled `docs/MBC_Whitepaper.md`,
   `docs/MBC_Tokenomics_Model.md`, or `docs/MBC_Audit_Report.md` as
   competing, parallel documents alongside the already-existing
   `docs/WHITEPAPER.md`, `docs/TOKENOMICS.md`, and `docs/CONTRACT_AUDIT.md`
   (which this role owns and which are already mid-revision — see
   `docs/reports/web3/2026-07-02-tokenomics-audit-review.md`). Two
   whitepapers with different filenames and different numbers in the repo
   at once is its own trust/audit problem, independent of the chain issue.
   Any content worth keeping (§16 Bridge Strategy is genuinely good and
   should inform the canonical whitepaper) should be proposed as a diff to
   the existing owned files, through this role, with Legal & Compliance
   review — not merged wholesale from an AI agent's PR.
3. Recommend splitting this PR: a narrow "Developer" PR for the
   Hardhat/contract tooling and a corrected contract, separate from any
   documentation changes (which route through Web3 & Token Strategy per
   `docs/agents/WEB3_TOKEN_STRATEGY.md`'s Must-Not-Do / Handoff Rules).
4. Independent of the chain question: the contract's pause/exclusion/limit
   pattern mirrors the C-01/H-01/H-02 findings already logged in
   `docs/CONTRACT_AUDIT.md` (owner-exempt pause, un-eventful exclusion
   changes, tightenable limits). Whatever contract ends up as the BNB Chain
   canonical token should incorporate those remediations, not repeat them
   on a second chain.

PR #2 is technically mergeable per GitHub (`mergeStateStatus: CLEAN`) — the
hold is a design/content decision, not a git-conflict issue.

---

## 3. Verdict on PR #3 — HOLD, needs conflict resolution + must not silently redefine tokenomics

**Do not merge PR #3 as-is.** Two independent problems:

**(a) Real git conflict.** `gh pr view 3` reports
`mergeStateStatus: DIRTY`, `mergeable: CONFLICTING`. Someone edited
`modules/medtoken/data.ts` / `app/medtoken/page.tsx` directly on `main`
after this PR branched. This needs manual resolution regardless of the
architecture question below — flagging to Developer as a blocking
prerequisite, not something this role resolves (this role doesn't write
code).

**(b) Distribution-table proliferation.** PR #3 proposes replacing the
token page's distribution with a **new** 7-category split (Founder Locked
25% / Ecosystem Rewards 25% / Treasury 15% / Founder Innovation Fund 10% /
Liquidity 10% / Strategic Partners 10% / Community 5%). Investigating the
repo turned up that this would be the **third** distinct distribution table
in the codebase, not a clean replacement of one:

| Source | Distribution |
|---|---|
| `docs/TOKENOMICS.md` (canonical, currency-reviewed 2026-07-02) | Treasury 25 / Rewards 20 / Founders 15 / Partners 8 / Public 8 / Liquidity 7 / Private 7 / Reserve 6 / Advisors 4 |
| `modules/medtoken/data.ts` on `main` **today**, pre-PR #3 | Platform Rewards 35 / Ecosystem Fund 25 / Team & Advisors 15 / Public Sale 15 / Liquidity Reserve 10 |
| PR #3's proposed replacement | Founder Locked 25 / Ecosystem Rewards 25 / Treasury 15 / Founder Innovation Fund 10 / Liquidity 10 / Strategic Partners 10 / Community 5 |

None of these three match. The app's live page has apparently been drifting
from the canonical tokenomics doc for a while already (it also currently
shows `network: "Ethereum"`, `standard: "ERC-20"` — stale even before this
PR). Tokenomics parameters (supply, allocation %, vesting curves) are
explicitly CPWO-only / this role's owned deliverable per
`docs/governance/DECISION_MATRIX.md` and `docs/agents/WEB3_TOKEN_STRATEGY.md`
— they should not be redefined by whatever an AI coding agent's PR happens
to propose, even one requested by Vadim, without this role reconciling it
against the already-published, already-audited numbers in
`docs/TOKENOMICS.md`.

**Required changes before merge:**

1. Resolve the git conflict against current `main`.
2. Do **not** adopt PR #3's new percentages. Instead, align
   `modules/medtoken/data.ts`'s `tokenomics` array to the canonical
   9-category table in `docs/TOKENOMICS.md` §2 (Treasury 25 / Rewards 20 /
   Founders 15 / Partners 8 / Public 8 / Liquidity 7 / Private 7 / Reserve 6
   / Advisors 4) — the one that has actually been through this role's
   currency review — not a fourth improvised split.
3. **Do keep** the `network`/`standard` field change from `"Ethereum"` /
   `"ERC-20"` to `"BSC"` / `"BEP-20"`. That part is directionally correct
   and fixes a real, pre-existing bug: the live app page was already wrong
   relative to `docs/WHITEPAPER.md` §5.3 and `docs/TOKENOMICS.md` §1, both
   of which have said BNB Chain/BEP-20 all along. This is the one part of
   PR #3 that should survive largely intact.
4. Do not merge PR #3's new `docs/MBC_WHITEPAPER.md` as a second,
   independent whitepaper file alongside `docs/WHITEPAPER.md` — same
   objection as PR #2 §16 above, worse here because PR #2 and PR #3 each
   introduce a *different* new whitepaper file (different filenames,
   different casing, different content), meaning three semi-authoritative
   whitepapers would exist in-repo if both merged as-is.

---

## 4. Technical Requirements — Handoff to Developer / Devin

This is a specification, not code. Per this role's Must-Not-Do, no Solidity
or application code is written here.

### 4.1 Contract A — `MBCToken.sol` (BNB Chain, canonical)

- Network: **BNB Chain (BSC) only.** Never deployed to Ethereum.
- Base: OpenZeppelin `ERC20 + ERC20Burnable + Ownable` (5.x) — the base PR #2
  already used is fine; keep it, retarget the deploy network.
- Constructor: mints `100_000_000 * 10**18` **exactly once**, to a 3-of-5
  Gnosis Safe address passed as a constructor argument (not an EOA — see
  `docs/CONTRACT_AUDIT.md` Pre-Listing Action Plan item ①). No other function
  in this contract may ever call `_mint`.
- Keep the anti-whale mechanics from PR #2 (`maxTxAmount`, `maxWalletAmount`,
  `txCooldown`, exclusion list) but remediate the findings already logged in
  `docs/CONTRACT_AUDIT.md`:
  - C-01: owner must not be able to bypass its own `pause()` — either remove
    pause entirely or gate it behind the multisig with a timelock.
  - H-01: `setExempt`/`setExcluded` must emit an event.
  - H-02: `setLimits()` changes should be timelocked or one-directional
    (can only loosen, never tighten, after initial setup).
- No relationship to Ethereum in this contract at all — it doesn't know the
  bridge exists. The bridge is a separate consumer contract (4.3).

### 4.2 Contract B — Ethereum-side OFT (LayerZero), not a standalone token

- Network: **Ethereum — testnet (Sepolia) only for now.** No Ethereum
  mainnet deployment until the `docs/WHITEPAPER.md` §11.4 Phase 5 gate
  (Month 18–24, sufficient market cap/institutional demand) is actually
  reached — this is an existing whitepaper commitment, not a new
  constraint invented here.
- Implementation: LayerZero's standard **OFT (Omnichain Fungible Token)**
  pattern, specifically the **OFT Adapter** variant (for wrapping an
  existing, already-deployed, non-upgradable token — which is what
  Contract A is).
- Constructor / initialization: **must not mint any supply.** All Ethereum-
  side balance originates exclusively from verified LayerZero messages sent
  by the BNB Chain OFT Adapter (4.3) in response to a real lock event.
- Enforce the whitepaper's existing 10,000,000 MBC (10% of supply)
  bridge cap (`docs/WHITEPAPER.md` §11.4, §14.3) as an on-chain `require` on
  cumulative outstanding bridged supply — not just a documentation claim.
- The existing Sepolia deployment from PR #2 may be reused/redeployed as
  the *test* target for this contract's development — it should not be
  treated as already correct, since it currently has none of this logic.

### 4.3 Contract C — BNB Chain OFT Adapter (the lock side)

- Network: **BNB Chain**, alongside Contract A.
- Wraps Contract A. Receiving MBC from a user **locks** it (transfers to
  the adapter contract, does not burn) and sends a LayerZero message to
  Contract B authorizing an equivalent mint on Ethereum.
- On the return path (burn message received from Ethereum via LayerZero),
  releases (unlocks) the equivalent amount back to the user on BNB Chain.
- This is the contract that owns the supply invariant in §1.3 — its locked
  balance must always equal Contract B's outstanding minted supply.

### 4.4 Testing requirements to hand to Developer

- Supply invariant test: for any sequence of lock/mint/burn/unlock
  operations, `BNB circulating + BNB locked + Ethereum outstanding` must
  equal 100,000,000 at every step.
- Bridge cap enforcement test: attempting to lock/mint beyond 10,000,000
  MBC outstanding on Ethereum must revert.
- Round-trip test: lock on BNB → mint on Ethereum → burn on Ethereum →
  unlock on BNB returns to the exact starting state.
- Regression tests for the C-01/H-01/H-02 remediations on Contract A.

### 4.5 Explicitly out of scope for Developer/Devin on this task

- No changes to `docs/WHITEPAPER.md`, `docs/TOKENOMICS.md`, or
  `docs/CONTRACT_AUDIT.md` — those stay with Web3 & Token Strategy.
- No new competing whitepaper/tokenomics markdown files anywhere in `docs/`.
- No mainnet Ethereum deployment.

---

## 5. Required Next Step — Legal & Compliance Review (not skipped, flagged)

Per `docs/agents/WEB3_TOKEN_STRATEGY.md` Must-Not-Do, this role cannot
publish tokenomics or whitepaper token-section changes without Legal &
Compliance MiCA review. This report is a technical/architecture
recommendation only — it does **not** itself update `docs/TOKENOMICS.md` or
`docs/WHITEPAPER.md`. Before any of the following become public-facing:

- Formalizing the dual-chain / bridge-cap language as an update to
  `docs/WHITEPAPER.md` §5.3/§11.4 (mostly confirms existing text, but the
  explicit supply-invariant framing is new and should be reviewed).
- Reconciling `modules/medtoken/data.ts` to the canonical
  `docs/TOKENOMICS.md` distribution (§3 above).

...these should route through the same Legal & Compliance MiCA review
already pending per `docs/reports/web3/2026-07-02-tokenomics-audit-review.md`
and `docs/reports/legal/2026-07-02-counsel-engagement-readiness.md` — this
finding adds to that queue, it doesn't jump it.

## Next step

Awaiting: (1) Vadim's go/no-go on the architecture decision in §1; (2) if
approved, this role hands §4's technical requirements to Developer as a
formal spec; (3) PR #2 and PR #3 authors (or whoever manages the Devin
sessions) are informed of the required changes in §2/§3 rather than merging
either as-is; (4) Legal & Compliance review per §5 before any resulting
whitepaper/tokenomics text is published externally.
