# Finding: MiCA Token Classification Review — MBC

**Date:** 2026-07-03
**Filed by:** Legal & Compliance
**Type:** Crypto/corporate-regulatory — routed to **Vadim (CPWO)**, cc Web3 & Token Strategy
**Related:** `docs/TOKENOMICS.md` v1.1; `docs/WHITEPAPER.md` §5, §12, §16; `docs/CONTRACT_AUDIT.md`;
`docs/LEGAL_BRIEF.md` Part 2.3, Part 2.4, Part 5; `docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md`;
`docs/reports/web3/2026-07-02-tokenomics-audit-review.md`; `docs/reports/legal/2026-07-02-counsel-engagement-readiness.md`

## Summary

MBC is most likely a MiCA **"other crypto-asset"** (Title II — neither an
asset-referenced token nor an e-money token), and the project's own claim to
qualify for the *narrower* Article 3(1)(9) "utility token" sub-definition is
weaker than `docs/WHITEPAPER.md` §16.1 currently states, because MBC is
tradeable on PancakeSwap V3 from Day 1 — a plain reading of "only accepted by
the issuer" is in tension with that. This does not push MBC into
asset-referenced-token or e-money-token territory. It does mean the project
should plan for full Title II white paper/notification treatment rather than
assume an exemption. **The current distribution percentages themselves
(Treasury 25/Rewards 20/Founders 15/Partners 8/Public 8/Liquidity 7/Private
7/Reserve 6/Advisors 4) are not, in isolation, a MiCA problem** — MiCA
regulates issuer conduct and disclosure, not allocation math. But the
tokenomics and whitepaper documents **cannot be finalized/published as-is**:
there are five concrete, fixable gaps below, none of which require waiting on
outside counsel to identify (though counsel should confirm before any binding
public claim). This finding raises the urgency of the outside-counsel
engagement already logged as pending in
`docs/reports/legal/2026-07-02-counsel-engagement-readiness.md`.

---

## 1. Asset Classification Under MiCA

MiCA (EU 2023/1114) sorts crypto-assets into three buckets: **asset-referenced
tokens (ART)**, **e-money tokens (EMT)**, and everything else, which Title II
regulates more lightly (white paper + notification, not authorization as an
ART/EMT issuer). Within "everything else," Article 3(1)(9) carves out a
narrower **utility token** definition that gets somewhat lighter white-paper
content treatment under Article 4(3).

