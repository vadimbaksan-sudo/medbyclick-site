# Phase 0/1 Kickoff Spec — Real Patient & Doctor Cabinets (Auth, DB, Booking, Payments, Medical History)

Owner: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Status: **Spec — ready for Developer handoff pending Vadim's vendor pick**
Date: 2026-07-04
Requested by: Vadim (CPWO) — "build the real patient and doctor personal accounts" (ЛК врача и пациента): booking, payments, medical/visit history, lab/analysis results.
Scope: This is the Phase 0 (`core`, `medpayments` fiat) + Phase 1 (`medconnect`, `medglobaldb`) kickoff per `docs/ROADMAP.md`, plus one new scope item (medical history/lab results) not previously on the roadmap — see §5.

**Per this role's Must-Not-Do: this document specifies, it does not implement. Developer builds from this; nothing here is code.**

---

## 0. Grounding — current mock state (read before estimating anything)

Confirmed by direct inspection on 2026-07-04:

- `modules/core/{types.ts,data.ts,index.ts}` — the *entire* current "core" module. `types.ts` defines `User { id, email, name, role: "patient"|"doctor"|"admin", createdAt }` and `Session { userId, token, expiresAt }`. `data.ts` is two hardcoded users. No auth logic, no password field, no hashing, nothing persisted. This is a placeholder, not a partial implementation — there is nothing to migrate, only a shape to keep or discard.
- `app/login/page.tsx`, `app/register/page.tsx` — static forms, `<form>` with no `action`, no submit handler at all. Pure UI shell.
- `app/dashboard/MbcDashboard.tsx` — reads/writes `localStorage` (`mbc_balance`, `mbc_transactions`) client-side. No auth gate, no server component, no real user. This is the "mock MBC balance with no auth" the 2026-07-02 QA report flagged. It gets replaced by the real per-user cabinet this spec defines (see §7).
- `modules/medconnect/{types.ts,data.ts}` — `Doctor` interface (id, name, title, specialty, subspecialties, languages, credentials, endorsement, bio, casesHandled, responseTime, avatar) with 11 hardcoded doctors. No availability, no slots, no relationship to `core.User`.
- `modules/medglobaldb/{types.ts,data.ts}` — separate `GlobalDoctor` interface (id, name, title, specialty, institution, country, city, languages, hIndex, publications, verified) with 5 hardcoded international doctors. **Confirms the roadmap's flagged overlap**: `medconnect.Doctor` and `medglobaldb.GlobalDoctor` are two different shapes describing the same real-world concept (a doctor), with no shared identity. This spec resolves that overlap in §3.1 — it's Phase 1 kickoff's job per the roadmap's own note, not deferred further.
- `app/book/BookForm.tsx` — client form, `handleSubmit` does `setTimeout(() => setFormState("success"), 1200)`. No network call, nothing persisted, nothing sent anywhere. Fully cosmetic.
- `modules/medpayments/{types.ts,data.ts}` — `PricingPlan` (Case Review $150, Care Coordination $490, Ongoing Access $290/mo) and `PaymentMethod` (stripe, usdt-erc20, usdt-trc20, mbc). No order/receipt/invoice type exists anywhere in this module.
- `app/checkout/stripe/StripeForm.tsx` — real `@stripe/react-stripe-js` `Elements` + `CardElement` against a **hardcoded test publishable key** (`pk_test_TYooMQauvdEDq54NiTphI7jx`, Stripe's public demo key, not even a real test account). Calls `stripe.createPaymentMethod()` client-side, gets a `paymentMethod.id`, then just does `console.log(...)` and flips UI to a success state. **There is no `app/api` route for Stripe at all** — no `PaymentIntent` creation, no webhook, nothing server-side. The comment in the code literally says "send paymentMethod.id to your backend to confirm the PaymentIntent" — that backend does not exist.
- `app/checkout/mbc`, `app/checkout/crypto` — fully simulated, no wallet connection, no on-chain check. Correctly out of scope for this spec (Phase 4 per roadmap).
- `app/api/medai/intake/route.ts` — the **only** real API route in the repo today. It's a good pattern to imitate structurally (Route Handler, server-side SDK client construction, input validation, typed response) — but it is stateless (no DB read/write) and explicitly scoped to synthetic data only pending Legal & Compliance clearance. Useful as a Next-16-Route-Handler reference, not as a data-layer reference.
- `package.json` — **zero** auth libraries, **zero** ORM/DB drivers, **zero** DB client of any kind in `dependencies` or `devDependencies`. `@anthropic-ai/sdk` and `@stripe/react-stripe-js`/`@stripe/stripe-js` are the only "real" (non-Next/React/Tailwind) packages installed. This confirms the roadmap's "Current State" claim precisely — nothing here is a database or auth library in disguise.
- `modules/medai` is further along (real Anthropic SDK wiring, red-flag gate, intake logic, i18n) but is a consumer of `core`, not a dependency for it — noted here only because Phase 1's `medai` line depends on `core` existing (per roadmap), which is what this spec delivers.

**Conclusion: every recommendation below is a from-scratch build, not a migration.** There is no existing auth code, schema, or persisted data to preserve compatibility with — this is the good kind of green field.

---

## 1. Auth & Core User Model

### 1.1 What "real" means here

Real auth = server-verified identity (not `localStorage`), password (or equivalent) storage that's actually hashed, session tokens that are unforgeable and revocable, and a role system (`patient` / `doctor` / `admin`) enforced server-side on every protected route and Route Handler — not just hidden in the UI. `modules/core/types.ts`'s `User.role` field is a fine starting shape; keep it, but it currently does nothing.

### 1.2 A genuinely non-standard-Next.js note (read this before writing any auth code)

This repo's `AGENTS.md` is not decoration — this is Next.js **16.2.9**, and a direct read of `node_modules/next/dist/docs/01-app/02-guides/authentication.md` (the shipped guide for this exact version) surfaced two concrete breaking-change-shaped things Developer must know before starting:

1. **Middleware is called Proxy in this version, and it's a different file.** The auth guide's own optimistic-auth-check example is written against `proxy.ts` (not `middleware.ts`), with `export default async function proxy(req)`. Anyone pattern-matching against pre-16 Next.js tutorials (which all say `middleware.ts`) will silently write a file Next 16 never invokes. Confirm the exact file-convention name and location against `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/` before wiring route protection this way.
2. **`forbidden()`/`unauthorized()` are experimental and gated behind a config flag.** `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/authInterrupts.md` confirms these two functions (clean 401/403 API-reference primitives) only work if `experimental: { authInterrupts: true }` is set in `next.config.js`, and the linked file-convention docs (`app/api-reference/file-conventions/forbidden.md`, `unauthorized.md`) must be read to use them correctly. Decide once, up front, whether to enable this flag and use the built-in primitives, or hand-roll 401/403 responses (as `app/api/medai/intake/route.ts` already does with plain `NextResponse.json(..., { status: 401 })`) — don't mix both approaches across routes.

Neither of these blocks a choice below, but whichever auth approach is picked, Developer must re-derive the exact Route Handler / Proxy / cookie API shape from the docs in `node_modules/next/dist/docs/` for this installed version, not from training-data memory of "how Next.js auth normally works." This is the single most likely source of a silently-broken auth flow in this build.

### 1.3 Options (vendor/cost decision — Vadim decides)

| Option | What it is | Pros | Cons | Rough cost |
|---|---|---|---|---|
| **A. Auth.js / NextAuth v5** | Open-source, self-hosted session/OAuth library, officially listed in the Next 16 auth guide's resource list | Free; full control over `User`/`Session` schema (fits directly over `modules/core/types.ts`); no vendor lock-in; works with any DB via an adapter; supports credentials (email/password) and social login later | You own session storage, password hashing, and role logic yourself — more code to write and get right (esp. for health-data-adjacent product, mistakes here are costly); v5 for Next 16 app router is real work to wire correctly per the docs above, not drop-in | $0 vendor cost; developer time cost is the real cost |
| **B. Clerk** | Hosted auth-as-a-service (listed in the same Next 16 guide) | Fast to integrate; handles MFA, session revocation, role/organization metadata, email verification, password reset out of the box; less custom security-critical code to write | Recurring per-MAU cost; patient PII (email, name) lives partly in a third-party vendor's systems — another data-processor relationship to track alongside the LLM DPA question Legal & Compliance already flagged for `medai`; less schema control (roles live in Clerk's metadata, not your DB, unless synced) | Free tier ~10k MAU, then per-MAU pricing (verify current tier against Clerk's live pricing page before committing — do not assume 2025 numbers are current) |
| **C. Supabase Auth** | Hosted auth bundled with a hosted Postgres DB (also listed in the Next 16 guide) | One vendor for both auth *and* the database (see §2) — session data, user table, and app data all in one Postgres instance, simpler mental model and fewer moving parts; open row-level-security model fits patient-data access control naturally | Tighter coupling to one vendor for two decisions at once (if you want a different DB provider later, migrating auth is coupled to migrating data); still a data-processor relationship to document | Free tier, then usage-based (DB size + auth MAU) — verify current pricing before committing |

### 1.4 Recommendation

**Option C — Supabase (Auth + Postgres together).** Reasoning: this build needs both a real auth system *and* a real database simultaneously (per §2, the DB decision is not optional or deferrable — it blocks booking, payments, and medical history alike). Buying both from one vendor collapses two vendor-decision cycles into one, gives Postgres row-level security as a natural enforcement layer for "a patient can only read their own medical history / a doctor can only read their assigned patients' bookings" (exactly the access-control shape this product needs), and avoids hand-rolling session/password security for a product that will hold health data. The lock-in cost is real but acceptable at this stage — the alternative (custom Auth.js + separately-hosted DB) is more total integration work for a two-person AI-driven dev pipeline to get right on the first pass, and the cost of getting session security wrong on a health-data product is asymmetrically worse than the cost of vendor lock-in.

**This is Vadim's call to confirm, not mine to finalize unilaterally** — flagging per this role's constraint: real recurring vendor cost, pick before Developer starts.

### 1.5 Core schema implication

Keep `modules/core/types.ts`'s `User.role: "patient" | "doctor" | "admin"` — it's already correctly shaped. Whichever option is picked, the `role` field must be enforced server-side (Route Handler / DAL check per the Next 16 auth guide's Data Access Layer pattern — see `node_modules/next/dist/docs/01-app/02-guides/authentication.md` "Creating a Data Access Layer (DAL)" section), never trusted from client state or hidden via UI-only conditionals — the guide explicitly warns against the "SPA pattern" of `return null` for unauthorized users because Next's multiple entry points (Server Actions, Route Handlers, nested segments) can all be hit directly regardless of what a layout renders.

---

## 2. Database Choice & Schema Outline

### 2.1 Options (vendor/cost decision — Vadim decides, coupled to §1.4 if Supabase is picked)

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **A. Supabase Postgres + Drizzle or Supabase's JS client** | Bundled with Option C auth above; managed Postgres; built-in row-level security; generous free tier for MVP scale | Vendor lock-in (shared with auth decision) | Free tier, then usage-based |
| **B. Neon (serverless Postgres) + Drizzle ORM** | Best-in-class serverless Postgres (branching, scale-to-zero — cheap for low early traffic); Drizzle is lightweight, type-safe, and has a smaller footprint than Prisma; decoupled from auth vendor so either auth Option A or B above pairs with it independently | One more vendor relationship if Supabase (auth) is picked separately; no built-in auth, so pairs naturally with Option A (Auth.js) not Option C | Free tier generous; usage-based beyond it |
| **C. Vercel Postgres (Neon under the hood) + Prisma** | Simplest ops story if already deploying on Vercel; Prisma has the largest ecosystem/docs footprint, easiest for an AI-driven dev loop to get right on the first pass since it's the most-documented ORM in training data | Prisma's schema-migration workflow is heavier than Drizzle's; slightly higher cold-start latency historically vs. Drizzle+raw SQL | Vercel Postgres pricing tiers — verify current numbers before committing |

### 2.2 Recommendation

**If Option C (Supabase) is picked for auth in §1.4: use Supabase's own Postgres instance, queried via Drizzle ORM** (Drizzle has a documented Supabase integration path and keeps query code type-safe and close to raw SQL — easier to audit for a health-data product than a heavier ORM's generated abstractions). This is the one-vendor-for-auth-and-data path recommended above.

If Vadim overrides §1.4 and picks Option A or B for auth instead, then **Neon + Drizzle** is the fallback DB recommendation — same ORM either way, so Developer's query code doesn't have to change if the vendor decision shifts later.

### 2.3 Schema outline (conceptual — not DDL; Developer designs exact columns/constraints/migrations)

```
users
  id, email (unique), password_hash (or vendor-managed if Clerk/Supabase Auth handles it),
  role: patient | doctor | admin, name, locale (ru/en/he — relevant given the
  diaspora-facing product), created_at, updated_at
  — replaces modules/core/types.ts's mockUsers; keep the role enum, drop nothing

patient_profiles (1:1 with users where role=patient)
  user_id (FK), date_of_birth, phone, preferred_language, citizenship_or_country
  — NOTE: "citizenship_or_country" is not decorative. The 2026-07-04 Legal &
  Compliance review (docs/reports/legal/2026-07-04-medai-llm-data-handling-review.md
  §1) explicitly recommends the product track citizenship/registration-country as
  a proxy, not just language preference, because 152-FZ's localization duty
  attaches to Russian citizenship, not Russian-language UI usage. Capturing this
  field at registration is cheap now and unblocks that open Joint decision later
  — flag to Developer as a field to include even though its consumer (the
  Russian-citizen data-handling policy) isn't built yet.

doctor_profiles (1:1 with users where role=doctor)
  user_id (FK), specialty, subspecialties[], languages[], credentials, bio,
  endorsement, institution, country, city, verified: bool, vetting_status:
  pending | approved | rejected
  — this is the schema-level resolution of the medconnect/medglobaldb overlap
  flagged in the roadmap: one doctor_profiles table, both modules query it with
  different filters/views (medconnect = vetted local network with endorsements;
  medglobaldb = broader international directory with h-index/publications —
  add those as nullable fields on the same table, or a doctor_academic_stats
  1:1 extension table if the fields feel like a distinct concern). Do not keep
  two parallel doctor tables — that's the exact duplication the roadmap flagged.
  verified/vetting_status ties directly to Medical Community's vetting standard
  (Phase 1 dependency per roadmap — doctors don't go "live" without it)

bookings
  id, patient_id (FK users), doctor_id (FK users), status: requested | confirmed
  | completed | cancelled, requested_at, scheduled_at (nullable until confirmed),
  specialty, situation_notes, urgency, language, source (which plan/flow created it)
  — replaces app/book/BookForm.tsx's setTimeout-fake-success with a persisted row

payments
  id, user_id (FK), booking_id (FK, nullable — not all payments are booking-tied,
  e.g. subscription), plan_id (references modules/medpayments plan ids),
  amount, currency, payment_method: card | crypto | mbc, status: pending |
  succeeded | failed | refunded, provider: stripe (others later),
  provider_payment_intent_id, receipt_url or generated_receipt_ref, created_at
  — this is the persisted-receipt table the roadmap's Phase 0 line calls for

medical_history_entries (new — see §5 for why this is new scope)
  id, patient_id (FK users), entry_type: visit_note | lab_result | prescription
  | diagnosis, doctor_id (FK, nullable — some entries are patient-uploaded, not
  doctor-authored), title, body_or_structured_payload, attachment_ref (file
  storage pointer, not inline blob), recorded_at, created_at
  — deliberately generic entry_type rather than separate tables per type at
  this stage; Developer can split into typed tables later once real usage
  patterns are known. Structure only — see §5 for why storage of this table's
  actual data is gated on a Legal & Compliance consult, not just a schema design
  question.
```

This is intentionally conceptual — Developer designs the actual DDL, indexes, foreign key constraints, and migration files. The point of this outline is that Developer isn't guessing at what entities need to exist or how they relate; the *exact* column types, nullability, and constraints are implementation detail Developer owns.

---

## 3. Booking Flow Spec (`medconnect` / `medglobaldb`)

### 3.1 Resolve the doctor-profile overlap now (open question the roadmap explicitly deferred to Phase 1 kickoff)

Per §2.3: one `doctor_profiles` table backing both modules. `medconnect`'s current 11 hardcoded doctors (Elena Volkova, Mikhail Stern, etc. — all Israel-based, Russian-speaking-diaspora-facing, with the personal "endorsement" copy that's core to MedByClick's trust-network model) and `medglobaldb`'s 5 hardcoded doctors (international, academic-stats-focused: h-index, publications) become two *views* over the same table, not two schemas. Concretely:
- `medconnect`'s doctor cards query `doctor_profiles WHERE vetting_status = 'approved'` and surface `endorsement`, `credentials`, `casesHandled`, `responseTime`.
- `medglobaldb`'s directory queries the same table more broadly (including doctors without a `medconnect`-style endorsement yet) and surfaces `institution`, `country`, `hIndex`, `publications`.

Migration note for Developer: the 11 existing `medconnect` doctors and 5 `medglobaldb` doctors are believable seed data, not real vetted doctors — do not treat their presence as "these are real doctors we can go live with." Real doctor onboarding requires Medical Community's vetting workflow (Phase 1 dependency, per roadmap) before `vetting_status` can be set to `approved` for anyone.

### 3.2 Real booking flow (replacing `app/book/BookForm.tsx`'s fake `setTimeout`)

1. Patient (authenticated — booking requires a real `patient` session, this is the first place auth actually gates something) submits the existing form fields (name/email prefilled from session, doctor, specialty, situation, urgency, language) via a Server Action or Route Handler (Developer's choice per the Next 16 docs — either is idiomatic per `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md` and the Server Actions guide it cross-references).
2. Server inserts a `bookings` row with `status: requested`.
3. No real-time doctor-side scheduling/calendar integration is in scope for this first pass — `scheduled_at` stays null and `status` stays `requested` until a coordinator or doctor manually confirms (this matches the current business model described in the roadmap/whitepaper: a human coordinator matches cases, not a self-service calendar). Building live calendar sync is real added scope Developer should not assume into this spec — flag back to CTO/Product if it turns out to be expected.
4. Patient's dashboard (§7) lists their own bookings by status. Doctor's dashboard (new — doctors don't have one today) lists bookings assigned to them.
5. `medconnect`'s `casesHandled` counter on a doctor profile should derive from `count(bookings where doctor_id = X and status = completed)`, not stay a hardcoded static number — small but real "mock to real" conversion the roadmap's definition calls for.

---

## 4. Payment History Spec (`medpayments`)

### 4.1 What's missing server-side (confirmed by direct inspection, §0)

`app/checkout/stripe/StripeForm.tsx` creates a Stripe `PaymentMethod` client-side and then does nothing with it. To make this real:

1. **Server-side `PaymentIntent` creation** — a new Route Handler (e.g. `app/api/payments/stripe/create-intent/route.ts`, following the `app/api/medai/intake/route.ts` pattern of a typed request/response and server-only SDK client construction) that takes `{ planId, userId }` (from the authenticated session, not client-supplied), looks up the real price from `modules/medpayments/data.ts`'s `plans` (server-side, so price can't be tampered with client-side), creates a Stripe `PaymentIntent` server-side with the Stripe secret key (never exposed to the browser — same principle the `medai` route already documents for the Anthropic key), and returns the `client_secret` to the frontend.
2. **Swap the client flow** from `createPaymentMethod` + `console.log` to Stripe's `confirmCardPayment` (or migrate to the `PaymentElement` component, which is the more current Stripe Elements pattern) using the `client_secret` from step 1.
3. **Webhook endpoint** (`app/api/payments/stripe/webhook/route.ts`) to receive Stripe's `payment_intent.succeeded` (and `.failed`) events, verify the webhook signature server-side, and write/update the `payments` row's `status` — this is the authoritative confirmation, not the client-side "success" UI state alone (client-side success can lie or fail to fire; the webhook is the source of truth for "did we actually get paid").
4. **Persist a `payments` row** (schema in §2.3) tied to `user_id` at `PaymentIntent`-creation time (status `pending`), updated to `succeeded`/`failed` by the webhook. This is what "payment history in the patient cabinet" reads from (§7) — not a `localStorage` transaction log like the current `MbcDashboard.tsx` mock.
5. **Live key swap only after QA sign-off**, per the roadmap's existing Phase 0 note — the current hardcoded `pk_test_TYooMQauvdEDq54NiTphI7jx` is Stripe's public demo key, not even MedByClick's own test account; Developer's first step is standing up a real MedByClick Stripe test account and moving both keys to environment variables (never hardcoded), independent of when live keys get swapped in.
6. Per roadmap: **Independent Auditor consult required** before this goes live (release playbook already flags payments/checkout as consult-required) — this is a pre-existing roadmap requirement, restated here so it isn't lost in the detail.

### 4.2 What stays mocked (unchanged from roadmap)

`app/checkout/mbc` and `app/checkout/crypto` remain simulated through this phase — correctly sequenced in Phase 4 alongside `medtoken`, per roadmap. Do not build real crypto/MBC payment rails as part of this spec.

---

## 5. Medical History / Lab Results — New Scope, Not Yet on the Roadmap

### 5.1 Where it lives

**Recommendation: as an extension of `core`'s user record, not a new module and not folded into `medconnect`.** Reasoning: medical history belongs to the *patient*, independent of which doctor or booking produced it — a lab result from a `medconnect`-booked oncologist and a lab result the patient uploads themselves are the same kind of record. Modeling it as a `medical_history_entries` table keyed on `patient_id` (§2.3) inside `core`'s data domain (even if the UI surface lives in the patient dashboard, not literally in `modules/core/`) keeps one patient identity with one medical record, rather than scattering health data across module boundaries where access-control logic would need to be duplicated per module. `medconnect` and future modules (`medtrials`, `mededu` progress tracking, etc.) become *consumers* that can reference a patient's `medical_history_entries`, not owners of separate copies.

This is a genuine new roadmap line item — recommend adding it to `docs/ROADMAP.md`'s Phase 0 table (see §6, done in this update) as its own row under `core`, not silently bundled into the "real database, user records" line, because its consult requirement (below) is materially different from the rest of Phase 0.

### 5.2 Legal & Compliance consult is a dependency, not a build task

**This role is not clinical-data-handling-qualified and is not the one to greenlight storage of lab results/medical history.** Per this role's own constraints ("If any part of this needs Legal & Compliance input (health data storage) ... flag it as a dependency"), and per the precedent this project already set for itself:

- `docs/reports/legal/2026-07-04-medai-llm-data-handling-review.md` — filed the same day as this spec — establishes that patient symptom text is "health data — a special category under GDPR-equivalent regimes and, once the Israel entity is live, likely under Israeli Privacy Protection Law and Patient Rights Law as well," and that a DPA, retention policy, and (for Russian citizens specifically) a 152-FZ-aware handling decision are hard requirements *before real patient data flows*, not backfilled after launch. That finding was scoped to LLM-provider data flows, but the underlying legal categories (GDPR Art. 9 special-category health data, Israeli Patient Rights Law once the entity is live, 152-FZ for Russian citizens) apply with equal or greater force to **persistently stored lab results and visit history** — arguably more so, since this is data at rest indefinitely, not a single API call to a DPA-covered vendor.
- That same review flags: "MedByClick's own retention of symptom submissions ... needs a stated policy ... currently no such policy exists in this repo" (§2) — this gap is *more* acute for medical history storage than for LLM pass-through, because medical history is designed to persist, not transit.
- No Privacy Policy exists yet (`docs/WHITEPAPER.md` line 1002, flagged as an open checklist item in the Legal review above) — building a persistent health-record store ahead of a privacy policy that governs it is the same ordering mistake Legal & Compliance already flagged for `medai`.

**Recommendation to Developer, pending that consult: build the schema and the UI shell against synthetic/seed data only** (same "unblocked for synthetic data" pattern Legal & Compliance and Medical Advisory already established for `medai`) — do not wire it to accept or display any real patient's actual lab results or visit notes until Legal & Compliance has reviewed:
1. What retention policy applies to `medical_history_entries`.
2. Whether the DB vendor choice (§2) needs a specific data-residency configuration (Supabase region selection, e.g.) given the same Israel/Russian-citizen jurisdiction questions already open for `medai`.
3. Whether file/attachment storage for lab result documents (`attachment_ref` in §2.3) needs encryption-at-rest requirements beyond whatever the DB vendor provides by default.
4. Whether Medical Advisory needs to review the `entry_type` taxonomy for clinical-safety reasons (e.g., should an AI ever summarize or flag lab results the way `medai` does symptom intake — that's out of scope for *this* spec, but the schema shouldn't foreclose it either way without Medical Advisory's input).

**This is flagged as a dependency, not resolved here.** Per Decision Matrix, this is likely to route the same way the `medai` data-handling review did: medical-regulatory finding → Marina (CEO) primary, cc Medical Advisory, cc Vadim as the infrastructure/vendor decision owner — and the "where does this get stored" question (jurisdiction/entity-dependent) may itself turn out to be Joint, per the same reasoning the 2026-07-04 Legal review used for the LLM data flow. CTO/Product's job here is sequencing the schema/UI-shell work so Developer isn't blocked entirely, not clearing the legal question unilaterally.

---

## 6. Sequencing

Dependency-driven order, matching and sharpening the roadmap's existing Phase 0/1 tables (updated in `docs/ROADMAP.md` alongside this spec):

1. **Auth + core user model** (§1) — blocks everything else; nothing below can attach a real record to a real user without this existing first.
2. **Database + schema** (§2) — stood up alongside auth if Option C (Supabase) is picked, since they're the same vendor decision; otherwise immediately after auth is decided.
3. **Doctor profile unification** (§3.1) — needed before real booking, since booking needs to attach to a real `doctor_profiles` row, not two disconnected mock arrays.
4. **Booking flow** (§3.2) — needs 1–3. Vetting/going-live for real doctors additionally needs Medical Community's standard (unchanged Phase 1 dependency per roadmap) — Developer can build the booking mechanism against seed/test doctor data before that standard exists, but should not flip any doctor to "live"/bookable-by-real-patients without it.
5. **Payment history** (§4) — needs 1–2 (a real user/order to attach a payment to, per roadmap's existing Phase 0 dependency note); can be built in parallel with 3–4 since it doesn't depend on booking being done, only on a real user existing. Independent Auditor consult before going live with real (non-test) Stripe keys.
6. **Medical history / lab results schema + UI shell** (§5) — schema and UI can be built in parallel with 3–5 once the DB exists (step 2), since it depends on `core`'s user model, not on booking or payments. **Real patient data does not flow into it until the Legal & Compliance consult in §5.2 clears** — same synthetic-data-first pattern already established for `medai`.

Nothing in Phase 2–4 (mededu, medcommunity, medtravel, medtoken, medtrials, medpharmaccess) is affected by this spec; those stay sequenced as-is per `docs/ROADMAP.md`.

---

## 7. Patient/Doctor Dashboard — where this lands in the UI

- **Patient cabinet** (`app/dashboard` today — currently the MBC-token-balance mock the 2026-07-02 QA report flagged): becomes the real per-user surface showing (a) booking history/status (§3), (b) payment history (§4), (c) medical history/lab results once §5's consult clears (synthetic data in the interim). The existing MBC-token-balance UI either moves to a clearly-labeled "Token (preview)" section that stays explicitly mock-labeled (it already has a "Sample data — no account required yet" badge — keep that honesty pattern) or gets deprioritized out of the primary dashboard view now that the dashboard has real per-user content to show instead.
- **Doctor cabinet** (new — does not exist today): needs its own route (e.g. `app/doctor-dashboard` or a `role`-gated view under a shared `/dashboard`), showing bookings assigned to that doctor and (once built) their own profile-edit surface backed by `doctor_profiles`. Not detailed further here — flag to CTO/Product for a follow-up spec once Phase 0 core auth/DB lands, since its exact shape depends on decisions made during that build (e.g., whether doctors self-register or are provisioned by Medical Community's vetting workflow).

---

## 8. Summary of Consults Required (for Developer's awareness — CTO/Product does not clear these)

| Consult | Trigger | Status |
|---|---|---|
| Medical Community | Doctor vetting standard before any doctor's `vetting_status` flips to `approved`/goes live to real patients | Pre-existing Phase 1 dependency, unchanged |
| Legal & Compliance | Retention policy, data residency, and jurisdiction handling for `medical_history_entries` before any real (non-synthetic) medical history/lab data is stored | **New — flagged in this spec, §5.2** |
| Independent Auditor | Before real (live, non-test) Stripe keys go live for payments | Pre-existing Phase 0 dependency, unchanged |
| Joint founders | If the medical-history storage jurisdiction question turns out to need the same Israel-entity/Russian-citizen handling decision already open for `medai` (per `docs/reports/legal/2026-07-04-medai-llm-data-handling-review.md` §4) | Contingent — Legal & Compliance's consult in §5.2 will determine if this escalates |
