# Finding: Contract Audit Engagement Plan + Tokenomics Currency Review

**Date:** 2026-07-02
**Filed by:** Web3 & Token Strategy
**Type:** Tokenomics/crypto-technical — routed to Vadim (CPWO)
**Related:** `docs/CONTRACT_AUDIT.md` (Part 0 added), `docs/TOKENOMICS.md` (v1.1),
`docs/LEGAL_BRIEF.md`, `docs/reports/legal/2026-07-02-counsel-engagement-readiness.md`

## Summary

Two tasks: (1) advance `docs/CONTRACT_AUDIT.md` from bytecode-only toward a
real source-level audit engagement, with Hacken/CertiK/Trail of Bits as
candidates; (2) review `docs/TOKENOMICS.md` for currency. Findings below.

## 1. Contract audit — engagement plan added

Added **Part 0: Source-Level Audit Engagement Plan** to `docs/CONTRACT_AUDIT.md`,
mirroring the gap-analysis pattern Legal & Compliance already used for the
outside-counsel brief. Headline points:

- The audit can't be engaged yet: no reviewable Solidity source exists (bytecode
  only), the known C-01/H-01/H-02 findings aren't remediated in source, and —
  same blocker as the legal-counsel engagement — **no legal entity exists yet**
  to sign a contract or fund it.
- Recommendation: **Hacken** for the initial Tier-3 listing audit (cost-appropriate,
  already named as acceptable in `docs/TOKENOMICS.md` §11.2), **CertiK** reserved
  for the Tier-2 "secondary audit" `docs/TOKENOMICS.md` §11.3 already requires,
  **Trail of Bits** reserved for the Ethereum bridge (§11.4) where its cost is
  justified by genuinely novel cross-chain logic — not the current standard OZ
  ERC-20 contract.
- Non-binding quotes can be requested now; signing an engagement is blocked on
  the same Joint decision (entity, signatory, funding) already logged for
  outside counsel — recommend the founders resolve both in one sync rather than
  two.

## 2. Tokenomics currency review — findings

### Fixed directly (objective arithmetic errors, within this role's maintenance authority)

- **Private Sale vesting was internally inconsistent with its own cap.**
  §3.7/§4 stated 388,889 MBC/month post-cliff — that figure divides the *total*
  7,000,000 allocation by 18 months, ignoring the 700,000 MBC (10%) already
  released at TGE. Over 18 months that distributes 7,700,002 MBC against a
  7,000,000 MBC cap. Corrected to 350,000 MBC/month (6,300,000 remaining ÷ 18),
  matching the method already used correctly for Public Sale. Fixed in §3.7 and
  §4; the diff is in `docs/TOKENOMICS.md`.

### Flagged, not hand-patched (need a decision or a fuller regen, not a spot-fix)

- **§5 Unlock Calendar still carries the old 388,889 figure** and stops the
  Private Sale column at Month 18 instead of running the full 18 payments
  through Month 20. This table is illustrative (uses "~" throughout, has a gap
  at Month 11) — flagged inline rather than hand-recomputing ~10 cascading
  cumulative cells, which risks introducing a second, harder-to-spot error.
  Recommend regenerating this table programmatically from the corrected
  per-category schedule before it's used in any investor or exchange packet.
- **Platform Rewards has two contradictory schedules for the same pool.** §3.2's
  "Emission Cap Schedule" (556,000/month starting Month 1, no cliff) doesn't
  match §4/§5's vesting schedule (5% TGE, 3-month cliff, 527,778/month starting
  Month 3). Left both in place — need a decision on which is authoritative
  (is §3.2 an unreached ceiling, or is it stale?) rather than guessing.
- **Circulating-supply definition is inconsistent within the document.** §1 and
  §6 count the 7,000,000 LP allocation as part of "TGE Circulating Supply"
  (10,700,000 / 10.7%, ~$535,000 mkt cap). §5's footnote explicitly excludes LP
  from circulating ("locked in the pool, not individual wallets"), which would
  put real TGE circulating at 3,700,000 (3.7%). Both conventions exist in
  crypto reporting (CoinGecko generally counts AMM-pooled tokens as circulating
  since they're publicly tradeable) — recommend standardizing on the §1/§6
  convention (include LP) since it's the one used in the two summary sections
  investors will read first, and fixing §5's footnote to say so explicitly
  rather than contradict it. Not changed yet — flagging for a decision since it
  changes the headline market-cap number.
- **Cross-document mismatch, not this role's file to fix:** `docs/LEGAL_BRIEF.md`
  Part 3 states "TGE market cap ~$462,500." That matches neither $535,000 (LP
  included) nor $185,000 (LP excluded) — it appears to be a stale/miscalculated
  figure independent of which convention is chosen. Routing to Legal &
  Compliance to correct once the circulating-supply convention above is settled
  (fixing it now risks having to redo it).

## 3. MiCA / Legal & Compliance flags

Cross-referencing `docs/LEGAL_BRIEF.md`'s already-open questions against where
they live in `docs/TOKENOMICS.md` — not duplicating the legal analysis, just
confirming scope so nothing gets published ahead of an answer:

- §7 (burn mechanics) and the 20% doctor/clinic distribution on every payment
  burn are exactly what `docs/LEGAL_BRIEF.md` Part 2.3 asks counsel about
  (profit-sharing characterization under MiCA Art 3(1)(9) / Howey prong 4).
  §7.1's line "This is a deflationary rate comparable to established tokens"
  edges toward price-appreciation framing — flag for Legal review before any
  external use, pending counsel's answer.
- "Staking" terminology (§3.9, §7.2, §7.3 — Doctor/Clinic Staking) is the exact
  term `docs/LEGAL_BRIEF.md` Part 2.4 flags as an open question even without
  yield. Not renamed preemptively since counsel hasn't answered — but this doc
  uses the term extensively, so a terminology change from counsel means a
  global pass here, not a one-line fix. Tracking, not acting.
- §3.5/§11 public sale/IDO structure (KYC, geo-restrictions) depends on the
  still-unanswered MiCA White Paper notification question
  (`docs/LEGAL_BRIEF.md` Part 4.2/Part 5). Per this role's Must-Not-Do, none of
  this executes before that answer lands.
- Per `docs/agents/WEB3_TOKEN_STRATEGY.md`, this document (and any whitepaper
  token section built from it) must not be published externally without Legal &
  Compliance MiCA review — which is itself currently blocked upstream by the
  counsel-engagement gap in `docs/reports/legal/2026-07-02-counsel-engagement-readiness.md`.
  No new external publication is being initiated here.

## Next step

Awaiting: (1) Joint decision on audit-firm selection/signatory/funding — can be
bundled with the outside-counsel Joint decision already pending; (2) a call on
the Platform Rewards schedule and circulating-supply-definition questions above
(this role can execute either way once decided); (3) Legal & Compliance to
correct the `docs/LEGAL_BRIEF.md` market-cap figure once (2) is settled.
