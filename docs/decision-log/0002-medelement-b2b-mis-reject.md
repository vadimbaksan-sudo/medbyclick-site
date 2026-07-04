**Decision ID:** 0002
**Date:** 2026-07-04
**Title:** Reject building a B2B clinic practice-management (MIS) product
**Proposed by:** CTO/Product (`docs/agents/CTO_PRODUCT.md`), per Vadim's request for a
verdict on a competitive gap surfaced by researching MedElement
**Type:** CPWO-only *(technical architecture/roadmap sequencing and development
priorities, per `docs/agents/CTO_PRODUCT.md` Decision Authority)*
**Status:** Decided

## Context

Vadim asked Claude to research MedElement (medelement.com), a large,
established CIS-region medical directory/booking platform that also sells a
paid practice-management SaaS ("МИС") to clinics and offers a free
clinician-facing reference section (protocols, drug database, lab reference
ranges). Vadim then asked CTO/Product for a real verdict on whether
MedByClick should build an equivalent B2B MIS product, and separately whether
it should add clinician reference content. Full analysis:
`docs/reports/product/2026-07-04-medelement-competitive-assessment.md`.

## Options Considered

1. **Build a full B2B MIS product** (scheduling/EHR/CRM SaaS sold to clinics,
   matching MedElement's МИС) as a new revenue line — rejected.
2. **Defer the MIS idea, revisit after Phase 1–3 land** — considered but
   rejected as too soft a framing; this isn't a timing problem, it's a wrong
   product/wrong customer/wrong moment problem, and "defer" invites
   re-litigating it every time a competitor comparison comes up.
3. **Reject outright**, log the reasoning so it doesn't need re-deriving —
   adopted.

## Decision

MedByClick will **not** build a B2B clinic practice-management (MIS) product.
It is not added to `docs/ROADMAP.md` in any phase.

## Rationale

- **Wrong customer.** MedByClick's whitepaper thesis (§2, §3) is a
  coordinator-mediated trust network solving the *patient's* cross-border
  discovery/trust problem. A MIS sells software to clinics — a different
  buyer, sales motion, and value proposition. Building it starts a second,
  unrelated business under the same name rather than extending the actual
  differentiation.
- **Wrong market position.** MedElement's МИС has years of CIS-wide clinic
  relationships and its own patient-traffic-funded distribution. Entering
  that market now means challenging an entrenched incumbent on its own turf,
  not exploiting a gap.
- **Wrong moment.** The team is two founders plus an AI-driven dev pipeline
  mid-way through Phase 0/1 of the core product (per
  `docs/reports/product/2026-07-04-platform-status-report.md`). There is no
  idle capacity for a second business line; every hour on a MIS is an hour
  not spent finishing the coordinator loop this company exists to build.

## Dissent

None — CPWO-only decision, no conflicting position raised.

## Linked Documents

- `docs/reports/product/2026-07-04-medelement-competitive-assessment.md`
- `docs/ROADMAP.md`
- `docs/WHITEPAPER.md` §2, §3, §9
- `docs/agents/CTO_PRODUCT.md`
