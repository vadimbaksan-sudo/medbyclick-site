"use client";

// Inline translation swap for marketing/UI chrome only. Renders `en` during
// SSR and initial client render (matches server output, avoids hydration
// mismatch), then swaps to the active language after LanguageProvider's
// mount-effect reads the saved preference. A language with no prop supplied
// for a given string falls back to `en` rather than rendering blank — so
// partially-translated strings degrade gracefully. Do not use this for
// clinically-adjacent copy (doctor endorsements, medai/medical instructions,
// legal disclaimers) — see LanguageProvider.tsx.
import { useLanguage, type LanguageCode } from "@/components/LanguageProvider";

type Props = { en: string } & Partial<Record<Exclude<LanguageCode, "en">, string>>;

export default function T({ en, ru, tr, es, fr }: Props) {
  const { code } = useLanguage();
  const map: Record<LanguageCode, string | undefined> = { en, ru, tr, es, fr };
  return <>{map[code] ?? en}</>;
}