**Not an ART:** MBC does not reference or peg its value to any other asset,
basket of assets, or right (`docs/TOKENOMICS.md` §1 — fixed 100,000,000 supply,
no peg mechanism; `docs/WHITEPAPER.md` §5.2 — "not a claim on company revenue,
profits, or equity"). No ART factors present.

**Not an EMT:** MBC is not denominated in, or pegged to, a single fiat
currency, and does not function as an electronic substitute for cash
(`docs/WHITEPAPER.md` §5.2 explicitly disclaims yield-bearing / stable-value
characteristics; TOKENOMICS.md's TGE price of $0.05 is a market price, not a
peg). No EMT factors present.

**Utility-token sub-definition — claimed, but weaker than stated.**
`docs/WHITEPAPER.md` §16.1 and `docs/LEGAL_BRIEF.md` Part 5 both assert MBC
satisfies Art. 3(1)(9): "a crypto-asset that is only intended to provide
access to a good or service... and is only accepted by the issuer." Supporting
facts are real and specific:

- 15% payment discount, Priority Access Passes, Doctor Verification Staking,
  Clinic Featured Placement, Referral Rewards, Medical Travel Escrow — all
  genuine platform-access mechanics (`docs/WHITEPAPER.md` §6, USE CASES 1–6).
- No dividends, no profit distribution, no claim on company assets
  (`docs/WHITEPAPER.md` §5.2; `docs/TOKENOMICS.md` top disclaimer).
- No price guarantee, no buyback obligation (`docs/WHITEPAPER.md` §16.2).
- Fixed supply, no mint function (`docs/TOKENOMICS.md` §1; `docs/CONTRACT_AUDIT.md`
  "Critical Checks Summary" — mint selectors confirmed absent in bytecode).
- Governance is either absent or explicitly non-financial at every phase
  (`docs/WHITEPAPER.md` §12.1–§12.3 — see §2 below).

But the "only accepted by the issuer" prong is squarely undercut by the
project's own liquidity plan: `docs/TOKENOMICS.md` §10.1/§11.1 and
`docs/WHITEPAPER.md` §13 commit to a $350,000 PancakeSwap V3 liquidity
position live and locked **at TGE**, meaning MBC is freely tradeable against
USDT on a permissionless DEX from the moment of launch — not only redeemable
with the issuer for platform services. `docs/LEGAL_BRIEF.md` Part 5 already
flags this exact tension as an open question for counsel ("Does secondary
market tradability at TGE negate the utility token exemption under MiCA?")
and it has not been answered.

**My assessment:** treat MBC as a MiCA **"other crypto-asset" (Title II,
non-ART/non-EMT)** without assuming the narrower Art. 3(1)(9)/Art. 4(3)
exemption applies. This is not a reclassification into a heavier category —
Title II is still the lightest MiCA regime available, well short of ART/EMT
authorization — it just means the project should plan for the **full**
Art. 6 white paper content and Art. 4 notification-before-public-offer
obligations (subject to the small-offer exemptions discussed in §3), rather
than the lighter treatment `docs/WHITEPAPER.md` §16.1 currently assumes.
Outside counsel should confirm this reading before it is treated as final.

---

## 2. What Could Push MBC Toward Security/Financial-Instrument Risk

MiCA itself does not have a "security token" category — instead, Article 2(4)
excludes crypto-assets that already qualify as MiFID II **financial
instruments** from MiCA's scope entirely, pushing them into the heavier
Prospectus Regulation / MiFID II regime under national law. That is the real
risk to watch for, not reclassification as ART/EMT.

| Factor | Direction | Basis |
|---|---|---|
| Burn (40%) + Treasury (40%) + doctor/clinic distribution (20%) on every payment | **Risk** | `docs/TOKENOMICS.md` §8.1. Already flagged by both `docs/LEGAL_BRIEF.md` Part 2.3 and the Web3 tokenomics audit review as a possible profit-sharing/Howey-prong-4 characterization if doctors who receive distributions are also MBC holders/speculators. Unresolved. |
| §7.1 marketing language: "This is a deflationary rate comparable to established tokens" | **Risk — internal inconsistency** | `docs/TOKENOMICS.md` §7.1 uses framing that `docs/WHITEPAPER.md` §16.3 explicitly lists as **prohibited**: "❌ Token burns will increase your MBC value." One owned document currently contradicts the other's own compliance rule. This should be corrected before external publication regardless of counsel's answer on the underlying burn-mechanic question. |
| No dividends, no revenue share, no yield, explicitly disclaimed repeatedly | **Mitigant** | `docs/WHITEPAPER.md` §5.2; `docs/TOKENOMICS.md` top disclaimer; USE CASE 2 "No yield is paid on this stake." |
| Governance | **Mitigant** | `docs/WHITEPAPER.md` §12.1–§12.3: Phase 0 (TGE→Month 18) fully centralized, zero token-holder governance rights; Phase 1 advisory-only, non-binding; Phase 2 limited to ecosystem grants. Financial governance (pricing, revenue distribution, team compensation, supply changes) is **permanently excluded from any governance phase** (§12.3). This is a genuinely well-built feature — it removes the equity-like-control characterization risk almost entirely, as long as it's implemented as written. |
| Fixed supply / no mint | **Mitigant, conditional** | `docs/CONTRACT_AUDIT.md` confirms no mint function in the audited bytecode. **But** the dual-chain bridge is not yet built to spec: `docs/reports/web3/2026-07-02-dual-chain-token-architecture-decision.md` documents that PR #2's actual Ethereum contract independently mints a *second* 100,000,000 MBC, which — if ever deployed — would falsify the "100,000,000 hard cap, no mint" claim already published in `docs/TOKENOMICS.md` §1 and would be a serious Art. 6 white-paper misrepresentation (Art. 15 MiCA gives purchasers a claim against issuers for misleading white papers). That PR is correctly on hold. **Do not publish any cross-chain supply claim until Contracts A/B/C are actually built and verified per that decision's spec** — right now the corrected architecture is a decision, not code. |
| "Staking" terminology (Doctor/Clinic staking) | **Open, not blocking alone** | Substance is a refundable access deposit with no APY (`docs/WHITEPAPER.md` USE CASE 2), which supports non-security characterization on the merits. The word "stake" itself is still flagged as unresolved in `docs/LEGAL_BRIEF.md` Part 2.4. Recommend counsel confirm terminology before public IDO, but this alone doesn't block the current documents. |
| "Community Sale" vs. "Community Airdrop" framing | **Not applicable** | Checked — no such distinction or airdrop-labeled-as-sale pattern exists anywhere in `docs/TOKENOMICS.md` or `docs/WHITEPAPER.md`. All allocations (Private Sale, Public Sale/IDO, Platform Rewards) are consistently and correctly disclosed as consideration-for-tokens or earned-rewards, not mislabeled gifts. No finding here. |
| Founder Treasury salary funded from sale proceeds | **Open, cross-cutting** | `docs/TOKENOMICS.md` §9.3 / `docs/LEGAL_BRIEF.md` Part 3: founders are paid fiat salary from Treasury, which is itself funded partly by private/public sale proceeds. Less relevant to MiCA classification directly (MiCA doesn't run a Howey-style test), but directly relevant to the Art. 2(4) financial-instrument carve-out question under national law. Recommend counsel confirmation — already an open item in the Legal Brief, not new. |

---

## 3. Direct Answer to the Blocking Question

**Can `docs/TOKENOMICS.md`'s current distribution percentages and the
dual-chain BNB Chain / Ethereum bridge architecture (per the 2026-07-02 Web3
decision) be published/finalized as-is from a MiCA standpoint?**

**The percentages and vesting curves themselves: yes, no MiCA objection.**
Allocation splits, cliffs, and vesting schedules are a business/tokenomics
design choice — MiCA doesn't regulate what percentage goes to founders vs.
treasury vs. rewards. Nothing in the classification analysis above turns on
the specific 25/20/15/8/8/7/7/6/4 split.

**The documents as a whole: not yet.** Five concrete items must be resolved
first — none require outside counsel to identify, though counsel should
confirm items 2 and 4 before any binding public claim:

| # | Gap | What's required | Owner |
|---|-----|------------------|-------|
| 1 | Internal arithmetic inconsistencies already flagged by Web3 (Platform Rewards dual schedule, stale §5 Unlock Calendar, circulating-supply definition, `docs/LEGAL_BRIEF.md` market-cap mismatch) | Reconcile before external use — a white paper with internally contradictory numbers is an Art. 6 accuracy problem independent of classification | Web3 & Token Strategy (already logged in `docs/reports/web3/2026-07-02-tokenomics-audit-review.md`) |
| 2 | `docs/WHITEPAPER.md` §16.1 overclaims the narrow Art. 3(1)(9)/Art. 4(3) exemption given DEX tradability at TGE | Reframe as "other crypto-asset" under Title II; do not assert the lighter exemption as settled | Web3 & Token Strategy to edit; counsel to confirm |
| 3 | No decision on EU-retail inclusion for the public IDO. Current geo-exclusions cover US, UK, sanctioned jurisdictions only — **not** the EU (`docs/LEGAL_BRIEF.md` §4.2; `docs/TOKENOMICS.md` §3.5). If EU retail is included, Title II requires white paper notification to a competent national authority ≥20 working days before the public offer | Either geoblock EU retail (simplest) or commit to a notification timeline with a named NCA | **Joint** — this is a go/no-go input to TGE/IDO timing, catch-all "creates company-wide legal/financial liability" per Decision Matrix |
| 4 | `docs/TOKENOMICS.md` §7.1's "deflationary rate comparable to established tokens" contradicts `docs/WHITEPAPER.md` §16.3's own prohibited-language list | Remove/soften before publication | Web3 & Token Strategy |
| 5 | Dual-chain bridge is a decision, not yet code — the only contract that exists (PR #2) is held specifically because it would double the supply | Do not publish any "100M fixed cap across both chains" claim until Contracts A/B/C from the 2026-07-02 decision are built and verified | Developer, per Web3 & Token Strategy's spec |

None of these require re-deriving the token's classification from scratch —
they're fixes to specific, identified passages. Once resolved, my preliminary
read is that the documents would be in a defensible position to publish as a
Title II "other crypto-asset" white paper — subject to outside counsel's
formal opinion, which per this role's Must-Not-Do I cannot substitute for.
`docs/LEGAL_BRIEF.md` itself confirms no counsel is engaged yet — this
finding is a first-pass technical/regulatory read, not a sign-off.

---

## 4. Effect on Outside-Counsel Engagement Urgency

**Yes, this raises the priority.** `docs/reports/legal/2026-07-02-counsel-engagement-readiness.md`
treated the counsel-engagement gap as a process issue "not blocking TGE,
listing, or a whitepaper publish on its own." This review changes that:
item 3 above (EU-retail/notification decision) is a real gate on the Public
Sale/IDO milestone already dated November 2026 in `docs/WHITEPAPER.md` §18
Roadmap, and item 2 (overclaimed exemption) sits directly in the whitepaper
section that will face the most external scrutiny (exchange compliance
teams, CoinGecko/CMC listing review, any EU competent authority). Per this
role's Escalation Rules — "Any finding that could block TGE, listing, or a
whitepaper publish escalates immediately" — this finding is escalating now,
not waiting for a scheduled sync. Recommend the founders treat the three
Joint items already blocking outside-counsel engagement (firm selection,
signatory, funding — `docs/reports/legal/2026-07-02-counsel-engagement-readiness.md`)
as more time-sensitive than previously logged, specifically because item 3
above cannot get a final, binding answer without counsel, and the IDO
roadmap date is now five months out.

---

## Decisions Required (routing per `docs/governance/DECISION_MATRIX.md`)

- **Joint:** EU-retail inclusion/exclusion decision for the public IDO (item 3, §3 above) — creates company-wide legal liability if wrong, catch-all Joint category.
- **CPWO-only, executed by Web3 & Token Strategy:** whitepaper §16.1 reframing, §7.1 language fix, tokenomics arithmetic reconciliation (items 1, 2, 4) — these are tokenomics/whitepaper content edits, this role only recommends, does not write them (Must-Not-Do: "must not write code, content, or tokenomics").
- **Developer, spec'd by Web3 & Token Strategy:** build Contracts A/B/C per the dual-chain decision before any cross-chain supply claim is published (item 5).

## Escalation Status

Escalating now per the rule above, not waiting for scheduled sync. Routed to
Vadim (CPWO) as the primary crypto/corporate-regulatory finding, cc Web3 &
Token Strategy for items 1, 2, 4, 5, and cc as informational to Marina since
Joint decisions (item 3) require both founders per the Decision Matrix.

## Next Step

Awaiting: (1) Joint decision on EU-retail inclusion for the public sale;
(2) Web3 & Token Strategy to apply the two document-language fixes (items 2,
4) and reconcile the arithmetic already flagged in their own audit review
(item 1); (3) Developer to build the corrected dual-chain contracts before
any cross-chain supply claim is published (item 5); (4) founders to revisit
outside-counsel engagement sequencing given the raised urgency in §4 above.
This role will re-review once items 1–2, 4 land in `docs/TOKENOMICS.md` /
`docs/WHITEPAPER.md`.
