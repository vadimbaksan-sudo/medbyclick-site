**Decision ID:** 0009
**Date:** 2026-08-17
**Title:** Phased build plan for MedConnect's full case state machine, per the new detailed module spec
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only for sequencing/scope (technical roadmap, per `docs/agents/CTO_PRODUCT.md`
Decision Authority). Individual phases below still hit existing Joint/required-consult
gates (Legal & Compliance, Medical Advisory, Medical Community) already established
elsewhere in `docs/ROADMAP.md` — this entry sequences the work, it does not clear
those gates.
**Status:** Decided (sequencing) / Phases A, B, D, F, H executed 2026-08-17 (same
day, per Vadim's "let's do it all" follow-up); Phases C, E, G shipped as schema +
synthetic-data UI shells only, consistent with the Legal & Compliance gate below —
not full builds. See "Addendum — What Actually Shipped" at the end of this entry.

## Context

Marina supplied `MedByClick_01_MedConnect_RU.pdf` — a detailed functional
spec for MedConnect specifically, framed as a 12-step case state machine
(intake → document upload/autostructuring → completeness gate → AI triage →
dual-route MedGlobalDB matching → doctor confirmation → consultation →
signed second-opinion report → payment/closure), plus decision points,
4 terminal statuses, integration points, compliance requirements, and
operational metrics/risks to track. Filename numbering ("01_MedConnect")
and "Подготовлено для Марины" framing suggest this is the first of a
planned series of per-module deep-dive specs, distinct from the earlier
15-module overview document.

A direct code/schema audit against this document found:

1. **Real and working:** the `bookings` table (`status`: requested/
   confirmed/completed/cancelled; `urgency`: routine/semi-urgent/urgent),
   the auth-gated booking form, and doctor-side confirm/complete/decline
   actions (`app/doctor-dashboard/BookingActions.tsx` +
   `lib/bookings/actions.ts`). This covers a thin slice of the document's
   steps 7–9 and part of 12.
2. **Real but unreachable/gated:** MedAI's symptom-intake route calls a
   real Claude model with red-flag detection, but has no
   `ANTHROPIC_API_KEY` configured in production (fails closed with a 503),
   and is separately gated pending Medical Advisory/Legal sign-off before
   touching real patient data.
3. **Still mock:** `/medconnect`, `/doctors`, `/specialists`, and
   `/medglobaldb` all read static arrays instead of the already-built
   `lib/db/queries/doctors.ts` query layer, unused since at least
   2026-07-05 per the existing roadmap note.
4. **Not present at all, not even scaffolded:** document upload/
   autostructuring, a completeness gate, dual-route ranked matching
   (doctor-direct vs. institution-routed) in MedGlobalDB, a structured
   signed second-opinion report, consilium mode, SLA timers/escalation,
   abandoned-case detection, and automated cross-module handoff on case
   closure.

In short: the document describes an operating clinical system: what
exists today is a booking-request-and-confirm loop. This entry sequences
the gap into buildable phases rather than attempting all of it at once.

## Options Considered

1. **Build the full 12-step machine in one pass.** Rejected — too large
   for one session, and several pieces (document storage, e-signature,
   SLA automation) require infrastructure/vendor decisions that are
   Vadim's to make, not something to default silently.
2. **Only fix documentation, defer all building.** Rejected — Vadim
   explicitly asked to start writing code against this document now.
3. **Phase the build, starting with the lowest-risk/already-scoped work,
   and flag which later phases need a business/infra decision before
   starting.** Adopted.

## Decision — Phased Plan

**Phase A — Close the already-known cheap gaps.** Swap `/medconnect`,
`/doctors`, `/specialists`, and `/medglobaldb` from static mock arrays to
the existing `lib/db/queries/doctors.ts` query layer (`listMedconnectDoctors()`
/ `listGlobalDbDoctors()`), which has been built and unused since
2026-07-05. No new schema, no new infra — purely wiring already-built
pieces together. **Executed same day as this entry** (see linked PR/commit).
Configuring `ANTHROPIC_API_KEY` so MedAI intake is actually reachable is a
one-line ops task (Vercel env var), not code — flagged separately, not
done here since it's not a code change.

**Phase B — Richer case status + real triage integration.** Extend the
booking lifecycle toward the document's status model (Подан / На
рассмотрении / Консультация запланирована / Заключение выдано / Закрыт,
plus Передан / Эскалирован / Оставлен as distinct states, not prose).
Wire MedAI's already-built intake into the booking flow to set urgency
from real structured output instead of a manual dropdown, once Phase A's
API key gap is closed and Medical Advisory's existing sign-off scope
covers this use.

