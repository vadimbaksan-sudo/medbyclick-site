**Decision ID:** 0006
**Date:** 2026-08-05
**Title:** Integrate live ClinicalTrials.gov search into MedTrials; Medical Advisory sign-off still outstanding
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only for the technical integration itself (per
`docs/agents/CTO_PRODUCT.md` Decision Authority). **Not a substitute for**
the Medical Advisory consult `docs/ROADMAP.md` already requires for
`medtrials` as a clinical feature (Sequencing Principle 3) — that consult
has not happened and this entry does not close it.
**Status:** Decided (technical integration) / Open (Medical Advisory sign-off on framing)

## Context

Vadim asked to connect clinicaltrials.gov to the site "by API keys." Research
found the ClinicalTrials.gov API v2 (`https://clinicaltrials.gov/api/v2/studies`)
requires **no API key at all** — it's a fully open public registry maintained
by the NIH/NLM. This corrects the original framing; there is no key to manage
or protect.

`docs/ROADMAP.md`'s Phase 4 table already lists `medtrials` as a clinical
feature requiring a Medical Advisory consult before real functionality is
built — a rule this decision deliberately narrows rather than overrides.

## Options Considered

1. **Wait for Medical Advisory sign-off before writing any code** — considered,
   but the roadmap's own Sequencing Principle 3 language ("gets a Medical
   Advisory consult before greenlighting") was written with `medai`-style
   *generated clinical content* in mind. A read-only link-out to an
   already-public government registry, with no MedByClick-authored clinical
   claims, is a materially different risk shape.
2. **Build full "enrollment matching"** (the original Phase 4 scope: matching
   patients to trials, asserting eligibility) — rejected for now. That's the
   part that actually requires Medical Advisory judgment (is this trial
   appropriate to surface to this patient?) and is explicitly out of scope
   here.
3. **Build link-out search only, explicitly labeled as external/unendorsed,
   flag the outstanding Medical Advisory consult rather than silently
   skip or silently claim it's satisfied** — adopted.

## Decision

Added `lib/clinicaltrials/api.ts` (server-side API client, no key required),
`app/api/clinicaltrials/search/route.ts` (proxy endpoint), and a search UI on
`/medtrials` (`TrialSearch.tsx` + `RemoteTrialCard.tsx`) alongside the
existing curated/mock trial list. Results are unfiltered ClinicalTrials.gov
listings for a user-entered condition — no MedByClick ranking, matching, or
endorsement logic. The page explicitly states this is "a link-out search,
not a MedByClick recommendation or eligibility match" and tells users to
confirm eligibility with the study team.

**Explicitly not covered by this decision:** any feature that ranks, filters,
or recommends specific trials to a specific patient, any MedByClick-authored
summary of a trial's suitability, and the token referral bounty mechanic
listed in the original Phase 4 row. Those still require the Medical Advisory
(and, for bounties, Web3 & Token Strategy) consult already on the roadmap.

## Rationale

Displaying an already-public, government-reviewed registry listing with a
link to the authoritative source is a lower-risk action than generating or
curating clinical content — it adds no new clinical claim MedByClick is
responsible for. But it is still a `medtrials` feature, and the module stays
flagged as pending Medical Advisory sign-off until she reviews the actual
framing and disclaimer language shipped here, not just the concept.

## Dissent

None recorded. This is a scope judgment call (link-out search is lower-risk
than the roadmap's stricter framing implies) rather than a disputed decision
— flagged clearly in both this entry and the roadmap update so Medical
Advisory can push back on the framing if she disagrees with that judgment.

## Linked Documents

- `docs/ROADMAP.md` § Phase 4 `medtrials` row (2026-08-05 update)
- `lib/clinicaltrials/api.ts`, `app/api/clinicaltrials/search/route.ts`
- `modules/medtrials/components/TrialSearch.tsx`, `RemoteTrialCard.tsx`
- `docs/agents/MEDICAL_ADVISORY.md`
