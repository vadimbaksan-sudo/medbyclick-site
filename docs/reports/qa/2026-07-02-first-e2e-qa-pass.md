# QA Report — First End-to-End Pass

**Date:** 2026-07-02
**Owner:** QA/GStack
**Target:** Local dev server (`http://localhost:3000`, `bun run dev`, Next.js 16.2.9 Turbopack)
**Note on target:** No live Vercel production URL is documented anywhere in the
repo (no `.vercel/project.json`, nothing in `docs/`). This pass ran against a
local build of the current `main` branch instead. CTO/Product should confirm
the actual production URL so future passes test the real deployment — a local
build cannot catch env-var, edge-config, or CDN-caching issues that only show
up on Vercel.
**Evidence:** `.gstack/qa-reports/screenshots/` (66 screenshots), raw sweep
logs in `.gstack/qa-reports/sweep2.txt`

## Scope Covered

`/`, `/specialists`, `/doctors`, `/doctors/[id]` (3 real doctors + 1 invalid
slug), `/book`, `/login`, `/register`, `/dashboard`, `/pricing`,
`/checkout/stripe`, `/checkout/mbc`, `/checkout/crypto`, and all 12 active
modules (`medai`, `medcommunity`, `medconnect`, `mededu`, `medevents`,
`medglobaldb`, `medpayments`, `medpharmaccess`, `medsupport`, `medtoken`,
`medtravel`, `medtrials`) plus the 3 orphaned legacy routes (`education`,
`ai-diagnostics`, `medical-travel`). Interaction testing on booking, login,
register, and checkout forms. Console/network checks on every route.
Responsive check at 375×812 on home, `/book`, `/doctors`.

## Summary

Technically solid: **zero JS console errors and zero broken requests across
every route tested**, correct 404 handling, working HTML5 form validation,
Stripe Elements loads cleanly, mobile layouts are clean on every page
checked. The issues found are architectural/content-duplication and one
payments-flow gap — nothing crashes.

## Top 3 Things to Fix

1. **Live crypto checkout points to a placeholder wallet address, reachable from the public Pricing page, with no visible test/demo indicator.**
2. **Same doctor roster is hardcoded independently in three places** (`/specialists`, `/doctors`, `/medconnect`) — a bio update in one won't propagate to the others.
3. **Three orphaned legacy pages** (`/education`, `/ai-diagnostics`, `/medical-travel`) are still live and show *different* content than their current counterparts (`/mededu`, `/medai`, `/medtravel`).

## Findings

