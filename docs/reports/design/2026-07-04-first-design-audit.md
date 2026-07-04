# Design Audit — First Pass

**Date:** 2026-07-04
**Owner:** Designer (`docs/agents/DESIGNER.md`, new role — this is its first deliverable)
**Scope:** Home, `/specialists`, `/doctors`, `/doctors/[id]`, `/book`, `/dashboard` (auth-gated), `/medtravel`, `/medai`, `/checkout/stripe` (env-gated, not exercised end-to-end)
**Target:** Local dev server (`bun run dev`), no DESIGN.md exists yet in this repo

## First Impression

The homepage is meaningfully better than "generic AI output." The hero headline
("When every doctor says they can't help — we know who can.") is specific,
human-written copy with a real point of view, not a templated "Welcome to
[Product]." Real trust stats (500+ cases, 40 yrs, 3 countries, 24-48h) sit
directly under the hero. The palette (navy + amber/orange, Geist typeface) is
coherent and deliberate — not the purple-gradient AI-slop default, and Geist is
a real typeface choice, not `system-ui`/Inter-by-default.

The first three things the eye goes to: headline → orange "Browse Specialists"
button → stat bar. That's the correct hierarchy for this product.

## Findings

### FINDING-001 [High] — Every doctor rendered as an identical gray circle — fixed

**Repro (before fix):** Home, `/specialists`, `/doctors`, and `/doctors/[id]`
all rendered every doctor's avatar as the same flat gray or dark-slate circle
with a single initial letter — six separate inline implementations across the
codebase, all visually identical to each other.

**Why it mattered:** The entire product pitch is "personally vetted, individually
known specialists — not a directory." Making every doctor visually
indistinguishable from every other doctor directly undercuts that message. A
trust network should not look interchangeable.

**Fix:** Added `lib/ui/avatarColor.ts` — a deterministic name-hash-to-palette
function, so each doctor gets a distinct, consistent color across every page
they appear on. No real photos required for this pass; this is a floor, not a
ceiling (real headshots would be the next step, out of scope for a code-only
fix).

**Status:** Fixed and verified — commit `93ba057`, before/after screenshots
confirm distinct colors render correctly on `/doctors`.

### FINDING-002 [High] — Specialty filter on `/doctors` had no click handler at all — fixed

**Repro (before fix):** The filter pills ("All specialties", "Oncology",
"Cardiology", "Neurology") on `/doctors` were plain `<button>` elements with
zero `onClick` — clicking any of them did nothing. Additionally, only 4 of the
~10 real specialties present in the actual doctor data were listed (missing
Gastroenterology, Endocrinology, Orthopedic Surgery, Hematology, Rheumatology,
Pulmonology, Psychiatry).

**Why it mattered:** A control that looks interactive but does nothing is
worse than no control — it's a direct "don't make me think" / false-affordance
violation, and it silently hides most of the network from anyone who tries to
narrow their search.

**Fix:** Extracted the interactive grid into `app/doctors/DoctorsGrid.tsx` (a
client component), derived the specialty list from the real doctor data
instead of a hardcoded array, and wired real client-side filtering with an
empty state ("No specialists in {specialty} yet — tell us your case").

**Status:** Fixed and verified — commit `8d8b492`, confirmed live by clicking
"Oncology" and observing the grid correctly narrow to one doctor.

### FINDING-003 [Medium] — Same doctor card markup duplicated across 6 locations — deferred

While fixing FINDING-001/002, found the same doctor-card JSX (avatar + name +
specialty + subspecialties + endorsement) independently implemented in:
`modules/medconnect/components/DoctorCard.tsx`, `modules/medglobaldb/components/GlobalDoctorCard.tsx`,
`app/page.tsx` (homepage preview), `app/specialists/page.tsx`, `app/doctors/page.tsx`
(now `DoctorsGrid.tsx`), and `app/doctors/[id]/page.tsx` (related-doctors section).
A 2026-07-02 QA report already flagged doctor-data duplication across pages;
this is the same root cause at the component level, not yet resolved.

