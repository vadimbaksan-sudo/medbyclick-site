# Finding: `medical_history_entries` — Persistent Health-Record Storage Data Handling Review

**Date:** 2026-07-04
**Filed by:** Legal & Compliance
**Type:** Medical-regulatory — routed to **Marina (CEO)**, cc Medical Advisory. Also cc **Vadim (CPWO)** as infrastructure/vendor decision owner (Supabase region, storage backend) and as the founder whose Israel-entity/Russian-citizen jurisdiction questions this finding builds directly on.
**Related:** `docs/reports/product/2026-07-04-core-patient-doctor-cabinets-spec.md` §5 (the trigger for this review, esp. §5.2's four questions); `docs/reports/legal/2026-07-04-medai-llm-data-handling-review.md` (this role's prior review, same day — reused and extended below, not re-derived); `lib/db/schema.ts` (`medicalHistoryEntries` table, lines 285–325); `docs/LEGAL_BRIEF.md` Part 1, Part 6 §6.0 (entity/jurisdiction state); `docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md` (Medical Advisory's parallel review, cited for the taxonomy question in §4 below).

## Summary

**Synthetic-data schema/UI shell build: correctly unblocked, agree with CTO/Product's gating.** `lib/db/schema.ts`'s `isSynthetic: boolean` default-`true` column is a real, application-enforced gate, not just a comment — I confirm this is sufficient to let Developer keep building against seed data while this review runs.

**Real patient data: not yet, and the gap here is larger than the `medai` gap was.** The `medai` review (same day) gated a single API call to a third-party LLM processor. This gates **indefinite persistent storage of lab results, diagnoses, and visit notes** — a fundamentally different risk profile: no DPA-with-a-single-vendor question to close, but a genuine, unresolved *retention-vs-deletion conflict* (§1), an *undecided hosting region* for the exact infrastructure this data will live in (§2), and a *file-storage backend with no stated encryption/access-control policy* (§3). None of these existed in the same form for the `medai` question, so this is not a copy-paste of the prior verdict — it requires its own analysis, using the same legal categories.

**Overall verdict (§5): more blockers than "write a retention policy and pick a region."** Those two items are necessary but not sufficient — see §5 for the full condition list.

---

## 1. Retention Policy — the Real Question Is Retention vs. Deletion, Not Just "How Long"

### 1.1 The tension, stated plainly

For ordinary personal data, GDPR's default posture (Art. 17, "right to erasure") lets a data subject request deletion, and absent a countervailing legal basis, the controller must comply. For **medical records specifically**, most jurisdictions run the opposite direction: statutes impose **minimum retention periods** on health records — often measured in years to decades — precisely so that patients, successor treating physicians, insurers, and regulators can rely on the record existing later, not disappearing on request. This is not a MedByClick-specific quirk; it is how health-records law is generally structured everywhere I have visibility into. CTO/Product's spec is right to flag this as a tension; my job here is to give a real answer on which wins, not leave it open.

### 1.2 Which wins: retention duty wins, structured as a lawful-basis override, not a refusal

**GDPR Art. 17(3)(b)** creates an explicit exception to the right to erasure: erasure does not apply where processing is necessary "for compliance with a legal obligation which requires processing by Union or Member State law to which the controller is subject." A statutory medical-record-retention duty is exactly this kind of legal obligation. **Practical resolution: when a patient's deletion request would conflict with an applicable minimum-retention duty, the retention duty wins for the specific data covered by that duty, for the specific retention window it mandates — this is not a discretionary call MedByClick makes case-by-case, it is what Art. 17(3)(b) already provides for.** The correct patient-facing answer is not "we refuse your request" but "we will restrict this record to storage-only / no further active use (Art. 18-style restriction) rather than delete it, until the statutory retention period lapses, at which point it is deleted" — same outcome as the medai review's general pattern of "give the patient the true answer, don't leave the tension unresolved."

### 1.3 What retention period actually applies — the honest limits of this answer

I do not have a confirmed, jurisdiction-specific minimum retention figure for MedByClick's actual operating posture today, and I flag explicitly why, rather than inventing a number:

- **No entity is live yet.** `docs/LEGAL_BRIEF.md` Part 1/6 confirms the Israel platform entity is targeted for incorporation, not yet incorporated. Which country's medical-records-retention statute binds MedByClick as a *controller* depends on where the controlling entity is established and licensed, which isn't settled.
- **Patient population is multi-jurisdictional by design** (Israel/Europe Russian-speaking diaspora, per the medai review) — different patients' records may fall under different home-country retention regimes depending on where they received care and which entity treated them, not just where MedByClick is incorporated.
- **What I can say with reasonable confidence, as a planning baseline, subject to outside-counsel confirmation:** health-record minimum retention requirements across the jurisdictions in scope here (Israel, EU member states generally) commonly run in the **7–20+ year range depending on record type and, for some categories (e.g., minors' records, certain diagnostic imaging), materially longer** — this is a directional planning figure, not a citation to a specific statute section I have verified against current text. **Do not build a retention policy off this number alone; outside counsel must confirm the specific Israeli Patient Rights Law / Ministry of Health retention regulation figure and the relevant EU member-state figures once the entity's jurisdiction is settled.**

### 1.4 Concrete recommendation for a written policy now, without waiting on counsel

Because CTO/Product needs an actual answer to unblock Developer, not just "consult outside counsel" (a real answer, per the task): **adopt a placeholder retention policy of a minimum 10 years from the date of the last entry for any `medical_history_entries` row tied to a real patient, with deletion/restriction logic built into the schema now rather than retrofitted later**, structured as follows:

1. Add a `deletionRequestedAt` (nullable) and `retentionHoldUntil` (nullable, computed from `recordedAt` + the applicable statutory period) column pair to the table now, even while still synthetic-only — cheap to add now, expensive to retrofit once real rows exist. This lets the "restrict, don't delete, until the hold lapses" logic (§1.2) be enforced in code rather than by policy memory.
2. Treat 10 years as a **conservative floor, not a final answer** — it is very unlikely any applicable jurisdiction here requires *less* than this for adult general medical records, so building to this floor now does not create rework risk if the real figure turns out to be longer (adjust the number, not the mechanism) but does create rework risk if the real figure is shorter and MedByClick over-retained (an acceptable, low-severity risk compared to under-retaining and deleting records a doctor or regulator later needs).
3. **This is a placeholder for Developer to build against, not a substitute for the actual figure outside counsel must confirm** once jurisdiction is settled — flag this explicitly in whatever internal ticket tracks this so "10 years" doesn't calcify into an assumed-correct final number nobody revisits.

---

## 2. Data Residency — Supabase Region Selection

### 2.1 Does this table specifically need a region decision, separate from the general Israel/Russian-citizen question already open?

**Yes, and more urgently than for the `medai` LLM question**, for one structural reason: the `medai` review's cheapest fix was architectural avoidance ("don't send Russian-citizen data to the LLM in the first place," §3 of that review) — a transit decision that can differ per-request. **`medical_history_entries` has no equivalent avoidance option once real data is stored: every row lives in one Postgres instance, in one Supabase region, all the time, for the entire retention period in §1.** There is no per-row "route around it" option analogous to excluding one population from one API call — the region choice is a single decision that governs all patients' records for years. This raises the stakes on getting the region choice right the first time, since migrating a live health-records database to a new region later is materially more disruptive than changing an LLM routing rule.

### 2.2 Concrete recommendation

**Select an EU region for the Supabase Postgres project backing this table** (e.g., Supabase's `eu-central-1` (Frankfurt) or `eu-west-1`/`eu-west-2` class regions — confirm exact current region names/availability against Supabase's live project-creation console, not this document, since offerings change), for these reasons:

- **GDPR**: an EU-region-hosted database is the cleanest posture for any EU-resident/EU-citizen patients in scope (the stated Europe diaspora population), avoiding a Schrems-II-style international-transfer analysis for the *storage* layer itself (transfers still occur wherever the app servers/edge functions are hosted, but keeping the data-at-rest layer in-EU removes one variable).
- **Israel**: Supabase does not, to my knowledge, offer an Israel-based region option today (verify against the live console — this may change). Absent an Israel-proximate region, an EU region is the next-best choice once the Israel entity is live, both geographically and because Israeli Privacy Protection Law's adequacy-style framework has historically tracked EU data-protection norms reasonably closely (this is a directional comparison, not a claim of formal EU adequacy equivalence — outside counsel should confirm current status).
- **Avoid US-only regions for this table specifically.** A US region is the worst combination of the jurisdictions in scope here: it satisfies neither a 152-FZ-adjacent localization story for Russian-citizen patients (per the medai review's §1, the localization duty requires the *first* recording of the data to be Russia-based — a US Supabase region is exactly the fact pattern that duty is written against, and health records are a stronger, more persistent instance of that same first-recording problem than a single symptom-checker API call) nor gives any EU-adequacy-style comfort for European patients. If Supabase's pricing/feature tier meaningfully differs by region such that US-only was the default assumption, treat changing that as a hard requirement, not a nice-to-have.
- **Russian-citizen patients specifically**: an EU region does not resolve the 152-FZ localization question (EU is not Russia), it only avoids making it worse. The medai review's exclude-vs-localize decision (§3 condition 3 of that review) is still open and still Joint — it applies here too, arguably with higher stakes, since a health record persists where a symptom-checker session does not. **This review does not re-decide that question; it inherits it.** If Joint founders pick "exclude" for medai, the same population's `medical_history_entries` rows likely need the same treatment (or a Russia-based storage answer) — this is a dependency on that same open Joint decision, not a new one.

### 2.3 Honesty about the limits of this recommendation

This is a directional engineering recommendation ("pick EU, not US, for this table"), not a legal opinion that an EU region fully satisfies GDPR, Israeli Patient Rights Law, or 152-FZ for this data. **Outside counsel with EU data-protection and Israeli health-data-specific competence must confirm** the region choice actually closes the gaps I'm identifying here, particularly once the Israel entity's own data-protection obligations (once live) are analyzed directly rather than inferred from GDPR-adjacency.

---

## 3. Encryption / Attachment Storage (`attachment_ref`)

The schema's `attachmentRef: text("attachment_ref")` is a pointer, not inline blob storage — per the spec, this backs lab-result documents via a separate file-storage layer (Supabase Storage, per the spec's assumption; confirm this is still the actual choice before real files flow). Concrete expectations, not just "encrypt it":

1. **Encryption at rest**: confirm Supabase Storage's bucket-level encryption-at-rest is active for whatever bucket backs this (Supabase Storage sits on top of S3-compatible object storage with encryption at rest by default on the provider's infrastructure as a baseline — **do not assume this without confirming current Supabase Storage documentation directly**, since defaults and marketing claims can lag actual contractual guarantees, the same caution the medai review gave for LLM-vendor training-use claims).
2. **Bucket must be private, not public.** Supabase Storage buckets are explicitly configurable as public or private; a private bucket with signed, time-limited URLs generated server-side (not a permanently public bucket URL) is the only acceptable configuration for lab result documents. `attachment_ref` should store a stable object key/path, and the application layer should mint a short-lived signed URL per authorized request — never store or serve a long-lived public URL.
3. **Row-Level-Security-equivalent access control on the bucket**, mirroring the same patient-can-only-read-their-own-records model the spec already recommends for the Postgres tables via RLS (§1.4 of the product spec). Supabase Storage supports policy-based access control on buckets/objects analogous to Postgres RLS — this must be configured so a signed URL (or direct storage access) can only be generated for the patient who owns the record or a doctor with an active, authorized relationship to that patient, enforced server-side, not inferred from the UI hiding a link.
4. **Encryption in transit**: standard HTTPS/TLS for all upload/download paths — confirm no path in the upload flow (e.g., a pre-signed upload URL handed to the client) allows the file to transit over plain HTTP, which would be an easy-to-miss regression if a raw storage endpoint URL is ever hardcoded instead of going through Supabase's SDK.
5. **File-type/content validation before storage**, as a security-hygiene item adjacent to but distinct from encryption: lab result "documents" accepted from patient upload (not just doctor-authored entries) are an upload surface — validate file type/size server-side before persisting, both for basic security hygiene and because an unvalidated upload path is a separate finding from the encryption question, worth Developer's attention regardless of this review's health-data framing.
6. **This is engineering configuration guidance, not a substitute for a signed Data Processing Agreement with Supabase covering health-category data specifically** — same principle as the medai review's DPA requirement for the LLM vendor (§2 of that review). Supabase is a data processor for this health data; confirm Supabase's own DPA/terms explicitly cover special-category health data, not just generic PII, before real files are stored, the same way the medai review required for the LLM vendor. I have not verified Supabase's current DPA text — whoever executes this must pull it directly from Supabase, not assume from general vendor reputation.

---

## 4. Medical Advisory Input on `entry_type` Taxonomy — Flagged, Not Resolved

Per this role's Must-Not-Do ("must not approve medical claims — routes to Medical Advisory, doesn't override it") and the same "flag as a dependency" pattern already used in the medai review for clinical-safety questions outside this role's competence:

**Flagging for Medical Advisory, before real data flows:** `lib/db/schema.ts`'s `medicalEntryTypeEnum` (`visit_note | lab_result | prescription | diagnosis`) is a data-modeling taxonomy, not a reviewed clinical-safety taxonomy. Questions genuinely outside this role's lane that Medical Advisory should confirm before real data is authorized:

- Is a flat, single `entryType` enum with a generic `bodyOrStructuredPayload` jsonb column clinically adequate, or do specific entry types (e.g., `lab_result`, `prescription`) carry structured-data requirements (units, reference ranges, dosage/frequency fields, drug-interaction-relevant structure) that a generic jsonb blob risks losing or misrepresenting if not enforced by a stricter schema per type?
- Does `diagnosis` as its own `entry_type`, stored and displayed without any clinical review gate, create a risk of a patient seeing an unreviewed or ambiguous diagnosis entry presented with the same UI weight as a doctor-authored one, if patient-uploaded entries and doctor-authored entries share one taxonomy with no visible provenance distinction in the UI?
- Should this taxonomy foreclose or explicitly leave room for future AI-assisted summarization of lab results/history (the spec's own §5.1 note about `medtrials`/`mededu` consumers and the general question of whether an LLM should ever summarize this data the way `medai` does symptom intake) — this is a design-now-decide-later question Medical Advisory, not Legal & Compliance, should own.

**This role does not have a view on whether the taxonomy is clinically sufficient and is not attempting to answer that question here** — routing to Medical Advisory per standard practice, same as the medai review's own out-of-lane deferrals.

---

## 5. Overall Verdict — More Blockers Than "Write a Policy, Pick a Region"

**No — Developer's built schema/UI shell cannot be safely activated for real patient data once only a retention policy is written and a region is picked. That's necessary but not sufficient.** Full condition list, all must clear before the first real (non-synthetic) row is written to `medical_history_entries`:

1. **Retention/deletion policy adopted**, at minimum the placeholder in §1.4 (10-year floor, restrict-don't-delete mechanism, `retentionHoldUntil` column), refined against confirmed statutory figures once outside counsel and the Israel entity's jurisdiction are settled.
2. **Supabase project region confirmed as EU (not US)** for this data, per §2.2 — if the project is already provisioned in a US region for reasons unrelated to this table, that is now a blocking finding requiring either a region migration or a documented, counsel-reviewed reason it's acceptable, not something to discover after real data is already stored.
3. **Storage bucket configuration confirmed private, signed-URL-only, with policy-based access control matching patient/doctor ownership**, per §3 — this is a concrete pre-launch checklist item, not a policy statement; someone must actually open the Supabase dashboard and verify bucket visibility and policies before go-live, and this review recommends that verification be logged (screenshot or config export) as evidence, the same rigor a payments go-live would get from Independent Auditor.
4. **Supabase DPA confirmed to cover health-category data** in writing, pulled from current Supabase terms, per §3 point 6 — not assumed from general reputation.
5. **Medical Advisory taxonomy review completed** per §4 — this role cannot certify clinical adequacy, and product should not treat "Legal & Compliance cleared it" as covering this ground.
6. **The Russian-citizen data-handling decision from the medai review (§3 condition 3 of that review) is either resolved Joint, or a separate, equivalent decision is made specifically for medical history storage** — I do not assume the medai decision automatically carries over to this table; if Joint founders pick "exclude Russian-citizen patients from LLM-assisted intake" that is a *routing* decision for one API call, whereas medical history storage needs an actual *storage-location* decision for that population's records specifically. These may end up with the same answer, but they are not automatically the same decision, and someone (Joint, per the same routing as the medai finding) needs to say so explicitly rather than let it be inferred.
7. **A Privacy Policy exists and covers this table's data** — still the same open gap the medai review flagged (`docs/WHITEPAPER.md` line 1002), now more acute because this is persistent storage, not transit.

**What is genuinely fine to proceed on now, unblocked:** the schema design itself (`lib/db/schema.ts`'s structure, the `isSynthetic` gate, the `attachment_ref`-as-pointer pattern) and continued UI-shell development against seed data. Nothing in this review asks Developer to redesign the table — the structure is sound. The gate is entirely on *real data flowing into it*, not on the shape of the table.

---

## Decisions Required (routing per `docs/governance/DECISION_MATRIX.md`)

- **Joint:** whether the Russian-citizen data-handling decision for medical history storage tracks the medai decision or needs its own resolution (§5 condition 6) — cost/infrastructure implications (possible Russia-based storage) cross into Joint catch-all territory, same reasoning as the medai review's escalation.
- **CEO (Marina), informed by Medical Advisory:** sign-off that the medical-history schema/UI-shell build proceeds under the synthetic-data gate already in place, and that the conditions in §5 are the actual gate for real data — confirmation of gates set here, not a new independent decision.
- **Vadim (CPWO), as infrastructure/vendor decision owner:** confirm/select the Supabase project region (§2.2) and verify Supabase Storage bucket configuration (§3) before any real data flow; also owns pulling Supabase's current DPA terms to confirm health-data coverage.
- **Medical Advisory:** review the `entry_type` taxonomy per §4.

## Escalation Status

Escalating now, same urgency posture as the medai review, per this role's Escalation Rules — this finding affects the timeline for a Phase 0 roadmap item (per the CTO/Product spec's own sequencing) and surfaces at least one condition (§5.6) that may require Joint founder input before Developer's next real-data milestone.

## Next Step

Awaiting: (1) Joint decision on whether the Russian-citizen storage-location question is answered by or separate from the medai decision; (2) Vadim to confirm/select the Supabase region and verify Storage bucket configuration; (3) Medical Advisory's taxonomy review; (4) outside counsel engagement (once retained, per `docs/LEGAL_BRIEF.md` Part 0) to confirm the actual statutory retention figures this review could only estimate directionally in §1.3. This role will re-review once those close, before authorizing real patient data into `medical_history_entries`.
