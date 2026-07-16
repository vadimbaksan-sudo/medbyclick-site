# MedByClick — Product Roadmap

Owner: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Status: **Living document**
Extracted from `docs/WHITEPAPER.md` §18 (token-lifecycle roadmap) and `TODOS.md`,
per the known gap flagged in the CTO/Product role file's Escalation Rules. This
document is the engineering sequencing view — the whitepaper's §18 stays the
token/TGE-facing view for external readers and should be treated as downstream
of this one, not the other way around. Kept independently current here.

## Current State (as of 2026-07-05)

**2026-07-05 update:** a full architecture review (`docs/reports/product/2026-07-05-architecture-review.md`)
verified two things by direct code inspection that change the picture below: (1) the doctor
dashboard/self-registration work described under Phase 1 is **still 0% implemented** — the spec
merged, but no code followed it (see the `medconnect` row and the note under Phase 1); (2) `medtravel`'s
schema gained real `travelDirection`/`travelCountry`/`availableForMissionTravel` fields today, moving
it from "still mock" to "partially real" (schema real, browse/booking UI still mock — see Phase 3).
That review also flagged a real `DESIGN.md` compliance gap: `lib/ui/avatarColor.ts`'s 8-color gradient
palette (including teal) renders on medical-trust pages, violating `DESIGN.md`'s "one accent per
context" rule and its explicit "no teal on medical-trust pages" rule — flagged here as open design debt
for Developer, not yet fixed.


**Supersedes the 2026-07-02 baseline below — Phase 0 and half of Phase 1 have
landed in code since.** Full module-by-module detail, plus an actual
click-through verification, is in
`docs/reports/product/2026-07-04-platform-status-report.md`. Short version:
`core` (Supabase Auth + Drizzle/Postgres schema), the booking flow, the Stripe
fiat payment path, and `medai`'s real Claude-backed intake are now **real
code**, not mock. But none of it has been exercised against a live backend
yet, because **no Supabase project, Stripe account, or Anthropic API key has
been provisioned in any environment this was built in.** Every one of these
flows fails closed with a clear "not configured, contact support" message
rather than crashing or silently faking success — but that also means nobody
can click through a real signup → booking → payment loop anywhere until those
three vendor accounts exist and their keys are supplied via `.env.local` (see
`.env.example`). Provisioning those is now the single highest-priority item
blocking "the platform works fully end-to-end."

The remaining 8 modules (`medcommunity`, `mededu`, `medevents`, `medglobaldb`,
`medpharmaccess`, `medsupport`, `medtoken`, `medtravel`, `medtrials`) are still
**frontend-only mock scaffolds**, unchanged from the original baseline:
`types.ts` + `data.ts` (hardcoded arrays) + `index.ts` + one or two
presentational components. `medglobaldb` (and `medconnect`'s own browse pages)
have an extra wrinkle: a real DB query layer (`lib/db/queries/doctors.ts`)
already exists and is used by the booking flow, but the `/medconnect`,
`/medglobaldb`, `/doctors`, and `/specialists` browse pages still read the old
static mock arrays instead of calling it — see Phase 1 table below.

`app/checkout/mbc` and `app/checkout/crypto` remain fully simulated
(`localStorage` balance, manual "confirm" button, no wallet connection or
on-chain check) — correctly deferred to Phase 4 alongside `medtoken`, not a gap.

"Real functionality" in this document still means: backed by a real data store
and a real workflow, not just a nicer mock — and, as of this update, also
means *actually reachable end-to-end*, not merely code-complete against an
unprovisioned vendor account.

## Sequencing Principles

1. **Revenue-independence first.** Per whitepaper §9, the company must be
   profitable in fiat regardless of token price. Fiat payment infrastructure
   is closer to done than anything else and is the actual revenue mechanism —
   it goes first.
2. **Nothing works without Core.** Auth, user identity, and persistence block
   every other module's real-functionality work (bookings, doctor profiles,
   payment records, community posts). Core is the dependency root.
3. **Clinical features wait for Medical Advisory.** Per this role's Handoff
   Rules, any clinically-relevant build (`medai`, `medtrials`) gets a Medical
   Advisory consult before greenlighting, not after.
