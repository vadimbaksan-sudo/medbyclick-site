# T2 — Platform Evaluation Rubric + Shortlist

Owner: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Status: **Draft for Day-25 review**
Deadline per `TODOS.md` T2: rubric finalized before Day-25, decision gate at Day 30.
Research date: 2026-07-02. Sources cited inline; re-verify pricing/compliance claims
directly with vendor sales before the Day-30 decision — vendor pricing pages change.

## Purpose

A comparison, not a search. Criteria are fixed before vendor demos to reduce
sales-pressure bias, per T2's stated rationale. This rubric does not make the
Day-30 decision — it narrows the field and flags what still needs verification
before that decision is made.

## Criteria (from `TODOS.md` T2, unchanged)

1. HIPAA compliant (BAA available)
2. GDPR compliant
3. Israeli Patient Rights Law compliant
4. No patient app install required
5. Scheduling built in
6. Payments built in
7. Supports SLA tiers (standard acknowledgment vs. urgent escalation — this
   is the routing-protocol requirement referenced in T2's context, not a
   generic feature)
8. Price point

## Platforms Evaluated

Healthie, Jane App, Doctoralia (Docplanner), SimplePractice, WhatsApp Business API.

## Scorecard

Scoring: **Pass** / **Partial** / **Fail** / **Unknown**. "Partial" means the
capability exists but requires custom build/configuration to meet MedByClick's
actual need, not that the vendor is halfway compliant.

| Criterion | Healthie | Jane App | Doctoralia | SimplePractice | WhatsApp Business API |
|---|---|---|---|---|---|
| HIPAA (BAA) | **Pass** | **Pass** | Unknown/Fail — no HIPAA claim found; EU-market product | **Pass** | **Fail** — Meta will not sign a BAA for any WhatsApp product |
| GDPR | **Pass** (HITRUST-certified, integrates GDPR into its framework) | **Pass** (regional data centers: US/Canada/UK/Australia) | **Pass** — EU-native (Docplanner HQ, Warsaw) | Partial/Unknown — US-market product, no explicit GDPR certification found | Partial — compliance depends entirely on how the integrator implements it; Meta itself disclaims fitness for regulated industries |
| Israeli Patient Rights Law | Unknown | Unknown | Unknown | Unknown | Unknown |
| No patient app install | **Pass** — web patient portal | **Pass** — web booking; native app is optional, not required | **Pass** — core product is a web booking widget | **Pass** — web Client Portal | **Fail** — the product *is* the WhatsApp app; patient must have it installed (though most target patients already do) |
| Scheduling built in | **Pass** | **Pass** | **Pass** (core product) | **Pass** | **Fail** — no native scheduling; would require a custom bot layer |
| Payments built in | **Pass** — native, no separate Stripe account needed | **Pass** — native invoicing + in-app payments | Partial — marketing/booking-first product; payment processing not consistently core across markets | **Pass** — native card processing (3.15% + $0.30/txn) | **Fail** — no native payments; would require external payment link |
| SLA tiers (standard ack / urgent escalation) | Partial — no native SLA concept; buildable via API + tags/automation | Partial — waitlist + automated notifications; buildable via tags, no native urgent-queue | Fail/weak — booking-focused, limited workflow customization found | Partial — appointment requests + secure messaging, limited triage automation | Partial — no native concept, but labels/quick-replies + API make a custom triage inbox cheap to build |
| Price (published, USD/mo) | $69–$279/mo + 2.9% txn fee (intro tier $19) | $54–$99/mo + per-practitioner fees; telehealth/AI are paid add-ons | Not published — custom quote only; user reports of high/rising prices | $49–$99/mo + 3.15%+$0.30/txn | Free platform fee at low volume; per-conversation pricing via a BSP (fractions of a cent–few cents each); cost shifts entirely into custom dev |

## Ranked Shortlist

1. **Healthie** — strongest overall: HIPAA + GDPR + HITRUST + PCI + PIPEDA in one
   certification stack, native payments, and the deepest API/SDK surface of the
   three real contenders — relevant because MedByClick will need to build the
   SLA-tier routing logic on top of whichever platform is chosen, since none of
   these vendors ship it natively.
2. **Jane App** — close second. Matches Healthie on compliance breadth and adds
   explicit regional data residency (useful for a GDPR data-location argument),
   but slightly shallower API for the custom triage/SLA layer we'd need to build.
3. **SimplePractice** — viable on HIPAA/scheduling/payments but weakest of the
   three on demonstrated GDPR/international fit; it reads as a US-market product.
   Keep as fallback if Healthie/Jane demos surface a dealbreaker.
4. **Doctoralia** — do not shortlist as the coordination system of record. No
   HIPAA claim, weak SLA/workflow tooling, pricing opaque. It may still be worth
   a conversation as a *supplementary discovery/booking widget* for patient
   acquisition in EU markets, but that's a Growth/Marketing decision, not a T2
   platform-of-record candidate.
5. **WhatsApp Business API** — disqualified as system of record: Meta will not
   sign a BAA, so no PHI-bearing case detail can legally go through it. It
   remains attractive only as a **notification/engagement layer bolted onto a
   compliant backend** (appointment reminders, "your coordinator replied" pings)
   — not as the place case data lives. If used, PHI must stay in the underlying
   compliant platform and WhatsApp messages must not contain clinical detail.

**Recommendation for Day-25:** run vendor demos with Healthie and Jane App only.
Keep SimplePractice as a documented fallback. Do not spend demo time on
Doctoralia or WhatsApp Business API as coordination-platform candidates — the
research gap on each is a disqualifier, not something a demo would resolve.

## Known Gap: Israeli Patient Rights Law

No vendor publishes anything about Israel's Patient's Rights Law (5756-1996).
This is expected — it's a local statute, not a framework any of these vendors
market against, unlike HIPAA/GDPR. **This gap does not resolve itself by
picking a different vendor.** Per Handoff Rules, this needs a Legal &
Compliance opinion regardless of which platform is chosen — recommend Legal &
Compliance obtain a short local-counsel opinion on what patient-data-handling
obligations apply, in parallel with vendor demos, so it's answered before the
Day-30 gate rather than discovered after.

## Still Open Before Day-30 Decision

- **SLA values not yet set.** T2's context notes the rubric criteria depend on
  SLA tiers "now required in the case routing protocol." This evaluation used
  the whitepaper's illustrative 12h/24–48h tiers (§6, Priority Access Passes) as
  a proxy since no separate routing-protocol document was found in this repo.
  If the actual routing protocol sets different tiers, re-check the "SLA tiers"
  row — it may change which platform's API can support it without custom build.
- **Live pricing quote** — Doctoralia and enterprise tiers of the others require
  a sales conversation; treat the price row as directional, not final.
- **MedSupport module dependency** — whichever platform wins here likely
  replaces (or gets integrated into) the `medsupport` module's real-functionality
  build rather than sitting alongside it. See `docs/ROADMAP.md` Phase 1, which
  flags `medsupport` as blocked on this decision.
