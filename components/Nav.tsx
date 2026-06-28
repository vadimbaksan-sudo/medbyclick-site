"use client";

import Link from "next/link";
import { useState } from "react";
import { getNavModules } from "@/modules/registry";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  const navModules = getNavModules();
  const primary = navModules.find((m) => m.id === "medconnect");
  const platform = navModules.filter((m) => m.id !== "medconnect");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-slate-900 font-semibold text-lg tracking-tight">MedByClick</span>
            <span className="hidden sm:inline-block text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Platform
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {primary && (
              <Link
                href={primary.href!}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {primary.navLabel}
              </Link>
            )}

            {platform.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setPlatformOpen(!platformOpen)}
                  onBlur={() => setTimeout(() => setPlatformOpen(false), 150)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Platform
                  <svg className={`w-3.5 h-3.5 transition-transform ${platformOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {platformOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-2 grid grid-cols-2 gap-0.5">
                      {platform.map((mod) => (
                        <Link
                          key={mod.id}
                          href={mod.href!}
                          onClick={() => setPlatformOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <span className="text-lg flex-shrink-0">{mod.icon}</span>
                          <div>
                            <p className="text-xs font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                              {mod.navLabel}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 px-4 py-3 bg-slate-50">
                      <p className="text-xs text-slate-400">Toggle modules in <code className="font-mono bg-slate-200 px-1 rounded">modules/config.ts</code></p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Link
              href="/book"
              className="ml-2 text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Book a Consultation
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            {navModules.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href!}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg">{mod.icon}</span>
                <span className="text-sm font-medium text-slate-700">{mod.navLabel}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 mt-2">
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="block text-center py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