**Phase C — Document handling.** Real file upload for case documents
(labs, prior reports, imaging) tied to a booking. **Hard gate:** per the
existing Phase 0 row in `docs/ROADMAP.md`, Legal & Compliance sign-off is
required before any real (non-synthetic) patient health data is stored —
same constraint already applied to `medicalHistoryEntries`. Can build the
schema/UI shell against synthetic data first (established pattern), but
must not accept real uploads until that sign-off lands. Needs a storage
vendor decision (Supabase Storage vs. S3-compatible) — Vadim's call.

**Phase D — Real dual-route matching in MedGlobalDB.** Replace the static
array with a scored-ranking function over `doctor_profiles` (specialty
match, sub-specialty, language, case-volume/outcomes fields already in
schema) producing two ranked lists (direct-to-doctor, via-institution)
with a one-line explanation per match — no ML needed for a first version,
a weighted-scoring function is sufficient and matches the document's
"explainable rationale" requirement.

**Phase E — Structured second-opinion report + signature.** A real form
for a `completed` booking capturing diagnosis concurrence/divergence,
alternatives, risk, next steps; a signature step. Recommend starting with
an internal signed-record (doctor identity + timestamp + content hash)
rather than a full e-signature vendor (DocuSign/HelloSign) for MVP —
vendor integration can follow once volume justifies the cost, this is
Vadim's call to confirm.

**Phase F — SLA timers, escalation, abandoned-case detection.** Needs a
scheduled job (Vercel Cron or equivalent) sweeping bookings against
urgency-based SLA thresholds, flipping status to Эскалирован/Оставлен,
and a real notification path to a coordinator — no coordinator
role/notification channel exists yet either, so this phase includes that
prerequisite.

**Phase G — Consilium mode.** Multi-doctor shared case view + consensus
capture. Lower priority — affects a minority of complex multi-specialty
cases; defer until phases B–D are live.

**Phase H — Automated cross-module handoff.** Case closure in MedConnect
auto-creating a linked MedTravel/MedTrials/MedPharmaAccess record. Depends
on those modules having real case-linking schema first (MedTravel has
partial real fields per the Phase 3 roadmap row; MedTrials/MedPharmaAccess
do not yet).

## Rationale

Phase A was executed immediately because it required no new decision —
it was already scoped, already flagged as done-but-unwired in the
existing roadmap, and carries essentially no risk (pure query-layer
swap, same data shape). Phases B onward either need a real product/infra
decision (storage vendor, signature approach, notification channel) or
sit behind an existing Legal/Medical Advisory gate this session cannot
clear unilaterally — both are reasons to sequence and confirm rather than
build silently, consistent with how MedToken's phasing conflict (decision
0008) was handled: flag the fork in the road, don't resolve it alone.

## Dissent

None recorded.

## Linked Documents

- `docs/ROADMAP.md` — `medconnect` row under Phase 1, corrected same day
- `docs/reports/product/2026-07-04-doctor-dashboard-spec.md` (existing
  booking-actions spec Phase A/B build on)
- `docs/decision-log/0008-medagent-medlogistics-and-token-phasing-flag.md`
  (same "flag, don't silently resolve" pattern for out-of-session decisions)
