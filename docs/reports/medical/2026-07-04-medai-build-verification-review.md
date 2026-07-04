# MedAI → Real LLM Integration: Build-Verification Review

Owner: **Medical Advisory** (`docs/agents/MEDICAL_ADVISORY.md`) · Authority: **CEO-only**
sign-off gate on clinical accuracy, per `docs/governance/DECISION_MATRIX.md`.
Trigger: condition 7 of
`docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md`
("Second review before public release... this comes back to Medical Advisory
for a build-verification pass against actual prompts and sample outputs before
release"). Requested by the coordinator on Marina/Vadim's behalf.
Status: **Consult delivered. Conditional go for continued build — NOT cleared
for public release. Two new gaps found; one pre-existing item still open.**

## What Was Reviewed

Actual current implementation, not the diff summary:

- `modules/medai/redFlags.ts`, `redFlags.test.ts`
- `modules/medai/intake.ts`, `intake.test.ts`
- `app/api/medai/intake/route.ts`
- `modules/medai/components/SymptomChecker.tsx`, `app/medai/page.tsx`
- `modules/medai/i18n.ts`
- `modules/medai/types.ts`, `modules/medai/data.ts`
- Ran the existing test suite (`bun test modules/medai`): 20 pass / 0 fail.

## Verification Against Original Conditions

**1. Intake-structuring only, no diagnosis-suggestion.** System prompt
(`intake.ts`) explicitly bans naming a condition/disease, treatment/dosage
advice, and delay-inducing reassurance. The JSON schema
(`MEDAI_INTAKE_JSON_SCHEMA`) has no `diagnosis` or `possibleConditions` field
and sets `additionalProperties: false`; `intake.test.ts` asserts these fields
are absent even if the model tried. **Structurally enforced, verified.**
Caveat below (§5) on what the schema does *not* cover.

**2. Red-flag gate is genuinely deterministic and runs pre-LLM.**
`redFlags.ts` is plain regex/keyword matching — no model call anywhere in
`detectRedFlags`. It runs client-side in `SymptomChecker.tsx` before the
`fetch` to the API route, and again server-side as the first line of
`runIntake()` before `client.messages.create()` is reached — confirmed by
reading the actual call order, and by the test that asserts the mocked client
is never invoked when a red flag matches. **Verified, matches original
design.** One item the code itself flags and I'm carrying forward: the
Russian/Hebrew keyword list in `redFlags.ts` is explicitly commented as a
"best-effort supplementary layer... NOT reviewed by a clinician or a native
speaker," with a `TODO_NEEDS_CLINICAL_AND_LINGUISTIC_REVIEW` marker. That
review has not happened. Not a blocker while only synthetic data flows, but
it must close before this is relied on for real Russian/Hebrew-speaking
patients.

**3. Disclaimers/emergency guidance in RU/HE/EN, correctly marked as
placeholder.** All three locales exist in `i18n.ts`. English copy is real and
complete (disclaimer, emergency banner, consent notice, coordinator note).
Russian and Hebrew are literally the English text prefixed with
`TODO_NEEDS_PROFESSIONAL_TRANSLATION:`, and the locale switcher itself labels
them "draft — untranslated." This is exactly the honest, non-silent handling
condition 3 called for — verified, and correctly still blocking (these two
locales are not production-usable yet, by design).

**4 / 5. Human-in-the-loop is structural, not just stated — GAP FOUND.** No
auto-booking or auto-triage action exists anywhere in the flow; LLM output
only ever produces a summary shown to the patient with a "Book a Specialist"
link the patient chooses to click. That part is sound. But
`SymptomChecker.tsx` (lines ~222–229) tells the patient: *"Your symptoms have
been structured and sent to a coordinator for review"* — and the code's own
comment immediately above admits this is false: *"there is no real
coordinator dashboard/queue in this codebase yet... nothing is actually
queued anywhere."* This inverts condition 5's intent: right now
human-in-the-loop is **stated but not structural** — a patient is told a
human will see their intake when no mechanism delivers it to any human.
Before public release this must be either (a) wired to a real
coordinator inbox/queue, or (b) the copy corrected to not claim a hand-off
that doesn't exist. This is a Developer-scope fix; routing via CTO/Product.

## New Question: Does the Opus 4.8 → Haiku 4.5 Swap Change the Risk Assessment?

**Yes — moderately, and it currently rests on zero behavioral evidence rather
than on model-capability assumptions.**

The structured-output schema is necessary but not sufficient here. It
guarantees the *shape* of the response (a `diagnosis` key cannot appear —
verified above), but it cannot stop diagnostic-sounding language from leaking
into the *free-text content* of fields the schema does allow: `chiefComplaint`,
`timeline`, `severitySummary`, `relevantHistory`, `clarifyingQuestions`. Whether
a model writes "recurring right-sided headaches" (fine) or "consistent with a
migraine pattern" (a rule 1 violation, delivered *inside* an allowed field) is
purely a function of how reliably the model follows the system prompt's
instruction 1 — not something the schema enforces. That is an instruction-
following question, and instruction-following fidelity is exactly the
dimension where smaller models are generally less reliable than larger ones,
particularly on nuanced negative constraints ("never do X") under adversarial
or leading input (e.g., a patient directly asking "what disease do I have?"
or "is this cancer?").

I am not willing to assume Haiku 4.5 handles this as well as Opus 4.8 did "by
analogy" — that has not been tested. Everything in `intake.test.ts` mocks the
Anthropic client; **no test in this codebase has ever sent a real request to
Haiku 4.5 (or to Opus 4.8, for that matter) and inspected what it actually
returns.** The code comment justifying the swap addresses API/feature
compatibility (`output_config.format` support, no `effort`/`thinking` params
in use) — it does not address output-content reliability, which is a
different question the comment doesn't claim to answer.

**What a real test would need to check**, before I'd sign off on Haiku 4.5 for
public release:

- A batch (I'd want on the order of 50–100, not a handful) of real calls to
  `claude-haiku-4-5` through the actual `runIntake()` path with the actual
  system prompt and schema, covering: (a) ordinary symptom descriptions, (b)
  descriptions of well-known conditions where a diagnosis name is "obvious"
  and tempting to state (e.g., classic migraine, classic UTI symptoms), (c)
  direct patient questions baiting a diagnosis ("what do I have?", "is this
  serious?", "do I have X?"), (d) prompt-injection-style attempts embedded in
  the symptom text itself, (e) borderline-but-not-quite-red-flag inputs, to
  check `declined` behavior and urgency-tier judgment.
- Manual clinical review of every free-text field in every response for any
  condition-naming, treatment/dosage language, or reassurance-that-could-
  delay-care, not just a check that the JSON parses.
- A parallel Opus 4.8 run on the identical prompt set as a comparison
  baseline, since "no worse than what I originally reviewed" is the relevant
  bar, not "acceptable in isolation."
- If Haiku 4.5's leak rate on rules 1–3 is materially non-zero on this set,
  that is a go/no-go input, not a style note — the fallback described in the
  code comment ("bump this back to claude-opus-4-8 — that's the only line
  that needs to change") should be exercised rather than shipped-and-monitored,
  given this is a patient-safety-relevant constraint.

This testing does not exist yet. Until it does, I'm treating the model choice
as **unverified, not unsafe** — the schema-level protections still hold
regardless of which model is behind them, so this is not a reason to block
continued development on synthetic data. It is a reason to block public
release on this model until the behavioral test above is run.

## Verdict

**Conditional go — build may continue; NOT cleared for public release.**

Carried-forward / still-open items, none newly created by this build:

- Legal & Compliance's DPA + 152-FZ jurisdiction review (original condition 6)
  — per `docs/reports/legal/2026-07-04-medai-llm-data-handling-review.md`,
  neither gate is cleared yet. Not my sign-off; still blocking real patient
  data regardless of everything else in this report.

New findings from this build-verification pass:

1. **[Gap] "Sent to a coordinator" UI copy is not true yet** —
   `SymptomChecker.tsx` claims a hand-off that has no backing system. Fix
   before public release: either build the real coordinator queue or correct
   the copy. Hands to Developer via CTO/Product.
2. **[Gap] Haiku 4.5's adherence to the no-diagnosis/no-treatment/no-
   reassurance rules is unverified by any real model call.** Requires the
   behavioral test described above before this model choice is cleared for
   production. Hands to Developer/CTO-Product to run and report results back
   to me for sign-off.
3. **[Carried forward, not new] RU/HE red-flag keyword coverage needs
   clinician + native-speaker review** before being relied on at parity with
   the English gate.

None of these are reasons to stop synthetic-data development. All three are
reasons this feature is not yet ready for real patients.
