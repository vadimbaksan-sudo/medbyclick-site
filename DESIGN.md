# Design System — MedByClick

Status: adopted 2026-08-21, via `/design-consultation`. Replaces the
navy→green/stone/amber system adopted 2026-07-05 with an editorial
"dossier" direction — warm paper, serif headlines, a sparing terracotta
accent. **Previous version preserved at
`docs/archive/DESIGN.md.pre-dossier-20260821.md`** per explicit request,
since this direction was tried once before and rejected (see Decisions Log).

## Why this replaces a direction rejected 2026-07-05

The 2026-07-05 consultation considered and rejected an "archival dossier"
direction (warm paper, Fraunces serif, wax-seal accent) — the user's direct
visual reaction was negative, and it was abandoned without iteration. This
2026-08-21 consultation independently arrived at the same core concept —
Codex and a separate Claude subagent, run in parallel without seeing each
other's output, both proposed "medical dossier, not startup landing page"
on their own. Differences from the rejected version, and why they might
change the outcome this time:
- **Typeface:** Fraunces (no Cyrillic support at all) → PT Serif (real
  Cyrillic, free on Google Fonts, originally commissioned for official
  Russian-government use — thematically closer to "institutional trust").
- **Accent motif:** literal wax-seal → a spare monospace case-number mark
  (`№ 047`), less costume-y.
- **Grounding:** the 2026-07-05 version doesn't record what research (if
  any) informed it. This version is grounded in real competitor screenshots
  (Teladoc, Included Health, Bumrungrad International, Roche, Clinique La
  Prairie, Phamily) captured live via browser — see Decisions Log.
- Vadim reviewed this history mid-session and explicitly chose to proceed
  anyway, asking only that the prior version be preserved as a fallback.

## Product Context
- **What this is:** MedByClick — a personally-vetted medical specialist
  network (mostly Israel-based) for Russian-speaking diaspora patients
  across CIS countries, expanding into an education module, a utility token
  (MBC) with tokenomics/checkout pages, and a planned foundation entity.
- **Who it's for:** patients seeking trusted specialist care; secondarily,
  doctors, and (on token/education pages) a broader ecosystem/community
  audience.
- **Memorable thing:** "Seriousness without coldness" (Vadim's own words,
  2026-08-21). The product is not an algorithmic marketplace — a human
  personally vouches for every specialist — and the design should look like
  evidence of that, not an advertisement for it.
- **Project type:** marketing/trust site + patient/doctor web app (dashboard,
  booking, payments) + a distinct-but-coherent token/education sub-brand.

## Aesthetic Direction
- **Direction:** Editorial/Magazine — "a medical dossier, not a startup
  landing page." Composition-first on marketing/hero surfaces (asymmetric,
  poster-like), grid-disciplined on data-dense surfaces (dashboards, doctor
  listings) — unchanged from the prior system's layout philosophy.
- **Decoration level:** intentional — thin rules, a monospace case-number
  mark in the margin (`№ 047`), no gradients, no texture, no photography
  filters. One step up from the prior system's "minimal," to carry the
  documentary/dossier feel without becoming decorative.
- **Mood:** serious, unhurried, human — "someone here actually reads
  files." A private clinic's dossier rendered in pixels, not a benefits
  portal wearing a smile.
- **Reference sites (real, screenshotted live 2026-08-21):**
  - *Avoid:* Teladoc Health, Included Health — generic corporate
    telehealth SaaS (purple/navy, stock-photo grids, testimonial
    carousels); Bumrungrad International (the closest real competitor by
    business model — cross-border medical coordination — yet cluttered,
    competing banner colors, reads dated despite global scale).
  - *Informs:* Roche — serif display headline + generous white space +
    restraint, proof that "editorial" reads as credible at large-pharma
    scale, not just indie-studio scale.
  - *Considered and set aside:* Clinique La Prairie — monochrome,
    cinematic full-bleed photography, italic-serif "atmosphere" register.
    Real, prestigious, but colder than "seriousness without coldness"
    calls for; explored as Variant D, not chosen.
  - *Set aside as wrong genre entirely:* Phamily (Awwwards) — playful,
    illustrated, hot-pink+green pharmacy app. Good execution, wrong tone
    for a diagnosis-adjacent product.

