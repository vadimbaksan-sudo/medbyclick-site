# MedAI → Real LLM Integration: Clinical Safety Pre-Check

Owner: **Medical Advisory** (`docs/agents/MEDICAL_ADVISORY.md`) · Authority: **CEO-only**
sign-off gate on clinical accuracy, per `docs/governance/DECISION_MATRIX.md` and this
role's Must-Not-Do ("Review AI-diagnostics / symptom-checker style features... for
clinical soundness before release").
Trigger: `docs/ROADMAP.md` Phase 1, `medai` row — "**Medical Advisory — required
before build starts**." This is that required consult, requested out-of-cycle by
Vadim (CPWO) ahead of connecting the mock symptom checker to a real LLM (OpenAI
and/or Anthropic under consideration).
Status: **Consult delivered. Conditional go — see Verdict.**

## What Was Reviewed

- `docs/WHITEPAPER.md` §3.4 ("AI-Assisted Triage (MedAI)")
- `modules/medai/types.ts`, `modules/medai/data.ts`,
  `modules/medai/components/SymptomChecker.tsx`, `app/medai/page.tsx` — the current
  mock implementation, as actually built, not a hypothetical spec
- `docs/ROADMAP.md` Phase 1 `medai` row and its consult gate

## 0. Starting Finding: The Current Mock Already Drifts From §3.4

Before addressing the LLM question, flag this: whitepaper §3.4 states the AI layer
is "designed to increase intake quality, not replace clinical judgment." The
**existing mock UI does not reflect that framing**, and wiring a real LLM behind
it unchanged would make the drift materially worse, not just cosmetically wrong:

- The page is titled **"AI Diagnostics"** (`app/medai/page.tsx`), the button reads
  **"Analyze Symptoms,"** and the result panel is headed **"Possible conditions,"**
  each one tagged with a confidence-style `high` / `medium` / `low` likelihood
  badge (`modules/medai/components/SymptomChecker.tsx`, `data.ts`). That is the
  visual and linguistic grammar of a diagnostic tool, not an intake-structuring
  tool, regardless of the disclaimer text sitting below it.
- `aiFeatures` in `modules/medai/data.ts` includes the claim **"Trained on 50M+
  clinical records to identify symptom clusters."** This is a fabricated,
  unverifiable marketing claim. No commercial general-purpose LLM (OpenAI,
  Anthropic, or otherwise) ships with a disclosed, verifiable "50M clinical
  records" training claim of this kind. If this copy survives into the real
  build it becomes a false clinical-capability claim on a live product — that is
  squarely a claim I have veto authority over, and it does not clear as written.
  Routing to Medical Content once the real capability is defined; not to be
  copied forward as-is.
- A hardcoded "possible conditions" list with a likelihood label reads to a
  patient as *"the tool thinks you have a 'high' chance of tension headache."*
  That is functionally a differential diagnosis presented directly to a
  layperson, which is exactly what §3.4 says this feature is not supposed to do.

None of this is a new problem created by adding an LLM — it already exists in
the mock. But it must be corrected **as part of**, not after, the real build,
because right now a real LLM would be dropped into a shell that is already
framed as a diagnostic engine.

## 1. Scope Boundary — What This Feature May and May Not Do

**Allowed:**

- Take free-text (and structured: duration, severity, age) patient input and
  produce a **structured intake summary**: chief complaint, timeline,
  associated symptoms, severity, relevant negatives if the patient volunteers
  them, in the patient's own words plus a normalized/cleaned version.
- Suggest a **recommended specialty for routing** (e.g., "Neurology"), mapped
  where possible against the platform's existing structured routing rubric
  (whitepaper §3.2) rather than open-ended LLM judgment, so behavior stays
  bounded and auditable.
- Flag an **urgency tier** (routine / soon / urgent) to help the coordinator
  prioritize queue order — framed explicitly as a triage-priority signal for
  staff, not a patient-facing medical judgment.
- Ask brief structured clarifying questions to improve intake completeness
  (duration, laterality, associated symptoms) — this is the "increase intake
  quality" part of §3.4 and is the actual value of the feature.

**Not allowed, ever:**

