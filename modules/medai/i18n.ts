/**
 * Minimal i18n structure for MedAI's disclaimer / emergency / consent copy.
 *
 * This repo has no existing i18n system, so this is deliberately a single
 * plain object keyed by locale — no library, no build step. To drop in real
 * translations later, edit ONLY the `ru` and `he` objects below; nothing else
 * in the app needs to change.
 *
 * Per docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md
 * §2, this copy must be "professionally translated, not LLM-translated" for
 * Russian and Hebrew, since a mistranslation here (e.g. softening "seek
 * emergency care" into something that reads as optional) is itself a
 * patient-safety incident. No professional translation exists yet, so the
 * `ru` and `he` entries below are English placeholder text, explicitly marked
 * with the TODO_NEEDS_PROFESSIONAL_TRANSLATION prefix. They must NOT be
 * treated as final copy and must NOT be machine/LLM-translated as a
 * substitute — replace them with reviewed translations before this ships to
 * Russian- or Hebrew-reading users.
 */

export type MedaiLocale = "en" | "ru" | "he";

export interface MedaiStrings {
  /** Persistent, non-dismissible-by-scroll disclaimer. */
  disclaimer: string;
  /** Emergency banner heading, shown before the patient starts typing. */
  emergencyBannerTitle: string;
  /** Emergency banner body, including locale-aware emergency numbers. */
  emergencyBannerBody: string;
  /** Consent-before-input notice about the third-party AI provider. */
  consentNotice: string;
  /** Explicit human-in-the-loop statement. */
  coordinatorNote: string;
  /** Heading shown when the red-flag gate matches. */
  emergencyResultTitle: string;
  /** Body shown when the red-flag gate matches. */
  emergencyResultBody: string;
}

const en: MedaiStrings = {
  disclaimer:
    "This is an intake tool, not a diagnosis. A qualified doctor reviews your information before any medical decision is made.",
  emergencyBannerTitle: "If this is an emergency, do not wait for this tool.",
  emergencyBannerBody:
    "If you are experiencing chest pain, signs of a stroke, severe bleeding, severe difficulty breathing, a severe allergic reaction, or thoughts of harming yourself, stop and contact emergency services immediately. Israel: 101 (Magen David Adom). Russia: 103 or 112. If you are elsewhere, call your local emergency number.",
  consentNotice:
    "Your symptom description will be sent to a third-party AI provider (Anthropic) to help structure your intake for a human coordinator. Please don't include information you aren't comfortable sharing electronically.",
  coordinatorNote:
    "A human coordinator reviews every submission before any next step is taken. This tool does not book appointments or make medical decisions on its own.",
  emergencyResultTitle: "This may be a medical emergency.",
  emergencyResultBody:
    "Based on what you entered, please contact emergency services now instead of continuing with this form. Israel: 101 (Magen David Adom). Russia: 103 or 112. If you are elsewhere, call your local emergency number.",
};

// TODO_NEEDS_PROFESSIONAL_TRANSLATION — placeholder only, see file header.
const ru: MedaiStrings = {
  disclaimer: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.disclaimer,
  emergencyBannerTitle: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyBannerTitle,
  emergencyBannerBody: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyBannerBody,
  consentNotice: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.consentNotice,
  coordinatorNote: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.coordinatorNote,
  emergencyResultTitle: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyResultTitle,
  emergencyResultBody: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyResultBody,
};

// TODO_NEEDS_PROFESSIONAL_TRANSLATION — placeholder only, see file header.
const he: MedaiStrings = {
  disclaimer: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.disclaimer,
  emergencyBannerTitle: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyBannerTitle,
  emergencyBannerBody: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyBannerBody,
  consentNotice: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.consentNotice,
  coordinatorNote: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.coordinatorNote,
  emergencyResultTitle: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyResultTitle,
  emergencyResultBody: "TODO_NEEDS_PROFESSIONAL_TRANSLATION: " + en.emergencyResultBody,
};

export const MEDAI_STRINGS: Record<MedaiLocale, MedaiStrings> = { en, ru, he };

export const MEDAI_LOCALE_LABELS: Record<MedaiLocale, string> = {
  en: "English",
  ru: "Русский (draft — untranslated)",
  he: "עברית (draft — untranslated)",
};