## Typography
- **Display/Hero:** PT Serif (Bold, Italic for pull-quotes) — real Cyrillic
  support, free (Google Fonts, ParaType, SIL-compatible license),
  originally designed for official Russian-language institutional use.
  Replaces Geist for headlines only.
- **Body/UI/Labels:** Onest — grotesk with full Cyrillic coverage, free
  (Google Fonts, SIL OFL). Replaces Geist for body copy, forms, nav,
  buttons, captions.
- **Data/Tables/Token figures/Case marks:** IBM Plex Mono,
  `font-variant-numeric: tabular-nums` — unchanged from the prior system.
  Also now used for the case-number marginal mark (`№ 047`) and workflow
  metadata (`CASE-STAGE: MATCHED · SLA: 24H`).
- **Loading:** all three via `next/font/google` (Google Fonts-hosted,
  self-hostable, no separate CDN dependency).
- **Scale:** existing Tailwind default type scale (`text-sm/base/lg/xl/
  2xl/...`) stays — no new scale needed, only the font-family tokens change.

## Color
- **Approach:** restrained — one accent color per context, used sparingly
  (a single mark, a link, never a repeating badge fill).
- **Base — all pages:** warm paper `#F5F1E8` (marketing/hero sections),
  surface `#FCFAF4` (cards, replacing white). Both replace the prior
  `green-50`/`stone-50` pairing — the paper tone carries the "dossier," not
  a wash of brand color.
- **Text:** ink `#1B2620` (deep green-black, replacing `stone-900`) for
  primary text; muted `#68736E` (warm stone-gray, replacing `stone-500`/
  `stone-600`) for secondary/caption text; borders `#DEDACD` (replacing
  `stone-200`).
