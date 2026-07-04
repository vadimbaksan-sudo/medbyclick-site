import type { RedFlagMatch } from "./types";

/**
 * Deterministic, keyword/pattern-based emergency detection.
 *
 * This is plain, auditable TypeScript — NOT a call to an LLM, and it must run
 * BEFORE any LLM request is made (client-side, for immediate UX, and again
 * server-side in the API route as a defense-in-depth check). Per
 * docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md
 * §1: this gate must not depend on the model's judgment at all, because LLMs
 * can under-react to urgency in ambiguous phrasing, an LLM call adds latency
 * exactly when speed matters most, and prompt injection or unusual phrasing
 * could otherwise be used to talk a model-based gate down.
 *
 * This function intentionally over-triggers rather than under-triggers: a
 * false positive just shows emergency guidance a beat early, a false negative
 * could delay care.
 */

interface RedFlagRule {
  category: string;
  label: string;
  patterns: RegExp[];
}

const EN_RULES: RedFlagRule[] = [
  {
    category: "chest_pain",
    label: "Chest pain",
    patterns: [
      /\bchest\s+(pain|pressure|tightness|crushing)/i,
      /\bpain\b[^.!?]{0,20}\bchest\b/i,
      /\btightness\s+in\s+(my|the|his|her|their)\s+chest\b/i,
    ],
  },
  {
    category: "stroke_signs",
    label: "Possible stroke signs",
    patterns: [
      /\bfacial\s+droop/i,
      /\bface\s+(is\s+)?droop/i,
      /\bslurred\s+speech/i,
      /\b(sudden|suddenly)\b[^.!?]{0,25}\b(weakness|numbness)\b/i,
      /\bnumbness\b[^.!?]{0,25}\b(one\s+side|left\s+side|right\s+side)\b/i,
      /\bcan'?t\s+speak\b/i,
      /\bworst\s+headache\s+of\s+(my|his|her|their)\s+life\b/i,
      /\bsudden\s+severe\s+headache\b/i,
    ],
  },
  {
    category: "breathing_difficulty",
    label: "Severe difficulty breathing",
    patterns: [
      /\bcan'?t\s+breathe\b/i,
      /\bcannot\s+breathe\b/i,
      /\bsevere\s+(difficulty|trouble)\s+breathing\b/i,
      /\bgasping\s+for\s+air\b/i,
      /\bturning\s+blue\b/i,
      /\blips?\s+(are\s+|turning\s+)?blue\b/i,
    ],
  },
  {
    category: "severe_bleeding",
    label: "Uncontrolled bleeding",
    patterns: [
      /\buncontroll(ed|able)\s+bleeding\b/i,
      /\bbleeding\s+(won'?t|will\s+not)\s+stop\b/i,
      /\bbleeding\s+heavily\b/i,
      /\bhemorrhag(e|ing)\b/i,
      /\bsevere\s+blood\s+loss\b/i,
    ],
  },
  {
    category: "anaphylaxis",
    label: "Possible anaphylaxis or severe allergic reaction",
    patterns: [
      /\banaphylax/i,
      /\bthroat\s+(is\s+)?closing\b/i,
      /\bsevere\s+allergic\s+reaction\b/i,
      /\bswelling\b[^.!?]{0,25}\b(throat|tongue)\b/i,
    ],
  },
  {
    category: "suicidal_self_harm",
    label: "Suicidal ideation or self-harm intent",
    patterns: [
      /\bsuicid/i,
      /\bkill\s+myself\b/i,
      /\bend\s+my\s+life\b/i,
      /\bwant\s+to\s+die\b/i,
      /\bself[-\s]?harm\b/i,
      /\bhurt\s+myself\b/i,
    ],
  },
  {
    category: "infant_unresponsive",
    label: "High fever with an unresponsive or limp infant",
    patterns: [
      /\b(infant|baby|newborn)\b[^.!?]{0,60}\b(unresponsive|limp|floppy|won'?t\s+wake)\b/i,
      /\b(unresponsive|limp|floppy)\b[^.!?]{0,60}\b(infant|baby|newborn)\b/i,
    ],
  },
];

// Compound rule: severe abdominal pain AND a pregnancy mention, both required.
const PREGNANCY_PATTERN = /\bpregnan/i;
const SEVERE_ABDOMINAL_PATTERN =
  /\bsevere\b[^.!?]{0,25}\babdominal\s+pain\b|\babdominal\s+pain\b[^.!?]{0,25}\bsevere\b/i;

/**
 * NOTE: The patterns below are a best-effort SUPPLEMENTARY layer for Russian
 * and Hebrew input, added because the platform's stated core population is
 * Russian-speaking and English-only matching would silently fail to protect
 * them. Unlike the English rules above, these have NOT been reviewed by a
 * clinician or a native speaker for completeness, phrasing variety, or
 * mistranslation risk. Do not treat this list as equivalent coverage to the
 * English gate, and do not remove the English gate in favor of this one.
 * TODO_NEEDS_CLINICAL_AND_LINGUISTIC_REVIEW before relying on this list to the
 * same degree as the English rules in production.
 */
const RU_HE_SUPPLEMENTARY_PATTERNS: RegExp[] = [
  /боль в груди/i, // chest pain (ru)
  /не могу дышать/i, // can't breathe (ru)
  /сильное кровотечение/i, // severe bleeding (ru)
  /суицид|покончить с собой/i, // suicide (ru)
  /онемение (лица|руки|ноги)/i, // numbness of face/arm/leg (ru)
  /невнятная речь/i, // slurred speech (ru)
  /כאב בחזה/, // chest pain (he)
  /קשה לי לנשום/, // difficulty breathing (he)
  /מחשבות אובדניות/, // suicidal thoughts (he)
  /דימום חמור/, // severe bleeding (he)
];

export function detectRedFlags(rawSymptomText: string): RedFlagMatch | null {
  const text = rawSymptomText ?? "";
  if (!text.trim()) return null;

  for (const rule of EN_RULES) {
    for (const pattern of rule.patterns) {
      const match = text.match(pattern);
      if (match) {
        return { category: rule.category, label: rule.label, matchedText: match[0] };
      }
    }
  }

  if (PREGNANCY_PATTERN.test(text) && SEVERE_ABDOMINAL_PATTERN.test(text)) {
    const match = text.match(SEVERE_ABDOMINAL_PATTERN);
    return {
      category: "pregnancy_abdominal_pain",
      label: "Severe abdominal pain during pregnancy",
      matchedText: match?.[0] ?? "severe abdominal pain",
    };
  }

  for (const pattern of RU_HE_SUPPLEMENTARY_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      return {
        category: "possible_emergency_non_english",
        label: "Possible emergency (non-English keyword match — needs clinical review)",
        matchedText: match[0],
      };
    }
  }

  return null;
}