- **No patient-facing named-condition list with likelihood/confidence
  labeling.** Do not tell a patient "you probably have X" or "high likelihood:
  migraine." This is the single biggest required change from the current mock.
  If a specialist-facing "for clinician context" note is ever added (e.g., "AI
  intake flagged symptom pattern consistent with categories including X, Y"),
  it is coordinator/doctor-facing only, clearly labeled as unverified AI output,
  and never shown to the patient as a conclusion about their body.
- **No treatment, medication, or dosage suggestions** of any kind, even
  general ("try ibuprofen").
- **No reassurance language that could delay care** ("this is probably
  nothing," "you don't need to see anyone"). The tool's job is to route to a
  human faster and more accurately, never to talk a patient out of seeking
  care.
- **No autonomous action** — the LLM output is always an input to a human
  coordinator/doctor's triage decision, never a terminal action (no
  auto-booking, auto-dismissal, or auto-closing of a case based on LLM output
  alone).

**Red-flag / emergency symptoms — hard-coded bypass required, not
LLM-dependent:**

The flow needs a deterministic, rule-based (keyword/pattern) pre-check that
runs **before any LLM call is made**, on the raw patient input. If it matches a
red-flag pattern — chest pain (especially with radiation, shortness of breath),
sudden severe/"worst headache of life," stroke signs (facial droop, slurred
speech, sudden weakness/numbness one-sided), severe difficulty breathing,
uncontrolled bleeding, signs of anaphylaxis, suicidal ideation/self-harm intent,
severe abdominal pain with pregnancy, high fever with a limp/unresponsive
infant — the flow **immediately shows emergency-services guidance and stops**,
before or instead of continuing to the LLM-based intake. This must not be
delegated to the LLM's judgment for three reasons: (1) LLMs can under-react to
urgency in ambiguous phrasing, (2) an LLM call adds latency exactly when speed
matters most, (3) prompt injection or unusual phrasing could cause an LLM-only
gate to be bypassed or talked down. The deterministic gate runs first and
cannot be reasoned around by the model. Running LLM-based intake normally does
not exempt the system from also re-checking for red flags in the intake
summary as a second, defense-in-depth layer — but the first gate must be
non-LLM.

## 2. Required Disclaimers and UX Safeguards

- **Persistent, non-dismissible-by-scroll disclaimer**, not footer-only fine
  print: "This is an intake tool, not a diagnosis. A qualified doctor reviews
  your information before any medical decision is made." Shown before input
  starts and again alongside any output.
- **Emergency banner**, shown before the patient starts typing and pinned
  during use: "If you are experiencing [red-flag list], stop and contact
  emergency services immediately." Because the platform's stated core
  population is Russian-speaking and doctor vetting already requires
  Russian/Hebrew capability, this needs a locale-aware emergency number where
  determinable (e.g., Israel 101/Magen David Adom, Russia 103/112) with a
  generic "call your local emergency number" fallback when jurisdiction can't
  be determined — do not hardcode a single country's number as the default.
- **Full language parity, not machine-translated afterthought.** All
  disclaimer, emergency, and red-flag copy must exist in Russian, Hebrew, and
  English, reviewed by a qualified translator/native speaker for clinical
  clarity — not run through the same LLM ad hoc, since these are the highest-
  stakes strings in the whole feature and a mistranslation here (e.g.,
  softening "seek emergency care" into something that reads as optional)
  is itself a patient-safety incident.
- **Explicit human-in-the-loop statement**: make clear a human coordinator/
  doctor reviews the intake before anything happens — do not let the UI imply
  the AI is a substitute for or stand-in conversation with a doctor.
- **No hedge-free language in generated output.** Prompt/response design must
  structurally avoid confident diagnostic phrasing — enforce this with output
  formatting (e.g., structured fields only, no free-form "diagnosis" field)
  rather than relying on prompt instructions alone, since LLMs can drift from
  system-prompt constraints over a conversation.
- **Consent-before-input notice** tied to §3 below: patient must be told,
  before typing symptoms, that this information will be processed by a
  third-party AI provider, with a link to the actual data-handling terms —
  not buried in a general privacy policy the patient never opens.

## 3. Data Handling — Flagged for Legal & Compliance (Not My Sign-Off Gate)

Patient symptom descriptions are sensitive health data. Sending them to an
external LLM API is sending real patient health information off-platform to a
third party. This needs Legal & Compliance sign-off before any real patient
data flows to a provider — I flag it, I don't clear it:

- **Data Processing Agreement** with whichever provider is chosen (OpenAI vs.
  Anthropic vs. a specific enterprise tier of either) — confirm a DPA exists
  and covers health-category data specifically, not just general PII.
- **Training-use opt-out / zero data retention.** Confirm the exact product
  tier used (not just "OpenAI" or "Anthropic" generically — API/enterprise
  tiers differ from consumer products) disables use of patient inputs for
  model training and specifies retention window, and that this is contractual,
  not just a settings toggle that could change.
- **Jurisdiction and data localization.** Given the platform's stated
  Russian-speaking core population, check whether Russian data-localization
  law (Federal Law 152-FZ, requiring personal data of Russian citizens to be
  stored on servers located in Russia) applies and conflicts with sending
  symptom data to a US-based LLM provider's infrastructure. This could be a
  hard blocker independent of GDPR/HIPAA-equivalent analysis and should not be
  assumed away — flagging explicitly so it isn't missed given the
  Israel-entity-vs-token-entity structuring already in flight elsewhere in the
  project.
- **GDPR Art. 9 special-category data** analysis if any EU/EEA patients are in
  scope, and equivalent analysis for Israeli Privacy Protection Law given the
  Israel entity plan.
- **De-identification where architecturally feasible** — avoid sending patient
  name/account identifiers in the same payload as symptom text if the
  provider integration can be designed to decouple them.
- **Retention on MedByClick's own side**: how long are symptom submissions and
  LLM outputs stored, who can access them, and is that covered by the same
  policy as other health records the platform holds.

This list is for Legal & Compliance to resolve, not for me to approve — flagging
it here so it isn't missed, per this consult's explicit purpose.

## 4. Verdict — Conditional Go

**Developer may proceed to build a real LLM-backed version now**, under all of
the following conditions. This is not a "concerns list" — these are binding
conditions on the sign-off, per this role's decision authority on clinical
soundness of AI-diagnostics/symptom-checker features.

1. **Scope is intake-structuring and specialty/urgency routing only — never
   diagnosis-suggestion.** The current "Possible conditions" + likelihood-badge
   UI pattern must be redesigned as part of this build, not left in place with
   a real LLM behind it. No patient-facing named condition list.
2. **Hard-coded, deterministic, pre-LLM red-flag/emergency detection gate**,
   as described in §1, shipped before or alongside the first real-LLM release,
   not deferred to a later iteration.
3. **Mandatory, prominent disclaimers and emergency guidance** in Russian,
   Hebrew, and English, per §2, professionally translated, not LLM-translated.
4. **Remove the "50M+ clinical records" and equivalent unverifiable capability
   claims** from `modules/medai/data.ts` before or as part of this build; route
   any replacement marketing copy through Medical Content once the real
   capability is defined.
5. **Human-in-the-loop is structural, not just stated**: LLM output always
   lands as input to a coordinator/doctor decision; no auto-booking or
   auto-triage action taken on LLM output alone.
6. **No real patient data to any external LLM provider until Legal &
   Compliance clears it** — DPA, training-opt-out/retention terms, and
   jurisdiction/data-localization review (including the Russian-law question
   flagged in §3) must be confirmed first. Development and testing against
   synthetic/non-patient data may proceed in parallel now; going live with
   real patient inputs is gated on Legal & Compliance's sign-off, not mine.
7. **Second review before public release.** Once built, this comes back to
   Medical Advisory for a build-verification pass against actual prompts and
   sample outputs before release — this consult clears build-start per the
   roadmap's gate, it does not substitute for a pre-release check.

**Escalation note:** if Legal & Compliance's jurisdiction/data-localization
review (condition 6) surfaces a hard blocker — e.g., Russian data-localization
law conflicting with the chosen LLM provider's infrastructure — that has
roadmap/timeline implications for a Phase 1 item, which per this role's
Escalation Rules gets raised to a joint founders sync rather than resolved
unilaterally in either lane.
