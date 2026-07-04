# Doctor Dashboard Spec — Profile Self-Service, Registration, Booking Pipeline, Medical-History Access

Owner: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Status: **Spec — ready for Developer handoff**
Date: 2026-07-04
Trigger: `docs/reports/product/2026-07-04-core-patient-doctor-cabinets-spec.md` §7, which explicitly
flagged "a full doctor dashboard/profile-edit surface" as needing its own follow-up spec once Phase 0
core auth/DB landed. It has landed (see §0 below). This is that follow-up.

**Per this role's Must-Not-Do: this document specifies, it does not implement. Developer builds from
this; nothing here is code.** Per this role's Must-Not-Do, it also does not set clinical content or
doctor vetting standards — Part 1–4 of `docs/reports/medical/2026-07-02-doctor-vetting-standard.md`
(Medical Advisory / Medical Community) governs every vetting-related decision below; this spec only
describes how the *product* enforces that standard's outcomes.

---

## 0. Grounding — what actually exists today (confirmed by direct inspection, 2026-07-04)

- `app/doctor-dashboard/page.tsx` — the minimal version already built. Gates on `requireRole("doctor")`,
  loads `getCurrentDoctorProfile()`, lists bookings via `listBookingsForDoctorProfile()`. Read-only. If
  the authenticated user has no linked `doctor_profiles` row it shows a static "contact a coordinator"
  message. No profile view, no profile edit, no booking-status mutation of any kind.
- `lib/db/schema.ts` `doctorProfiles` table — the single source of truth resolving `medconnect.Doctor`
  and `medglobaldb.GlobalDoctor` (per the kickoff spec §2.3/§3.1). Columns of note: `userId` (nullable —
  seed/placeholder doctors have no login yet), `slug`, `name`, `title`, `specialty`, `subspecialties`
  (jsonb array), `languages` (jsonb array), `credentials`, `bio`, `endorsement`, `avatarUrl`,
  `casesHandledOverride`, `responseTime`, `institution`, `country`, `city`, `hIndex`, `publications`,
  `verified` (boolean), `vettingStatus` (enum: `pending` / `approved` / `rejected`).
- `lib/db/queries/doctors.ts` — read-only query layer today (`getDoctorProfileById`,
  `getDoctorProfileBySlug`, `listMedconnectDoctors` filtered to `vettingStatus === "approved"`,
  `listGlobalDbDoctors`, `getCasesHandledCount` derived from completed bookings). No update/insert
  function exists for `doctor_profiles` at all yet — this spec is what that update function's contract
  should be.
- `lib/db/queries/bookings.ts` — `createBooking`, `listBookingsForPatient`,
  `listBookingsForDoctorProfile`, `findDoctorProfileBySlugOrId`. No status-mutation function exists yet
  (no `updateBookingStatus`, no notes field on `bookings` at all).
- `lib/auth/dal.ts` — the established authorization pattern: `verifySession()` (server-verified via
  Supabase `getUser()`, never a client-trusted role), `getCurrentUser()`, `getCurrentDoctorProfile()`,
  `requireRole(role)` (redirect-based, for Server Components), `getAuthorizedUser(allowedRoles?)`
  (return-based, for Server Actions/Route Handlers — returns `{error: "unauthenticated"|"forbidden"}`
  instead of redirecting). Every access-control rule in this spec must route through this DAL, not a
  new ad hoc check — this is the established convention and Developer should extend it, not bypass it.
- `lib/auth/actions.ts` `registerPatient()` — the only working registration Server Action today. Its
  own comment says "Doctor self-registration is explicitly out of scope for this pass... every account
  created through this form is role: 'patient'." Confirms there is currently **no doctor registration
  path of any kind** — not self-serve, not admin-provisioned. This is a real gap this spec closes.
- `docs/reports/medical/2026-07-02-doctor-vetting-standard.md` — Medical Advisory's vetting standard.
  Part 1 lists seven hard admission gates (license verification, specialty taxonomy, disciplinary
  record, institutional affiliation, language capability, conduct-standard agreement, outcome-tracking
  consent). Part 2 assigns primary-source verification and reference checks to Medical Community, with
  the **final clinical qualification decision reserved to Medical Advisory, non-delegable**. This spec
  treats `vettingStatus` as the field that encodes "has this doctor cleared Part 1–2," and its state
  machine is owned by that process, never by the doctor.

