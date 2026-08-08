**Decision ID:** 0008
**Date:** 2026-08-07
**Title:** Add MedAgent & MedLogistics as frontend scaffolds; flag MedToken phasing divergence between TOKENOMICS.md and the new 15-module spec
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only for the two scaffold builds (technical roadmap/module addition, per
`docs/agents/CTO_PRODUCT.md` Decision Authority). The MedToken phasing question
itself is explicitly **not decided here** — per `docs/governance/DECISION_MATRIX.md`,
tokenomics parameters are CPWO-only but a change to the *launch structure*
(real token vs. points-first) that potentially reduces regulatory risk touches
Legal & Compliance's lane too; flagged as Joint, not resolved.
**Status:** Decided (scaffolds) / Open (token-phasing reconciliation)

## Context

Vadim supplied a new, complete investor-facing document — "MedByClick
Detailed Platform & Feature Specification, All 15 Modules" — with full
feature-level specs for every module, organized into four clusters. Analysis
against the current codebase found:

1. **MedAgent and MedLogistics have zero code** in this repo. Unlike MedGive
   (decision 0005), which extended an already-registered module concept,
   these two are genuinely new — never scaffolded, never added to
   `modules/registry.ts`.
2. **MedEdu, MedEvents, MedCommunity, MedPayments, MedToken already exist**
   in code, but the new document describes each in far more depth than the
   current MVP implementation (CME certification infrastructure, fellowship
   marketplaces, escrow-based milestone payments, etc.). That gap is
   expected — this is an investor-grade spec, not a sprint backlog — and is
   not addressed in this entry; it's a much larger body of work than a
   single session should attempt at once.
3. **MedToken/MedEconomy's description in the new document materially
   diverges from `docs/TOKENOMICS.md` and the whitepaper.** The new
   document recommends launching as a non-transferable, centrally-
   administered points ledger — explicitly *not* a blockchain token — with
   a three-phase path to any future tokenization, each phase gated on
   securities counsel sign-off. `TOKENOMICS.md` v1.2 describes a real
   BEP-20 contract on BNB Chain, 100,000,000 hard-capped supply, a priced
   TGE, and a CEX listing target. These are not compatible as simultaneous
   plans for the same launch.

## Options Considered

**For MedAgent/MedLogistics:**
1. **Build full real functionality** (real agent vetting, real visa/flight
   booking integrations) — rejected. Neither module has the underlying
   partner integrations (KYB/anti-fraud vendor, visa-facilitation partners,
   flight-booking API) this session has access to; building fake-looking
   "real" flows would violate the same do-not-fake-success discipline
   applied to every other module on this roadmap.
2. **Frontend scaffold only, mock data, explicit "preview, not live"
   disclaimer** — adopted. Matches the MedGive/ClinicalTrials/PubMed
   pattern already established.

**For the MedToken divergence:**
1. **Silently rewrite `TOKENOMICS.md` to match the new document's
   conservative points-first plan** — rejected. Tokenomics parameters are
   explicitly CPWO/Web3 & Token Strategy's decision authority per
   `docs/governance/DECISION_MATRIX.md`; unilaterally changing a
   100,000,000-supply, priced-TGE plan to a no-token points system is a
   business decision this session has no standing to make, even at Vadim's
   general instruction to "implement all of this."
2. **Ignore the divergence** — rejected. It's a real, material conflict
   between two documents both presented as current strategy; leaving it
   unflagged risks someone building against the wrong one later.
3. **Flag the divergence explicitly in both documents, propose no
   resolution, route to Web3 & Token Strategy + Legal & Compliance as a
   Joint decision** — adopted.

## Decision

Added `modules/medagent/` (types, mock referral-pipeline data, `PipelineBoard`
kanban component) and `modules/medlogistics/` (types, mock visa/travel case
data, `LogisticsCaseCard` component), each with a page at `/medagent` and
`/medlogistics`, registered in `modules/registry.ts` and `modules/config.ts`.
Both pages carry an explicit "preview, not live" disclaimer.

Added flag notes to `docs/ROADMAP.md` (new "Modules 16–17" section, and an
addition to the Phase 4 `medtoken` paragraph) and to `docs/TOKENOMICS.md`
(new open-flag note after the v1.2 revision note) describing the MedToken
phasing divergence. Neither document's substantive numbers were changed.

**Explicitly not decided here:** whether MedByClick actually launches MedToken
as a real BEP-20 contract per `TOKENOMICS.md`, or as a non-transferable
points system per the new document, or as a genuine two-phase sequence of
both. That decision belongs to Web3 & Token Strategy with Legal & Compliance
input, and is now visibly flagged in both source documents so it doesn't get
missed.

## Rationale

Same "scaffold now, gate the risky/unbuilt parts, be honest about what's
real" pattern used for every prior module addition this session (MedGive,
ClinicalTrials.gov search, PubMed search). The MedToken divergence is
different in kind from the usual "spec is more detailed than the code" gap —
it's a direct conflict on a decision (real token vs. no token) that a
future session or a human reading only one of the two documents could
easily miss. Flagging it in-place in both documents, at the point where each
document already discusses `medtoken`, maximizes the chance a founder or
future agent notices it before building against the wrong assumption.

## Dissent

None recorded — this is a flag for founder-level reconciliation, not a
contested decision.

## Linked Documents

- `docs/ROADMAP.md` § "Modules 16–17 — MedAgent & MedLogistics" and the Phase 4 `medtoken` flag
- `docs/TOKENOMICS.md` open-flag note (after the v1.2 revision note)
- `modules/medagent/`, `modules/medlogistics/`, `app/medagent/page.tsx`, `app/medlogistics/page.tsx`
- `docs/decision-log/0005-medgive-module-added.md` (same scaffold pattern)