### 1. [High] `/checkout/crypto` shows a placeholder wallet address on a live, reachable payment path
- **Repro:** `/pricing` → select "Care Coordination" ($490) → payment method "₮ USDT (ERC-20) Ethereum" → "Pay Now" → lands on `/checkout/crypto?planId=professional&plan=Care+Coordination&price=490&network=ethereum`, which displays deposit address `0x4a3Bc7D8E9F2a1B6C5D4E3F2A1B6C5D4E3F2A1B6` and asks the user to send exactly 490.00 USDT to it.
- **Why it matters:** This is not a dead/dev-only page — it's one click from the main nav's "Pricing" link, which is on every page. `docs/ROADMAP.md` documents this checkout as "fully simulated (localStorage balance, manual confirm button, no wallet connection or on-chain check)," but nothing in the UI itself tells a visitor that. If this code path reaches production unchanged, a real customer could send real USDT to an address with no automated on-chain confirmation behind it, and no visible signal that the flow is a mock.
- **Evidence:** `.gstack/qa-reports/screenshots/checkout-crypto.png`
- **Recommendation:** Per `docs/playbooks/Product Release.md`, checkout/* changes already require Independent Auditor consult before release — flagging this explicitly so that consult happens before this ships, not after. Routing to Developer via CTO/Product.

### 2. [High] Doctor roster duplicated across three independent routes
- **Repro:** `/specialists`, `/doctors`, and `/medconnect` all render the same ~10 doctors (Elena Volkova, Mikhail Stern, Rina Goldberg, etc.) with the same bios, but each page has its own hardcoded copy (confirmed 3 separate `page.tsx` implementations, only `/medconnect` pulls from `modules/medconnect`).
- **Why it matters:** A doctor bio edit, credential update, or removal (a CEO-lane decision per the Decision Matrix — "pausing/removing a doctor for clinical reasons") made in one place has no guarantee of propagating to the other two. That's a content-correctness risk, not just tech debt: a removed or corrected doctor could keep showing on one of the three pages.
- **Evidence:** `.gstack/qa-reports/sweep2.txt` (text dumps of all three pages, byte-for-byte-comparable rosters)
- **Recommendation:** Flagging to Developer via CTO/Product as a technical/IA issue. If any of the three copies has ever drifted on a clinical detail, that's a Medical Advisory content-accuracy question, not a QA one — worth a one-time diff check by CTO/Product.

### 3. [Medium] Three orphaned legacy pages still live, with content that disagrees with their replacements
- **Repro:** `/education`, `/ai-diagnostics`, `/medical-travel` are not linked anywhere in current nav (confirmed via `links` sweep of every page) but return 200 and are fully rendered. Compare:
  - `/education` lists a course catalog (e.g. "Understanding Your Diagnosis," "Cancer Staging & Treatment Overview") with no instructor names.
  - `/mededu` (the linked, current version) lists a *different* course catalog (e.g. "Patient Advocacy 101," "Understanding Your Cancer Diagnosis") with named instructors (Dr. Sarah Levy, Dr. Elena Volkova, etc.) and enrollment counts.
  - Same pattern for `/ai-diagnostics` vs. `/medai` (both are working symptom-checker forms, but separately built with different copy/disclaimers) and `/medical-travel` vs. `/medtravel` (different destination lists — Israel-only hospitals vs. an international Germany/Israel/Thailand list).
- **Why it matters:** These are unlinked but not unreachable — indexable by search engines, bookmarkable, shareable. A visitor landing on the old `/education` sees a materially different (and un-maintained) course list than someone landing on `/mededu`.
- **Evidence:** `.gstack/qa-reports/sweep2.txt`
- **Recommendation:** Technical routing/cleanup decision — Developer via CTO/Product. Not a Medical Advisory issue since neither version is live-linked, but worth a decision on whether to redirect or delete the orphans.

### 4. [Low] Login and Register forms give no feedback on submit
- **Repro:** `/login` — fill any email/password, click "Log in" → page stays exactly the same, no error, no redirect, no console error. Same behavior on `/register` with "Create account."
- **Why it matters:** Expected given `docs/ROADMAP.md`'s "no auth library in `package.json`" — there's genuinely nothing to authenticate against yet. But contrast with `/book`, which *does* show a proper "Request received" confirmation screen after submit. The inconsistency (one mock form gives feedback, two don't) could read as "the button is broken" to anyone testing the site before Core's real auth work lands.
- **Evidence:** `.gstack/qa-reports/screenshots/login-after-submit.png`, `register-after-submit.png`
- **Recommendation:** Low priority, only worth fixing if Developer is already touching these forms before real auth (Phase 0 `core` work) lands — otherwise defer.

### 5. [Informational] `/dashboard` shows a mock MBC balance with no login required
- **Repro:** Navigate directly to `/dashboard` with no session/auth — shows "MBC Token Balance: 5,000 (≈ $500.00 USD)" and an empty transaction history, for anyone, unauthenticated.
- **Why it matters:** Matches `docs/ROADMAP.md`'s description of `core`/`medtoken` as un-built mock scaffolding, so this isn't a bug — flagging only because a real visitor with no context could read "5,000 MBC" as an offer or an account balance rather than sample UI.
- **Recommendation:** No action needed pre-Core-auth; consider a "sample data" label if this page is reachable before real accounts exist.

## What Worked

- Zero console/JS errors on every one of 26 routes tested (verified with a clean console buffer per page, after finding and correcting a false-positive 404 caused by a QA-script quoting bug on my end, not the app).
- `/doctors/nonexistent-slug` correctly 404s with a clean fallback page, not a crash.
- `/book`'s HTML5 `required` validation correctly blocks empty submission; filled submission shows a proper confirmation screen with the entered email echoed back.
- Query-param doctor preselection works: `/book?doctor=dr-elena-volkova` correctly preselects "Dr. Elena Volkova — Oncology" in the specialist dropdown.
- Stripe Elements (`/checkout/stripe`) loads with zero errors against the test publishable key; test-card hint (4242 4242 4242 4242) is shown, correctly signaling test mode on that path specifically (unlike the crypto path — see Finding 1).
- Mobile layout (375×812) is clean with no overlap/overflow issues on home, `/book`, and `/doctors`.

## Regression Baseline

No prior QA baseline existed for this repo (first pass). This report serves
as the baseline for the next regression run.

## Not Tested This Pass

- Real Vercel production deployment (no URL available — see note above).
- `/checkout/mbc` end-to-end payment confirmation (loaded and displayed correctly; did not attempt to exhaust the mock balance flow).
- Cross-browser (only tested via headless Chromium).
- Load/performance testing.
