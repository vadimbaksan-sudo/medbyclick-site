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
- **Direction:** Confident, warm-professional trust network — light,
  hopeful warmth (soft green + warm light gray) instead of dark-navy
  authority, plus a single warm accent (amber), editorial headline voice.
  Revised 2026-07-05 per direct user feedback: dark navy/slate read as
  cold and "metallic" once seen across full pages and avatar grids; green
  ("color of hope," associated with health) plus a warm neutral reads more
  human for a medical-trust product. See Decisions Log.
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
  meaningful, never a repeating decoration. Revised 2026-07-05: the shared
  *base* (formerly dark navy) is now a light green + warm gray pairing; the
  accent layer (amber for medical, teal for token/education) is unchanged.
- **Base — hero / "authority" sections (all pages):** `green-50` (`#F0FDF4`)
  wash, replacing `bg-slate-900`. Text on this section switches from white
  to `stone-900` (`#1C1917`); secondary/caption text uses `stone-600`/
  `stone-500` instead of `slate-300`/`slate-400`; dividers use `stone-200`
  instead of `slate-800`.
- **Base — content sections (all pages):** `stone-50` (`#FAFAF9`), replacing
  plain white/`slate-50` page backgrounds — a warm light gray, not the cool
  blue-cast `slate` scale. Cards within these sections stay `bg-white` with
  `border-stone-200` so they lift off the wash, same visual hierarchy as
  before (white cards on a tinted page), just warmer.
- **Neutrals:** Tailwind `stone` scale (50 through 900), replacing `slate`
  everywhere — text, borders, UI chrome, non-accent buttons. `slate` had a
  cool blue undertone that read as "metal" once seen across full pages and
  avatar grids (user feedback, 2026-07-05); `stone` keeps the same restrained
  neutral-plus-amber approach but warmer. Non-accent solid buttons (e.g. a
  secondary "confirm"/"submit" action) use `stone-900`/`stone-700` where they
  previously used `slate-900`/`slate-700`.
- **Primary accent (medical/trust pages):** `amber-400`/`amber-500`
  (`#FBBF24`/`#F59E0B`) — unchanged. On the new light green/stone base,
  eyebrow labels and small accent text that used to be `amber-400` (for
  contrast against dark navy) become `amber-700`/`amber-600` for contrast
  against the light base; button fills (`bg-amber-500`) are unchanged.
- **Secondary (token/education/foundation pages only):** `teal-600`/`teal-500`
  (`#0D9488`/`#14B8A6`) — unchanged, still confined strictly to
  ecosystem/token/education surfaces so a visitor's brain never conflates
  "trust" pages with "token" pages. Do not use teal on medical-trust pages;
  do not use amber as the primary accent on token/tokenomics pages. These
  pages get the same base swap (green/stone instead of navy/white) as
  medical pages — only the accent differs, per the Ecosystem Extension Rule
  below.
- **Semantic:** success `green-400`/`green-500` (already used for doctor
  response-time indicators), warning `amber-600`, error `red-500`, info
  `sky-500`. These are mid-tone/saturated shades, clearly distinct from the
  pale `green-50` base wash — a status indicator is never confused with the
  page background. Semantic color is separate from the brand accent and does
  not count as a design risk — it's functional, not decorative.
- **Light-first:** the site is light-first — no more dark-navy hero
  sections. Visual rhythm between sections now comes from alternating
  `green-50` (hero/statement sections) and `stone-50` (content-dense
  sections), rather than from a dark/light contrast.

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
system**, not a separate brand — same Geist typeface, same green/stone base
(revised 2026-07-05, was navy/white), same spacing/radius/motion rules. The
**only** thing that changes on those pages is the accent color (teal instead
of amber) and the addition of IBM Plex Mono for any numeric/ledger-style
data. This keeps one coherent site while making sure a visitor never
mistakes the token pages for a crypto-hype site or the medical pages for a
token pitch. Do not introduce a third accent, a different typeface, or
different spacing/radius rules for these sections — extend the existing
system, don't fork it.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-05 | Rejected full-replacement "cosmic/space" direction | Would undermine trust positioning for the medical-facing majority of the site; token pages are secondary, shouldn't drive the whole system |
| 2026-07-05 | Rejected full-replacement "archival dossier" direction (warm paper, Fraunces serif, wax-seal accent) | User's direct visual reaction was negative on the palette and the whole dossier/seal concept — abandoned rather than iterated |
| 2026-07-05 | Adopted: extend existing navy/amber/Geist system rather than replace it | Already validated by the 2026-07-04 `/design-review` audit as coherent and non-generic; two replacement attempts both missed — the honest read is the existing system was already right |
| 2026-07-05 | Added IBM Plex Mono for data/token figures | Reads as audited/precise rather than marketing; free, open license |
| 2026-07-05 | Added teal as the token/education/foundation-only secondary accent | Keeps ecosystem pages visually distinct from medical-trust pages without introducing a second full palette or typeface |
| 2026-07-05 | Doctor avatar fills use `stone` (warm light gray) instead of sitewide `slate`, plus one muted `green-700` "trust/hope" option | User feedback: the `slate`-based avatar gradient read as cold/"metal" once repeated across a full grid; `stone` keeps the same restrained neutral-plus-amber approach but warmer. Green is a deliberately dark/desaturated shade, distinct from the `green-400`/`500` semantic success color, so it never gets misread as a status indicator. Scoped to avatar fills only at the time — extended sitewide same day, see next row |
| 2026-07-05 | Replaced the dark-navy (`slate-900`) base sitewide with a light `green-50` (hero sections) + `stone-50` (content sections) pairing; replaced `slate` neutrals with `stone` everywhere, not just avatars | Direct user feedback after seeing the avatar fix and the live site: the same "metal" critique applied to the whole site, not just avatars — user explicitly asked for green ("color of hope") + warm light gray as the two primary colors, confirmed via a live before/after preview on /specialists before wider rollout. Amber/teal accent layer and the medical/token firewall are unchanged — only the shared base and neutral scale moved |
