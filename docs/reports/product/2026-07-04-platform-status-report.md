# Platform Status Report — 2026-07-04

Author: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Type: Status readout, not a spec

## Why this exists

Vadim asked directly why he hasn't gotten a consolidated product status
report — he's been getting individual technical reports from Web3, Legal,
Medical Advisory, and Developer, but no one has told him plainly where the
platform actually stands. This is that report. It's grounded in reading the
current code and in actually running the app (`bun run dev` + `curl` against
every route, plus the unit test suite) — not in the roadmap's aspirational
descriptions. `docs/ROADMAP.md`'s Phase 0/1 tables have been updated in place
to match; this document is the narrative version of that update, plus the
click-through findings and punch list the roadmap doesn't carry.

## Headline

**The core patient loop (register → login → book → pay → medai → dashboard)
is now real, working code** — a major jump since the 2026-07-02 roadmap
baseline, which had *nothing* beyond mock data. But **none of it can actually
be clicked through today**, in any environment, because no one has provisioned
a live Supabase project, a real Stripe account, or an Anthropic API key. Every
flow fails closed with a clear "not configured — contact support" message
rather than crashing or faking success, which is the right defensive behavior,
but it means the honest answer to "does it work end-to-end" is: **the code is
there, the plumbing to the outside world is not connected.** That's an
operational/procurement gap, not an engineering one — see punch list item 1.

The other 8 of 13 modules remain exactly what they were on 2026-07-02:
frontend-only mock scaffolds with no database behind them at all.

## Module-by-module status

| Module | Status | Detail |
|---|---|---|
| `core` (auth/DB/identity) | **Real code, not yet reachable** | Supabase Auth + Drizzle/Postgres schema; register/login/logout are real Server Actions; session checks (`getCurrentUser`/`requireUser`/`requireRole`) gate every protected page and Server Action, not just an optimistic Proxy redirect. No live Supabase project/`DATABASE_URL` exists anywhere yet — every call degrades to a clear error message. |
| `core` — medical history / lab results | **UI shell, synthetic-only by design** | Dashboard shows a clearly labeled "synthetic example data — pending Legal & Compliance review" panel. No real read/write path exists yet — correctly gated pending the Legal review that already landed recommending the access model. |
| `medconnect` (booking) | **Booking flow real; browse pages still mock** | Booking itself (`/book` → Server Action → real `bookings` row → shows up in both the doctor's and patient's dashboards) is fully real and auth-gated. But the three doctor-listing marketing pages (`/medconnect`, `/doctors`, `/specialists`) still read a static hardcoded array, not the database — see punch list #3. Doctor self-registration and profile self-editing are specced but not built; doctors today can only be manually provisioned and can view but not act on their bookings. |
| `medglobaldb` | **Mock** | Same static-array problem as above; a ready-to-use DB query function (`listGlobalDbDoctors`) exists and is simply not called yet. |
| `medai` | **Real code, not yet reachable** | Real Claude (Haiku 4.5) call for structured symptom intake with red-flag detection, behind Legal and Medical Advisory sign-off; scoped to synthetic/test input only. No `ANTHROPIC_API_KEY` configured, so it 503s with a clear message rather than working live. |
| `medpayments` (Stripe/fiat) | **Real code, not yet reachable** | Server-side PaymentIntent creation, webhook confirmation, persisted receipts, dashboard payment history all real. No real Stripe account/keys exist; the publishable key falls back to Stripe's own generic demo key, which fails cleanly at confirm time (not a fake "success"). |
| `medpayments` (MBC / crypto checkout) | **Fully mock, correctly so** | `localStorage` balance + manual "confirm" button, no wallet or on-chain check — correctly deferred to Phase 4 with the token contract. |
| `mededu`, `medcommunity`, `medevents`, `medpharmaccess`, `medsupport`, `medtoken`, `medtravel`, `medtrials` | **Fully mock, unchanged** | Each is still just `types.ts` + hardcoded `data.ts` + a presentational card component. No database, no real workflow. This matches the roadmap's original baseline exactly — no regression, but also no progress since 2026-07-02. |

## What I verified by actually running it

Ran `bun run dev` and checked every top-level and module route with `curl`
(26 routes): all return 200 (following redirects), nothing 500s or crashes.
Specifically verified:

- **Auth gating works correctly**: `/dashboard` and `/doctor-dashboard`
  correctly 307-redirect to `/login` when logged out (server-side, not just
  the optimistic Proxy check). `/book` shows a proper "log in to book" gate
  instead of exposing the form.
- **Legacy route redirects still hold**: `/education`, `/ai-diagnostics`, and
  `/medical-travel` (the pages superseded by `/mededu`, `/medai`, `/medtravel`
  in the 2026-07-02 QA pass) still correctly 308-redirect via
  `next.config.ts`. No new duplication was introduced by the recent
  medai/doctor-dashboard work — I checked specifically for this per a
  mid-task course correction and found the fix intact.
- **Unit tests**: 46/46 product tests pass (auth/booking validation, doctor
  seed unification, medai intake + red-flag logic). A `bun test` run at the
  repo root also reports 4 failures, but those come from `contracts/`'s
  Hardhat subproject being swept up by the same test command — not a product
  regression.

## Found while clicking through: three near-duplicate doctor pages

`/specialists`, `/doctors`, and `/medconnect` are three separate routes with
nearly identical hero copy and layout, all listing the exact same static mock
doctor array. This predates the recent work (not a new issue) but is worth
fixing alongside punch list #3 below — once one of them is wired to the real
`doctor_profiles` table, the other two should redirect to it rather than
staying as parallel, drifting copies.

## Prioritized punch list

1. **Provision the real vendor accounts** — Supabase project + `DATABASE_URL`,
   a real Stripe account (test mode is fine to start), and an Anthropic API
   key — and supply them via `.env.local` per `.env.example`. This is a
   business/ops action for Vadim, not a dev task, and it is the single
   blocker preventing anyone from clicking through register → book → pay →
   medai anywhere. Nothing else on this list matters until this lands.
2. **Run the Drizzle migrations + seed script against the real DB** once
   provisioned, then do one real manual pass: register a patient, book a
   consultation, pay via Stripe test card, run a medai intake, confirm it all
   shows up correctly in both the patient dashboard and doctor dashboard.
3. **Switch `/medconnect`, `/medglobaldb`, `/doctors`, `/specialists` over to
   the real `doctor_profiles` query layer** (`lib/db/queries/doctors.ts` —
   already built, just unused) instead of the static mock arrays. Right now a
   real booking can reference a doctor that the browse pages don't even show,
   and vice versa.
4. **Ship the doctor-dashboard follow-up spec** (self-registration, profile
   self-service, booking-status actions) so doctor accounts stop requiring
   manual provisioning and doctors can act on (not just view) their bookings.
5. **Consolidate the three duplicate doctor-listing pages** into one, once #3
   is done.
6. Everything else (mededu, medcommunity, medevents, medpharmaccess,
   medsupport, medtoken, medtravel, medtrials) is real work but is correctly
   lower priority — none of it blocks the core "does the platform work" loop
   Vadim is asking about right now.
