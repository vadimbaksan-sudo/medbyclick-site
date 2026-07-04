# QA Report — Post-Phase-0 Regression Pass

**Date:** 2026-07-04
**Owner:** QA/GStack
**Target:** Local dev server (`http://localhost:3000`, `bun run dev`, Next.js 16.2.9 Turbopack)
**Note on target:** Still no documented production/Vercel URL anywhere in the repo
(no `.vercel/`, nothing in `docs/`) — same gap flagged in the 2026-07-02 report.
This pass again ran against a local build of `main`.
**Baseline:** `docs/reports/qa/2026-07-02-first-e2e-qa-pass.md` (pre-Phase-0, mock
scaffolding only). This report checks the same surface after real auth, real DB,
real booking, real Stripe, and real medai landed.
**Method:** Two methods, used together. (1) `gstack`'s headless-browser skill
(`browse`, aliased `$B` below) for real click/fill/submit interaction, console
and network inspection, and screenshots. (2) `curl` for a fast status-code sweep
across every route (home, all 13 modules, auth pages, checkout, redirects) to
confirm routing/redirect behavior independent of the browser. `bun test` was
also run once as a supplementary signal (see "Unit Tests" below).
**Critical environment caveat (read this before the findings):** This sandbox has
**no `.env.local`** — no real Supabase project, no `DATABASE_URL`, no Stripe keys,
no `ANTHROPIC_API_KEY` (confirmed: only `.env.example` exists on disk). The code
is explicitly written to degrade gracefully without these (see
`lib/db/client.ts`, `lib/auth/dal.ts`), and that graceful-degradation behavior is
exactly what this pass verified. **It could not verify the actual authenticated,
DB-backed, happy-path flows** (does a real registered account actually land in
`/dashboard` with real content; does a real booking actually persist and show up
in history; does a real Stripe PaymentIntent actually complete; does medai return
a real structured response). Those require a staging environment with live
Supabase + Stripe test keys + an Anthropic key, which this environment doesn't
have. This is the single biggest coverage gap in this report — see "Not Tested
This Pass."

## Scope Covered

`/`, `/register`, `/login`, `/dashboard`, `/doctor-dashboard`, `/book`,
`/checkout/stripe`, `/checkout/mbc`, `/checkout/crypto`, `/medai`, `/doctors`,
`/doctors/[id]` (3 real doctors + 1 invalid slug), `/specialists`, `/pricing`,
and all 12 active modules (`medconnect`, `mededu`, `medtravel`, `medcommunity`,
`medevents`, `medsupport`, `medglobaldb`, `medtrials`, `medpharmaccess`,
`medtoken`, plus `medai`/`medpayments` covered above), plus the 3 orphaned legacy
routes (`education`, `ai-diagnostics`, `medical-travel`). Interaction testing on
register, login, `/book` (unauthenticated gate), `/checkout/stripe`
(unauthenticated gate), and medai (full form fill + submit). Console and network
checks on every route visited via browser.

## Summary

