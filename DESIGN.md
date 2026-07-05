# Design System — MedByClick

Status: adopted 2026-07-05, via `/design-consultation`. Extends and formalizes
the system already in production (validated by the 2026-07-04 `/design-review`
audit) rather than replacing it — two proposed full-replacement directions
("cosmic/space" and "archival dossier") were reviewed and rejected during
consultation; the existing navy/amber/Geist system was confirmed as the
right foundation to build the wider ecosystem on.

## Product Context
- **What this is:** MedByClick — a personally-vetted medical specialist
  network (mostly Israel-based) for Russian-speaking diaspora patients
  across CIS countries, expanding into an education module, a utility token
  (MBC) with tokenomics/checkout pages, and a planned foundation entity.
- **Who it's for:** patients seeking trusted specialist care; secondarily,
  doctors, and (on token/education pages) a broader ecosystem/community
  audience.
- **Memorable thing:** "This place can be trusted with my health." Trust and
  humanity are primary everywhere; the token/ecosystem side is secondary and
  must never read as crypto hype.
- **Project type:** marketing/trust site + patient/doctor web app (dashboard,
  booking, payments) + a distinct-but-coherent token/education sub-brand.

## Aesthetic Direction
- **Direction:** Confident, warm-professional trust network — dark navy
  authority + a single warm accent, editorial headline voice. Already
  validated in production; this system formalizes and extends it.
- **Decoration level:** minimal — typography and real content carry the
  page; no icon-in-colored-circle grids, no decorative gradients/blobs.
- **Mood:** serious but human. A confident specific claim ("When every
  doctor says they can't help — we know who can."), not a templated pitch.
- **Reference sites:** none directly copied; informed by 2026 research on
  medical-trust sites moving away from "hospital blue" toward warmth, and
  premium crypto/fintech sites (Coinbase-era) moving toward calm minimalism
  over hype — both point toward restraint, which this system already had.

## Typography
- **Display/Hero:** Geist (already in production via `next/font`) — clean,
  confident, no licensing cost, already proven on the live site.
- **Body:** Geist — same family, keeps one voice across the whole site.
- **UI/Labels:** Geist, same as body.
- **Data/Tables/Token figures:** IBM Plex Mono, `font-variant-numeric:
  tabular-nums` — new addition. Reads as audited/precise (loyalty stats,
  tokenomics numbers, booking/payment ledgers), never as a marketing counter
  animation. Free, open license (SIL OFL), self-hostable.
- **Loading:** Geist via `next/font/google` (already wired); IBM Plex Mono to
  be added the same way for any new stat/data/token components.
- **Scale:** follow existing Tailwind default type scale already in use
  across the codebase (`text-sm/base/lg/xl/2xl/...`) — no new scale needed.

## Color
- **Approach:** restrained — one accent color per context, color is rare and
  meaningful, never a repeating decoration.
- **Primary (medical/trust pages):** `amber-400`/`amber-500` (Tailwind
  default, `#FBBF24`/`#F59E0B`) on `slate-900` (`#0F172A`) — already in
  production, unchanged.
- **Secondary (token/education/foundation pages only):** `teal-600`/`teal-500`
  (Tailwind default, `#0D9488`/`#14B8A6`). New addition. Confined strictly to
  ecosystem/token/education surfaces so a visitor's brain never conflates
  "trust" pages with "token" pages — the same firewall principle validated
  earlier in consultation, now applied with the site's existing palette
  instead of a new one. Do not use teal on medical-trust pages; do not use
  amber as the primary accent on token/tokenomics pages.
- **Neutrals:** Tailwind `slate` scale (50 through 900) — already in use
  throughout the codebase.
- **Semantic:** success `green-400`/`green-500` (already used for doctor
  response-time indicators), warning `amber-600` (distinct usage from the
  brand accent — contextual, not decorative), error `red-500`, info
  `sky-500`. Semantic color is separate from the brand accent and does not
  count as a design risk — it's functional, not decorative.
- **Dark mode:** the site is dark-navy-first already (`slate-900` hero/nav
  sections) with white/light content sections — this is the existing,
  validated pattern. No separate light/dark toggle needed; the system
  already alternates dark and light sections intentionally by content type
  (dark for hero/trust-statement sections, light for content-dense sections
  like doctor listings).

## Spacing
- **Base unit:** 4px (Tailwind default) — already in use.
- **Density:** comfortable — matches existing spacing in production
  (generous padding on hero/cards, per the 2026-07-04 design audit's positive
  read on the current hero section).
- **Scale:** Tailwind defaults (`1`–`96`), already in use throughout.

## Layout
- **Approach:** grid-disciplined for content-dense pages (doctor listings,
  dashboard), hybrid for marketing/hero sections (asymmetric hero, disciplined
  grid below). Already the pattern in production.
- **Grid:** Tailwind's default responsive grid (`grid-cols-1 md:grid-cols-2
  lg:grid-cols-3` etc.), already in use.
- **Max content width:** `max-w-6xl` (already the standard container width
  across pages).
- **Border radius:** `rounded-lg` (cards/buttons), `rounded-full` (pills/
  avatars/badges) — already the pattern in use; keep this hierarchy, don't
  introduce a third radius scale.

## Motion
- **Approach:** minimal-functional — `transition-colors`/`transition-all` on
  hover/interactive states only, no scroll-driven choreography, no entrance
  animations. Matches the calm, confident trust-first tone.
- **Easing:** default Tailwind transition easing (ease-in-out equivalent).
- **Duration:** Tailwind default transition durations (150-200ms class),
  already in use — don't introduce longer/showier durations.

## Ecosystem Extension Rule (new, resolves the token/medical tension)

The token, education, and foundation surfaces are **part of the same visual
system**, not a separate brand — same Geist typeface, same navy/white base,
same spacing/radius/motion rules. The **only** thing that changes on those
pages is the accent color (teal instead of amber) and the addition of IBM
Plex Mono for any numeric/ledger-style data. This keeps one coherent site
while making sure a visitor never mistakes the token pages for a crypto-hype
site or the medical pages for a token pitch. Do not introduce a third accent,
a different typeface, or different spacing/radius rules for these sections —
extend the existing system, don't fork it.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-05 | Rejected full-replacement "cosmic/space" direction | Would undermine trust positioning for the medical-facing majority of the site; token pages are secondary, shouldn't drive the whole system |
| 2026-07-05 | Rejected full-replacement "archival dossier" direction (warm paper, Fraunces serif, wax-seal accent) | User's direct visual reaction was negative on the palette and the whole dossier/seal concept — abandoned rather than iterated |
| 2026-07-05 | Adopted: extend existing navy/amber/Geist system rather than replace it | Already validated by the 2026-07-04 `/design-review` audit as coherent and non-generic; two replacement attempts both missed — the honest read is the existing system was already right |
| 2026-07-05 | Added IBM Plex Mono for data/token figures | Reads as audited/precise rather than marketing; free, open license |
| 2026-07-05 | Added teal as the token/education/foundation-only secondary accent | Keeps ecosystem pages visually distinct from medical-trust pages without introducing a second full palette or typeface |
| 2026-07-05 | Doctor avatar fills use `stone` (warm light gray) instead of sitewide `slate`, plus one muted `green-700` "trust/hope" option | User feedback: the `slate`-based avatar gradient read as cold/"metal" once repeated across a full grid; `stone` keeps the same restrained neutral-plus-amber approach but warmer. Green is a deliberately dark/desaturated shade, distinct from the `green-400`/`500` semantic success color, so it never gets misread as a status indicator. Scoped to avatar fills only — `slate` stays the neutral scale everywhere else (text, borders, UI chrome) |
