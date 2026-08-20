# TODOS

## T1 — Coordinator Job Description (Week 1-2, before search begins)

**What:** Write a one-page JD with required qualifications (medical coordination background, Russian + Hebrew language, intake experience) and identify 3 sourcing channels (Russian-speaking healthcare community, LinkedIn, clinical coordination agencies in Israel).

**Why:** Coordinator hire has a Month 2 hard deadline and is the critical gate for Phase 2. Without a JD and sourcing plan, search doesn't start effectively and the deadline slips.

**Pros:** Month 2 deadline achievable. Forces clarity on "good" before interviewing. The readiness gate (10 cases + 3 blind reviews) depends on the right hire.
**Cons:** ~2 hours of founder time Week 1-2.

**Context:** The coordinator will be asked to replace the founder's routing intelligence — not just manage schedules. The JD must distinguish between scheduling coordinators and clinical triage coordinators. Wrong hire = Phase 2 delayed by months.

**Depends on / blocked by:** Nothing. Starts immediately.

---

## T2 — Platform Evaluation Rubric + Shortlist (Week 2, before Day 25)

**What:** A one-page evaluation matrix applied to 3-5 specific platforms (e.g., Healthie, Jane App, Doctoralia, SimplePractice, WhatsApp Business API). Criteria: HIPAA/GDPR compliant, Israeli Patient Rights Law compliant, no patient app install required, scheduling + payments built in, supports SLA tiers, price point.

**Why:** Day 30 platform decision is a hard gate for all patient data migration. Without a shortlist, the decision is made under time pressure with incomplete information. Criteria must be established before vendor demos to reduce sales-pressure bias.

**Pros:** Day 30 decision becomes a comparison, not a search. SLA requirements from routing protocol (Issue 2A fix) become evaluation criteria.
**Cons:** ~4 hours of research time; can be delegated to a trusted advisor or the coordinator once hired.

**Context:** Platform must also satisfy the SLA tiers (standard acknowledgment, urgent escalation) now required in the case routing protocol. Build these into the evaluation matrix.

**Depends on / blocked by:** Can start in parallel with routing protocol. Rubric finalized once SLA values are set.

---

## T3 — Quality Review Triage Criteria (Phase 1, within doctor vetting standard)

**What:** A triage protocol specifying which cases get reviewed in the monthly 20% sample: (a) all new case types not seen before, (b) all cases where doctor hesitated or asked for clarification, (c) all adverse outcomes and patient complaints, (d) random fill to meet the 20%/2-per-doctor floor.

**Why:** Random 20% sampling won't catch systemic routing errors. A doctor who consistently misroutes one case type could run for months before a random sample surfaces it. Triage-based selection catches patterns faster and makes the founder's review time higher-signal.

**Pros:** Founder time focused on highest-signal cases. Systemic routing errors surface faster. Scales better as volume grows toward the capacity ceiling.
**Cons:** ~1 hour to write; slightly more overhead for coordinator to flag cases.

**Context:** The canonical quality formula (Phase 1) sets HOW MANY cases. This TODO sets WHICH ONES. Both are required for the quality monitoring mechanism to function. Add as a section within the doctor vetting standard document.

**Depends on / blocked by:** Doctor vetting standard (Phase 1 deliverable). Add triage criteria as a section within it.

---

## T4 — Paid Acquisition Channel Hypothesis (before marketing hire)

**What:** A one-page document: (a) which channel(s) are most likely to reach Russian-speaking desperate patients in Israel, (b) CAC estimate, (c) go/no-go criteria for the first paid test (target CAC, minimum volume, patient profile match).

**Why:** Marketing hire will ask "what are we testing?" on Day 1. Founder is the best source for the initial channel hypothesis — 40 years in the community, hundreds of word-of-mouth referrals that reveal where patients already find information. Without this, the marketing hire spends their first month on research the founder already holds.

**Pros:** Marketing hire starts executing, not exploring. Paid acquisition test has defined success criteria before money is spent. CAC target informs budget decisions.
**Cons:** ~2 hours of founder time; must happen before marketing hire begins.

**Context:** Test review coverage diagram flagged as [GAP]: no channel hypothesis, no test budget, no go/no-go criteria. All three needed before the first paid acquisition test can be evaluated as a success or failure.

---

## T5 — Dedicated coordinator role (userRoleEnum) instead of admin-gating /coordinator

**What:** Add a real `coordinator` value to `userRoleEnum` and re-gate
`app/coordinator/page.tsx` (the escalated/abandoned-booking queue, which
shows patient-authored `situationNotes`) to it instead of `admin`.

**Why:** Flagged by the 2026-08-20 `/autoplan` retrospective review: right
now every `admin` account can read every escalated/abandoned case's raw
notes, with no coordinator-specific audit trail or access boundary — an
interim state adopted only because no coordinator role existed yet when the
page shipped (Phase F, `docs/decision-log/0009`).

**Pros:** Real least-privilege boundary instead of "admin can see
everything." Natural fit once T1 (coordinator hire) lands — the role needs
to exist in the schema before that person can be onboarded with the right
access anyway.

**Cons:** Schema migration (one enum value) + swapping the page's role check
+ deciding who gets granted the role and how — small code change, real
process decision attached to it.

**Context:** Not urgent on its own (today's `admin` accounts are trusted,
this isn't external exposure) — but should land before or alongside T1
rather than being deferred indefinitely, since T1's hire is the first person
who should get this role instead of `admin`.

**Depends on / blocked by:** Loosely coupled to T1 — cleanest if a
coordinator role exists by the time that hire is onboarded.

---

## T6 — `bookings.caseStage` has 3 states nothing ever sets

**What:** `documents_requested`, `under_review`, and `matched` exist in the
`case_stage` enum but no write path in the codebase ever transitions a
booking into any of them — confirmed by tracing every `caseStage` write site.
Either wire real transitions into these states as part of a future case-flow
build, or explicitly document them as reserved-not-yet-used so the enum
doesn't overstate what Phase B (`docs/decision-log/0009`) actually shipped.

**Why:** Flagged by the 2026-08-20 `/autoplan` retrospective review — the
public `/medconnect` 12-step case journey and the decision-log both describe
a richer pipeline than what the write paths actually implement today
(`submitted → consultation_scheduled → closed`, plus the terminal
escalated/abandoned/transferred side-states).

**Pros:** Either resolution is cheap. Wiring them in is the more complete
fix if a doctor-facing "advance this case" UI gets built later. Documenting
them as reserved costs one sentence and removes the overstatement risk
immediately.

**Cons:** Wiring them in now would be scope creep beyond what was
authorized for the retrospective review itself — not done as part of this
pass.

**Depends on / blocked by:** Nothing — either resolution can happen
independently, whenever the doctor-facing case-detail UI (noted as "not
done, still open" in `docs/decision-log/0009`'s addendum) gets built.

**Depends on / blocked by:** Coordinator operational (Phase 2 gate). Write before marketing hire begins.
