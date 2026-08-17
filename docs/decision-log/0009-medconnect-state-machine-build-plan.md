**Decision ID:** 0009
**Date:** 2026-08-17
**Title:** Phased build plan for MedConnect's full case state machine, per the new detailed module spec
**Proposed by:** Vadim (CPWO)
**Type:** CPWO-only for sequencing/scope (technical roadmap, per `docs/agents/CTO_PRODUCT.md`
Decision Authority). Individual phases below still hit existing Joint/required-consult
gates (Legal & Compliance, Medical Advisory, Medical Community) already established
elsewhere in `docs/ROADMAP.md` — this entry sequences the work, it does not clear
those gates.
**Status:** Decided (sequencing) / Phase A executed same day; later phases open pending
Vadim's pick of what to build next

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
