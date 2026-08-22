# TODOS

## T1 — Coordinator Job Description (Week 1-2, before search begins)

**What:** Write a one-page JD with required qualifications (medical coordination background, Russian + Hebrew language, intake experience) and identify 3 sourcing channels (Russian-speaking healthcare community, LinkedIn, clinical coordination agencies in Israel).

**Why:** Coordinator hire has a Month 2 hard deadline and is the critical gate for Phase 2. Without a JD and sourcing plan, search doesn't start effectively and the deadline slips.

**Pros:** Month 2 deadline achievable. Forces clarity on "good" before interviewing. The readiness gate (10 cases + 3 blind reviews) depends on the right hire.
**Cons:** ~2 hours of founder time Week 1-2.

**Context:** The coordinator will be asked to replace the founder's routing intelligence — not just manage schedules. The JD must distinguish between scheduling coordinators and clinical triage coordinators. Wrong hire = Phase 2 delayed by months.

**Depends on / blocked by:** Nothing. Starts immediately.

---

## T2 — Platform Evaluation Rubric + Shortlist (Week 2, before Day 25)

**What:** A one-page evaluation matrix applied to 3-5 specific platforms (e.g., Healthie, Jane App, Doctoralia, SimplePractice, WhatsApp Business API). Criteria: HIPAA/GDPR compliant, Israeli Patient Rights Law compliant, no patient app install required, scheduling + payments built in, supports SLA tiers, price point.

**Why:** Day 30 platform decision is a hard gate for all patient data migration. Without a shortlist, the decision is made under time pressure with incomplete information. Criteria must be established before vendor demos to reduce sales-pressure bias.

**Pros:** Day 30 decision becomes a comparison, not a search. SLA requirements from routing protocol (Issue 2A fix) become evaluation criteria.
**Cons:** ~4 hours of research time; can be delegated to a trusted advisor or the coordinator once hired.

**Context:** Platform must also satisfy the SLA tiers (standard acknowledgment, urgent escalation) now required in the case routing protocol. Build these into the evaluation matrix.

**Depends on / blocked by:** Can start in parallel with routing protocol. Rubric finalized once SLA values are set.

---

## T3 — Quality Review Triage Criteria (Phase 1, within doctor vetting standard)

**What:** A triage protocol specifying which cases get reviewed in the monthly 20% sample: (a) all new case types not seen before, (b) all cases where doctor hesitated or asked for clarification, (c) all adverse outcomes and patient complaints, (d) random fill to meet the 20%/2-per-doctor floor.

**Why:** Random 20% sampling won't catch systemic routing errors. A doctor who consistently misroutes one case type could run for months before a random sample surfaces it. Triage-based selection catches patterns faster and makes the founder's review time higher-signal.

**Pros:** Founder time focused on highest-signal cases. Systemic routing errors surface faster. Scales better as volume grows toward the capacity ceiling.
**Cons:** ~1 hour to write; slightly more overhead for coordinator to flag cases.

**Context:** The canonical quality formula (Phase 1) sets HOW MANY cases. This TODO sets WHICH ONES. Both are required for the quality monitoring mechanism to function. Add as a section within the doctor vetting standard document.

**Depends on / blocked by:** Doctor vetting standard (Phase 1 deliverable). Add triage criteria as a section within it.

---

## T4 — Paid Acquisition Channel Hypothesis (before marketing hire)

**What:** A one-page document: (a) which channel(s) are most likely to reach Russian-speaking desperate patients in Israel, (b) CAC estimate, (c) go/no-go criteria for the first paid test (target CAC, minimum volume, patient profile match).

**Why:** Marketing hire will ask "what are we testing?" on Day 1. Founder is the best source for the initial channel hypothesis — 40 years in the community, hundreds of word-of-mouth referrals that reveal where patients already find information. Without this, the marketing hire spends their first month on research the founder already holds.

**Pros:** Marketing hire starts executing, not exploring. Paid acquisition test has defined success criteria before money is spent. CAC target informs budget decisions.
**Cons:** ~2 hours of founder time; must happen before marketing hire begins.

