"use client";

// MVP i18n: English source of truth + Russian/Turkish/Spanish/French, per
// docs/ROADMAP.md's localization plan (decision-log 0003 + 0004). Russian
// shipped first as the platform's actual existing audience; Turkish
// (Turkish Airlines driver), Spanish, and French followed as a deliberate
// scope extension beyond the original demand-only sequencing — all four are
// Latin/Cyrillic script with no RTL or CJK typography cost, so the
// engineering risk flagged in the roadmap doesn't apply to them. The
// remaining languages (Arabic, Chinese, Japanese, Korean, Italian,
// Portuguese) stay flag-only in LanguageSwitcher until real demand — Arabic
// and the CJK set specifically still carry the RTL/typography cost noted in
// the roadmap. This provider only swaps marketing/UI chrome (see
// components/T.tsx) — clinically-adjacent content (doctor endorsement
// quotes, medai intake copy, medical instructions, the legal disclaimer) is
// deliberately left untranslated pending Medical Advisory / Legal sign-off.
import { createContext, useContext, useEffect, useState } from "react";

export type LanguageCode = "en" | "ru" | "tr" | "es" | "fr";

const STORAGE_KEY = "mbc-language";
const VALID_CODES: LanguageCode[] = ["en", "ru", "tr", "es", "fr"];

const LanguageContext = createContext<{
  code: LanguageCode;
  setCode: (code: LanguageCode) => void;
}>({ code: "en", setCode: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (VALID_CODES.includes(saved as LanguageCode)) setCodeState(saved as LanguageCode);
  }, []);

  function setCode(next: LanguageCode) {
    setCodeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LanguageContext.Provider value={{ code, setCode }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
