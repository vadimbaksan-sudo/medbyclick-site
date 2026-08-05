**Decision ID:** 0007
**Date:** 2026-08-05
**Title:** Add PubMed literature search to MedEdu for students/professionals; reject Medscape scraping; keep existing module (no new module)
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only (technical roadmap/module content, per `docs/agents/CTO_PRODUCT.md` Decision Authority)
**Status:** Decided

## Context

Vadim asked to integrate Medscape (medscape.com) into the education module.
Research found Medscape has no public content API, and its `robots.txt`
explicitly disallows `ClaudeBot` (and GPTBot, PerplexityBot, CCBot, others)
site-wide — a direct, explicit instruction not to have Claude access their
content. Scraping around that would ignore an explicit publisher directive
and likely violate their Terms of Service (editorial content, not public
data), unlike the ClinicalTrials.gov integration (decision 0006), which is
an open government API with no such restriction.

Vadim then clarified the actual goal: `mededu` should serve **medical
students/professionals** with literature/reference content, not only the
existing patient-facing courses ("Patient Advocacy 101," etc.). He initially
asked about a separate module, then reversed that — the existing `mededu`
module stays as the single home for both audiences, no new module.

## Options Considered

1. **Scrape or proxy Medscape content anyway** — rejected outright. Their
   robots.txt names Claude specifically; overriding an explicit "don't
   access this" instruction from the site operator isn't something to route
   around technically.
2. **Business development: negotiate a content licensing/syndication deal
   with WebMD Health Network (Medscape's owner)** — legitimate path, but it's
   a human-to-human negotiation with legal/commercial terms, not something
   buildable in this session. Left open as a separate track if Vadim wants
   to pursue it.
3. **Create a new, separate module for student/professional content** —
   considered per Vadim's first framing, reversed by his own follow-up:
   keep one `mededu` module for both audiences.
4. **Add PubMed (NCBI E-utilities) literature search to the existing
   `mededu` module, alongside the current patient course list** — adopted.
   Free, public, no API key, explicitly permits reuse, and is a better
   content fit for students than the patient-oriented MedlinePlus
   alternative first suggested (and rejected once the student audience was
   clarified).

## Decision

Added `lib/pubmed/api.ts` (server-side E-utilities client — esearch +
esummary, no key required, identifies itself via NCBI's requested
`tool`/`email` courtesy params), `app/api/pubmed/search/route.ts` (proxy),
and a search UI on the **existing** `/mededu` page (`ArticleSearch.tsx` +
`ArticleCard.tsx`), placed below the current patient course grid under a
"For Medical Students & Professionals" heading. No new module was created;
`modules/mededu/data.ts`'s existing patient courses are untouched.

Search results are unfiltered PubMed listings for a user-entered query —
no MedByClick-authored medical interpretation, same link-out-only boundary
used for the ClinicalTrials.gov integration (decision 0006).

**Not decided here:** any Medscape partnership/licensing negotiation — that
remains open, separate, and requires human business development, not code.

## Rationale

PubMed/NCBI is the direct open-data equivalent of what Medscape offers for
this audience (peer-reviewed literature, professional-grade reference) —
same "prefer the open government API over scraping a commercial site that
says no" pattern already established for ClinicalTrials.gov. Keeping one
`mededu` module (per Vadim's explicit correction) avoids fragmenting
navigation/module count for what is, in the end, one "education" surface
serving two audiences via two clearly-labeled sections on the same page.

## Dissent

None — Vadim corrected his own initial "separate module" framing within the
same conversation before any build started.

## Linked Documents

- `lib/pubmed/api.ts`, `app/api/pubmed/search/route.ts`
- `modules/mededu/components/ArticleSearch.tsx`, `ArticleCard.tsx`
- `docs/decision-log/0006-clinicaltrials-gov-integration.md` (same link-out pattern)