4. **Token-dependent features wait for the smart contract, not the other way
   around.** `medtoken`'s real functionality and the escrow parts of
   `medtravel` are structurally gated on the audited BNB Chain contract
   (whitepaper §15.5, Phase 1 of §18) — building ahead of that produces UI with
   nothing real to connect to. This is a CPWO-only tokenomics timeline
   (Decision Matrix), consulted with Web3 & Token Strategy per Handoff Rules,
   not something engineering sequencing can pull earlier.
5. **Don't build what T2 might replace.** The Day-30 coordination-platform
   decision (`docs/reports/product/2026-07-02-t2-platform-evaluation-rubric.md`)
   may make `medsupport`'s custom build redundant. That module's phase is
   explicitly contingent on T2's outcome.
6. **Localization ships by demonstrated demand, not by flag count.** See
   "Localization (12 Languages)" below — languages are added to the queue as
   real patient/doctor volume from that market appears, not built speculatively
   ahead of it.

## Phase Summary

| Phase | Focus | Modules |
|---|---|---|
| 0 | Foundation infra | `core`, `medpayments` (fiat) |
| 1 | Core product loop | `medconnect`, `medglobaldb`, `medai`, `medsupport`* |
| 2 | Trust & content | `mededu`, `medcommunity` |
| 3 | Cross-border, non-token parts | `medtravel` (logistics only), `medevents` |
| 4 | Token-gated | `medtoken`, `medtravel` (escrow), `medtrials`, `medpharmaccess` |

\* `medsupport` phase is contingent — see Phase 1 notes.

Each phase kickoff gets its own spec from CTO/Product to Developer per Handoff
Rules; this document sets order, not implementation detail.

---

## Phase 0 — Foundation Infrastructure

Kickoff spec for this phase: `docs/reports/product/2026-07-04-core-patient-doctor-cabinets-spec.md`
(also covers the Phase 1 `medconnect`/`medglobaldb` doctor-profile overlap below).
That spec recommends **Supabase (Auth + Postgres together) queried via Drizzle
ORM** as the default vendor pick for both rows below, pending Vadim's sign-off —
see that document's §1.3–1.4 and §2.1–2.2 for the full options/tradeoffs table.

| Module | Real-functionality definition | Status (2026-07-04) | Depends on | Consult |
|---|---|---|---|---|
| `core` | Real auth (session/identity), a real database, user records replacing `mockUsers`. | **Code done.** Supabase Auth + Drizzle/Postgres schema, register/login/logout Server Actions, session DAL (`getCurrentUser`/`requireUser`/`requireRole`), optimistic Proxy redirects. **Not yet reachable** — no live Supabase project/`DATABASE_URL` provisioned in any environment; every flow fails closed to a "not configured" message. | Platform decision (T2) informs whether coordinator-side identity lives here or in the T2 platform | — |
| `core` — medical history / lab results | Schema + UI shell for patient visit history and lab results, built and demoed against synthetic data only. | **UI shell done, synthetic-only by design.** `app/dashboard/MedicalHistoryShell.tsx` renders a hardcoded synthetic seed set with a visible "pending Legal & Compliance review" badge; no DB read, no input form. Correctly gated — do not wire to real data yet. | `core` auth + DB (this phase) | **Legal & Compliance — required before any real (non-synthetic) health data is stored**; may escalate Joint on the Israel-entity/Russian-citizen question already open for `medai` |
| `medpayments` (fiat path only) | Server-side Stripe `PaymentIntent` + webhook confirmation + persisted receipts. | **Code done.** `app/api/payments/stripe/create-intent` + `.../webhook` routes exist, receipts persist to `payments` table, dashboard `PaymentHistory` reads them. **Not yet reachable** — no real Stripe account/keys; `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` falls back to Stripe's own public demo key, which cannot confirm against our PaymentIntents (fails with a clear Stripe error, not a silent "success"). | `core` (need a real user/order record to attach a payment to) | Independent Auditor (release playbook flags payments/checkout as consult-required) |

MBC and crypto checkout paths in `medpayments` stay mocked through this phase —
they're correctly sequenced in Phase 4 alongside `medtoken`.

## Phase 1 — Core Product Loop

