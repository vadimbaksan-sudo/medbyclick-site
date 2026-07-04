# Finding: MedAI → Real LLM Integration — Data Handling & 152-FZ Review

**Date:** 2026-07-04
**Filed by:** Legal & Compliance
**Type:** Medical-regulatory — routed to **Marina (CEO)**, cc Medical Advisory. Also cc **Vadim (CPWO)** as requester and as owner of the LLM-provider vendor decision this finding gates.
**Related:** `docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md` §3 and Verdict condition 6 (the consult that requested this review); `docs/WHITEPAPER.md` §3.4, line 38 (core population), line 1030 (regulatory-change risk factor); `docs/LEGAL_BRIEF.md` Part 1, Part 6.0 (Israel platform entity / offshore token entity structure); `docs/TODOS.md` T4 (Russian-speaking population framing); `modules/medai/types.ts`, `modules/medai/data.ts`

## Summary

**Synthetic/test-data development can proceed now, unblocked — I agree with
Medical Advisory on this.** No real personal data, no exposure, nothing for
this role to gate.

**Real patient data may not flow to any LLM provider yet.** Two independent
gates must clear first, not one: (1) a signed Data Processing Agreement with
the specific API tier used, confirming no training-use and a defined
retention window, contractually — this applies regardless of the 152-FZ
question, because this is health data; (2) a decision on how Russian
citizens' patient data is handled, because Federal Law 152-FZ creates a real,
if narrow and enforcement-uncertain, compliance exposure that should not be
assumed away. Neither gate is close to cleared today.

**152-FZ is a genuine issue, not a paper tiger, but its bite is more
reputational/structural than "Roskomnadzor kicks the door in."** Details in
§1. My read: the practical fix is not "solve 152-FZ," it's "don't send
Russian patients' raw symptom data to a US LLM API in the first place" —
architecturally cheaper than compliance.

---

## 1. The 152-FZ Question — Concrete Read

**What the law actually requires, as I understand it (outside counsel should
confirm — Russian data-protection law is not my deepest area):** Federal Law
No. 152-FZ "On Personal Data," as amended in 2015 (the localization
amendment, Art. 18(5)), requires operators to ensure that recording,
systematization, accumulation, storage, updating, and retrieval of personal
data of **Russian Federation citizens** occurs using databases located
**within the territory of Russia**. Cross-border transfer after that initial
Russia-based processing is permitted under conditions (adequacy-style rules,
consent, or listed treaty-adjacent grounds), but the *first* touch of the
data must be Russian infrastructure. This is the "must localize first, may
transfer after" structure Medical Advisory correctly summarized.

**Does sending Russian patients' symptom text directly to a US-based LLM API
(OpenAI or Anthropic) violate this?** On a plain reading, yes, if the flow is
"patient types symptoms in the MedByClick app → text goes straight to
OpenAI/Anthropic's US (or other non-Russian) infrastructure for the first
time it's recorded anywhere." There is no Russia-located database in that
path at all, let alone a first-recording one. This is not really a
close call on the wording of the statute.

**Nuance that matters for how seriously to weigh this, in descending order
of how confident I am:**

- **Scope is citizen-based, not residence-based.** 152-FZ's localization
  duty is generally understood to attach to processing personal data of
  **Russian citizens**, not "anyone accessing from Russia" or "anyone who is
  ethnically/linguistically Russian-speaking." MedByClick's stated core
  population is the **Russian-speaking diaspora in Israel and Europe**
  (`docs/WHITEPAPER.md` line 38) — many of these patients may hold Israeli,
  German, or other citizenship, not Russian citizenship, even though they are
  Russian-speaking and the platform's UI/support language is Russian. This
  matters a lot: "Russian-speaking" and "Russian citizen" are not the same
  set, and the overlap is an empirical question about the actual user base,
  not a documented fact anywhere I found in this repo. **Recommend the
  product/growth side track citizenship (or at minimum, country of
  registration/residence) as a proxy, not just language preference, so this
  question has a real denominator instead of an assumption in either
  direction.**
