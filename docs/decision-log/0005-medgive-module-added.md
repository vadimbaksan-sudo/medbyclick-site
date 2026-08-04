**Decision ID:** 0005
**Date:** 2026-08-04
**Title:** Add MedGive (Module 15) as a frontend scaffold; gate real fundraising behind Legal & Compliance / Medical Advisory sign-off
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only for the scaffold build (technical roadmap/module addition, per
`docs/agents/CTO_PRODUCT.md` Decision Authority). **Real launch is explicitly
NOT decided here** — per `docs/governance/DECISION_MATRIX.md`, publishing
anything that discloses patient medical conditions for fundraising is a
Medical Advisory-gated action, and operating real charitable solicitation/
KYC-AML infrastructure requires Legal & Compliance sign-off per jurisdiction;
this entry authorizes the mock/preview build only.
**Status:** Decided (scaffold) / Open (real launch — blocked pending legal review)

## Context

Vadim provided a full bilingual (EN/RU) module specification for "MedGive —
Individual Patient Medical Crowdfunding & Charitable Support," prepared as
Module 15 of the platform. The spec's header lists "Prepared for KVMedical
Ltd" — a company name that does not match any entity referenced elsewhere in
this repo (`docs/LEGAL_BRIEF.md` states no legal entity exists yet for
MedByClick). **This naming inconsistency was flagged to Vadim and remains
unresolved** — it is not clear whether KVMedical Ltd is an intended new legal
entity name, a template artifact from an external consultant, or an error.
Do not assume KVMedical Ltd is MedByClick's registered entity name without
confirmation.

The spec itself is unusually explicit that real-world launch requires
substantial legal work first: charitable-solicitation registration
(state-by-state in the US; charity-regulator compliance in the EU/UK or a
fiscal-sponsorship arrangement), KYC/AML thresholds, GDPR/HIPAA-equivalent
handling of publicly disclosed health data, and jurisdiction-specific tax
receipt rules.

## Options Considered

1. **Build the full real-money module now** (real escrow, real KYC/AML, real
   charitable registration) — rejected outright. This would mean operating
   unregistered charitable solicitation and processing sensitive health data
   disclosures without the legal review the spec itself says is mandatory —
   a compliance and patient-safety risk, not just a technical one.
2. **Do nothing until legal review completes** — rejected as too passive;
   the module's information architecture, data model, and UI can be built
   and reviewed now without needing real money or real patient data, exactly
   as `medtoken`/`medpharmaccess`/`medtrials` were sequenced elsewhere on
   this roadmap.
3. **Frontend scaffold now (mock campaigns, clear "preview, not live"
   disclaimer on the page), real functionality explicitly gated behind
   Legal & Compliance and Medical Advisory sign-off** — adopted. Matches
   the existing pattern for every other regulatory-heavy module on this
   roadmap.

## Decision

Added as Module 15: `modules/medgive/` (types, mock data, `CampaignCard`
component), `app/medgive/page.tsx`, registered in `modules/registry.ts` and
`modules/config.ts`. The page carries an explicit on-page disclaimer stating
this is a preview with no real donations or real patients. Documented in
`docs/ROADMAP.md` under a new "Module 15 — MedGive (Regulatory-Gated, Not
Token-Dependent)" section, separate from the Phase 4 token-dependency list
since MedGive's gate is charity/tax/health-privacy law, not the smart contract.

**Explicitly not decided or authorized by this entry:** real donation
processing, real escrow, real KYC/AML, real charitable-entity registration
in any jurisdiction, or public disclosure of any real patient's medical
condition. All of that requires the Legal & Compliance and Medical Advisory
sign-offs called out in the roadmap entry, on a jurisdiction-by-jurisdiction
basis, before any real launch.

## Rationale

Same reasoning already established for `medai`, `medpayments`, and
`medpharmaccess` elsewhere in this repo: ship a reviewable, honest scaffold
first, be explicit on-page that it isn't live, and gate the parts that touch
real money or real health data behind the roles whose job is exactly that
gate. Building the real thing first, given the spec's own compliance section,
would put the platform in the position of soliciting donations and
publishing patient health information without the registration the spec
says is required — not an acceptable default.

## Dissent

None on the scaffold decision. The KVMedical Ltd naming question is
unresolved, not disputed — flagged for Vadim to confirm or correct.

## Linked Documents

- `docs/ROADMAP.md` § "Module 15 — MedGive (Regulatory-Gated, Not Token-Dependent)"
- `modules/medgive/types.ts`, `modules/medgive/data.ts`, `modules/medgive/components/CampaignCard.tsx`, `app/medgive/page.tsx`
- `docs/agents/LEGAL_COMPLIANCE.md`, `docs/agents/MEDICAL_ADVISORY.md`
- `docs/LEGAL_BRIEF.md` (no entity registered yet — context for the KVMedical Ltd question)