| Module | Real-functionality definition | Status (2026-07-04) | Depends on | Consult |
|---|---|---|---|---|
| `medconnect` | Real doctor profiles, real booking/matching workflow, replacing `mockDoctors`-style data. | **Booking flow: code done**, auth-gated Server Action → real `bookings` table → doctor dashboard and patient dashboard both read real rows. **Browse pages: still mock** — `/medconnect`, `/doctors`, `/specialists` all still import `modules/medconnect/data.ts`'s static array instead of the already-built `lib/db/queries/doctors.ts` query layer. Doctor self-registration and profile self-service are specced (`docs/reports/product/2026-07-04-doctor-dashboard-spec.md`) but **verified 2026-07-05: zero implementation landed** — no `/register/doctor` route, no `lib/doctor-profile/actions.ts`, no booking-status mutation function exist anywhere; `app/doctor-dashboard/page.tsx` is unchanged from the original read-only Phase 0 build. Doctor accounts today are manually provisioned only, and doctors can view but not act on (confirm/complete/decline) assigned bookings — this needs a fresh Developer handoff, not a last-mile finish. | `core`; doctor vetting standard (Medical Community, per T3) before doctors go live | Medical Community (vetting standard, doctor admission) |
| `medglobaldb` | Real specialist/clinic directory backing `medconnect`'s and `medtravel`'s cards. | **Still mock.** `/medglobaldb` reads `modules/medglobaldb/data.ts`'s static array. `listGlobalDbDoctors()` in the shared query layer exists and is ready but unused by this page. | `core` | — |
| `medai` | Real symptom-intake flow feeding coordinator triage, per whitepaper §3.4. | **Code done.** `/medai`'s `SymptomChecker` posts to `app/api/medai/intake`, which calls real Claude (Haiku 4.5) for structured intake JSON, with red-flag detection (`redFlags.ts`) and i18n. Legal + Medical Advisory reviews landed; route is scoped to synthetic/test input only pending those sign-offs on real patient data. **Not yet reachable** — no `ANTHROPIC_API_KEY` configured; fails closed with a 503 "AI intake service is not configured" message. | `core`, `medconnect` (intake needs somewhere to route to) | **Medical Advisory — required before build starts**, per this role's Must-Not-Do |
| `medsupport` | **Contingent on T2.** If Healthie/Jane App is selected, this module likely becomes an integration/embed layer against the chosen platform rather than a custom-built scheduling/coordination system. Do not spec a full custom build until the Day-30 decision lands. | **Still mock** (`ChatWidget` + static data) — unchanged, correctly waiting on T2. | T2 platform decision | QA/GStack before any release candidate |

**Resolved at Phase 1 kickoff** (was an open spec question in the prior version
of this document): `medconnect`'s `Doctor` type and `medglobaldb`'s `GlobalDoctor`
type are two shapes describing the same real-world entity. Per
`docs/reports/product/2026-07-04-core-patient-doctor-cabinets-spec.md` §2.3/§3.1,
this becomes **one `doctor_profiles` table** in `core`'s schema, with `medconnect`
(vetted local network, endorsement-driven) and `medglobaldb` (broader
international directory, academic-stats-driven) as two filtered views/queries
over it — not two parallel tables. Doctor vetting status (`vetting_status`) lives
on that shared table and gates whether a profile is bookable, tying directly to
the Medical Community consult above.

**Doctor dashboard follow-up spec landed** (per the prior version of this
document's note under `core` — medical history / lab results row — flagging
`app/doctor-dashboard` as a placeholder needing its own spec once Phase 0
auth/DB landed): `docs/reports/product/2026-07-04-doctor-dashboard-spec.md`
covers doctor profile self-service (which `doctor_profiles` fields a doctor
may edit vs. admin/Medical-Community-only, e.g. `vetting_status`/`verified`
are never doctor-editable), the doctor registration flow (recommendation:
self-registration defaulting to `vetting_status: pending`, mirroring
`registerPatient()`'s existing pattern, followed by Medical Community
review — not admin-provisioned-only), booking-status actions a doctor can
take on an already-coordinator-routed booking (confirm/complete/notes/
decline-to-pool; no scheduling system), and a proposed (not yet cleared)
DB-level access rule for doctor access to `medical_history_entries` gated on
an active/completed booking with that patient, contingent on the parallel
`docs/reports/legal/2026-07-04-medical-history-data-handling-review.md`.

