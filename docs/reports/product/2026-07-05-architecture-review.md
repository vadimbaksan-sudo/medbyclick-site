# Architecture Review — 2026-07-05

Owner: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Status: **Point-in-time review, grounded in direct code inspection**

Trigger: Vadim asked for a full walkthrough at the end of a heavy build day (2026-07-04 into
2026-07-05): real Supabase auth + Postgres (PR #11), a logout button (PR #13), `medai` connected to
real Claude then switched to Haiku (PR #9/#10), a doctor-dashboard spec, `medtravel`
bidirectional-flow fixes (PR #14), two design-review fixes (avatar colors, dead specialty filter),
and a new `DESIGN.md`. This is a checkpoint, not a new spec — every claim below was checked against
the actual files in the repo as of this commit, not recalled from prior reports.

---

## 1. Module / data architecture map

| Module | Status | Note |
|---|---|---|
| `core` | **Real (DB-backed)** | Supabase Auth + Drizzle/Postgres schema, `registerPatient`/`loginUser`/`logoutUser` Server Actions, `lib/auth/dal.ts` session/role DAL. Not yet reachable — no live `DATABASE_URL`/Supabase project in this environment. |
| `medconnect` | **Partially real** | Booking flow is real: `lib/bookings/actions.ts` → `bookings` table → both dashboards read real rows. Browse pages (`/medconnect`, `/doctors`, `/specialists`, homepage) still import `modules/medconnect/data.ts`'s static array — `listMedconnectDoctors()` in `lib/db/queries/doctors.ts` exists and is unused by them. Doctor self-registration/profile-edit/booking-actions are **specced only, not built** (see §2). |
| `medglobaldb` | **Still mock** | `/medglobaldb` reads `modules/medglobaldb/data.ts`. `listGlobalDbDoctors()` exists in the shared query layer, unused. |
| `medai` | **Real code, not reachable** | `/medai` posts to `app/api/medai/intake`, which calls real Claude (Haiku 4.5) with red-flag detection + i18n. No `ANTHROPIC_API_KEY` configured → fails closed with a 503. Model swap (Opus→Haiku) is flagged by Medical Advisory as **behaviorally unverified** — no real model call has been tested against the no-diagnosis/no-treatment/no-reassurance rules yet (`docs/reports/medical/2026-07-04-medai-build-verification-review.md` §"New Question"). |
| `medpayments` (fiat) | **Real code, not reachable** | Stripe `PaymentIntent` + webhook routes exist, receipts persist to `payments`, dashboard reads them. No live Stripe keys. MBC/crypto checkout remain fully simulated (`localStorage`), correctly deferred to Phase 4. |
| `medtravel` | **Partially real** | Schema gained real fields today (`bookings.travelDirection`/`travelCountry`, `doctorProfiles.availableForMissionTravel`) and destination copy was corrected (Israel-only patient-travel + real Moscow/Moldova doctor-mission partners), but the browse/booking UI itself is still mock data — no query layer or booking path yet exercises the new columns. |
| `medcommunity` | Still mock | `data.ts` + `types.ts` + `index.ts`, unchanged. |
| `mededu` | Still mock | Same shape, unchanged. |
| `medevents` | Still mock | Same shape, unchanged. |
| `medpharmaccess` | Still mock | Same shape, unchanged. |
| `medsupport` | Still mock | Correctly waiting on the T2 platform decision. |
| `medtoken` | Still mock (UI only) | Now correctly uses the new teal accent per `DESIGN.md` — see §5. |
| `medtrials` | Still mock | Same shape, unchanged. |

**Foreign-key shape in `lib/db/schema.ts`** (confirmed by reading the file directly):
- `users` (1) —1:1— `patientProfiles` / `doctorProfiles` (both keyed off `users.id`, but `doctorProfiles.userId` is **nullable** — seed/placeholder doctors have no login yet).
- `bookings.patientId` → `users.id` (required); `bookings.doctorId` → `doctorProfiles.id` (nullable, and deliberately **not** `userId` — this is what lets a booking target a not-yet-onboarded seed doctor).
- `payments.userId` → `users.id`; `payments.bookingId` → `bookings.id` (nullable).
- `medicalHistoryEntries.patientId` → `users.id`; `.doctorId` → `doctorProfiles.id` (nullable).
- Travel-direction fields: `bookings.travelDirection` (enum: `patient_travels`/`doctor_travels`) + `bookings.travelCountry` live on `bookings`, nullable, medtravel-only; `doctorProfiles.availableForMissionTravel` is a boolean, explicitly commented as **not doctor-self-editable** — only an admin/Medical-Community action may set it, per the doctor-dashboard spec's whitelist rule.

## 2. Doctor self-registration/dashboard: spec landed, implementation did not

Checked directly, not assumed: `9334e4b` added `docs/reports/product/2026-07-04-doctor-dashboard-spec.md` —
a CTO/Product spec document only (per this role's Must-Not-Do, it specifies, doesn't implement). No
commit after it touches any of the files the spec calls for. Concretely, as of right now:

- `app/doctor-dashboard/page.tsx` is **unchanged** from the original Phase 0 build — `requireRole("doctor")` +
  read-only booking list. No profile view, no profile edit, no booking-status action.
- **No `/register/doctor` route exists.** `lib/auth/actions.ts`'s `registerPatient()` still hardcodes
  `role: "patient"` with its own comment: "Doctor self-registration is explicitly out of scope for this pass."
- **No `lib/doctor-profile/actions.ts`** (the spec's recommended `updateOwnDoctorProfile`) exists.
- **No booking-status mutation function exists at all** — `lib/db/queries/bookings.ts` only has
  `createBooking`, `listBookingsForPatient`, `listBookingsForDoctorProfile`,
  `findDoctorProfileBySlugOrId`. No `updateBookingStatus`/confirm/complete/decline of any kind.

**Verdict: 0% implemented.** The spec is solid and ready for Developer, but nothing described in it —
self-registration, profile self-edit whitelist, or booking actions — has landed in code. This needs a
fresh Developer handoff, not a "finish the last mile" nudge.

## 3. Security/auth posture: DAL applied consistently, no gaps found

`lib/auth/dal.ts` is the single DAL: `verifySession()` uses Supabase's `getUser()` (not `getSession()`,
correctly avoiding the documented cookie-trust pitfall), `requireRole()` for Server Components,
`getAuthorizedUser()` for Server Actions/Route Handlers. Checked every protected surface added today:

- `app/dashboard/page.tsx`, `app/doctor-dashboard/page.tsx` — `requireRole(...)`.
- `lib/bookings/actions.ts` — `getAuthorizedUser(["patient"])`, scoped correctly.
- `app/api/payments/stripe/create-intent/route.ts` — `getAuthorizedUser()`.
- `app/api/payments/stripe/webhook/route.ts` — correctly does **not** use the DAL; it verifies the
  Stripe signature instead, which is the right pattern for a vendor server-to-server callback, not a gap.

No route or action found that skips the DAL. Consistent so far — but there's currently nothing to
regress against, since the doctor-dashboard follow-on work (§2) hasn't been written yet; the spec's
whitelist requirement (never let `vettingStatus`/`verified`/etc. into a parseable Zod key) is the one
to watch when that work starts.

## 4. Known gaps still open (cross-referenced against today's reports)

1. **`medical_history_entries` stays synthetic-only.** Legal & Compliance's review
   (`docs/reports/legal/2026-07-04-medical-history-data-handling-review.md`) found *more* blockers than
   expected: an unresolved retention-vs-deletion conflict, an undecided hosting region (recommends EU,
   not US, pending the Israel entity), and an unconfirmed encryption/access-control posture on the
   storage backend. None of this is cleared — do not wire real patient data to this table.
2. **Doctor vetting standard needs schema/build work Medical Community flagged but nobody has built**:
   license number, disciplinary-check status, reference-contact fields don't exist in `doctorProfiles`
   yet, and **no admin UI exists anywhere** to flip `vettingStatus` from `pending` to `approved` — today
   that field can only be set by direct DB access.
3. **`medai`'s Haiku 4.5 swap is behaviorally unverified.** Medical Advisory's build-verification review
   is explicit: zero real model calls have been tested against the no-diagnosis/no-treatment/
   no-reassurance rules; the schema-level protections still hold, but the model choice itself isn't
   cleared until that test runs.
4. **Doctor self-registration/dashboard (§2) needs a full build**, not a finish — nothing has landed.
5. **No live vendor credentials anywhere** — Supabase project, Stripe account, and Anthropic API key all
   still need Vadim to provision them before any of Phase 0/1's "real code" is actually reachable end to end.

## 5. DESIGN.md vs. actual code: one real mismatch found

The homepage/`/specialists`/`/doctors`/doctor-detail avatar-color fix (`93ba057`, landed **before**
`DESIGN.md` was adopted later the same day) added `lib/ui/avatarColor.ts`, an 8-color gradient palette:
amber, **teal**, rose, indigo, emerald, sky, fuchsia, lime — applied to doctor avatars across every
medical-trust page.

`DESIGN.md`'s Color section is explicit on two points this violates:
- "restrained — **one accent color per context**, color is rare and meaningful, never a repeating
  decoration" — an 8-color rotating palette is the opposite of this.
- "Confined strictly to ecosystem/token/education surfaces... **Do not use teal on medical-trust
  pages**" — `avatarColor.ts`'s teal gradient is currently rendering on the homepage, `/specialists`,
  `/doctors`, and the doctor detail page, all of which are medical-trust pages by `DESIGN.md`'s own
  definition.

The specialty-filter fix (`8d8b492`) and the dead-filter-button fix don't introduce new colors — they
reuse the existing slate/amber classes and are consistent with `DESIGN.md`. `medtoken`'s pages already
use teal correctly (the one place it belongs).

**Recommendation for Developer**: replace `avatarColor.ts`'s 8-gradient palette with a small,
`DESIGN.md`-compliant set (e.g. 2-3 amber/slate tonal variants, or a single consistent treatment) —
distinct-per-doctor can still be achieved without a rainbow of off-brand colors on trust pages.

## 6. ROADMAP.md

Updated in place — see `docs/ROADMAP.md`'s Phase 1 `medconnect` row and "Doctor dashboard follow-up
spec landed" note, corrected to state plainly that implementation (not just the spec) remains
outstanding, and a new note added flagging the `avatarColor.ts`/teal mismatch as an open design-debt
item for Developer.
