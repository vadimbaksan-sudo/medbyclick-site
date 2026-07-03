# Business & Token Viability Audit

**Date:** 2026-07-03
**Filed by:** Independent Auditor (`docs/agents/INDEPENDENT_AUDITOR.md`)
**Type:** Financial/business viability audit — requested directly by Vadim (CPWO)
after reacting to legal cost estimates reaching ~$100–150k for the full legal
catalog before any token sale or real revenue exists. Not a routine weekly
audit; this is a gut-check review.
**Routed to:** Both founders simultaneously (Marina, Vadim), per this role's
Handoff Rules
**Scope:** Reads only — this role has no decision authority
(`docs/agents/INDEPENDENT_AUDITOR.md` §Decision Authority). Every number below
is either quoted directly from repo documents or marked as external
market-knowledge context that is *not* sourced from this repo. Nothing here
should be read as a recommendation this role has authority to make binding.
**Supersedes nothing; complements** `docs/reports/audit/2026-07-02-initial-gaps-report.md`
(that report was governance-focused; this one is financial/business
viability-focused and does not repeat its findings).

---

## Bottom line, up front

As currently designed and currently executed, **neither the fiat business nor
the token has demonstrated viability yet — they are both pre-revenue plans,
not businesses.** The Y1 revenue projection in the whitepaper is aspirational
math, not a forecast grounded in anything operational today. The token raise
target does not cover the realistic cost of getting the token to a legally
clean, audited, listed state — it is short by a wide margin once the full
cost stack is added up. The token itself is not structurally necessary for
the business to function; the project's own tokenomics document says this
explicitly (§3 below). Spending the full $100–150k legal/audit/TGE catalog
right now, before a coordinator is hired, before any doctor is vetted, and
before any acquisition channel is tested, is premature relative to actual
traction. A narrow, cheap slice of legal work (the Israel operating entity)
is justified now regardless of the token. The rest should wait. Full
reasoning below.

---

## 1. Current Actual State vs. Projected State

### 1.1 What exists today

`docs/ROADMAP.md` "Current State" section, dated 2026-07-02, is unambiguous:

> "Every one of the 13 modules plus `core` is a **frontend-only mock
> scaffold**... There is no database, no ORM, and no auth library in
> `package.json`... No `app/api` routes exist."

The one partial exception is Stripe UI wired to nothing on the backend (no
`PaymentIntent` creation, no webhook). MBC and crypto checkout paths are fully
simulated with `localStorage`. There is no real payment processing, no real
user accounts, and — by direct implication — **$0 in actual recorded
revenue.**

Cross-checking the team's own execution tracking confirms the same picture
operationally, not just technically:

- **Coordinator (TODOS T1):** JD is written (`docs/reports/medical/2026-07-02-t1-coordinator-job-description.md`,
  status "Ready for Marina review") but the hire itself has not happened —
  Month 2 is still a target, not an accomplished fact. No sourcing/interview
  activity is recorded anywhere in `docs/reports/`.
- **Doctor vetting (TODOS T3):** the vetting standard document exists
  (`docs/reports/medical/2026-07-02-doctor-vetting-standard.md`) but T3's
  triage-criteria addition to it is explicitly gated on the standard being
  "Phase 1 deliverable," and no doctors have been run through it. Zero
  verified doctors are onboarded today.
- **Paid acquisition (TODOS T4):** `docs/reports/growth/2026-07-02-t4-paid-acquisition-channel-hypothesis.md`
  is explicit that it is "a hypothesis document, not a go decision," that
  "no empirical CAC exists yet," and that two of its four go/no-go criteria
  (minimum volume, profile match) are **literally marked Blocked**, pending
  data the not-yet-hired coordinator would produce. Zero paid marketing has
  ever run.

### 1.2 What the whitepaper claims is happening right now

`docs/WHITEPAPER.md` §18 labels **Phase 0: Foundation as "Current — Q3 2026"**
— i.e., the whitepaper's own roadmap asserts this phase is happening today —
and lists as its deliverables:

