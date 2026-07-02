# T4 — Paid Acquisition Channel Hypothesis

Owner: **Growth/Marketing** (`docs/agents/GROWTH_MARKETING.md`) · Status: **Draft —
not finalizable until Coordinator is operational (Phase 2 gate)**
Deadline per `TODOS.md` T4: before marketing hire begins / before any paid spend.
Research date: 2026-07-02. Sources: `docs/WHITEPAPER.md` §9.1 (pricing/volume),
prior `/office-hours` business design doc (`~/.gstack/projects/medbyclick/
vadimrudkovsky-unknown-design-20260616-194257.md`, cited in `docs/TEAM_STRUCTURE.md`
as the origin of the trust-network model), `TODOS.md` T1/T4.

This is a hypothesis document, not a go decision. Per this role's Must-Not-Do, no
paid spend is committed by writing this — it requires **Vadim (CPWO) sign-off**
before any test budget moves, and per Handoff Rules, no ad creative built from it
runs before Medical Advisory clears any clinical claim in the copy.

## (a) Channel Hypothesis

The existing acquisition motion is 100% organic: "Zero paid marketing — all
acquisition is word of mouth" through the founder's 40-year trust network,
currently running over WhatsApp groups and informal referral (design doc, lines
17–25). The question this hypothesis answers is which paid channel most closely
*extends* that existing organic pattern, rather than starting a new one from
scratch — the design doc frames the open question as "which channel (search,
community, diaspora media) produces patients who match the profile" (line 99).

Ranked, in test-sequence order:

1. **Russian-speaking diaspora community spaces in Israel** (Russian-language
   Facebook/VK groups, Telegram channels serving Russian-speaking olim) —
   **primary hypothesis.** This is the closest paid analog to the channel that
   already works organically: the design doc explicitly describes today's
   patients as finding the founder through "WhatsApp groups and informal
   word-of-mouth" within this same community (line 25). Lowest execution risk
   because it doesn't require validating a new discovery pattern, only paying to
   reach further into a pattern already proven at hundreds of transactions.
2. **Russian-language diaspora media** (local Russian-Israeli press, radio,
   classifieds — e.g., outlets in the 9 Kanal / Vesti category) — matches the
   "diaspora media" arm of the design doc's own three-way test framing. Broader
   reach than community groups, harder to attribute CAC per-channel without a
   dedicated tracking mechanism (promo code, landing URL, or call line).
3. **Search (Russian-language SEM/SEO)** — highest buyer intent (patients
   already searching for a specialist or second opinion), but the design doc
   flags this population as people whose "GPs [refer them but] don't know where
   to send them" and who "eventually hit a wall" (line 25) — i.e., they may not
   yet know to search in a way that surfaces MedByClick. Also the most
   competitive/expensive keyword environment of the three. Test third, after
   community and media establish a CAC floor to compare it against.

**Not recommended for the first test:** general-audience or non-diaspora
channels. The whitepaper's target segment is explicitly the underserved
Russian-speaking diaspora (§Introduction), and the design doc's secondary
segment is the same population — broadening the audience for the first test
would dilute profile match (criterion (c) below) before the model is proven in
its native segment.

## (b) CAC Estimate

**No empirical CAC exists yet** — there has been zero paid spend to date (design
doc, line 18), so this is a target ceiling derived from unit economics, not a
benchmark from comparable spend. Treat it as a cap to test against, not a
prediction of what the channels will actually cost.

- Entry-point transaction: **Case Review, $150** (`docs/WHITEPAPER.md` §9.1) —
  this is the analog to what the design doc calls the "consultation," the
  documented entry point of the existing funnel, ahead of the much higher-value
  surgery-referral pipeline (design doc line 19: referrals run ~10x a
  consultation's value).
- Standard CAC ceiling of ≤1/3 of first-transaction value gives a **target CAC
  of ≤$50 per converted paying patient** for the first test.
- This ceiling deliberately ignores downstream value (surgery referrals, Care
  Coordination upsell, Ongoing Access subscription) — the first test should
  clear on the entry transaction alone. If it does, the real payback is better
  than $50:$150 once downstream conversion is added; that's an upside case for
  go/no-go, not a requirement for it.
- **No Russian-language, Israel-specific, healthcare-adjacent CPL/CAC benchmark
  is in this repo.** Before committing spend, get at least a rough external
  CPL estimate for the top-ranked channel (community-group ad placements) — this
  is desk research Growth/Marketing can do without needing the coordinator, and
  should be done before the test starts, not treated as part of this hypothesis
  document.

## (c) Go/No-Go Criteria for the First Paid Test

| Criterion | Threshold | Status |
|---|---|---|
| Target CAC | ≤$50 per converted paying patient (Case Review completion) | Set — see (b) |
| Minimum volume | **TBD — needs Coordinator capacity input** | **Blocked**, see below |
| Patient profile match | **TBD — needs Coordinator intake data** | **Blocked**, see below |
| Timeline | First paid channel running with measurable CAC by Month 6 (design doc line 119) | Set |

Go = target CAC met **and** minimum volume reached **and** profile match
threshold met, within the Month 6 timeline. Miss any one and the test is a
no-go on that channel specifically — not a verdict on paid acquisition overall;
re-rank and try the next channel in the sequence above.

## Flagged: Parts That Cannot Be Finalized Until the Coordinator Is Operational

`TODOS.md` T4 lists "Coordinator operational (Phase 2 gate)" as a hard
dependency, and the design doc is explicit that this is "a gate, not a
guideline" (line 89) — Phase 2 paid acquisition does not start before the
Coordinator is in place. Concretely, that dependency lands on two of the four
rows above:

- **Minimum volume threshold.** Setting a lead/conversion floor without knowing
  the Coordinator's realistic monthly intake capacity risks buying more paid
  volume than the operation can triage — which would corrupt the test itself
  (a routing bottleneck would look like a channel failure). This number should
  come from the Coordinator's actual throughput once operational, not be
  guessed here.
- **Patient profile match threshold.** "Profile match" today is the founder's
  informal judgment call on each case. Once the Coordinator is running real
  intake, its triage classification becomes the actual measurement instrument
  for whether a paid-channel patient matches the target profile (Russian-
  speaking, Israel-based, complex/rare/second-opinion case). Defining a
  numeric threshold before that instrument exists would be arbitrary.

Everything else in this document — the channel ranking, the sequencing logic,
and the CAC ceiling derived from published pricing — does not depend on the
Coordinator and can be treated as final input for planning today. Recommend
revisiting this document to fill in the two blocked rows as soon as the
Coordinator has run intake long enough to produce a real capacity number and a
real profile-match baseline, and before any paid spend is approved.

## Next Steps / Handoff

- CPWO (Vadim) sign-off required before this converts into approved test
  budget, per this role's Must-Not-Do.
- Once Coordinator capacity/profile data closes the two blocked rows, this
  document should be updated in place (not superseded) and re-flagged for
  CPWO approval.
- Any ad creative for the community-group or diaspora-media channels goes
  through Medical Content for copy and Medical Advisory for clinical-claim
  sign-off before publish — this document sets channel/budget/criteria only,
  it does not contain or approve creative.
