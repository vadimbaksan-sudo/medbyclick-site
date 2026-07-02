# Initial Gaps Report — Independent Auditor Baseline

**Date:** 2026-07-02
**Filed by:** Independent Auditor (`docs/agents/INDEPENDENT_AUDITOR.md`)
**Type:** Baseline audit — first report under the two-founder structure
**Routed to:** Both founders simultaneously (Marina, Vadim), per Handoff Rules

## Scope & Method

The two-founder governance structure (`docs/TEAM_STRUCTURE.md`,
`docs/governance/*`) was adopted 2026-07-01, one day before this report.
`TODOS.md` T1–T4 were assigned across roles the same week, with no completed
execution against them until today. This is a baseline read of everything
currently on disk — no prior audit exists to compare against, so this report
also seeds the standing gaps list going forward. Reviewed: all `docs/agents/*`,
`docs/governance/*`, `docs/decision-log/*`, `docs/reports/*`, `TODOS.md`,
`docs/ROADMAP.md`, `docs/TOKENOMICS.md`, `docs/WHITEPAPER.md`,
`docs/CONTRACT_AUDIT.md`, `docs/LEGAL_BRIEF.md` (v1.1, modified today).

No findings in this report have been acknowledged by either founder yet —
KPI tracking (time-to-acknowledgment) starts now.

---

## 1. Structural / Governance Risks

**1.1 No defined cadence for "joint sync."** `docs/governance/ESCALATION_FLOW.md`
Level 2 sends cross-lane items to "a joint sync," and Level 4 says unresolved
items are "revisited at the next joint sync" — but no document specifies how
often that sync happens (daily, weekly, ad hoc). With several Joint decisions
already pending (see §3 below) one day after adoption, an undefined cadence is
a real bottleneck risk, not a theoretical one. Not this role's call to set a
cadence — flagging that it's undecided.

**1.2 Untested escalation path.** The escalation flow (Level 0–4, emergency
bypass, decision-log) has zero track record — `docs/decision-log/` contains
exactly one entry, and it's the decision that created this structure itself.
Nothing has moved through Level 1–4 yet. Worth revisiting this audit in a few
weeks specifically to check whether real findings are actually flowing through
the levels as designed, or getting resolved informally outside the documented
path.

**1.3 Joint-decision items exist without decision-log entries.** Legal &
Compliance's report today (`docs/reports/legal/2026-07-02-counsel-engagement-readiness.md`)
surfaces three Joint decisions blocking outside-counsel engagement (firm
selection, engagement signatory, retainer funding source). Per
`docs/governance/ESCALATION_FLOW.md` ("What Never Gets Silently Dropped"),
cross-lane items should land in `docs/decision-log/` — none exists yet for
these. This may simply mean the founders haven't decided yet (which is fine,
decisions take time), but the process gap is that there's currently no
mechanism catching Joint items *before* they're decided, only after they
deadlock. Recommend whichever founder acts on these three items logs the
outcome per `docs/decision-log/Decision Template.md` once decided, rather than
letting it stay implicit in a report file.

---

## 2. Standing Known Gaps List

Tracking the three gaps named in this role's own file
(`docs/agents/INDEPENDENT_AUDITOR.md`), plus new ones surfaced today.

| Gap | Status | Notes |
|---|---|---|
| Missing `docs/ROADMAP.md` | **CLOSED** | Now exists, owned by CTO/Product, dated 2026-07-02. Extracted from whitepaper §18 + TODOS.md per the gap note in `docs/agents/CTO_PRODUCT.md`. First gap on this list to close. |
| Empty `docs/legal/` | **OPEN** | Still empty. `docs/LEGAL_BRIEF.md` reached v1.1 today (added Part 0: engagement readiness) but no firm has been contacted — see §3. Nothing can land in `docs/legal/` until an opinion comes back, which requires engagement to start first. |
| Bytecode-only contract audit | **OPEN — CRITICAL underlying finding unmitigated** | See §4. `docs/CONTRACT_AUDIT.md` itself already recommends a full source-level audit (Hacken/CertiK/Trail of Bits) and is explicit that it is not a substitute. No named-firm engagement recorded anywhere in the repo. |
| *(new)* Joint sync cadence undefined | **OPEN** | See §1.1. |
| *(new)* Whitepaper §19 Team & Advisors is a placeholder | **OPEN, not yet urgent** | Explicitly marked `[Team section to be completed...]` in `docs/WHITEPAPER.md`. Flagging now while there's runway (TGE not until Q4 2026 per whitepaper §18) rather than at the point it blocks a listing application. |

---

## 3. Legal Engagement Readiness — Time Sensitivity

Per Legal & Compliance's own report today, the brief is substantively ready
but engagement has not started: no firm contacted, no NDA, no signatory, no
funding source. `docs/LEGAL_BRIEF.md` Appendix A targets "Legal entity
incorporated — August 2026," roughly four weeks out, and that target itself
depends on a jurisdiction recommendation from counsel, which depends on
engagement starting first. This isn't a new risk this report is inventing —
Legal & Compliance already flagged it — but it's worth an Auditor-level note
because the runway between "no outreach yet" and "entity incorporated" is
short relative to how many Joint decisions (§1.3) sit between here and there.

---

## 4. Contract Audit — Unmitigated Critical Finding

`docs/CONTRACT_AUDIT.md` (bytecode-only, June 2026) lists one CRITICAL and two
HIGH findings, all explicitly still `UNMITIGATED`:

