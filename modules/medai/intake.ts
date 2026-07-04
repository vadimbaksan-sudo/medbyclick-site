import { detectRedFlags } from "./redFlags";
import type { IntakeApiResponse, SymptomInput } from "./types";

// COST/QUALITY TRADE-OFF (deliberate, easy to revert): this endpoint only
// structures patient-reported symptoms into a fixed JSON schema (no
// diagnosis) — well within a smaller model's capability — so it runs on
// Haiku 4.5 (~$1/$5 per MTok) instead of Opus 4.8 (~$5/$25 per MTok) to keep
// per-request cost down. Neither `output_config.effort` nor `thinking` is set
// anywhere in this file, so Haiku 4.5's lack of `effort` support doesn't
// apply here; structured outputs (`output_config.format`) are supported on
// Haiku 4.5. If real-world output quality turns out insufficient, bump this
// back to "claude-opus-4-8" — that's the only line that needs to change.
export const MEDAI_MODEL = "claude-haiku-4-5";

/**
 * System prompt binding the model to intake-structuring only. Per
 * docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md
 * §1/§2/Verdict: never a diagnosis, never treatment advice, never reassurance
 * that could delay care, and output is constrained to structured fields (no
 * free-form "diagnosis" field exists in the schema at all) rather than relying
 * on the prompt alone.
 */
export const MEDAI_SYSTEM_PROMPT = `You are an intake-structuring assistant for a telehealth platform. Your ONLY job is to turn a patient's free-text description of their symptoms into a clean, structured summary for a human care coordinator to review before any medical decision is made. You are not a diagnostic tool and must never behave like one.

Hard rules, no exceptions:
1. NEVER name a specific medical condition, disease, or diagnosis as a likely explanation for the patient's symptoms. Do not say things like "this sounds like X" or "this is consistent with Y." Only restate, in neutral descriptive terms, what the patient reported.
2. NEVER give treatment, medication, dosage, or home-remedy advice of any kind, even general advice like "try an over-the-counter pain reliever."
3. NEVER use reassurance language that could delay care, such as "this is probably nothing" or "you don't need to see anyone." Your only job is to help route the patient to a human faster and more accurately.
4. Recommend exactly one specialty from the list below for routing purposes, and assign an urgencyTier of "routine", "soon", or "urgent" — this is a triage-priority signal to help staff order their queue, not a medical judgment to be communicated to the patient as a conclusion about their body.
5. A separate, deterministic, non-LLM safety check already runs on the raw input before you are ever called, so you should not normally see emergency-level input. If despite that you notice something that concerns you, you may decline: set status to "declined" and briefly explain why in declineReason, and the patient will be told to speak to their coordinator directly right away. Do not attempt to handle it yourself.
6. Only fill in the structured fields requested below. Do not add a diagnosis field, extra commentary, markdown, or any text outside the JSON schema.

Specialty list to choose recommendedSpecialty from: General Practice, Neurology, Cardiology, Gastroenterology, Dermatology, Orthopedics, ENT, Ophthalmology, Psychiatry, Pediatrics, OB/GYN, Pulmonology, Endocrinology, Urology, Other.

When status is "declined", set chiefComplaint, timeline, severitySummary, recommendedSpecialty and urgencyTier to empty strings and associatedSymptoms/clarifyingQuestions to empty arrays — put your reasoning only in declineReason.`;

/**
 * Structured-outputs JSON schema. Enforcing this shape at the API level (not
 * just via prompt instructions) is what the clinical-safety review calls for
 * in §2: "structured fields only, no free-form 'diagnosis' field... since LLMs
 * can drift from system-prompt constraints over a conversation."
 */
export const MEDAI_INTAKE_JSON_SCHEMA = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: ["structured", "declined"],
      description: "\"structured\" for a normal intake summary, \"declined\" if the model chose not to proceed.",
    },
    chiefComplaint: {
      type: "string",
      description: "A neutral, one-sentence restatement of the patient's main complaint. Empty string if declined.",
    },
    timeline: {
      type: "string",
      description: "When it started and how it has changed. Empty string if declined.",
    },
    associatedSymptoms: {
      type: "array",
      items: { type: "string" },
      description: "Other symptoms the patient mentioned. Empty array if none or declined.",
    },
    relevantHistory: {
      type: "string",
      description: "Relevant history the patient volunteered. Empty string if none.",
    },
    severitySummary: {
      type: "string",
      description: "Neutral description of reported severity and impact on daily activities. Empty string if declined.",
    },
    recommendedSpecialty: {
      type: "string",
      description: "Exactly one value from the specialty list, or empty string if declined.",
    },
    urgencyTier: {
      type: "string",
      enum: ["routine", "soon", "urgent", ""],
      description: "Triage-priority signal for staff, or empty string if declined.",
    },
    clarifyingQuestions: {
      type: "array",
      items: { type: "string" },
      description: "Up to three brief clarifying questions a coordinator could ask to improve intake completeness. Empty array if none.",
    },
    declineReason: {
      type: "string",
      description: "If status is \"declined\", a brief neutral note for the coordinator on why. Empty string otherwise.",
    },
  },
  required: [
    "status",
    "chiefComplaint",
    "timeline",
    "associatedSymptoms",
    "relevantHistory",
    "severitySummary",
    "recommendedSpecialty",
    "urgencyTier",
    "clarifyingQuestions",
    "declineReason",
  ],
  additionalProperties: false,
} as const;