**Correction (2026-07-05):** the spec above is ready for Developer but nothing in it has been built
yet — verified by direct inspection of `app/doctor-dashboard/page.tsx`, `lib/auth/actions.ts`,
`lib/db/queries/bookings.ts`, and the absence of any `/register/doctor` route or
`lib/doctor-profile/actions.ts` file. Do not treat this as done or in-progress; it needs a new
kickoff to Developer. See `docs/reports/product/2026-07-05-architecture-review.md` §2.

## Phase 2 — Trust & Content

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `mededu` | Real course/article content replacing `mockCourses`, backed by Medical Content's verified copy | `core`; Medical Content pipeline | Medical Content (copy), Medical Advisory (clinical accuracy of course content) |
| `mededu` — clinician reference section | Optional, second-priority addition within this phase: a free/low-friction clinician-facing reference area (clinical protocols, drug reference, lab reference ranges), added *after* the patient-facing content pipeline above is running, as an incremental content type on the same pipeline rather than a standalone build. Traffic/retention play for doctor-side adoption (§3.1's supply-side network), not part of the whitepaper §9 revenue model. Competitively motivated — see `docs/reports/product/2026-07-04-medelement-competitive-assessment.md` (MedElement's clinician content section). | Patient-facing `mededu` content pipeline landing first; competes for the same Medical Content/Medical Advisory review bandwidth as concurrent clinical work (`medai`, medical-history retention, doctor-dashboard vetting) — not free capacity | **Medical Content (authorship), Medical Advisory (clinical accuracy) — required, same gate as patient-facing `mededu`** |
| `medcommunity` | Real posts/threads with moderation, tied to real user accounts | `core`; a moderation policy from Medical Community | Medical Community (conduct rules, per Team Structure) |

Neither module is revenue-critical at current scale (whitepaper §9's Y1
projection doesn't lean on these); sequenced after the product loop and content
pipeline exist, ahead of anything token-gated.

## Phase 3 — Cross-Border, Non-Token Parts

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `medtravel` (logistics only) | Real clinic/hospital selection workflow and document coordination (whitepaper §3.3), **excluding** the MBC escrow mechanism. Per `docs/reports/product/2026-07-04-medtravel-bidirectional-flow-spec.md` (+ addendum), this is narrower than originally scoped: the real business is CIS-to-Israel patient travel specifically (destination list corrected to Israel-only, dropping the Germany/Thailand entries that don't reflect an actual relationship), plus a **bidirectional** second mode — Israeli doctors traveling to real partner hospitals in **Moscow and Moldova** for on-site missions — that the current data model (`bookings`, `doctor_profiles`) has no concept of at all. That spec gives Developer the concrete field-level fix (`bookings.travelDirection`/`travelCountry`, `doctorProfiles.availableForMissionTravel`), plus a flag that the actual Moscow/Moldova partner hospital names/details still need to come from Vadim/Marina before real launch copy — build the schema/UI now, don't invent placeholder hospital names. **Status (2026-07-05): partially real** — the schema fields (`bookings.travelDirection`/`travelCountry`, `doctorProfiles.availableForMissionTravel`) and corrected destination copy have landed in code; the browse/booking UI itself still reads `modules/medtravel/data.ts`'s mock array and no query layer or booking path exercises the new columns yet. | `medglobaldb`, `medconnect` | Legal & Compliance (cross-border medical travel has jurisdiction-specific requirements; the doctor-travels legal question is **answered in practice** — the visiting doctor operates under the host hospital's own licensing framework in each partnership — so the remaining ask is lower-urgency: document how that licensing arrangement actually works, not an open legal-risk review); Medical Community (whether any endorsed doctors already do informal mission work, and on what terms) |
| `medevents` | Real event/webinar listings and registration | `core` | — |

## Phase 4 — Token-Gated

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `medtoken` | Real wallet connection, real balance reads, real transaction history — contingent on the audited BNB Chain contract deployment (whitepaper §15.5, §18 Phase 1) | Smart contract audit complete; Legal documents published (§16.5) | **Web3 & Token Strategy — required**, per this role's Must-Not-Do (no unilateral tokenomics approval) |
| `medtravel` (escrow) | MBC escrow smart-contract integration (whitepaper §6, Use Case 6) | `medtoken`'s contract layer | Web3 & Token Strategy, Legal & Compliance |
| `medtrials` | Real clinical trial listings and enrollment matching, plus token referral bounties | `core`; clinical accuracy of trial data | **Medical Advisory — required** (clinical feature); Web3 & Token Strategy (bounty mechanics) |
| `medpharmaccess` | Real pharmaceutical sourcing coordination — the most regulatory-exposed module (cross-border pharma access) | `core`; jurisdiction-by-jurisdiction legal review | **Legal & Compliance — required before any build**; Medical Advisory |

`medtoken`'s real functionality (beyond UI polish on `TokenBalance`) cannot
land before Phase 1 of the whitepaper's token roadmap (§18) completes: audit,
mainnet deployment, and published legal documents. Building ahead of that
produces a wallet UI with no contract to call.

## Localization (12 Languages) — Cross-Cutting

Owner: **CTO/Product** (technical sequencing) · Required gate: **Medical Advisory**
(clinical sign-off per language, per this role's existing CEO-only authority in
`docs/governance/DECISION_MATRIX.md` — not a new decision, just that authority
applied per-language) · Consult: **Legal & Compliance** (advertising/medical-claim
rules differ by jurisdiction, notably China and Gulf states)

Decided 2026-07-06 (Vadim). Full record: `docs/decision-log/0003-localization-12-languages.md`.

**Target language set (12):** English, Turkish, Spanish, French, German, Russian,
Chinese (Mandarin), Japanese, Korean, Arabic, Italian, Portuguese.

**Source of truth:** English. Every other language is a translation of the
English copy, never translated peer-to-peer between two non-English languages
(avoids compounding drift).

**Translation standard — do not implement literal/word-for-word translation
for clinical content.** Certified medical translators only, per language.
Reason: literal translation of dosages, symptom descriptions, and medical
instructions is a patient-safety and liability risk (idiom, unit, and
cultural-context mismatches), which is exactly why Medical Advisory holds
final veto on clinical accuracy of any published claim — that authority
extends to every translated version, not just the English original. No
language variant of clinically-relevant copy (`medai`, `mededu`, doctor/patient
instructions, booking flow copy) ships without Medical Advisory sign-off *for
that language*, separate from the English sign-off.

**Sequencing (by demonstrated demand, not all 12 at once):**
1. **English + Russian** — already the platform's real audience (diaspora +
   existing base); no new build, just the formal i18n pass.