- **C-01 (Critical):** owner can call `pause()` and freeze all non-owner
  transfers while remaining able to transfer their own tokens — a documented
  rug-pull vector. The audit report's own language: "Any exchange compliance
  team will reject a listing where a single EOA can freeze all user
  transfers." Remediation (Gnosis Safe multisig, timelock, or renouncement) is
  specified in the audit but no action against it is recorded anywhere in the
  repo yet.
- **H-01, H-02 (High):** silent exclusion-list changes and post-deployment
  limit tightening, both centralization vectors compounding C-01.

This predates the current governance structure, so it's not a new problem —
but it is a pre-TGE / pre-listing gate per this role's mandate, and it remains
the single largest concrete risk item in the repo. No urgency change from
today's review; flagging it here so it's on record as of the first audit
rather than assumed-known.

---

## 5. Document Consistency Findings (Whitepaper / Tokenomics / Legal Brief)

Two numeric inconsistencies across documents that are meant to describe the
same figures, surfaced by cross-reading them for this baseline:

**5.1 TGE market cap figure disagrees between documents.**
`docs/TOKENOMICS.md` §1 and `docs/WHITEPAPER.md` §1 both state TGE market cap
as **~$535,000** (10,700,000 MBC circulating × $0.05 — the arithmetic checks
out). `docs/LEGAL_BRIEF.md` Part 3 states **~$462,500** for the same figure.
This is the document going to outside counsel first; an internal arithmetic
mismatch on a headline number, however minor, is worth fixing before it goes
out.

**5.2 Treasury spending allocation breakdown doesn't reconcile between
Whitepaper and Tokenomics.** Both `docs/WHITEPAPER.md` §11.2 and
`docs/TOKENOMICS.md` §9.2 present a 100%-summing breakdown of the same
Treasury annual budget, but the categories and percentages don't match beyond
Founder Compensation (20% in both):

| Category | Whitepaper §11.2 | Tokenomics §9.2 |
|---|---|---|
| Founder Compensation | 20% | 20% |
| Operations / Platform Development | 25% | 25% |
| Ecosystem Grants | 20% | *(not listed)* |
| Liquidity Reserve / Support | 15% | 3% |
| Legal & Regulatory | 12% | 15% |
| Emergency Reserve | 8% | 2% |
| Smart Contract Audits | *(not listed)* | 15% |
| Exchange Listings | *(not listed)* | 10% |
| Marketing & Community | *(not listed)* | 10% |

These read as two independently-drafted breakdowns of the same budget rather
than one source of truth reflected in two places. Both documents require
Joint sign-off to publish (RACI Whitepaper row, Decision Matrix). Flagging
before publication is the cheap time to catch this — not a decision for this
role to resolve, just a discrepancy neither founder may have noticed since
each document is drafted/owned differently (Web3 & Token Strategy owns both,
per `docs/TEAM_STRUCTURE.md`, so this is one role's own two documents
disagreeing with each other, not a cross-lane conflict).

---

## 6. TODOS T1–T4 Execution Status

Contrary to the framing that these are all unstarted: **T2 already has real
output today** — `docs/reports/product/2026-07-02-t2-platform-evaluation-rubric.md`,
a full rubric and ranked shortlist (Healthie/Jane App recommended for Day-25
demos), filed same-day as governance adoption. That report is itself
well-scoped and flags its own open item (Israeli Patient Rights Law — no
vendor addresses it, needs a Legal & Compliance opinion in parallel with
demos, not after).

| TODO | Owner | Deadline | Status as of 2026-07-02 |
|---|---|---|---|
| T1 — Coordinator JD + sourcing | Medical Community | Month 2 (hard) | **Not started.** No file found under `docs/reports/medical/`. This is the tightest real deadline of the four and currently has zero visible progress. |
| T2 — Platform rubric + shortlist | CTO/Product | Day 25 (rubric), Day 30 (decision gate) | **In progress, ahead of schedule.** Rubric + shortlist filed today. Open item: Israeli Patient Rights Law legal opinion still needed before Day-30. |
| T3 — Quality review triage criteria | Medical Community | Within Phase 1 doctor vetting standard | **Not started.** Depends on the doctor vetting standard document, which itself doesn't appear to exist yet in `docs/`. |
| T4 — Paid acquisition channel hypothesis | Growth/Marketing | Before marketing hire begins | **Not started.** No file under `docs/reports/growth/`. Lowest urgency of the four (gated on coordinator being operational per its own "depends on" note), so absence today is less concerning than T1's. |

Flagging T1 specifically: it has the hardest near-term deadline (Month 2) and
the least visible progress. Not raising this as a founder-disagreement or
Joint-decision matter — just visibility, per this role's mandate.

---

## 7. What This Report Is Not

No founder disagreement exists yet to document (Decision Matrix deadlock
process, `docs/governance/FOUNDERS_AGREEMENT.md`). No Level 3 escalation has
been triggered. Nothing here should be read as a recommendation this role has
authority to make binding — items in §1, §3, §5, and §6 are visibility only,
for both founders to acknowledge or act on as they see fit.

---

## Next Review

This report seeds the standing gaps list (§2). Next audit should check: (a)
whether the three Joint legal-engagement decisions (§1.3, §3) moved or are
still sitting; (b) T1 progress specifically, given its deadline; (c) whether
§5's two document discrepancies were corrected before any external audience
sees either document.
