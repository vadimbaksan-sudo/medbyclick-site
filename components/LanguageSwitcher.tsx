"use client";

import { useEffect, useRef, useState } from "react";

// Full 12-language target set per docs/ROADMAP.md "Localization (12 Languages)"
// and docs/decision-log/0003-localization-12-languages.md. UI-only for now:
// selecting a language stores the preference (for the real i18n switch once
// content is localized) but does not translate page content — only English
// (and, once localized, Russian per the roadmap's first sequencing step)
// have real copy today. Do not wire this to fake/machine-translated content;
// that would violate the certified-medical-translator + Medical Advisory
// sign-off requirement in the linked decision.
const LANGUAGES = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
  { code: "ko", flag: "🇰🇷", name: "한국어" },
  { code: "ar", flag: "🇸🇦", name: "العربية" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "pt", flag: "🇵🇹", name: "Português" },
] as const;

const STORAGE_KEY = "mbc-language";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<(typeof LANGUAGES)[number]>(LANGUAGES[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const match = LANGUAGES.find((l) => l.code === saved);
    if (match) setCurrent(match);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectLanguage(lang: (typeof LANGUAGES)[number]) {
    setCurrent(lang);
    localStorage.setItem(STORAGE_KEY, lang.code);
    setOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 px-2.5 py-2 rounded-lg hover:bg-stone-50 transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-48 max-h-80 overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-xl z-50">
          <div className="p-1.5">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                  lang.code === current.code
                    ? "bg-amber-50 text-amber-800 font-medium"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className="text-base leading-none shrink-0">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