2. **Turkish** — concrete business driver (Turkish Airlines partnership
   discussion), goes next once Phase 1's core loop is real.
3. **Remaining 9** (Spanish, French, German, Chinese, Japanese, Korean, Arabic,
   Italian, Portuguese) — queued, prioritized when real patient/doctor volume
   from that market appears. Not built speculatively ahead of demand.

**Known engineering complexity, flagged now so it isn't rediscovered later:**
Arabic requires RTL layout support (not just string translation); Chinese,
Japanese, and Korean need CJK-appropriate typography/font handling, not a
drop-in of the Latin-script design system. `medai`'s intake flow already has
some i18n scaffolding (see Phase 1 above) — audit it before assuming it covers
these three properly.

## What This Document Does Not Cover

- Exact spec detail per module — that's delivered at each phase's kickoff,
  per Handoff Rules ("hands every implementation task to Developer with a
  spec — never asks Developer to figure out requirements").
- Dates. Phase order is fixed; timing depends on the T2 decision (Day 30),
  the coordinator hire (T1, Month 2 gate), and the smart contract audit
  timeline, none of which are CTO/Product-owned inputs.
- A B2B clinic practice-management (MIS) product, of the kind MedElement
  sells to clinics — considered and explicitly **rejected**, not merely
  omitted: wrong customer (clinics, not patients), wrong market position
  (competing head-on with an entrenched CIS-wide incumbent instead of
  exploiting a gap), wrong moment (no spare capacity in a two-founder team
  mid-Phase-0/1). See `docs/decision-log/0002-medelement-b2b-mis-reject.md`
  and `docs/reports/product/2026-07-04-medelement-competitive-assessment.md`.
- Token/TGE roadmap milestones (listings, liquidity, governance phases) — those
  remain in `docs/WHITEPAPER.md` §18 and are Web3 & Token Strategy's domain.