---

## 1. Doctor profile self-service

### 1.1 Doctor-editable fields

A doctor with a linked `doctor_profiles` row (`userId` set) may edit, on their own row only:

| Field | Rationale |
|---|---|
| `bio` | Free-text self-description; no clinical claim risk beyond what credentials already gate |
| `credentials` | Text description of degrees/training — see §1.3 caveat below, this is *display* text, not a claim of verified status |
| `languages` (jsonb array) | Doctor is the authoritative source on what languages they personally speak |
| `subspecialties` (jsonb array) | Within-specialty refinement; doesn't change the taxonomy category that gates routing |
| `responseTime` | Self-declared commitment, consistent with vetting standard Part 1 gate 6 (conduct/response-time agreement) |
| `avatarUrl` | Presentational only |
| `title` | Presentational (e.g. "MD", "Prof.") |
| Contact/notification preferences, if added later (not in current schema) | Account-management, not clinical |

### 1.2 Explicitly NOT doctor-editable (server-enforced, not just hidden in UI)

| Field | Who can change it | Why |
|---|---|---|
| `vettingStatus` | Medical Community (workflow) → written by an admin/reviewer action, never the doctor's own Server Action | Vetting standard Part 2 step 5: "final clinical qualification decision... not delegable." A doctor editing their own row must never be able to set this, even indirectly (e.g. via a generic "update profile" action that whitelists this field by accident). |
| `verified` | Same as above | Same rationale — this is the boolean gate that flips a profile from "not bookable" to "bookable" in `listMedconnectDoctors()`'s filter; self-declaring it defeats the entire vetting workflow. |
| `specialty` | Admin / Medical Community only, at least at initial vetting | Changing your primary specialty after admission is effectively re-entering Part 1's specialty-taxonomy gate (vetting standard Part 1 gate 2) — should require re-review, not a self-edit. Recommend: doctor can *request* a specialty change through a form that routes to Medical Community, not a direct field edit. |
| `institution`, `country`, `city`, `hIndex`, `publications` | Admin / Medical Community only | These are exactly the fields vetting standard Part 1 gate 4 (institutional affiliation/reference validation) verifies against a primary source. Self-editing them would let a doctor claim an affiliation or publication count nobody checked. |
| `casesHandledOverride` | Admin only (and ideally deprecated — see §3.4) | This exists today only as a seed-data fallback for doctors with no real booking history; a real doctor's case count should derive from `getCasesHandledCount()` (real completed bookings), not a self-editable number. A doctor being able to inflate their own case count is an integrity problem. |
| `slug` | Admin only | Stable URL identifier; changing it breaks existing links (schema comment already notes this is carried over from mock ids for link stability). |
| `endorsement` | Medical Community only | This is explicitly *someone else's* endorsement of the doctor (e.g. an institutional reference), not self-authored content — a doctor writing their own "endorsement" defeats its purpose. |

### 1.3 Server-side enforcement pattern (concrete, matching the existing DAL convention)

Recommend a new `lib/doctor-profile/actions.ts` Server Action, e.g. `updateOwnDoctorProfile(formData)`,
that:

1. Calls `getAuthorizedUser(["doctor"])` from `lib/auth/dal.ts` (the existing return-based pattern used
   for Server Actions) — never trusts a client-supplied doctor/profile id.
2. Loads the caller's own `doctor_profiles` row via `getCurrentDoctorProfile()` and derives the row id
   from *that*, never from form input — this is what prevents a doctor from passing another doctor's
   `id` and editing someone else's row.
3. Validates input against a Zod schema (matching the `RegisterFormSchema`/`LoginFormSchema` pattern
   already in `lib/auth/validation.ts`) whose shape **only contains the §1.1 whitelist** — `vettingStatus`,
   `verified`, `specialty`, `institution`, `country`, `city`, `hIndex`, `publications`,
   `casesHandledOverride`, `slug`, `endorsement` must not appear as parseable keys in that schema at all,
   not merely be stripped after parsing. A field that doesn't exist in the schema can't be smuggled in
   via a crafted request; a field that exists but gets silently dropped is one refactor away from a
   security bug.
