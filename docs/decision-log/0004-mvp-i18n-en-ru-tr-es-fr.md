**Decision ID:** 0004
**Date:** 2026-07-16
**Title:** Ship MVP UI translation for English/Russian/Turkish/Spanish/French, ahead of strict demand-gating
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only *(technical roadmap sequencing, per `docs/agents/CTO_PRODUCT.md`
Decision Authority)* — extends decision 0003, does not reopen its clinical
translation-standard requirement.
**Status:** Decided

## Context

Following decision 0003 (12-language localization plan, sequenced by
demonstrated demand), Vadim asked for a working language switcher, then for
real English/Russian content translation "just for MVP," then for a few more
languages translated. This entry records the resulting scope: a functional
MVP i18n layer (`components/LanguageProvider.tsx`, `components/T.tsx`) now
translates marketing/UI chrome — navigation, hero, homepage sections, footer
— for English, Russian, Turkish, and now also Spanish and French, jumping
ahead of decision 0003's demand-only sequencing for the latter three.

## Options Considered

1. **Wait for real demand before building Turkish/Spanish/French**, per
   0003's original sequencing — rejected for this pass. Vadim explicitly
   requested "a few more" languages now; overriding that with the original
   sequencing without checking would ignore direct founder input on a
   CPWO-only call.
2. **Extend to all remaining 9 languages immediately** — rejected. Arabic and
   the CJK set (Chinese, Japanese, Korean) carry real engineering cost (RTL
   layout, non-Latin typography) that a same-day MVP pass can't responsibly
   absorb; shipping garbled/unstyled text in those scripts would be worse
   than staying flag-only.
3. **Extend only to Latin-script languages with no typography/RTL cost**
   (Turkish, Spanish, French) — adopted. Keeps the engineering-complexity
   rationale from 0003 intact while giving Vadim the broader coverage he
   asked for.

## Decision

`components/LanguageProvider.tsx` and `components/T.tsx` now support 5
languages: `en`, `ru`, `tr`, `es`, `fr`. The switcher (`LanguageSwitcher.tsx`)
marks these as translated; the remaining 7 (German, Chinese, Japanese,
Korean, Arabic, Italian, Portuguese) stay visible with a "soon" marker and
fall back to English content, unchanged from 0003.

**Scope of what got translated, per language, is identical across all 5**
(mirrors the Russian MVP pass): navigation labels, hero copy, trust-bar
stats, "what makes us different," "how it works," featured-doctors section
UI labels, CTA section, and footer — all marketing/UI chrome, no clinical
content.

**Explicitly NOT translated in any of the 5 languages**, same exclusions as
the Russian pass and for the same reason:
- Doctor endorsement quotes, names, specialties, titles — clinically-adjacent,
  pending Medical Advisory sign-off *per language*.
- The footer's legal/scope disclaimer ("non-emergency advisory services") —
  pending Legal & Compliance review per language.
- Module registry nav labels (the 13-module grid) — out of scope for this
  pass, not clinically sensitive, just not yet done.

## Rationale — reconciling this with 0003's certified-translator requirement

0003 requires certified medical translators and Medical Advisory sign-off for
**clinically-relevant copy**. The strings translated in this pass are
marketing/UI chrome — button labels, section headings, process descriptions —
not clinical claims. Drafting these directly (not via a certified medical
translator) is acceptable *because* they carry no clinical content; this is a
scope boundary, not an exception to 0003's actual rule. Anything that touches
clinical accuracy (symptom descriptions, doctor credentials, medical
instructions) still requires the full certified-translator + Medical Advisory
process before it ships in any language, including the 5 now live.

## Dissent

None — Vadim requested the extension directly across two prompts in the same
session ("сделай перевод просто для mvp", then "ещё несколько" languages).

## Linked Documents

- `docs/decision-log/0003-localization-12-languages.md` (the decision this extends)
- `docs/ROADMAP.md` § "Localization (12 Languages) — Cross-Cutting"
- `components/LanguageProvider.tsx`, `components/T.tsx`, `components/LanguageSwitcher.tsx`
- `docs/agents/MEDICAL_ADVISORY.md`, `docs/agents/LEGAL_COMPLIANCE.md`