**The platform holds up structurally: zero JS console errors and zero broken
requests/404s across every route tested, and every "hard requirement" from the
Phase 0 spec that could be verified in this environment actually holds** — the
auth gates on `/dashboard`, `/doctor-dashboard`, `/book`, and `/checkout/stripe`
all correctly reject unauthenticated access; the orphan-page redirect fix from
2026-07-02 still holds; and both env-var-dependent features (Stripe, medai) fail
gracefully with clear user-facing messages instead of crashing. **Three findings
from the 2026-07-02 report are now confirmed fixed** (see "Fixed Since Last
Pass"). The real gap is coverage, not platform health: **this environment cannot
exercise a single real authenticated flow end-to-end** because no Supabase/DB is
configured here, so "does a booking actually persist and show up in the
dashboard" remains unverified by this pass, same as it was structurally
unverifiable before Phase 0 (for different reasons then).

## Top Things to Flag

1. **This sandbox cannot validate the actual DB-backed happy path** — registration, login, booking persistence, and doctor dashboards were only verifiable as "fails gracefully," not "works correctly," because no Supabase project is configured here. CTO/Product should get a staging Supabase + Stripe test-mode project connected before the next QA pass, or this class of regression (e.g., a booking silently failing to write) will keep going unnoticed until it hits real users.
2. **Doctor self-registration is speced but not built** — despite `docs/reports/product/2026-07-04-doctor-dashboard-spec.md` existing, the actual code (`app/doctor-dashboard/page.tsx` line ~18) explicitly comments that self-registration/profile-edit is out of scope for this pass, and `lib/auth/actions.ts` line 62 hardcodes every new registration to `role: "patient"`. There is currently no way — in any environment — to create a doctor account through the UI. Flagging so nobody assumes the spec commit means the feature shipped.
3. **Good news, not a bug:** three issues from the 2026-07-02 baseline are now fixed — see below.

## Fixed Since Last Pass

- **Crypto checkout demo warning (was High finding #1).** `/checkout/crypto` now shows a clear `⚠️ DEMO / TEST MODE — this page is not connected to a real wallet or blockchain. Do not send real USDT...` banner and labels the deposit address "Demo address — do not send funds." Verified live via `$B` by walking `/pricing` → select a plan → USDT (ERC-20) → Pay Now → confirmed banner and label render.
- **Doctor roster duplication (was High finding #2).** `/doctors`, `/specialists`, and `/medconnect` all now import from a single source (`modules/medconnect/data.ts`) — confirmed via `grep` that no page-level file hardcodes doctor names anymore (only `mededu`/`medevents` mock data mentions doctor names, which is unrelated content, not the roster).
- **Orphan pages (was Medium finding #3).** `/education`, `/ai-diagnostics`, `/medical-travel` now 308-redirect to `/mededu`, `/medai`, `/medtravel` respectively (confirmed via `curl -D -` and via browser — no page renders before the redirect fires, no stale content served).
- **Login/register gave no feedback (was Low finding #4).** Both forms now show a clear inline message on submit — in this environment it's "Registration is not available yet — the Supabase project and database have not been configured in this environment. Please contact support," which is the correct message for an unconfigured sandbox, not a live bug. The mechanism (form → server action → user-visible feedback) works.

## Findings

### 1. [Informational / Environment Gap] No live Supabase, Stripe, or Anthropic credentials in this sandbox — real authenticated flows unverifiable this pass
- **Repro:** `ls .env.local` → not found; only `.env.example` present. `lib/db/client.ts`'s `isDatabaseConfigured()` returns false; `lib/auth/dal.ts`'s `verifySession()` short-circuits to `null` when Supabase isn't configured.
- **Why it matters:** Every "does X actually persist / actually work end-to-end" question in the task (register → dashboard with real content, login with the same account, booking → dashboard history, doctor dashboard with a real doctor account, Stripe PaymentIntent completion, medai returning a real structured response) reduces to "does it fail gracefully instead of crashing" in this environment — which it does (see Findings 2–4) — but that is not the same as "it works." A real regression in, say, the booking-insert SQL or the payments webhook handler would be invisible to any QA pass run in an environment like this one.
- **Evidence:** No `.env.local` on disk; graceful-degradation messages shown in Findings 2–4 below.
- **Recommendation:** Not a code bug — a QA-infrastructure gap. CTO/Product should provision a staging Supabase project + Stripe test keys (+ optionally a low-budget Anthropic key) reachable by the next QA pass, so the actual DB-write paths can be exercised, not just their fallback paths.

### 2. [Confirmed working] Hard auth gate on `/dashboard` and `/doctor-dashboard` holds
- **Repro:** `curl -D - http://localhost:3000/dashboard` → `307` with `location: /login`. Same for `/doctor-dashboard`. Confirmed again by driving the actual browser to both URLs — final URL after navigation is `http://localhost:3000/login` in both cases.
- **Why it matters:** This was the explicit hard-requirement ask — verified it actually holds, not just in code review.
- **Evidence:** curl headers; `$B url` after `$B goto` on both routes.

### 3. [Confirmed working] Auth gating now also covers `/book` and `/checkout/stripe`, correctly
- **Repro:** Unauthenticated `/book` shows "Log in to book a consultation" with Log in / Create an account buttons instead of the booking form (`app/book/page.tsx`). Unauthenticated `/checkout/stripe` attempts `POST /api/payments/stripe/create-intent`, gets `401`, and the UI shows "Please log in to make a payment. Log in and try again" — no crash, no stack trace exposed, no Stripe key ever contacted before the auth check fails.
- **Why it matters:** This is new since the 2026-07-02 pass (which found Stripe Elements loading with no auth check at all) — booking and payments are now correctly tied to a verified identity per spec §3.2, not a client-suppliable name/email.
- **Evidence:** `$B network` showing `401` on `create-intent`; `$B text` showing the login prompt.

### 4. [Confirmed working] medai fails gracefully without an API key
- **Repro:** `/medai` → fill symptom description + duration + severity + age → "Send to Coordinator" → UI shows "Something went wrong — We couldn't process your intake right now. Please try again shortly, or describe your symptoms to a coordinator directly." with a "Try again" button. Underlying request: `POST /api/medai/intake` → `502`. Dev server log confirms the real cause: `[medai/intake] Anthropic request failed Error: Could not resolve authentication method... Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted` — i.e., exactly the expected failure mode for "no `ANTHROPIC_API_KEY` in this sandbox," not a code defect.
- **Why it matters:** Confirms the intake flow degrades safely — no stack trace shown to the patient, no console-crashing error, and the emergency-triage disclaimer text ("If this is an emergency...") is present above the form regardless of backend availability.
- **Evidence:** Browser text dump of the error state; `502` in `$B network`; server-side error log line above.

### 5. [Informational] Doctor self-registration does not exist yet — cannot create a doctor test account in any environment currently
- **Repro:** `/register` has no role selector (`grep -n "role" app/register/RegisterForm.tsx` → no matches); `lib/auth/actions.ts:62` hardcodes `role: "patient"` on every signup. `app/doctor-dashboard/page.tsx`'s own comment states self-registration/profile-edit is "explicitly NOT" in scope for the current pass.
- **Why it matters:** The task asked to test `/doctor-dashboard` "as a doctor-role test account, if you can create one" — confirmed there is currently no way to create one, via UI, even with a fully configured Supabase project. A doctor account can currently only exist via direct DB seed (`bun run db:seed`), not self-service. This is a known, speced gap (not a regression) — flagging so the next pass or Product doesn't assume the recent spec commit means the feature is live.
- **Evidence:** grep results above; code comment in `app/doctor-dashboard/page.tsx`.

## What Worked

- Zero console/JS errors across every route re-tested this pass (26+ routes, verified with a cleared console buffer per navigation): home, all module pages, checkout/*, doctors/specialists/detail pages, orphan-redirect targets.
- Zero broken network requests (aside from the intentionally-tested 401/502 failure paths in Findings 3–4, which are correct-by-design, not bugs).
- `/doctors/nonexistent-slug` still correctly 404s.
- All 13 module pages, `/pricing`, `/checkout/mbc`, `/checkout/crypto` all still return clean 200s with no console errors.
- Full home-page nav link sweep (`$B links`) found no dead links — every header/footer/module-grid link resolves to an existing route.
- `bun test`: 46/50 pass. The 4 failures are all in `contracts/test/*` (Hardhat/BNB-chain smart-contract suite — Phase 4/token scope per the roadmap, unrelated to this Phase 0 web pass) and fail with `HardhatError: You are not inside a Hardhat project` — a missing Hardhat config in this sandbox, not a code regression. The actual Phase-0-adjacent suite, `modules/medai/intake.test.ts`, passes fully (its console-logged "errors" are intentional assertions on mocked failure paths, not real failures).

## Regression Baseline

This report supersedes `2026-07-02-first-e2e-qa-pass.md` as the current baseline.
Three findings from that report are now closed (see "Fixed Since Last Pass"). The
crypto-checkout placeholder-wallet High finding, the doctor-roster-duplication
High finding, and the orphan-pages Medium finding are all resolved. No new
technical regressions were found in what this environment could test.

## Not Tested This Pass

- **The actual authenticated happy path, in full** — real register → real session → `/dashboard` showing real (even if empty) booking/payment/medical-history sections; real login with that same account; a real booking actually persisting to Postgres and appearing in dashboard history; a real doctor account viewing real assigned bookings; a real Stripe PaymentIntent reaching a confirmed/succeeded state; a real medai LLM response. All blocked by missing `.env.local` credentials in this sandbox (see Finding 1) — this is an environment gap, not something this pass could route around.
- Real Vercel production deployment (still no URL documented — same gap as 2026-07-02).
- Cross-browser (headless Chromium only).
- Load/performance testing.
- Mobile/responsive layout (not re-checked this pass; was clean in the 2026-07-02 pass and no layout-affecting changes were observed in the diffs reviewed).