4. Runs the Drizzle `update` scoped by `eq(doctorProfiles.userId, session.userId)`, not by an id read
   from the request — a second belt-and-suspenders check beyond the whitelist.

This is the same shape as `registerPatient()`'s existing validate → authorize → scoped-write pattern —
no new architectural idea, just the same pattern applied to an update instead of an insert.

---

## 2. Doctor registration flow

### Recommendation: self-registration with `vettingStatus: "pending"` by default, followed by Medical Community review — not admin-provisioned-only.

Rationale, grounded in the existing vetting workflow doc and existing patient registration pattern:

- The vetting standard's Part 1–2 process is already designed around *reviewing an application*, not
  *creating an account for someone*. "Application intake (Medical Community)" is listed as Part 2 step
  1 — the standard assumes there's an application to intake. Self-registration is what produces that
  application; admin-provisioned-only would mean Medical Community has to manually create every doctor
  account before vetting even starts, which duplicates work the vetting process already does.
- It mirrors the existing `registerPatient()` pattern already built: Supabase Auth `signUp()` creates
  the identity, then a matching `public.users` row is created via Drizzle in the same action. Doctor
  self-registration should follow the identical shape — `role: "doctor"` instead of `"patient"` — so
  Developer extends a proven pattern rather than inventing a second one.
- `vettingStatus` defaults to `"pending"` in the schema already (`vettingStatusEnum(...).default("pending")`)
  — this is already the safe default; self-registration doesn't require a schema change, just a new
  Server Action and a `doctor_profiles` row insert to accompany the `users` row insert.
- Non-negotiable per the task framing and the vetting standard: **a self-registered doctor must never
  be bookable before Medical Community/Medical Advisory clear them.** `listMedconnectDoctors()` already
  filters on `vettingStatus === "approved"` — as long as the registration action does not also set
  `verified: true`, a pending doctor is automatically excluded from the bookable list without any
  additional gating logic. This is a strong existing safety net; the registration action must not
  override it.

### Concrete flow

1. Doctor visits a new `/register/doctor` route (parallel to `/register`, not a merge into the patient
   form — different required fields: specialty, credentials claim, license info intake for Medical
   Community to verify).
2. Server Action creates the Supabase Auth identity + `users` row (`role: "doctor"`) + a `doctor_profiles`
   row with `userId` set, `vettingStatus: "pending"` (default, do not override), `verified: false`
   (default, do not override), and whatever self-declared fields the form collects (name, specialty,
   claimed credentials, languages) — these are exactly the §1.1 doctor-editable fields; nothing from
   §1.2 is settable at registration either.
3. Registered-but-pending doctor can log in and reach `/doctor-dashboard`, but sees a "pending review"
   state (extending the existing "no doctor profile yet" empty state already in `app/doctor-dashboard/page.tsx`
   to a distinct "profile exists, vetting pending" state) instead of a booking list, since a
   pending/unapproved doctor should have zero bookings assigned regardless.
4. Medical Community runs Part 1–2 of the vetting standard off-platform (primary-source license
   check, references, specialty taxonomy assignment) exactly as today — this spec does not change that
   process, only gives it a real application to intake instead of nothing.
5. On approval, an admin/Medical-Community-role action (out of this dashboard's scope — likely a
   lightweight internal admin surface, not detailed here) flips `vettingStatus: "approved"` and
   `verified: true`. This is the one place those two fields change, and it must go through the same
   `getAuthorizedUser`-style check restricted to an admin/reviewer role, never the doctor's own action.

### What this does not resolve

- The internal admin/reviewer surface Medical Community uses to actually flip `vettingStatus` is not
  specified here — flagging it as a small adjacent follow-up (likely a `role: "admin"`-gated route or
  even a direct DB action run by a trusted operator in the near term, given current team size). Not
  blocking this spec's adoption; the registration flow works either way as long as *something* eventually
  flips the field through an authorized path.

---

## 3. Booking pipeline for doctors

