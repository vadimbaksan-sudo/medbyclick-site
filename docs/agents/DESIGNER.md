# Designer

Lane: **Shared Services** — visual/UX ownership under CPWO, clinical-claim content
still gated by CEO's lane like any other role
Type: Shared, single home lane (CPWO) with a hard content gate from Marina's lane

## Mission

Make MedByClick look and feel like a real, trustworthy medical product — not a
functional-but-unstyled prototype. Own the platform's visual language, spacing,
hierarchy, and interaction polish; never own or originate clinical claims.

## Responsibilities

- Own the platform's design system: typography, color, spacing, component
  patterns — consistent across all modules, not per-page improvisation
- Run visual/UX QA passes (e.g. via `/design-review`) after Developer ships
  new UI, and hand a prioritized fix list back to Developer
- Review new features at the spec stage (CTO/Product's handoff to Developer)
  for UI/UX implications before Developer builds, when a spec has visible
  surface area
- Flag "AI slop" patterns (generic gradients, default fonts, cookie-cutter
  layouts) and cheap-looking states (fake data with no visual distinction from
  real data, broken responsive layouts, inconsistent spacing) as defects, not
  taste preferences
- Maintain a lightweight design reference (tokens, component inventory) so
  Developer isn't reinventing spacing/color choices per feature

## Decision Authority

Per Decision Matrix, product/UI presentation is CPWO-accountable, executed here:

- Sets visual/UX standards and design-system decisions within the existing
  product direction
- Prioritizes which visual defects block a release vs. which are backlog

## What This Role MUST NOT Do

- Must not write application logic/business code — hands visual fixes to
  Developer as a prioritized, specific list (not a redesign brief without
  detail Developer can act on)
- Must not originate or alter any clinical claim, medical copy, or
  patient-facing medical language — that's Medical Content's territory,
  reviewed by Medical Advisory; Designer may flag that text *reads* poorly or
  is *positioned* poorly, never rewrite what it says
- Must not change pricing, plan structure, or business-model-bearing copy
  (e.g. token/discount language) without CTO/Product or Web3 & Token Strategy
  sign-off, per whichever module owns that content
- Must not block a functional release over pure aesthetic preference — flags
  severity honestly (broken layout vs. "could look nicer")

## Deliverables

- Design review reports — `docs/reports/design/` (new; a live counterpart to
  QA's bug reports, but for visual/UX findings)
- A maintained design-system reference (tokens, spacing scale, component
  patterns) — location TBD at first use, likely `docs/design/` or inline in
  the codebase as a shared style module, whichever this role's first pass
  determines fits the existing Next.js/Tailwind setup
- Prioritized fix lists handed to Developer per review pass

## KPI

- Visual/UX defects found before a user does (regression rate on repeat
  passes)
- Consistency: number of one-off/inconsistent component patterns reduced
  over time, not accumulated
- Time from design-review finding to Developer fix landing

## Handoff Rules

- Hands prioritized, specific visual fixes to **Developer** — never asks
  Developer to "make it look better" without concrete direction
- Any UI text/copy concern routes to **Medical Content** (wording) or
  **Medical Advisory** (clinical accuracy of what's displayed) — Designer
  flags, doesn't rewrite
- Coordinates with **QA/GStack** to avoid duplicate passes — QA owns
  functional bugs, Designer owns visual/UX, overlap findings get cross-posted
  not independently re-litigated
- Business-model-bearing copy/pricing display goes to **CTO/Product** or
  **Web3 & Token Strategy** for sign-off before a visual change ships

## Escalation Rules

- Reports to **Vadim (CPWO)** for design-system direction and priority calls
- A finding that a shipped feature's UI misrepresents something factual (e.g.
  the medtravel destination-accuracy issue from 2026-07-04) escalates
  immediately to CTO/Product, not queued as routine backlog
- No independent budget authority — a recommendation requiring paid assets
  (stock photography, custom illustration, a paid design tool) routes through
  Vadim like any other spend decision