- Source document: `MedByClick_01_MedConnect_RU.pdf` ("Подготовлено для
  Марины", 11 августа 2026) — not committed to the repo (supplied in chat)

## Addendum — What Actually Shipped (2026-08-17, same day)

Vadim's follow-up ("давай все сделаем ок") authorized building all phases in
this entry. Executed with one hard constraint discovered mid-build: the
existing Legal & Compliance gate on real clinical content (already
established for `medical_history_entries`, see `docs/ROADMAP.md` Phase 0)
applies identically to a second-opinion report's diagnostic text, an
uploaded document's content, and a consilium opinion's text — all real
clinical *content* about a real patient/case. That gate was not cleared
this session and could not be cleared unilaterally, so **Phases C, E, G
shipped as schema + synthetic-data UI shells, mirroring the existing
`medical_history_entries`/`MedicalHistoryShell.tsx` precedent exactly** —
not as live doctor-facing write flows. Workflow *metadata* (that a case is
at a given pipeline stage) carries no clinical content and was not subject
to this gate.

**Real, working, no gate (Phases A, B, D, F, H):**
- Phase A: `/medconnect`, `/medglobaldb`, `/doctors`, `/specialists`,
  the doctor detail page, and the booking form now read the real
  `doctor_profiles` query layer with a fallback to the static mock array
  when no database is configured.
- Phase B: `bookings.caseStage` (submitted → documents_requested →
  under_review → matched → consultation_scheduled → report_issued →
  closed/transferred/escalated/abandoned) — additive, doesn't touch the
  existing doctor-facing `status` field the dashboard already gates on.
  Confirm/complete/decline actions now also advance `caseStage`. AI triage
  was deliberately **not** wired to auto-set urgency from real patient
  text — `/api/medai/intake` carries its own explicit "synthetic/test
  input only until Legal & Compliance clears real patient data going to an
  external LLM" gate, discovered while scoping this phase.
- Phase D: `lib/matching/doctorMatch.ts` — real weighted-scoring dual-route
  matching (`rankDoctorsForCase`/`rankInstitutionsForCase`), unit-tested
  (`lib/matching/doctorMatch.test.ts`, 11 cases). Not wired into a live
  page yet — `/book`'s existing specialty→doctor routing is deliberately
  curated founder-voice content for the 10 mock doctors (real hospital
  names, personal endorsement copy) and would be actively degraded by
  silently replacing it with the generic algorithm. The algorithm's real
  home is MedGlobalDB's broader pool once that page gets a case-intake
  entry point, not a forced fit into `/book`.
- Phase F: `bookings.slaDeadlineAt`/`escalatedAt`, `lib/bookings/sla.ts`'s
  `runSlaSweep()` (unit-tested deadline math in
  `lib/bookings/slaDeadline.test.ts`), `app/api/cron/sla-sweep/route.ts`
  wired via `vercel.json`'s `crons` (once/day — **this project is on the
  Vercel Hobby plan, which only permits daily cron**, not the more
  frequent sweep a real SLA system would eventually want), gated by
  `CRON_SECRET` (fails closed if unset). `app/coordinator/page.tsx` —
  the escalation/abandonment queue — gated to the `admin` role since no
  dedicated coordinator role exists yet in `userRoleEnum`.
- Phase H: `bookings.transferredToModule`/`transferredAt` +
  `transferBookingToModule()` — records that a case's follow-up moved to
  medtravel/medtrials/medpharmaccess. Deliberately minimal: those three
  modules don't have real case-linking schema of their own yet (medtravel
  has partial fields per the Phase 3 roadmap row; the other two don't), so
  this only marks the MedConnect-side intent, not a real cross-module sync.

**Schema + synthetic-only UI shell (Phases C, E, G — gated):**
- `case_documents`, `second_opinion_reports`, `consilium_opinions` tables
  (all with an `isSynthetic` column, defense-in-depth query layer in
  `lib/db/queries/case-content.ts` hard-coding `isSynthetic = true` into
  every read — same pattern as `lib/db/queries/medical-history.ts`). No
  insert path exists for any of the three, intentionally.
- `lib/signing/signRecord.ts` — the internal hash-based signing mechanism
  is real and unit-tested (`lib/signing/signRecord.test.ts`), ready to use
  the moment real report content is allowed; what's gated is the content,
  not the signing math.
- UI shells rendering `lib/db/seed/case-content.seed.ts`'s synthetic
  constants, each carrying an explicit "Synthetic example — pending Legal
  & Compliance review" badge: `app/dashboard/CaseChecklistShell.tsx`,
  `app/dashboard/SecondOpinionReportShell.tsx` (both on the patient
  dashboard), `app/doctor-dashboard/ConsiliumShell.tsx` (doctor dashboard).