- **Enforceability against a foreign company with no Russian legal presence
  is a real practical constraint, but not a safe-harbor.** Roskomnadzor's
  main enforcement tools historically have been: (a) fines against entities
  with a Russian legal presence, (b) domain/IP blocking of the *service* in
  Russia (this has been used against foreign platforms with no local entity
  — e.g., LinkedIn was blocked in Russia in 2016 specifically over a 152-FZ
  localization dispute, which is the clearest precedent that "no Russian
  entity" does not mean "unreachable"), and (c) reputational/media pressure.
  MedByClick has no Russian entity today (per `docs/LEGAL_BRIEF.md`, only an
  Israel platform entity and an undecided offshore token entity are in
  scope) and the platform is not primarily marketed as a Russia-domestic
  service — it's diaspora-facing. That reduces exposure but does not
  eliminate it, especially if MedByClick ever markets directly into Russia,
  processes payments through Russian rails, or grows a large Russia-resident
  user base rather than staying diaspora-only.
- **The more concrete, nearer-term risk is reputational/patient-trust, not
  regulatory enforcement.** A healthcare product whose entire value
  proposition rests on serving a Russian-speaking population, discovered to
  be routing patients' actual symptom descriptions to a US AI company without
  disclosure or a data-residency story, is a trust problem with this exact
  user base independent of whether Roskomnadzor ever acts. This audience has
  documented, often well-founded sensitivity about data going to Western
  infrastructure. I'd weight this risk higher than the enforcement risk in
  the near term, but it doesn't make the legal question moot — it makes both
  risks point the same direction.
- **What I don't know and flag explicitly:** whether there are healthcare-
  data-specific provisions in Russian law beyond 152-FZ's general
  localization rule (e.g., sector-specific medical data rules) that could
  matter here; the current (2026) enforcement posture, which may have
  shifted from what I have visibility into; and whether any 152-FZ consent-
  based cross-border transfer exception could realistically cover this use
  case even after Russia-based initial storage. **All three should go to
  outside counsel with Russian-law competence** — this is exactly the kind
  of question `docs/LEGAL_BRIEF.md` Part 0 is trying to get MedByClick in
  front of a real firm for, though note the firms currently on that
  candidate list (Fieldfisher, DLx Law, MME Legal, Hogan Lovells, Sygna
  Partners) are crypto/MiCA-focused, not Russian data-protection
  specialists — this may need a separate, narrower engagement, not a
  line item added to the token-counsel brief.

**Bottom line on 152-FZ:** real exposure, not a paper tiger, but the shape of
the risk is "don't send this population's raw data to a US LLM without a
localization story" rather than "this blocks the whole feature." The
cheapest fix is architectural, not legal: avoid sending Russian-citizen
patient data to the LLM in the first place (see §3), which sidesteps the
question rather than resolving it — which is fine, since the goal is not
sending the data, not winning an argument about the statute.

---

## 2. General Health-Data Handling for the LLM Provider (Independent of 152-FZ)

This gate applies **regardless of which provider is chosen and regardless of
the 152-FZ answer**, because patient symptom text is health data — a special
category under GDPR-equivalent regimes and, once the Israel entity is live,
likely under Israeli Privacy Protection Law and Patient Rights Law as well.

- **A Data Processing Agreement is a hard requirement before any real patient
  data flows**, full stop. Not a "nice to have," not something to backfill
  after launch. Both OpenAI and Anthropic offer enterprise/business API tiers
  with DPA terms available (this is standard practice for both vendors as of
  my knowledge, though I do not have the current exact contractual text
  memorized and it changes — **whoever executes this must pull the live
  current terms directly from the vendor, not rely on this document or
  general knowledge of past terms**). The DPA must specifically cover
  health/special-category data, not just generic PII — confirm this
  explicitly with the vendor rather than assuming a standard commercial DPA
  automatically extends to health data classification.
- **Training-use opt-out / zero-data-retention (ZDR) must be the specific,
  confirmed, contractual tier used** — not the default consumer product
  (ChatGPT/Claude.ai consumer settings), and not assumed from the vendor's
  general marketing position ("we don't train on API data by default" is a
  policy statement, not necessarily identical to a contractual guarantee at
  every tier). Whoever builds the integration must confirm, in writing, from
  the actual agreement signed: (a) inputs are not used for model training,
  (b) the retention window (ideally zero or near-zero for a ZDR-eligible
  tier, which both vendors have offered in some form historically for
  qualifying customers), (c) that this is enforceable contract language, not
  a togglable dashboard setting that could silently revert.
- **GDPR Art. 9 special-category analysis** applies if any EU/EEA patients
  are in scope (plausible, given the stated Europe diaspora population) —
  processing health data under Art. 9 needs a specific lawful basis (likely
  explicit consent here, Art. 9(2)(a)), which ties directly into Medical
  Advisory's already-required "consent-before-input notice" (their §2). Legal
  and Medical Advisory's UX requirement should be implemented as one
  consent flow, not two.
- **Israeli Privacy Protection Law** equivalent analysis is needed once the
  Israel platform entity is live (`docs/LEGAL_BRIEF.md` Part 6.0) — flagging
  now so it isn't missed later, not a blocker on the current build-start
  decision since the entity itself isn't incorporated yet.
- **De-identification where feasible**: agree with Medical Advisory's
  framing — decoupling patient name/account identifiers from the symptom-text
  payload sent to the LLM, where architecturally possible, reduces exposure
  even after a DPA is in place. Worth doing regardless of provider choice, as
  defense in depth, not a substitute for the DPA.
- **MedByClick's own retention** of symptom submissions and LLM outputs needs
  a stated policy consistent with whatever policy governs other health
  records the platform holds — currently no such policy exists in this repo
  that I could find (`docs/WHITEPAPER.md` line 1002 lists "Privacy Policy
  (GDPR-compliant)" as an outstanding checklist item, not yet written). This
  should be drafted before real patient data flows anywhere, LLM or not.

---

## 3. Go/No-Go on Real Patient Data

**Synthetic/test data: proceed now, unblocked.** Agree fully with Medical
Advisory's framing — synthetic data has no real personal-data exposure, so
there is nothing for this role to gate. Development, prompt design, and the
build-verification pass Medical Advisory requires before public release
(their condition 7) can all happen against synthetic data without waiting on
anything below.

**Real patient data: not yet. Specific conditions, all must be true before
the first real patient's symptom text reaches any LLM provider:**

1. **DPA signed** with the specific provider and specific product/API tier
   actually being used, confirmed to cover health-category data.
2. **Training-opt-out / zero-data-retention confirmed contractually** for
   that same tier, in writing, not inferred from general vendor policy.
3. **A Russian-citizen data-handling decision is made and implemented** —
   pick one, don't leave it implicit:
   - **(a) Exclude:** Russian-citizen patients' symptom-checker sessions do
     not get routed to the external LLM at all — keep that population on
     human-only/coordinator-only intake for now, LLM-assisted intake enabled
     only where the localization question doesn't bite. This is the cheaper,
     faster option and my recommendation if a fast path to real-data usage
     matters more than universal LLM coverage on day one.
   - **(b) Localize:** stand up Russia-based initial storage/recording of
     the raw symptom data before any cross-border send to the LLM, then
     confirm a valid cross-border transfer basis for the LLM step. Slower,
     requires Russian infrastructure and likely Russian-law counsel to get
     the transfer mechanism right — not a quick technical fix.
   - Determining actual citizenship-vs-language-preference split of the user
     base (flagged in §1) informs which option is proportionate; either way,
     a decision must be made and documented, not left as an accidental
     default because nobody flagged it.
4. **GDPR Art. 9 consent-before-input flow implemented** (ties to Medical
   Advisory's consent-before-input UX requirement — one flow, not built
   twice).
5. **MedByClick's own retention policy for symptom submissions/LLM outputs
   drafted and applied**, consistent with whatever governs other patient
   health records on the platform (currently: no such policy exists yet per
   §2 above — this is a real gap, not a formality).
6. **De-identification of the LLM payload** (decoupling identity from
   symptom text) implemented where architecturally feasible — recommended,
   not a hard blocker on its own, but should not be skipped without a
   specific reason.

None of conditions 1–2, 4–6 are 152-FZ-specific — they'd apply even if
MedByClick had zero Russian-citizen patients, because this is health data
going to a third party regardless of nationality. Condition 3 is the
152-FZ-specific one and is the only condition with a genuine "pick a lane"
decision embedded in it rather than a pure compliance checkbox.

---

## 4. Escalation — Joint Visibility Needed Now

**This needs Joint founder visibility now, not a routine finding that waits
for a scheduled sync.** Reasoning, per this role's Escalation Rules:

- Medical Advisory's consult already flagged (their Verdict, Escalation
  note) that if this review surfaces a hard blocker, it has roadmap/timeline
  implications for a Phase 1 item and should go to a joint founders sync
  rather than be resolved unilaterally in either lane. This review does
  surface exactly that: condition 3 above is a real decision with cost and
  timeline attached (pick exclude-for-now vs. build Russian localization),
  not something Legal & Compliance can pick on its own — it affects product
  scope (which patients get LLM-assisted intake at launch) and potentially
  infrastructure spend (if localization is chosen), both of which cross into
  Joint territory per `docs/governance/DECISION_MATRIX.md`'s catch-all for
  decisions creating company-wide liability or requiring budget allocation.
- This is also, per this role's own routing rules, a **medical-regulatory
  finding → Marina (CEO), cc Medical Advisory** in the first instance (data
  handling for a clinical-safety-gated feature), but the Russian-citizen
  data question in particular touches the same jurisdiction-structuring
  conversation already flagged Joint in `docs/LEGAL_BRIEF.md` Part 6.0 (Israel
  platform entity, offshore token entity) — cc Vadim for that reason, not
  because this is a crypto/corporate finding.
- **This does not block the medai build overall** — Medical Advisory's
  conditional go stands, synthetic-data development proceeds, and most of
  the build (UI redesign, red-flag gate, disclaimers, scope restriction) has
  nothing to do with this review. Only the "go live with real patient
  inputs" step is gated, and only on the conditions in §3.

---

## Decisions Required (routing per `docs/governance/DECISION_MATRIX.md`)

- **Joint:** Russian-citizen data-handling approach (§3 condition 3 —
  exclude-for-now vs. localize) — has cost/timeline/scope implications
  crossing into Joint catch-all territory.
- **CEO (Marina), informed by Medical Advisory:** overall sign-off that the
  medai build proceeds under Medical Advisory's conditional go plus this
  role's conditions before real data goes live — this is confirmation of
  gates already set by two advisory roles, not a new independent decision.
- **Vadim (CPWO), as vendor decision owner:** selecting the specific
  OpenAI/Anthropic product tier and executing the DPA once Joint founder
  direction on §3 condition 3 is set — this role can specify what the
  agreement must contain (§2) but does not select or negotiate the vendor
  relationship itself.

## Escalation Status

Escalating now, not waiting for scheduled sync, per the reasoning in §4.
Routed to Marina (CEO) as primary per medical-regulatory routing, cc Medical
Advisory (whose consult this responds to) and cc Vadim (CPWO) as both the
original requester and the eventual vendor/DPA decision owner.

## Next Step

Awaiting: (1) Joint decision on the Russian-citizen data-handling approach
(§3 condition 3); (2) Vadim to select final LLM provider/tier so the specific
DPA and training-opt-out terms can be confirmed against real contract
language rather than general vendor policy; (3) confirmation a Privacy
Policy / retention policy gets drafted (currently an open checklist item,
`docs/WHITEPAPER.md` line 1002) before real patient data flows through this
or any other feature. This role will re-review once a provider/tier and a
Russian-data approach are chosen, before real patient data is authorized to
flow.