**Why it matters:** A future bio/credential edit has no guarantee of applying
consistently — six copy-pasted templates will drift.

**Recommendation:** Consolidate into one shared `DoctorCard` component with a
`variant` prop (compact/full) rather than six independent implementations.
This is a real refactor (not a CSS fix), flagged for Developer via CTO/Product,
not undertaken in this pass per the design-fix risk budget.

### FINDING-004 [Polish] — Homepage module grid reads as a generic SaaS icon grid

The "Everything you need, in one place" section (12 modules, icon-in-white-card
+ label) is the closest thing on the site to a recognizable template pattern.
Not flagged as high-impact since it's functional and not actively misleading,
but it's the weakest section visually relative to the rest of the page.
Deferred — a real fix here means rethinking the section's layout/content
density, not a quick CSS change, and risks scope creep on a first pass.

### FINDING-005 [Polish] — Cream/beige CTA band breaks the established navy/orange palette

The homepage's final "Ready to talk to the right specialist?" section switches
to a warm cream/beige background, the only section on the site that isn't
navy/white/orange. Minor, not fixed in this pass — flagging for the next
design-review cycle rather than risking an unreviewed color change to a
conversion-critical CTA section.

### FINDING-006 [Polish] — Pre-existing `bg-gradient-to-br` / `flex-shrink-0` Tailwind v4 canonicalization warnings

The IDE's Tailwind linter flags `bg-gradient-to-br` (should be `bg-linear-to-br`)
and `flex-shrink-0` (should be `shrink-0`) on every file touched in this pass —
this is a pre-existing pattern already used in 5+ files across the codebase,
not something introduced here. Left as-is for internal consistency; a
codebase-wide Tailwind v4 canonical-class pass is a separate, larger cleanup
task, not part of this design review.

## What Worked (no action needed)

- Palette is coherent and deliberate (navy + amber, Geist typeface) — not
  AI-slop purple gradients or default system fonts.
- Hero copy is specific and human, not templated "Welcome to X" language.
- The `/book` login-gate empty state (when unauthenticated) is well-executed:
  clear explanation of *why* login is required, two clear CTAs — not just a
  bare redirect.
- Doctor cards themselves (once avatars were fixed) read as trustworthy —
  named specialties, response-time indicator, real-sounding endorsement quotes.

## Design Score

**B-** (was likely a C+/B- before this pass; FINDING-001/002 were the two
highest-impact issues found and both are now fixed). Not scoring a full A
given FINDING-003 (component duplication risk) and FINDING-004/005 remain
open.

**AI Slop Score: B** — one recognizable pattern (module icon grid,
FINDING-004), everything else reads as intentional, not templated.

## Fix Summary

| Finding | Impact | Status | Commit |
|---|---|---|---|
| FINDING-001 (avatar sameness) | High | Fixed, verified | `93ba057` |
| FINDING-002 (dead filter) | High | Fixed, verified | `8d8b492` |
| FINDING-003 (component duplication) | Medium | Deferred — Developer task | — |
| FINDING-004 (module grid genericness) | Polish | Deferred | — |
| FINDING-005 (CTA band palette break) | Polish | Deferred | — |
| FINDING-006 (Tailwind v4 canonical classes) | Polish | Deferred (codebase-wide) | — |

## Not Reviewed This Pass

- `/dashboard`, `/doctor-dashboard`: require a live authenticated session;
  QA's 2026-07-04 pass already confirmed the auth-gate redirect works
  correctly. Full visual review of authenticated states needs staging
  credentials, same gap QA already flagged.
- `/checkout/stripe`, `/medai`: env-gated (no real Stripe/Anthropic keys in
  this environment) — graceful-failure states only, not the real interactive
  flow.
- Mobile/tablet responsive screenshots — not captured this pass; recommend for
  next cycle.