**Regression caught and fixed during this pass:** Phase A's original
implementation added a `"server-only"`-importing module into
`modules/medconnect/data.ts`'s / `modules/medglobaldb/data.ts`'s import
chain, which broke the pre-existing `lib/db/seed/doctors.seed.test.ts` (bun
test can't resolve `"server-only"` the way Next's bundler does). Fixed by
splitting each into a plain `data.ts` (static array, test-safe) and a new
`getDoctors.ts` (DB-aware fetcher, `"server-only"`). Applied the same split
to `lib/bookings/sla.ts` → `lib/bookings/slaDeadline.ts` (pure) so its
deadline math is unit-tested too, and removed an unnecessary
`"server-only"` from `lib/signing/signRecord.ts` (pure crypto, no
DB/secrets, no reason to block it from tests). Full suite green after the
fix: `bun test lib/` — 56 pass, 0 fail. `bun run build` (production build)
also verified clean.

**Not done, still open for a future session:** the actual granular
doctor-facing UI to walk a case through every `caseStage` transition by
hand (today only confirm/complete/decline exist, which cover a subset of
stages); wiring Phase D's matching algorithm into a real case-intake entry
point; any real object-storage vendor decision for Phase C; any real
e-signature vendor decision for Phase E if internal hash-signing turns out
insufficient at scale.

`documents_requested`, `under_review`, and `matched` exist in the
`case_stage` enum as reserved states for that future doctor-facing case-flow
UI — no write path sets them today (`caseStage` only ever moves
`submitted → consultation_scheduled → closed`, plus the escalated/
abandoned/transferred side-states), see `TODOS.md` T6.

## Addendum 2 — Retrospective /autoplan Review (2026-08-20)

Vadim ran the shipped result above through gstack's `/autoplan` pipeline
retrospectively (CEO/Design/Eng/DX review, dual-voice Claude+Codex) to check
for gaps a pre-ship review would have caught. Full findings and decision
audit trail: `~/.gstack/projects/medbyclick/vadimrudkovsky-medconnect-retrospective-plan-20260820-230103.md`.
Summary of what changed as a result:

- **Fixed (unanimous, no gate needed):** MedConnect was unreachable from the
  mobile nav menu (a hardcoded link list, never updated when modules were
  added — same bug class as the desktop dropdown fix earlier this session,
  reintroduced on the other breakpoint); `CaseJourneySteps.tsx` step 5
  ("Doctor & institution matching") was mislabeled "Live" when the matching
  engine isn't wired into any reachable page — relabeled "Preview";
  `rounded-2xl` in two new components violated `DESIGN.md`'s radius rule —
  fixed to `rounded-lg`.
- **Fixed (Vadim's call at the review gate):** `runSlaSweep()`
  (`lib/bookings/sla.ts`) had an undocumented ordering dependency — a
  booking both overdue and long-unassigned always resolved to "escalated"
  purely because that UPDATE ran first in the code, not by design. Fixed by
  making escalation require an assigned doctor (there's someone to escalate
  to) and abandonment require no doctor (there isn't) — mutually exclusive
  by construction now, with a unit-tested pure mirror of both conditions in
  `lib/bookings/slaDeadline.ts`. The `isSynthetic` defense-in-depth pattern
  (Phases C/E/G) was enforced only by a code comment — added an ESLint rule
  banning direct imports of the three gated tables outside
  `lib/db/queries/case-content.ts`. The `"server-only"` split pattern that
  had silently caused the same test regression three times is now documented
  (`docs/conventions/server-only-split.md`) and lint-enforced for new files.
- **Deferred, tracked as debt (Vadim's call):** `/coordinator` staying
  admin-gated rather than getting a dedicated role (`TODOS.md` T5); the 3
  reserved-but-unused `caseStage` states, documented above instead of wired
  in now (`TODOS.md` T6); the public "Blocked (compliance)" status label —
  Claude read it as honest transparency, Codex as unnecessary competitive/
  investor exposure — left as-is, Vadim's explicit call given it was already
  an approved decision this same build session.
