**Decision ID:** 0003
**Date:** 2026-07-06
**Title:** Localize the platform into 12 languages, English as source of truth, sequenced by demand
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only *(technical roadmap sequencing, per `docs/agents/CTO_PRODUCT.md`
Decision Authority)*, with a mandatory Medical Advisory clinical sign-off gate
per language — an application of Medical Advisory's existing CEO-only authority
over clinical accuracy (`docs/governance/DECISION_MATRIX.md`), not a new joint
decision.
**Status:** Decided

## Context

Vadim proposed localizing the platform into 12 languages: English, Turkish,
Spanish, French, German, Russian, Chinese (Mandarin), Japanese, Korean,
Arabic, Italian, Portuguese. Turkish was specifically motivated by a Turkish
Airlines partnership discussion (each airline partner implies its national
language as a requirement). Initial framing was "translate everything
literally/word-for-word" once English is the primary language — this was
flagged as a patient-safety risk for clinical content and corrected before
being recorded here.

## Options Considered

1. **Build and launch all 12 languages simultaneously** — rejected. The
   platform is still pre-launch (per `docs/ROADMAP.md`'s Current State), no
   language has real users yet, and three of the twelve (Arabic, and the CJK
   set — Chinese/Japanese/Korean) carry real engineering cost (RTL layout,
   non-Latin typography) that isn't justified without demonstrated demand.
   Simultaneous launch would also mean Medical Advisory reviewing clinical
   content across 12 languages at once — the actual bottleneck, not
   engineering capacity.
2. **Literal/word-for-word translation by "good translators"** — rejected.
   Medical content (dosages, symptom descriptions, instructions) translated
   literally risks meaning-distorting errors from idiom, unit, and
   cultural-context mismatches — a patient-safety and liability issue, not a
   style preference.
3. **Phased rollout by demonstrated demand, certified medical translators,
   mandatory per-language Medical Advisory sign-off** — adopted.

## Decision

Localize into the 12 named languages, sequenced by demonstrated
patient/doctor demand rather than built all at once:
1. English (source of truth) + Russian — formal i18n pass on the existing
   real audience.
2. Turkish — next, tied to the Turkish Airlines partnership driver.
3. Remaining 9 (Spanish, French, German, Chinese, Japanese, Korean, Arabic,
   Italian, Portuguese) — queued, added as real volume from each market
   appears.

Translation is done by certified medical translators, not literal/word-for-word
translation. No language variant of clinically-relevant copy ships without a
separate Medical Advisory sign-off for that language. Full detail recorded in
`docs/ROADMAP.md` § "Localization (12 Languages) — Cross-Cutting".

## Rationale

- Sequencing by demand avoids building (and maintaining, and clinically
  reviewing) 9 languages with no users yet, while the platform hasn't cleared
  Phase 1 of its own roadmap.
- Certified medical translation + mandatory Medical Advisory sign-off per
  language is the direct, non-negotiable consequence of Medical Advisory's
  existing final-veto authority over clinical accuracy — a wrong translation
  is a wrong clinical claim regardless of which language it's in.
- Arabic (RTL) and the CJK languages (typography) are real engineering line
  items, not string-table swaps — flagging this now avoids CTO/Product
  rediscovering it mid-sprint.

## Dissent

None — Vadim raised the plan, agreed to the correction from "literal
translation" to "certified medical translators + per-language clinical
sign-off" in the same conversation.

## Linked Documents

- `docs/ROADMAP.md` § "Localization (12 Languages) — Cross-Cutting"
- `docs/agents/MEDICAL_ADVISORY.md`
- `docs/agents/CTO_PRODUCT.md`
- `docs/governance/DECISION_MATRIX.md`
