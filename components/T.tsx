"use client";

// Inline translation swap for marketing/UI chrome only. Renders `en` during
// SSR and initial client render (matches server output, avoids hydration
// mismatch), then swaps to `ru` after LanguageProvider's mount-effect reads
// the saved preference. Do not use this for clinically-adjacent copy (doctor
// endorsements, medai/medical instructions) — see LanguageProvider.tsx.
import { useLanguage } from "@/components/LanguageProvider";

export default function T({ en, ru }: { en: string; ru: string }) {
  const { code } = useLanguage();
  return <>{code === "ru" ? ru : en}</>;
}
