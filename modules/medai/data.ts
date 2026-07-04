/**
 * NOTE: the previous version of this file included a "Trained on 50M+
 * clinical records" claim and a hardcoded "possible conditions" mock result
 * with confidence badges. Both were removed per
 * docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md
 * §0 — the training-data claim is a fabricated, unverifiable capability claim,
 * and a named-condition list with a likelihood label is a differential
 * diagnosis presented to a layperson, which this feature must never do.
 *
 * Replacement marketing copy describing the *real* capability (once the real
 * LLM integration is live) should be routed through Medical Content, not
 * authored here — this list intentionally sticks to plain, verifiable
 * statements about what the feature does structurally.
 */
export const aiFeatures = [
  { icon: "📝", title: "Structured Intake", description: "Turns your description into a clear, organized summary for your care team." },
  { icon: "⚡", title: "Fast, Always Available", description: "Complete your intake in minutes, any time of day." },
  { icon: "🎯", title: "Specialist Routing", description: "Suggests a specialty for your coordinator to confirm — never a diagnosis." },
  { icon: "🧑‍⚕️", title: "Reviewed by a Human", description: "A coordinator reviews every submission before any next step is taken." },
];