/** The exact shape of the request this module sends to the Messages API. */
interface IntakeMessageCreateParams {
  model: string;
  max_tokens: number;
  system: string;
  output_config: { format: { type: "json_schema"; schema: Record<string, unknown> } };
  messages: Array<{ role: "user"; content: string }>;
}

/**
 * The slice of the Anthropic SDK client this module actually depends on.
 * Depending on a narrow interface (instead of importing `Anthropic` from
 * "@anthropic-ai/sdk" directly in this file) is what lets `runIntake` be unit
 * tested with a plain mocked object instead of a live API call. The params
 * type is a concrete shape (not `Record<string, unknown>`) so a real
 * `Anthropic` client instance — whose `messages.create` requires `model`,
 * `max_tokens`, and `messages` — remains structurally assignable here.
 */
export interface AnthropicMessagesClient {
  messages: {
    create: (params: IntakeMessageCreateParams) => Promise<{
      stop_reason?: string | null;
      content?: Array<{ type: string; text?: string }>;
    }>;
  };
}

function formatUserContent(input: SymptomInput): string {
  return [
    `Patient-reported symptoms: ${input.symptoms}`,
    `Duration: ${input.duration || "not specified"}`,
    `Self-reported severity: ${input.severity}`,
    `Age: ${Number.isFinite(input.age) && input.age > 0 ? input.age : "not specified"}`,
  ].join("\n");
}

const GENERIC_DECLINE_MESSAGE =
  "The assistant could not structure this intake automatically. Please describe your symptoms to your coordinator directly.";

const GENERIC_ERROR_MESSAGE =
  "We couldn't process your intake right now. Please try again shortly, or describe your symptoms to a coordinator directly.";

/**
 * Runs the full intake flow for one submission:
 *  1. Deterministic red-flag check (defense-in-depth — the client is expected
 *     to have already run this and skipped calling this function/route
 *     entirely on a match, but this function re-checks so the gate does not
 *     depend on the client behaving correctly).
 *  2. If no red flag, calls Claude with a locked-down system prompt and a
 *     structured-output JSON schema that has no diagnosis field.
 *
 * Takes the Anthropic client as a parameter (rather than constructing one
 * internally) specifically so this function can be unit tested with a mocked
 * client — see modules/medai/intake.test.ts.
 */
export async function runIntake(
  input: SymptomInput,
  client: AnthropicMessagesClient
): Promise<IntakeApiResponse> {
  const redFlag = detectRedFlags(input.symptoms);
  if (redFlag) {
    return { status: "emergency", redFlag };
  }

  let response;
  try {
    response = await client.messages.create({
      model: MEDAI_MODEL,
      max_tokens: 1024,
      system: MEDAI_SYSTEM_PROMPT,
      output_config: { format: { type: "json_schema", schema: MEDAI_INTAKE_JSON_SCHEMA } },
      messages: [{ role: "user", content: formatUserContent(input) }],
    });
  } catch (err) {
    console.error("[medai/intake] Anthropic request failed", err);
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }

  if (response.stop_reason === "refusal") {
    return { status: "declined", message: GENERIC_DECLINE_MESSAGE };
  }

  const textBlock = response.content?.find((block) => block.type === "text" && typeof block.text === "string");
  if (!textBlock?.text) {
    console.error("[medai/intake] No text content block in Anthropic response", response);
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch (err) {
    console.error("[medai/intake] Failed to parse structured output as JSON", err, textBlock.text);
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }

  if (parsed.status === "declined") {
    const reason = typeof parsed.declineReason === "string" && parsed.declineReason.trim() ? parsed.declineReason : GENERIC_DECLINE_MESSAGE;
    return { status: "declined", message: reason };
  }

  const urgencyTier = parsed.urgencyTier === "routine" || parsed.urgencyTier === "soon" || parsed.urgencyTier === "urgent" ? parsed.urgencyTier : "routine";

  return {
    status: "ok",
    summary: {
      chiefComplaint: typeof parsed.chiefComplaint === "string" ? parsed.chiefComplaint : "",
      timeline: typeof parsed.timeline === "string" ? parsed.timeline : "",
      associatedSymptoms: Array.isArray(parsed.associatedSymptoms) ? parsed.associatedSymptoms.filter((s): s is string => typeof s === "string") : [],
      relevantHistory: typeof parsed.relevantHistory === "string" ? parsed.relevantHistory : "",
      severitySummary: typeof parsed.severitySummary === "string" ? parsed.severitySummary : "",
      recommendedSpecialty: typeof parsed.recommendedSpecialty === "string" ? parsed.recommendedSpecialty : "General Practice",
      urgencyTier,
      clarifyingQuestions: Array.isArray(parsed.clarifyingQuestions) ? parsed.clarifyingQuestions.filter((s): s is string => typeof s === "string") : [],
    },
  };
}
