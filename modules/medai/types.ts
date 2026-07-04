export interface SymptomInput {
  symptoms: string;
  duration: string;
  severity: "mild" | "moderate" | "severe";
  age: number;
}

export type UrgencyTier = "routine" | "soon" | "urgent";

/**
 * Structured intake summary produced by the LLM. Deliberately has NO field for
 * a diagnosis, likely condition, or treatment suggestion — see
 * docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md
 * §1 ("Not allowed, ever"). This is intake-structuring output for a human
 * coordinator/doctor to review, never a conclusion shown to the patient as a
 * medical judgment about their body.
 */
export interface IntakeSummary {
  /** Neutral, one-sentence restatement of the patient's main complaint. */
  chiefComplaint: string;
  /** When it started and how it has changed. */
  timeline: string;
  /** Other symptoms the patient mentioned. */
  associatedSymptoms: string[];
  /** Relevant history the patient volunteered, if any. */
  relevantHistory: string;
  /** Neutral description of reported severity and impact on daily activities. */
  severitySummary: string;
  /** One value from the platform's structured specialty list. */
  recommendedSpecialty: string;
  /**
   * Triage-priority signal for staff queue ordering — explicitly NOT a
   * medical judgment communicated to the patient as a conclusion.
   */
  urgencyTier: UrgencyTier;
  /** Up to a few brief clarifying questions a coordinator could ask. */
  clarifyingQuestions: string[];
}

/** A match from the deterministic, pre-LLM red-flag/emergency check. */
export interface RedFlagMatch {
  category: string;
  label: string;
  /** The literal snippet of patient input that triggered the match. */
  matchedText: string;
}

/**
 * Response shape returned by POST /api/medai/intake.
 *
 * - "emergency": the hard-coded red-flag gate matched (client- or server-side).
 *   No LLM call was made.
 * - "ok": the LLM produced a structured intake summary. This is the "sent to a
 *   coordinator for review" path — never a final decision to the patient.
 * - "declined": the model itself declined to structure the input (it noticed
 *   something concerning) — the patient should tell their coordinator directly.
 * - "error": something failed (e.g. no API credentials configured, network
 *   error, rate limit). Never silently swallowed.
 */
export type IntakeApiResponse =
  | { status: "emergency"; redFlag: RedFlagMatch }
  | { status: "ok"; summary: IntakeSummary }
  | { status: "declined"; message: string }
  | { status: "error"; message: string };
