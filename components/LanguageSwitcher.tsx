"use client";

import { useEffect, useRef, useState } from "react";
import {
  GB,
  TR,
  ES,
  FR,
  DE,
  RU,
  CN,
  JP,
  KR,
  SA,
  IT,
  PT,
} from "country-flag-icons/react/3x2";
import { useLanguage, type LanguageCode } from "@/components/LanguageProvider";

// SVG flags, not emoji: emoji flags render as bare two-letter codes on
// Windows (no glyph for the combined regional-indicator pair in most
// system emoji fonts there), while macOS/iOS render them fine — SVG
// renders identically everywhere. See country-flag-icons package.
const FLAGS = { GB, TR, ES, FR, DE, RU, CN, JP, KR, SA, IT, PT } as const;

// Full 12-language target set per docs/ROADMAP.md "Localization (12 Languages)"
// and docs/decision-log/0003-localization-12-languages.md. Only English and
// Russian actually translate page content right now (via LanguageProvider +
// components/T.tsx) — the roadmap's first sequencing step, since Russian is
// the platform's real existing audience. The other 10 stay visible/selectable
// (so the target set is honest and visible) but fall back to English content
// until real demand + certified medical translation + Medical Advisory
// sign-off land, per the linked decision. Do not wire fake/machine-translated
// content for those 10 — that would violate the sign-off requirement.
const LANGUAGES = [
  { code: "en", country: "GB", name: "English", translated: true },
  { code: "tr", country: "TR", name: "Türkçe", translated: true },
  { code: "es", country: "ES", name: "Español", translated: true },
  { code: "fr", country: "FR", name: "Français", translated: true },
  { code: "de", country: "DE", name: "Deutsch", translated: false },
  { code: "ru", country: "RU", name: "Русский", translated: true },
  { code: "zh", country: "CN", name: "中文", translated: false },
  { code: "ja", country: "JP", name: "日本語", translated: false },
  { code: "ko", country: "KR", name: "한국어", translated: false },
  { code: "ar", country: "SA", name: "العربية", translated: false },
  { code: "it", country: "IT", name: "Italiano", translated: false },
  { code: "pt", country: "PT", name: "Português", translated: false },
] as const;

const DISPLAY_KEY = "mbc-language-display";

export default function LanguageSwitcher() {
  const { code, setCode } = useLanguage();
  const [open, setOpen] = useState(false);
  const [displayCode, setDisplayCode] = useState<string>("en");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(DISPLAY_KEY);
    if (saved && LANGUAGES.some((l) => l.code === saved)) setDisplayCode(saved);
  }, []);

  // Keep the shown flag in sync if content language changes elsewhere.
  useEffect(() => {
    setDisplayCode(code);
  }, [code]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = LANGUAGES.find((l) => l.code === displayCode) ?? LANGUAGES[0];

  function selectLanguage(lang: (typeof LANGUAGES)[number]) {
    setDisplayCode(lang.code);
    localStorage.setItem(DISPLAY_KEY, lang.code);
    // Only en/ru actually translate content; anything else falls back to
    // English rather than showing a mismatched flag/content combination.
    setCode(lang.translated ? (lang.code as LanguageCode) : "en");
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
        {(() => {
          const CurrentFlag = FLAGS[current.country];
          return <CurrentFlag className="w-5 h-[14px] rounded-[2px] shrink-0" />;
        })()}
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-56 max-h-80 overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-xl z-50">
          <div className="p-1.5">
            {LANGUAGES.map((lang) => {
              const Flag = FLAGS[lang.country];
              return (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                    lang.code === current.code
                      ? "bg-amber-50 text-amber-800 font-medium"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <Flag className="w-5 h-[14px] rounded-[2px] shrink-0" />
                  <span className="flex-1 text-left">{lang.name}</span>
                  {!lang.translated && (
                    <span className="text-[10px] text-stone-400 shrink-0">soon</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