**Context:** Test review coverage diagram flagged as [GAP]: no channel hypothesis, no test budget, no go/no-go criteria. All three needed before the first paid acquisition test can be evaluated as a success or failure.

---

## T5 — Dedicated coordinator role (userRoleEnum) instead of admin-gating /coordinator

**What:** Add a real `coordinator` value to `userRoleEnum` and re-gate
`app/coordinator/page.tsx` (the escalated/abandoned-booking queue, which
shows patient-authored `situationNotes`) to it instead of `admin`.

**Why:** Flagged by the 2026-08-20 `/autoplan` retrospective review: right
now every `admin` account can read every escalated/abandoned case's raw
notes, with no coordinator-specific audit trail or access boundary — an
interim state adopted only because no coordinator role existed yet when the
page shipped (Phase F, `docs/decision-log/0009`).

**Pros:** Real least-privilege boundary instead of "admin can see
everything." Natural fit once T1 (coordinator hire) lands — the role needs
to exist in the schema before that person can be onboarded with the right
access anyway.

**Cons:** Schema migration (one enum value) + swapping the page's role check
+ deciding who gets granted the role and how — small code change, real
process decision attached to it.

**Context:** Not urgent on its own (today's `admin` accounts are trusted,
this isn't external exposure) — but should land before or alongside T1
rather than being deferred indefinitely, since T1's hire is the first person
who should get this role instead of `admin`.

**Depends on / blocked by:** Loosely coupled to T1 — cleanest if a
coordinator role exists by the time that hire is onboarded.

---

## T6 — `bookings.caseStage` has 3 states nothing ever sets

**What:** `documents_requested`, `under_review`, and `matched` exist in the
`case_stage` enum but no write path in the codebase ever transitions a
booking into any of them — confirmed by tracing every `caseStage` write site.
Either wire real transitions into these states as part of a future case-flow
build, or explicitly document them as reserved-not-yet-used so the enum
doesn't overstate what Phase B (`docs/decision-log/0009`) actually shipped.

**Why:** Flagged by the 2026-08-20 `/autoplan` retrospective review — the
public `/medconnect` 12-step case journey and the decision-log both describe
a richer pipeline than what the write paths actually implement today
(`submitted → consultation_scheduled → closed`, plus the terminal
escalated/abandoned/transferred side-states).

**Pros:** Either resolution is cheap. Wiring them in is the more complete
fix if a doctor-facing "advance this case" UI gets built later. Documenting
them as reserved costs one sentence and removes the overstatement risk
immediately.

**Cons:** Wiring them in now would be scope creep beyond what was
authorized for the retrospective review itself — not done as part of this
pass.

**Depends on / blocked by:** Nothing — either resolution can happen
independently, whenever the doctor-facing case-detail UI (noted as "not
done, still open" in `docs/decision-log/0009`'s addendum) gets built.

---

## T7 — Primary-button color convention doesn't match DESIGN.md (sitewide)

**What:** DESIGN.md is explicit: "Primary buttons use deep green #1E4D3B
... not the accent color," yet `bg-stone-900` (ink, near-black) is the
actual primary-CTA convention in ~36 files, and `bg-amber-400`/`bg-amber-500`
(terracotta) is used as a *second* competing "primary" fill in ~15 more —
directly contradicting the same section's "never a broad badge fill or
button color" rule for the accent. `/design-review` on 2026-08-22 fixed
the single highest-leverage instance (the global nav CTA, `components/
Nav.tsx:170,291`, now `bg-green-700`) and the acute contrast failure on
the hero CTA (`app/page.tsx:58`, now `bg-amber-700` + white text) — the
rest is unfixed. Representative file list from the source audit: `app/
page.tsx:346`, `app/doctors/DoctorsGrid.tsx:25,37`, `app/specialists/
SpecialistsGrid.tsx:69,187`, `app/medcommunity/page.tsx:39`, `app/
medglobaldb/page.tsx:48`, `app/student-dashboard/page.tsx:61`, `app/
ai-diagnostics/AiDiagnosticsForm.tsx:232`, `app/checkout/mbc/
MbcForm.tsx:122,185`, `app/dashboard/MbcDashboard.tsx:112`, `modules/
medsupport/components/ChatWidget.tsx:69`, `modules/medpayments/
components/PricingCard.tsx:15,26`, `modules/medpayments/components/
PaymentSelector.tsx:142-146,169`, `app/medtoken/page.tsx:103,206`, `app/
book/BookForm.tsx:141`, `modules/medgive/components/CampaignCard.tsx:44`.

**Why:** This is the single most load-bearing, most specific rule in
DESIGN.md's Color section, and it's violated by the dominant convention
across the majority of the site's forms and CTAs — not by scattered
exceptions. Reads as a design-system update (globals.css remap) that the
component-level color usage never migrated to catch up with.

**Pros:** Once decided, mechanical — same className swap pattern used in
FINDING-005/007, repeated per file. Fixing it closes the biggest gap
between DESIGN.md and the live site.
**Cons:** ~50 files, several with two competing "primary" conventions on
the same page (e.g. homepage hero: terracotta *and* near-black solid
buttons in different sections) — deciding which action is "the" primary
CTA per page is a UX/IA call, not just a recolor, and belongs in front of
the user before a sweeping change, not decided unilaterally by an
automated pass.

**Depends on / blocked by:** Nothing technical. Blocked on an explicit
go-ahead given the blast radius and the pattern of this project routing
every visual decision through direct user sign-off.

---

## T8 — Literal `bg-white`/`text-white` bypasses the surface token remap

**What:** 34 files use raw `bg-white` for card/header surfaces (e.g.
`components/Nav.tsx:58,101,201`, `app/specialists/
SpecialistsGrid.tsx:43,126`, `app/medtoken/page.tsx` ×10, `app/
ai-diagnostics/AiDiagnosticsForm.tsx:119,131,186,201`) instead of
`bg-stone-50`, which resolves to the correct dossier surface `#FCFAF4`
via the `@theme` remap in `app/globals.css`.

**Why:** Doesn't break anything visually today — paper and surface are
both very light — but it's untracked, unmapped color that will silently
drift if the surface token ever changes, which is exactly the drift the
token remap was built to prevent.

**Pros:** Mechanical find-and-replace, low visual risk (near-identical
color today).
**Cons:** 34 files is beyond a single design-review session's CSS-first
fix budget.

**Depends on / blocked by:** Nothing.

---

## T9 — Filter/chip touch targets below the 44px minimum

**What:** Specialty filter pills in `app/specialists/
SpecialistsGrid.tsx:67-73,87-92` and `app/doctors/
DoctorsGrid.tsx:23-27,35-39` use `px-3/4 py-1.5` (~28-30px tall). The
mobile hamburger menu button (`components/Nav.tsx:181`) is ~36×36px.
`medtoken`'s "Redeem" button (`app/medtoken/page.tsx:453`) is similarly
undersized.

**Why:** Below the accessibility guideline of 44×44px minimum for touch
targets — a real usability cost on mobile, where these filter rows are
the primary way to narrow 10+ specialists.

**Pros:** Straightforward padding bump, low visual-risk CSS change.
**Cons:** Touches several files at once; deferred alongside the primary
button-color pass (T7) since together they'd have pushed the 2026-08-22
session past its self-regulation risk threshold.

**Depends on / blocked by:** Nothing.

---

## T10 — `<html lang>` doesn't follow the in-app language switcher

**What:** `app/layout.tsx:53` sets `lang="en"` and it never updates when
a user switches to Russian, Turkish, Spanish, or French via
`components/LanguageProvider.tsx:37`. Screen readers keep using English
pronunciation rules for non-English content.

**Why:** Flagged independently by the Codex outside-voice review
(2026-08-22). Real accessibility bug for a platform whose stated primary
audience is Russian-speaking patients.

**Pros:** Contained fix — set `document.documentElement.lang` in the
language provider's effect.
**Cons:** Requires a JS/behavior change, not a CSS-only fix, so it fell
outside this design-review pass's CSS-first scope.

**Depends on / blocked by:** Nothing.

---

## T11 — `/dashboard` and `/coordinator` redirect to a bare `/login` with no context

**What:** Unauthenticated visits to `/dashboard` or `/coordinator`
silently redirect to `/login` with zero explanation of why. Compare to
`/book`, which shows a friendly contextual card ("Log in to book a
consultation... booking is tied to your patient account so you can track
your request") before the same login form.

**Why:** A user who clicks "Dashboard" from the nav and lands on a bare
login form with no context is a Goodwill Reservoir drain (hidden
information about why they're there) — `/book` already solves this well;
`/dashboard`/`/coordinator` should follow the same pattern.

**Pros:** `/book`'s pattern already exists as a reference implementation
to copy.
**Cons:** Needs a redirect-reason param and conditional messaging in
`LoginForm.tsx` — behavior/routing logic, not a CSS fix.

**Depends on / blocked by:** Nothing.

---

## T12 — Miscellaneous smaller design-system gaps (source-audit findings, 2026-08-22)

Bundled because each is small in isolation:

- **Gradients contradict DESIGN.md's "no gradients" rule.**
  `avatarGradientClass` (`lib/ui/avatarColor.ts`) generates
  `bg-gradient-to-br` fills used for every doctor/specialist avatar
  circle across `app/page.tsx:288`, `app/doctors/DoctorsGrid.tsx:68`,
  `app/specialists/SpecialistsGrid.tsx:130`, and others. Thoughtful color
  choice (avoids cool tones), but the mechanism itself is banned by
  DESIGN.md's Aesthetic Direction section.
- **Raw non-token badge colors** — `bg-blue-100 text-blue-700` in `app/
  dashboard/BookingHistory.tsx:13`, `modules/medtrials/components/
  TrialCard.tsx:5`, `modules/medevents/components/EventCard.tsx:5`;
  `bg-violet-100` in `EventCard.tsx:6`; raw `bg-red-500/80` in `app/
  medtoken/page.tsx:168` instead of the defined semantic error `#B0392B`.
- **WhatsApp/Telegram icon-button contrast fails AA.** White icon on
  WhatsApp green `#25D366` measures 1.98:1; white on Telegram blue
  `#229ED9` measures 3.02:1 (`app/specialists/page.tsx:35,52`,
  `components/Nav.tsx:160,282`). Defensible as brand-recognition colors,
  but worth a darker shade or an outline treatment.
- **MedToken doesn't consistently keep its teal firewall.** DESIGN.md's
  Ecosystem Extension Rule says token/education pages keep teal as their
  only accent deviation; `app/medtoken/page.tsx:26,67` uses amber/
  terracotta in the hero and numeric cards instead.
- **No dark-mode implementation.** DESIGN.md documents a full dark
  palette (paper `#14180F`, ink `#EDEAE0`, etc. — DESIGN.md Color
  section) but `app/globals.css` has no `prefers-color-scheme: dark`
  block at all.
- **Missing accessible names on search inputs.** Placeholder-only labels
  (no visible `<label>`, no `aria-label`) on the global doctor search
  (`app/medglobaldb/page.tsx:27`), and the PubMed/clinical-trial search
  inputs (`modules/mededu/components/ArticleSearch.tsx:38`, `modules/
  medtrials/components/TrialSearch.tsx:38`).
- **No `aria-pressed` on active filter toggles** in `app/specialists/
  SpecialistsGrid.tsx:63` and `app/doctors/DoctorsGrid.tsx` — active
  state is visual-only, not exposed to assistive tech.

**Depends on / blocked by:** Nothing — independent, can be picked off in
any order.

**Depends on / blocked by:** Coordinator operational (Phase 2 gate). Write before marketing hire begins.
