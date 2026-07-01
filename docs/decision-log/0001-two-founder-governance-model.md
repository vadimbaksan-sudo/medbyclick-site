**Decision ID:** 0001
**Date:** 2026-07-01
**Title:** Adopt two-founder governance model for the AI team
**Proposed by:** Vadim (CPWO)
**Type:** Joint
**Status:** Decided

## Context

Initial request was to build a general AI-agent team structure around a single
CEO role. Before building it, an audit of the existing project state was run
(single-author git history, no prior multi-agent team, one `/office-hours` +
`/plan-eng-review` cycle on record). The audit proposed a 7-role single-CEO
structure. Vadim then clarified that MedByClick has two co-founders with
distinct, non-overlapping domains (Marina: medical/clinical; Vadim:
product/Web3/capital), and that the AI team must be built around both, not
around one CEO the other reports to.

## Options Considered

1. Single CEO with the other founder as a direct report — rejected, doesn't
   reflect the actual founder relationship (peers, not hierarchy).
2. Two fully separate, non-interacting AI teams per founder — rejected, would
   duplicate Shared Services (legal, QA, growth, audit) and create silos with
   no cross-lane coordination.
3. Two lanes (CEO: Marina, CPWO: Vadim) plus Shared Services that route by
   finding type rather than reporting to one lane — adopted.

## Decision

Adopt the two-lane + Shared Services structure documented in
`docs/TEAM_STRUCTURE.md`, `docs/governance/FOUNDERS_AGREEMENT.md`,
`docs/governance/DECISION_MATRIX.md`, and `docs/governance/RACI_MATRIX.md`.
Ten AI roles total: three in Marina's lane (Medical Advisory, Medical Content,
Medical Community), three in Vadim's lane (CTO/Product, Developer, Web3 & Token
Strategy), four Shared Services (Legal & Compliance, QA/GStack,
Growth/Marketing, Independent Auditor).

## Rationale

The founders are peers with non-overlapping domains, not a CEO/subordinate
pair. Modeling the AI team as two lanes matches how decisions actually get
made and avoids inventing a hierarchy that doesn't exist. Shared Services stay
as single roles (not duplicated per lane) with explicit routing rules, so
Legal/QA/Growth/Audit findings reach the right founder without creating two
competing legal or QA functions.

## Dissent

None — both founders' stated preferences converged on this structure across
the conversation that produced it.

## Linked Documents

- `docs/TEAM_STRUCTURE.md`
- `docs/governance/FOUNDERS_AGREEMENT.md`
- `docs/governance/DECISION_MATRIX.md`
- `docs/governance/RACI_MATRIX.md`
- `docs/governance/ESCALATION_FLOW.md`
- All files in `docs/agents/`