- **Primary accent (medical/trust pages):** terracotta `#B84D35` — replaces
  amber. Used sparingly: a case-number mark, a link underline, a status
  dot — never a broad badge fill or button color. Primary buttons use deep
  green `#1E4D3B` (new — carries competence/action, distinct from the
  terracotta accent's "human annotation" role), not the accent color.
- **Which button is "primary" (2026-08-22, confirmed by Codex + independent
  Claude subagent, unanimous):** the one action on a page that advances the
  user toward booking, paying, or submitting is primary — solid fill
  `bg-green-700` (`#1E4D3B`), white text, hover `bg-green-800`. Every other
  action (browse, filter, learn more, cancel, secondary nav) is secondary —
  `border border-stone-300 hover:border-stone-400 text-stone-900`, no fill.
  At most one primary button per page/form-step; if two candidates both
  look primary, one of them isn't actually a convert-stage action and
  should be downgraded. Terracotta is never a button fill under this rule.
  Rationale: warm/red-orange reads as caution in a medical context, not
  urgency-to-buy; green already means "go/confirm" everywhere (traffic
  signals, form validation, health status).
- **Secondary (token/education/foundation pages only):** teal `#0D9488`/
  `#14B8A6` — **unchanged**. These pages inherit the new warm-paper base
  (per the Ecosystem Extension Rule below) but keep their own accent, same
  firewall logic as before: a visitor should never confuse a token page for
  a medical-trust page or vice versa.
- **Semantic:** success `#2F6B4F`, warning `#A8722C`, error `#B0392B`, info
  `#3C5C68` — retuned to sit correctly against the warm paper base (the
  prior system's `green-400`/`amber-600`/`red-500`/`sky-500` read too cool/
  saturated against paper rather than white). Functional, not decorative —
  not a design risk.
- **Dark mode:** paper → `#14180F`, surface → `#1C2118`, ink → `#EDEAE0`,
  terracotta → `#D97A5F` (lightened for contrast), deep green → `#7FBFA0`.
  Reduce saturation slightly on the accent, same pattern as the prior
  system's dark-mode strategy.

## Spacing
- **Base unit:** 4px (Tailwind default) — unchanged.
- **Density:** comfortable — unchanged, no voice in this consultation
  (Codex, subagent, or Claude) disputed it.
- **Scale:** Tailwind defaults (`1`–`96`) — unchanged.

## Layout
- **Approach:** hybrid — grid-disciplined for content-dense pages (doctor
  listings, dashboards, bookings — unchanged from the prior system);
  creative-editorial for marketing/hero sections (new: an asymmetric
  "poster" composition instead of a centered stack — a case-file layout,
  portrait+caption on one side, headline on the other).
- **Grid:** Tailwind's default responsive grid, unchanged.
- **Max content width:** `max-w-6xl`, unchanged.
- **Border radius:** `rounded-lg` (cards/buttons), `rounded-full` (pills/
  avatars/badges) — **unchanged**, deliberately kept as continuity with the
  prior system rather than introducing a third radius scale mid-redesign.

## Motion
- **Approach:** minimal-functional — unchanged. `transition-colors`/
  `transition-all` on hover/interactive states only, no scroll-driven
  choreography, no entrance animations.
- **Easing:** default Tailwind transition easing — unchanged.
- **Duration:** Tailwind default transition durations (150-200ms) —
  unchanged.

## Ecosystem Extension Rule (unchanged in structure, updated values)

The token, education, and foundation surfaces remain **part of the same
visual system**, not a separate brand — same typography (PT Serif/Onest),
same warm-paper base, same spacing/radius/motion rules. The **only** thing
that changes on those pages is the accent color (teal instead of terracotta)
and IBM Plex Mono for numeric/ledger-style data, exactly as before. Do not
introduce a third accent, a different typeface, or different spacing/radius
rules for these sections.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-05 | Rejected full-replacement "cosmic/space" direction | Would undermine trust positioning for the medical-facing majority of the site |
| 2026-07-05 | Rejected full-replacement "archival dossier" direction (warm paper, Fraunces serif, wax-seal accent) | User's direct visual reaction was negative on the palette and the whole dossier/seal concept — abandoned rather than iterated |
| 2026-07-05 | Adopted navy→green/stone/amber system | Already validated by the 2026-07-04 `/design-review` audit as coherent and non-generic |
| 2026-07-05 – 2026-08-20 | Green/stone/amber system in production, extended for MedConnect case-pipeline UI | See `docs/decision-log/0009` and related entries |
| 2026-08-21 | Ran `/design-consultation` again, requested by Vadim ("хочу узнать что по дизайнеру") | Not triggered by a specific complaint — an open exploration |
| 2026-08-21 | Codex + independent Claude subagent, run in parallel with no shared context, both independently proposed "medical dossier" | Cross-model agreement without collusion — see full transcript `~/.gstack/projects/medbyclick/vadimrudkovsky-medconnect-...` design session for both raw outputs |
| 2026-08-21 | Live-browser research on 6 real competitors (Teladoc, Included Health, Bumrungrad, Roche, Clinique La Prairie, Phamily) before committing | Vadim explicitly requested going beyond 2 SaaS competitors to large real players — see Aesthetic Direction reference notes |
| 2026-08-21 | Built 4 real HTML comparison variants (A Dossier, B Cabinet, C Clinic/safe, D Resort) rather than describing directions in prose | AI image-mockup generation (`gstack design`) failed — no OpenAI org verification — fell back to real coded HTML variants, which Vadim reviewed directly in-browser |
| 2026-08-21 | **Flagged mid-session:** Variant A ("Dossier") is conceptually the same direction rejected 2026-07-05 | Caught by reading this file's own Decisions Log before writing — not something either AI voice or the research surfaced on its own |
| 2026-08-21 | Vadim reviewed the 2026-07-05 rejection and chose to proceed with Variant A anyway | Different typeface (real Cyrillic vs. none), different accent motif (case-mark vs. wax-seal), grounded in real research this time — Vadim's judgment that this iteration is different enough to warrant a second look. Requested the prior DESIGN.md be preserved as a fallback: `docs/archive/DESIGN.md.pre-dossier-20260821.md` |
| 2026-08-21 | Adopted: PT Serif + Onest, warm paper `#F5F1E8`, terracotta `#B84D35` accent, deep green `#1E4D3B` primary action color | Chosen over B (Cabinet — too dark/high-risk), C (Clinic — too close to status quo to differentiate), D (Resort — colder than "seriousness without coldness" calls for) |
| 2026-08-22 | `/design-review` audit found the deep-green primary-button rule was never applied sitewide — ~36 files used near-black, ~15 used terracotta as a second competing "primary" fill (both violations of this file) | Design system had been updated in `globals.css`/`DESIGN.md` but component-level button colors never migrated to match |
| 2026-08-22 | Confirmed rule sitewide (not revised): deep green is the sole primary-button color; terracotta never a button fill; "primary" = the one convert-stage action per page | Codex and an independent Claude subagent, run in parallel with no shared context, gave identical answers — see Color section above for the full rule and rationale |
