"use client";

// MVP i18n: English source of truth + Russian, the two languages the
// roadmap's localization plan (docs/ROADMAP.md, decision-log 0003) sequences
// first — Russian is the platform's actual existing audience. The other 10
// languages stay flag-only in LanguageSwitcher until real demand + certified
// medical translation, per that decision. This provider only swaps
// marketing/UI chrome (see components/T.tsx) — clinically-adjacent content
// (doctor endorsement quotes, medai intake copy, medical instructions) is
// deliberately left untranslated pending Medical Advisory sign-off.
import { createContext, useContext, useEffect, useState } from "react";

export type LanguageCode = "en" | "ru";

const STORAGE_KEY = "mbc-language";

const LanguageContext = createContext<{
  code: LanguageCode;
  setCode: (code: LanguageCode) => void;
}>({ code: "en", setCode: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru") setCodeState(saved);
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