> "Platform MVP operational with first 10–20 paying patients... Clinical
> coordinator hired and operational... Legal structure established (company
> incorporated, jurisdiction selected)... Security audit vendor selected and
> engagement started"

None of these four things are true as of this audit. Zero paying patients
through the platform (the platform has no working checkout), no coordinator
hired, no entity incorporated (`docs/LEGAL_BRIEF.md` Part 0 confirms: "no
firm has been contacted and no NDA has gone out" as of this brief's latest
revision), no audit vendor engaged (`docs/CONTRACT_AUDIT.md` §0.4 outreach
tracker: "Not started" for Hacken, CertiK, and Trail of Bits alike). This is
worth naming plainly: if this whitepaper section were shown to an outside
investor or exchange compliance team today, it would read as materially
inaccurate about present-tense facts, not aspirational about the future. That
is a whitepaper-content risk for Web3 & Token Strategy to fix (not this
role's file to edit), but it is directly relevant to a viability audit because
it means the document the company would use to raise money currently
overstates where the company is.

### 1.3 The Y1 revenue projection, tested against what actually has to be true for it

`docs/WHITEPAPER.md` §9.1 projects ~$72,400/month (~$870,000/year), built from:

| Line | Assumption | What has to be true for it |
|---|---|---|
| Case Review: 100/mo × $150 | 100 patients/month completing paid case reviews | A functioning intake pipeline processing volume from month 1 |
| Care Coordination: 40/mo × $490 | 40 patients/month in the higher-touch product | Coordinator operational (T1) — not hired yet |
| Ongoing Access: 50 subscribers × $290/mo | 50 people willing to pre-commit to a monthly subscription | Retention infrastructure that doesn't exist (no auth/DB per §1.1) |
| Medical Travel: 10 packages/mo × $1,200 avg commission | 10 cross-border logistics deals/month | `medtravel` module is mock-only per ROADMAP.md Phase 3 sequencing, not built |
| MedEdu: 200 subscribers × $49/mo | 200 paying content subscribers | No content platform live yet |
| Partner Listings: 20 partners | 20 clinics paying $500–2,000/year | No partner-recruitment activity recorded anywhere in `docs/reports/` |

Every single line assumes infrastructure and operational capacity
(coordinator, verified doctor supply, a working payment backend, a tested
acquisition channel) that the team's own tracking documents mark as not yet
built or not yet started. `docs/TOKENOMICS.md` §7.2/§7.3 compounds this: it
separately assumes **130 doctors and 33 clinics onboarded and staked in Y1**
— those numbers require the same not-yet-hired coordinator and not-yet-written
vetting execution to have already run at scale.

**Verdict:** This is not a forecast in the sense of "revenue we expect to
collect this year." It is a target model — useful for showing what the
business becomes *if* the coordinator hire, doctor vetting, and paid channel
all land on schedule — being presented in whitepaper format as if it were a
credible near-term projection. Neither founder should treat $870k/year as
something to plan cash flow, hiring, or token-sale-use-of-proceeds against.
The honest current-state number is $0/year, with a roadmap toward the
projection that has not yet cleared its own first gate (T1's Month-2
coordinator deadline).

---

## 2. Token Raise vs. Token Economy Costs

### 2.1 The raise target

`docs/LEGAL_BRIEF.md` Part 4: Private Sale target **~$140,000** + Public
Sale/IDO target **~$400,000** = **~$540,000 total raise target.**

### 2.2 The realistic cost stack around TGE

**Legal.** `docs/LEGAL_BRIEF.md` §0.5 (added 2026-07-03, explicitly
non-binding planning ranges, not a quote) gives:

| Item | Range |
|---|---|
| Initial consultation | $0–$2,000 |
| Preliminary written opinion | $5,000–$15,000 |
| Full Legal Opinion Letter | $15,000–$40,000+ |
| MiCA white paper compliance review | $10,000–$25,000 |
| SAFT/Token Purchase Agreement template | $5,000–$15,000 |
| Offshore token-entity incorporation (BVI/Cayman) | $3,000–$15,000 |
| Offshore token-entity incorporation (ADGM/DIFC/Singapore, licensed) | $50,000+ |
| Ongoing retainer, post-TGE | $3,000–$10,000/month |

Summing the token-specific core items (excluding the separate Israel
operating-entity line and the ongoing monthly retainer): **low end ≈
$38,000**; **high end ≈ $112,000** if the offshore entity is BVI/Cayman, or
**≈ $147,000+** if it lands in a licensed jurisdiction (ADGM/DIFC/Singapore)
with a larger firm (Hogan Lovells is named on the candidate list and flagged
in the brief itself as likely to bill "toward the top of or above" these
ranges). **This is exactly where Vadim's $100–150k figure comes from** — it
is not an exaggeration, it is the brief's own high end for a licensed
jurisdiction plus a full-service firm.

**Smart contract audits.** `docs/CONTRACT_AUDIT.md` §0.3 names three tiers —
Hacken (mid-tier, recommended for Tier-3 listing), CertiK (premium, required
before Tier-2 CEX per `docs/TOKENOMICS.md` §11.3), Trail of Bits (elite,
reserved for the LayerZero Ethereum bridge audit per §11.4 and the
2026-07-02 dual-chain report). **No dollar quotes exist anywhere in this
repo** for any of the three — outreach tracker shows all three "Not started."
`docs/TOKENOMICS.md` §9.2 budgets **$37,500 total for "Smart Contract
Audits" in Y1** — sized, at best, for one mid-tier engagement, not the
three-firm, three-stage strategy the project's own documents commit to.
*(External context, not sourced from this repo: publicly known market rates
for this class of firm typically run low-to-mid five figures for a
standard-scope Hacken audit, mid-five to low-six figures for CertiK, and
Trail of Bits engagements on novel cross-chain/bridge logic — which is
exactly what the LayerZero OFT integration is — are commonly the most
expensive of the three, frequently exceeding $37,500 on their own.)* This is
a real, structural budget gap independent of exactly which numbers a quote
comes back with: **the plan commits to three audits: the budget funds
roughly one.**

**Exchange listing.** Both `docs/WHITEPAPER.md` §14.2 and
`docs/TOKENOMICS.md` §11.2 state a **Tier-3 CEX listing fee of $20,000–$80,000**
(whitepaper) / **$40,000–$80,000** (tokenomics), sourced from Treasury, due
by Month 4–8.

**Liquidity.** `docs/WHITEPAPER.md` §13.1: at TGE, **$175,000 in actual USDT**
must be paired with MBC for the initial PancakeSwap position (this is cash,
not token supply). §13.3 then requires further Treasury liquidity
injections: +$50,000 (Month 3), +$100,000 (Month 6), +$200,000 (Month 12) —
another **$350,000** within roughly Year 1.

### 2.3 Does the raise cover it?

Adding only the items that are hard requirements at or immediately around
TGE — liquidity pairing ($175,000, mandatory), legal ($38,000–$150,000+),
audit (unbudgeted for the real three-firm strategy, plausibly $60,000–
$250,000+ using external market context), and the Tier-3 listing fee
($20,000–$80,000, due Month 4–8) — the **low-end total is roughly $293,000**
and the **realistic-to-high end is roughly $655,000+**, before counting a
single dollar of the additional $350,000 in liquidity growth commitments from
§13.3, or the post-TGE monthly legal retainer.

Against the **$540,000 raise target**: on the low end, this consumes **~54%**
of the entire raise before platform development, marketing, or founder
compensation see a dollar. On the realistic-to-high end, **the raise does not
cover the stack at all** — it is short by roughly **$115,000 or more**,
before touching the Year 1 liquidity-growth schedule.

### 2.4 An internal inconsistency worth flagging directly

`docs/TOKENOMICS.md` §9.2's own Treasury Spending Categories table sums Y1
spend to **$250,000**, explicitly stated as drawn from "private/public sale
proceeds of $540,000 total raised." That table has **no line item at all**
for the $175,000 USDT liquidity pairing that §13.1 requires at TGE — it
isn't the 3%/$7,500 "Liquidity Support" line (too small by more than 20x to
be it), and it isn't listed separately either. Add the mandatory $175,000
liquidity pairing to the table's own $250,000 Y1 budget and **Y1 commitments
already total $425,000 — 79% of the entire $540,000 raise** — before
correcting the Legal ($37,500 budgeted) and Audit ($37,500 budgeted) lines up
to anything resembling the real fee ranges in §2.2 above. This sits in the
same category as the TGE-market-cap and Treasury-allocation-breakdown
mismatches already flagged in the 2026-07-02 baseline audit (§5 of that
report) — except those were presentation/consistency issues; **this one is a
solvency question.**