Scope reminder per the roadmap: **no live calendar or self-service scheduling in this phase** — a human
coordinator remains in the loop for the actual scheduling. This section is about what the doctor does
with a booking a coordinator has already routed to them, not a scheduling system.

### 3.1 Current state

`app/doctor-dashboard/page.tsx` lists bookings assigned to the doctor's profile, read-only, showing
`specialty`, `requestedAt`, `situationNotes`, `status`. No mutation exists.

### 3.2 What a doctor should be able to do with an assigned booking

| Action | Status transition | Notes |
|---|---|---|
| **Confirm** | `requested` → `confirmed` | Doctor acknowledges they will take this case. Simple, low-risk — recommend building first. |
| **Mark completed** | `confirmed` → `completed` | Doctor signals the consultation happened. This is also what feeds `getCasesHandledCount()`, so this transition is the one with the most downstream effect (case-count integrity, per §1.2's note on `casesHandledOverride`) — recommend requiring `confirmed` as the only valid prior state (no skipping straight from `requested` to `completed`) so there's always a confirm step in the audit trail. |
| **Add notes** | No status change | A free-text field on the booking, doctor-authored, e.g. `doctorNotes` (new column — `bookings` table currently has no notes field at all, only the patient-authored `situationNotes`). Recommend distinct from `situationNotes` rather than overwriting it, so patient-authored intake text and doctor-authored clinical notes never collide in the same column. |
| **Decline** | `requested`/`confirmed` → back to `requested` with doctor unassigned (`doctorId: null`), **not** `cancelled` | A decline is "route this elsewhere," not "this booking didn't happen." Recommend this always notifies/flags the coordinator rather than auto-reassigning to another doctor — reassignment logic (matching rubric, availability) is coordinator/matching-workflow territory, explicitly not this dashboard's job per the no-scheduling-system constraint. |

### 3.3 What a doctor should NOT be able to do

- Reassign a booking to a *specific* other doctor directly (that's a matching/coordination decision,
  out of scope here — decline-and-return-to-pool is the doctor's whole lever).
- Change `patientId`, `urgency`, `scheduledAt`, or `source` — these are either patient/coordinator-owned
  or workflow metadata, not the doctor's to edit.
- Cancel a booking outright (`status: "cancelled"`) — recommend that stays coordinator/admin-only, since
  cancellation likely has payment/refund implications (`payments` table linkage) outside a doctor's
  authority to trigger unilaterally.

### 3.4 Enforcement pattern

Same DAL shape as §1.3: a `updateBookingAssignedToSelf(bookingId, action)`-style Server Action that
calls `getAuthorizedUser(["doctor"])`, then scopes the Drizzle `update` with
`and(eq(bookings.id, bookingId), eq(bookings.doctorId, doctorProfile.id))` — the doctor can only ever
mutate a booking that is already assigned to their own `doctor_profiles.id`, never an arbitrary booking
id. Requires adding an update function to `lib/db/queries/bookings.ts` (none exists today) plus a
migration adding `doctorNotes` to the `bookings` table.

---

## 4. Interaction with medical history — contingent on the parallel Legal & Compliance review

**This section proposes an access rule; it does not clear it for real data.** Per this role's
constraints, resolving the health-data legal question is explicitly not this spec's job — that's
`docs/reports/legal/2026-07-04-medical-history-data-handling-review.md`, in progress in parallel.
Everything below is a design proposal contingent on that review's sign-off, following the same
synthetic-data-first pattern already established for `medical_history_entries`
(`lib/db/schema.ts`'s `isSynthetic` column, hard-defaulted `true`, with the query layer's comment
noting "There is currently no insert function for this table anywhere in the codebase —
intentionally").

### 4.1 Proposed access rule (design only, not adopted until Legal clears it)

A doctor may read (and, later, write) `medical_history_entries` rows for a given patient **only if a
booking exists linking that doctor and that patient with status `confirmed` or `completed`** — never
an unconditional "doctor can see any patient's history," and never gated on `requested` status alone
(a merely-requested, not-yet-confirmed booking shouldn't open history access).

Flagging explicitly, as instructed: this must be **a DB-level check, not just an application-level
one** — i.e., not simply "the Server Action checks a booking exists before querying," but a check
structurally hard to bypass (e.g. a Postgres row-level security policy on `medical_history_entries`
joining through `bookings`, or at minimum a query that always joins through `bookings` rather than
ever taking a bare `patientId` from a doctor-authenticated caller). The current
`getSyntheticMedicalHistoryForPatient()` function takes a bare `patientId` with no doctor/booking
join at all — that shape is fine for the current *patient-viewing-their-own* synthetic-data use case,
but is explicitly the wrong shape to extend for doctor access without adding the booking-relationship
join described above.

### 4.2 What's contingent on the parallel Legal review, specifically

- Whether doctors get *any* real (non-synthetic) medical-history read/write access at all in the near
  term, or whether this stays a patient-only, synthetic-only surface until Legal clears retention/
  residency/jurisdiction questions.
- Data residency implications of a doctor (who may be in a different jurisdiction than the patient)
  reading patient health data — this is squarely the Legal review's subject matter, not decided here.
- Any write path for doctors at all — right now there is *no* insert function for this table from any
  caller, patient or doctor. Adding a doctor-write path is a strictly larger change than the read path
  and should wait even further behind Legal's sign-off than the read path does.

### 4.3 What is NOT contingent, and can be said now

The `isSynthetic` gate and the "no insert function exists" state stay exactly as they are until Legal
clears them — this spec does not propose loosening that gate. If a doctor-facing medical-history view
is built before Legal's review completes, it must render synthetic seed data only, identically to how
the patient dashboard currently does, with the same explicit "sample data" labeling convention already
established in the codebase (per the patient dashboard's honesty-badge pattern noted in the kickoff
spec §7).

---

## 5. Explicitly out of scope (deferred, not forgotten)

| Item | Why deferred |
|---|---|
| **Real-time messaging between doctor and patient** | No chat infrastructure exists; also raises the same medical-history-adjacent data-handling questions as §4 (message content could contain clinical information) without yet having Legal's sign-off framework to lean on. |
| **Doctor-side analytics/earnings dashboards** | No payments-to-doctor disbursement model exists yet in `medpayments`/`medtoken` — that's a Phase 4 (token-gated) or at minimum a separate `medpayments` extension question, not this dashboard. Building an earnings view with nothing real behind it repeats the mistake the roadmap already flags for `medtoken`'s wallet UI ("produces UI with nothing real to connect to"). |
| **Multi-clinic staff accounts** | Current schema is one `doctor_profiles` row per individual doctor with a 1:1 `userId` link — no concept of a clinic entity, staff roles under a clinic, or shared clinic-level booking inboxes. This is a data-model extension, not a dashboard feature, and isn't triggered by anything in the current roadmap phases. |
| **Live calendar / self-service scheduling** | Already explicitly out of scope per the roadmap — restated here so nothing in §3's booking-pipeline additions reads as a scheduling system. A human coordinator remains in the loop for actually placing a booking's `scheduledAt` time. |
| **Doctor-initiated specialty/taxonomy changes without review** | Per §1.2, a specialty change is treated as re-entering a vetting gate, not a self-edit — the request-based path (doctor requests, Medical Community reviews) is named as a recommendation, not specified in detail here, since it's a small variant of the same registration/vetting flow in §2. |

---

## 6. Summary of consults required (for Developer's awareness — this role does not clear these)

- **Medical Advisory / Medical Community**: any change to vetting-standard-adjacent fields or process
  (§1.2, §2) must stay consistent with `docs/reports/medical/2026-07-02-doctor-vetting-standard.md`;
  this spec does not alter that standard, only wires the product around it.
- **Legal & Compliance**: §4's medical-history access rule is a proposal, not a clearance — real
  (non-synthetic) doctor access to `medical_history_entries` waits on
  `docs/reports/legal/2026-07-04-medical-history-data-handling-review.md`.
- **QA/GStack**: per Handoff Rules, consult before marking any resulting release candidate ready,
  especially for the server-side enforcement in §1.3/§3.4 — these are exactly the kind of
  authorization-boundary code QA should verify can't be bypassed by a crafted request.
