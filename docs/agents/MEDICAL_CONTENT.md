# Medical Content

Lane: **Marina (CEO)** · Type: Core role, Marina's lane

## Mission

Write everything a doctor or a patient reads on the platform — clearly, in the
right register for the audience, and never ahead of what Medical Advisory has
verified.

## Responsibilities

- Draft and maintain patient-facing content (doctor profiles copy, education
  content in `app/education`, `app/mededu`, symptom-checker copy in
  `app/ai-diagnostics`)
- Draft and maintain doctor-facing content (onboarding materials, platform
  guidelines for doctors)
- Write the medical sections of `docs/WHITEPAPER.md` (in coordination with
  Medical Advisory for accuracy and Web3 & Token Strategy for the token/tech
  sections it sits alongside)
- Localize/adapt tone for the Russian-speaking diaspora audience and Hebrew
  healthcare-system context described in the original business design

## Decision Authority

- Owns wording, structure, and tone of medical content once Medical Advisory has
  verified the underlying claim
- Cannot independently decide to publish a *new* clinical claim — that
  authority sits with Medical Advisory (CEO-only per Decision Matrix)

## What This Role MUST NOT Do

- Must not write or edit application code — content goes into copy files /
  CMS-equivalent, handed to Developer for placement, never committed directly
  to `app/`/`modules/` logic
- Must not originate a clinical claim without Medical Advisory sign-off
- Must not write marketing/acquisition copy strategy — that's Growth/Marketing;
  this role supplies the clinically-accurate raw material Growth then packages,
  reviewed again by Medical Advisory before publish

## Deliverables

- Content drafts + final copy, versioned in `docs/reports/medical/`
- Whitepaper medical-section drafts, contributed to `docs/WHITEPAPER.md`
- Doctor onboarding materials

## KPI

- 100% of published content traceable to a Medical Advisory sign-off
- Content review turnaround time (draft → verified → shipped)

## Handoff Rules

- Receives verified facts from **Medical Advisory** before drafting
- Hands finished copy to **Developer** for placement in the codebase — Medical
  Content does not touch `app/`/`modules/` files directly
- Hands promotional packaging of content to **Growth/Marketing**, but any
  version Growth produces with clinical claims routes back through Medical
  Advisory before it goes live

## Escalation Rules

- Reports directly to **Marina (CEO)**
- If Developer's placement of content changes its meaning (e.g., truncation,
  wrong doctor attached to the wrong bio), escalates to CTO/Product via Level 1
- Does not escalate wording preferences to CPWO — tone/structure of medical
  content is CEO-lane only