### 2.5 What this implies

The raise target, as currently sized, does not fund the plan the project's
own documents describe. The options are the same three Vadim's question
already implies:

1. **Raise more** — but this cuts against the deliberately conservative $5M
   FDV positioning `docs/TOKENOMICS.md` §13 uses to differentiate MBC from
   "inflated launches," and a bigger raise on an unlaunched, unaudited,
   pre-revenue platform invites more regulatory and reputational scrutiny,
   not less.
2. **Stage/defer spend** — skip or delay CertiK and Trail of Bits until
   Year 2 (accept a slower path to Tier-2 listing and no Ethereum bridge in
   the near term), defer the Tier-3 listing fee until organic DEX volume
   actually justifies it rather than targeting Month 4–8 by calendar.
3. **Subsidize from the fiat business** — directly contradicted by
   `docs/WHITEPAPER.md` §9.3's own stated separation principle ("the company
   does NOT pay operating expenses from the Treasury... Company stability
   should not depend on token price" — and the reverse commingling is the
   same red flag), and moot regardless, because the fiat business has $0
   revenue today (§1 above).

Option 2 is the only one that doesn't contradict something the project has
already committed to in writing.

---

## 3. Token Value Proposition — "чем ценен этот токен тогда"

`docs/WHITEPAPER.md` §10 lists six demand mechanisms; `docs/TOKENOMICS.md`
§7 quantifies them. Assessed individually against what actually exists today:

- **Payment discount (15% for paying in MBC):** Real mechanic on paper, but
  requires patients — per the growth team's own target profile in
  `docs/reports/growth/2026-07-02-t4-paid-acquisition-channel-hypothesis.md`,
  a Russian-speaking diaspora population in Israel, not a crypto-native one —
  to acquire and hold a volatile asset to save 15% on a $150–$490 medical
  service. Plausible, unproven, and irrelevant until real payment volume
  exists (it doesn't yet).
- **Mandatory doctor staking (1,000–5,000 MBC):** The strongest mechanism on
  paper — genuinely forced demand, not optional. But it scales exactly with
  doctor recruitment, which is currently the single least-progressed
  workstream in the entire company (T1 coordinator not hired, T3 vetting not
  executed, zero doctors onboarded).
- **Clinic staking:** Same structure and same dependency — zero clinics
  recruited yet.
- **Burn mechanics tied to payment revenue:** Real supply-reduction design,
  but proportional to real payment volume, which is currently $0 (§1.1).
- **Priority Pass burns, referral rewards, travel escrow:** All downstream of
  the same missing prerequisite — real patients transacting on a real
  platform.

**The project's own tokenomics document already answers Vadim's question in
writing.** `docs/TOKENOMICS.md` §12.3, titled "Why the Business Doesn't Need
the Token to Succeed," states:

> "If MBC price crashes: company operations continue, platform services
> continue, business model intact... The token enhances the business. The
> business does not depend on the token."

That is the honest answer, and it is not a criticism this role is inventing —
it is a direct quote from Web3 & Token Strategy's own document. **Yes,
MedByClick's core business — booking, payments, doctor network — can run
entirely on fiat with no token at all.** The token, as designed, is not a
naked cash-grab (no yield promised, no dividend claims, deflationary by
design, explicitly revenue-independent per §9.3) — it is a reasonably
well-intentioned utility-token design. But it is a bolt-on layer sitting on
top of a business that has not yet proven it needs, or can support, a token
economy. Every demand mechanism in §10 requires fiat-side volume (patients,
doctors, clinics) to exist first; none of that volume exists yet. **The
token's value today is pre-revenue story value, not utility value** — it is
priced and structured as if the utility mechanisms were already running,
when in fact the business generating the transactions those mechanisms
depend on hasn't launched.

---

## 4. Bottom-Line Viability Assessment

**Is spending real money on legal/audit/entity setup right now premature or
justified?** Both, depending on which slice:

**Justified now, and cheap:** the **Israel operating entity** (per Vadim's
2026-07-03 update, `docs/LEGAL_BRIEF.md` Part 1/§6.0, target incorporation
December 2025, estimated $1,500–$5,000 via local counsel, not the crypto
firms on the candidate list). This entity is needed for the fiat business
regardless of what happens with the token — patient/doctor contracts and any
real revenue require *some* legal entity to exist, and this is the cheapest,
least-token-dependent piece of the entire legal catalog. Also justified now
and free: an initial consultation call with 1–2 shortlisted crypto firms
(`docs/LEGAL_BRIEF.md` §0.5 notes many boutique firms do this free) and
non-binding audit quotes from Hacken (`docs/CONTRACT_AUDIT.md` §0.2:
explicitly "can start now" and doesn't require a signed engagement) — both
produce real numbers to plan against instead of the current range-based
guesswork, at zero or near-zero cost.

**Premature right now:** the full $100–150k legal catalog (full Legal
Opinion Letter, MiCA white paper review, SAFT template, licensed offshore
entity incorporation), any CertiK or Trail of Bits engagement, any Tier-3
listing spend, and the $175,000 liquidity pairing. All of these exist to
prepare a token economy whose entire demand model (§3 above) depends on
doctor and patient volume that does not exist yet, funded from a raise
(§2 above) that doesn't actually cover the stack even under generous
assumptions. Spending real money to polish the token's legal/audit posture
before the fiat business has a single hired coordinator, a single vetted
doctor, or a single tested acquisition channel is optimizing a constraint
that isn't the bottleneck. The bottleneck is operational, not legal.

**What needs to be true before token-specific spend scales up:**

1. Coordinator hired and operating (TODOS T1 — currently JD-only, Month 2
   target not yet met).
2. A first real cohort of vetted, onboarded doctors under the vetting
   standard (TODOS T3 — currently blocked on the coordinator).
3. T4's two blocked go/no-go criteria (minimum volume, profile match) filled
   in with real coordinator intake data, not placeholders.
4. At least one paid acquisition channel actually tested against the
   documented $50 CAC ceiling, with real numbers — not the current zero
   empirical data point.
5. Ideally, some first real fiat revenue on the books — even a small
   fraction of the $72,400/month projection — so that spending real money on
   a token layered on top of the business is grounded in an actual operating
   business, not a roadmap document.

**Recommendation, stated plainly, not hedged:** Fund the Israel entity now —
it's cheap and it's needed either way. Get free consultations and free audit
quotes now — they cost nothing and replace guesswork with real numbers. Do
not commit to the full token-specific legal/audit/listing/liquidity catalog
($100k–$150k+ legal, $60k–$250k+ realistic audit spend, $175k+ mandatory
liquidity, $20k–$80k listing fee) until the five operational milestones above
are visibly on track. The Q4 2026 TGE date in `docs/WHITEPAPER.md` §18
should be treated by both founders as a target to reassess against actual
operational progress, not a fixed date to fund toward regardless of whether
the coordinator, doctors, and acquisition channel are real yet. Spending the
full catalog today, against zero revenue, zero onboarded doctors, no hired
coordinator, and no validated channel, is the pattern this audit is flagging
as the actual risk — not the token design itself, which is comparatively
sound on paper.

---

## What This Report Is Not

This role has no authority to approve, reject, or decide a budget, a raise
size, a jurisdiction, or a spend sequence — those are Joint decisions per
`docs/governance/DECISION_MATRIX.md`, or CPWO-only where they're pure
tokenomics/fundraising-instrument calls. Nothing in this report should be
read as a decision; it is risk made visible for both founders to act on or
not. If either founder wants to act on §4's recommendation, or disagrees
with it, that outcome belongs in `docs/decision-log/` per this role's
Handoff Rules, not left implicit in this file.

## Next Review

Recommend the next audit check: (a) whether the Israel entity and free
consultations/quotes in §4 actually happened, since they're the cheap,
low-risk first moves; (b) whether TODOS T1's coordinator hire cleared its
Month 2 deadline; (c) whether any token-specific spend was committed before
the five milestones in §4 were met, which would be the single clearest
signal that this report's recommendation was not followed.

---

## Addendum — 2026-07-03 (same day): Correction Request and a New Regulatory Flag

**Trigger:** A message relayed via the Coordinator, same day, asserting two
facts attributed to Vadim: (1) the Israel operating entity is registered and
paid for, not merely a December 2025 target; (2) a real, if informal, doctor
network and real patient case flow already exist and predate the software —
consistent with `TODOS.md` T1's own framing that the founder currently
performs case routing personally. The message asked this report's bottom
line to be revisited, since it was read as conditioned on "zero traction."

This addendum is appended rather than silently rewriting the sections above,
per this role's own practice — the record of what changed and why should
stay visible.

### A.1 Evidentiary note — asserted, not yet documented

Both claims arrive through a relayed message in conversation, not through any
update to a repo document this role can independently verify. As of this
addendum: `docs/LEGAL_BRIEF.md` Part 1 still reads "No legal entity exists
yet for the token project" and lists the Israel platform-entity as a
December 2025 **target**, not a completed fact — its own most recent
revision note (2026-07-03) records the entity as a new *fact to reconcile*,
not as incorporated. No file under `docs/reports/medical/` or
`docs/reports/legal/` documents a current doctor count, case volume, or
entity-registration confirmation.

Per this role's core operating principle — ground findings in what's in the
repo, cite sections, don't invent numbers — **both claims are treated here as
asserted-pending-documentation, not as confirmed facts.** This is not
disbelief of Vadim specifically; it is the same bar this report already
applies to every other figure in it, including ones that cut in either
founder's favor. The concrete recommendation: whoever holds these facts
should have the owning role file them where the rest of the team can see and
verify them — Legal & Compliance updates `docs/LEGAL_BRIEF.md` Part 0/Part 1
to mark the entity gap closed with evidence (registration number, date), and
Medical Community files a short report documenting the existing informal
doctor network and case volume (how many doctors, how many cases, over what
period). Until that exists, the next audit cycle has no way to verify this
addendum's premise independently of the same relayed-message channel that
produced it — which is itself worth naming as a process gap, not just a
formality.

### A.2 Does this change the legal/audit spend timing recommendation?

Partially — narrower than the correction implies, once the claims are
separated from what they actually bear on.

**On the entity:** if genuinely done and paid for, this resolves the one
piece of spend the original report already called "justified now, cheap"
(§4). It doesn't change that conclusion — it means that specific action item
has already executed, which is good news, and should be marked closed in
`docs/LEGAL_BRIEF.md` Part 0's blocking-gaps table once documented.

**On the informal doctor network and case flow:** this is real signal, but
it moves less of the original analysis than it might appear to:

- It is partially corroborated by material already in this report's source
  base — the growth team's own T4 report
  (`docs/reports/growth/2026-07-02-t4-paid-acquisition-channel-hypothesis.md`)
  already cites "hundreds of word-of-mouth referrals" over "40 years" and
  describes today's acquisition as "100% organic" through the founder's
  personal network. §1.3 of this report's original text already drew this
  exact distinction: "whatever the founder's informal word-of-mouth network
  already produces... is NOT the same as a scaled coordinator-run intake
  pipeline." This addendum confirms that network is real and has produced
  real cases. It does not establish that it produces anything close to the
  100 case reviews/month, 40 care coordinations/month, or the 130-doctor Y1
  figure in `docs/WHITEPAPER.md` §9.1 / `docs/TOKENOMICS.md` §7.2 — none of
  that volume has gone through a scalable, priced, repeatable, coordinator-run
  process. It has gone through one person's manual judgment, at whatever
  pace one person can sustain.
- **It does not touch §2 of this report at all.** The raise-adequacy math
  ($540,000 raise vs. ~$293,000–$655,000+ realistic token-specific cost
  stack) is entirely about token-side costs — legal, audit, listing,
  liquidity pairing. How many informal cases the founder has personally
  routed has no bearing on whether the token raise covers its own legal and
  audit bills.
- It modestly raises confidence in product-market fit for the underlying
  medical-coordination service — a genuine, positive update worth crediting.
  It does not validate a paid acquisition channel (T4's CAC assumptions
  remain empirical-data-free), does not change the coordinator-hire
  timeline, and does not change the token cost-stack arithmetic.

**Revised position:** the full $100,000–$150,000+ token-specific
legal/audit/listing/liquidity catalog remains premature. That conclusion was
never actually conditioned on "zero traction" in the fiat business in the
sense of zero deal flow ever having happened — it was conditioned on (a) the
token raise not covering its own cost stack (§2, unaffected by this
correction) and (b) the token's demand mechanisms requiring platform-scale,
software-mediated doctor/patient volume that one founder's manual case
routing, however real, does not yet constitute (§3, only modestly affected).
What should shift is the framing in §1: read "wait for traction" as *wait for
traction to become software-mediated and repeatable*, not *wait for traction
to exist at all* — informal traction existing was always the expected
starting condition for a 40-year referral-based practice, and doesn't change
the funding math in §2 or §4.

### A.3 Medical-regulatory exposure — flagging as urgent, recommending same-day escalation to Marina

This is the part of the correction this role reads as more consequential
than the funding question, and it sits outside this role's lane to resolve
(Medical Advisory's clinical-authority territory and Legal & Compliance's
regulatory territory per `docs/TEAM_STRUCTURE.md`) — but surfacing it without
waiting for the next weekly cycle is squarely inside this role's mandate.

If real patients and real doctors are being actively matched and treated
today — off-platform, informally, per the correction — that is **live
medical-regulatory exposure happening now, not a future risk gated on
launch:**

- `docs/reports/product/2026-07-02-t2-platform-evaluation-rubric.md` already
  flags Israeli Patient Rights Law compliance as unaddressed by any
  candidate platform vendor — but that finding was framed as an input to the
  Day-30 platform decision, i.e., forward-looking. If real cases are
  happening today, the exposure question isn't waiting for Day 30 — it may
  already be live.
- No telemedicine-licensing question has been raised anywhere in `docs/` for
  the *current* informal referral/routing activity — every existing mention
  addresses the future platform only.
- `docs/reports/medical/2026-07-02-doctor-vetting-standard.md` describes a
  vetting standard that, per TODOS T3, hasn't yet had its triage criteria
  finalized and hasn't been run against any doctor on record. If the doctors
  already handling real cases in the informal network haven't been run
  through any documented verification step, that is a gap between "doctors
  we say are verified" and "doctors who have actually been verified,"
  existing today, not at launch.
- Data handling: the sourcing behind the growth team's T4 report describes
  today's patient contact happening over WhatsApp groups and informal
  word-of-mouth. If real medical case details move through those channels,
  that is a live data-handling/confidentiality question — not a hypothetical
  one gated on the platform going live.

**This role is flagging this as warranting urgent, same-day visibility for
Marina — not deferral to the next weekly audit cycle.** Per this role's
Handoff Rules, findings go to both founders simultaneously, never routed
through one to reach the other; per Escalation Rules, an ongoing,
undocumented informal medical practice is exactly the category of risk that
shouldn't sit until it's next convenient to look at. Recommend Marina (with
Legal & Compliance) get eyes on, today: (a) whether the current informal
case-routing activity requires any Israeli telemedicine licensing right now,
independent of the platform's build status; (b) whether Patient Rights Law
obligations are already being triggered by the existing, real case flow;
(c) what data-handling/confidentiality controls exist today for the
WhatsApp-based referral channel carrying real medical information. Resolving
this is Medical Advisory / Legal & Compliance's call, not this role's — the
job here is only to make sure it's seen today rather than found later.

---

## Addendum 2 — 2026-07-03 (same day): Correction to A.3

**Trigger:** A second message relayed via the Coordinator, quoting Vadim
directly: "все делается официально мы как агенты все через документы банки
клиники" — everything is done officially; MedByClick acts as an
**agent/referral intermediary** connecting patients to already-licensed
clinics, with formal documentation, bank transactions, and clinic
agreements, not the ad hoc, WhatsApp-only coordination A.3 was read as
describing.

### A.4 Effect on the A.3 risk read

An agent/facilitator model that refers patients to independently-licensed
clinics is, as a general regulatory matter, a materially different — and
typically lighter-touch — posture than a platform itself performing clinical
coordination or triage. If accurate, this narrows the specific risk A.3
raised: "may be practicing unlicensed telemedicine right now" was written
against a WhatsApp-only, undocumented-informal-practice framing, and that
framing is what's being corrected.

**Same evidentiary caveat as Addendum 1 applies, unchanged:** this correction
arrives the same way the first one did — a relayed message, not a repo
document. As of this addendum, no file under `docs/reports/medical/` or
`docs/legal/` (still empty, per the standing gap tracked since the
2026-07-02 baseline audit) documents the clinic agreements, the bank
transaction records, or a formal description of MedByClick's role as
referral agent rather than care coordinator. Asserted, not yet verified —
same bar as before, applied consistently rather than relaxed because the
second message is more reassuring than the first.

### A.5 Revised urgency: stand down from same-day, do not close the flag

This role is **not** fully standing down A.3 on the strength of a relayed
description alone — two things still need independent confirmation before
this is a closed matter rather than a corrected one:

1. That MedByClick's actual, documented role is "referral agent to
   already-licensed clinics" — and that it holds up in practice, not just in
   description. An agent model can drift into de facto clinical coordination
   (triage advice, treatment-adjacent guidance, case management beyond pure
   referral) without anyone deciding that on purpose — that drift is exactly
   the kind of thing a facilitator label doesn't automatically prevent, and
   it's a fact pattern worth Legal & Compliance actually checking against
   what MedByClick's founder/coordinator interactions with patients actually
   look like, not just what the entity paperwork says.
2. That the clinic agreements and bank records described actually exist as
   described — same document-it-so-the-next-audit-can-verify-it
   recommendation as Addendum 1.

**Revised urgency: downgraded from same-day/urgent to normal-cycle
follow-up.** The specific fact that made A.3 urgent — an undocumented,
informal, WhatsApp-only practice with no apparent licensing structure at
all — is the fact this correction addresses. A documented agent/referral
model with bank and clinic paperwork, even if not yet independently
verified by this role, is a different risk class than the one A.3 described,
and doesn't warrant pulling Marina off other work today. Recommend Legal &
Compliance confirm the two points above on its normal reporting cadence
(`docs/reports/legal/`), not as an emergency item. A.3 stays open on the
standing gaps list as a confirmation-pending item, not a same-day emergency,
and not yet closed.
