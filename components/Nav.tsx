"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-slate-900 font-semibold text-lg tracking-tight">
              MedByClick
            </span>
            <span className="hidden sm:inline-block text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Verified Network
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/doctors"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Our Specialists
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/book"
              className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Book a Consultation
            </Link>
          </nav>

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

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-4">
          <Link
            href="/doctors"
            className="text-sm font-medium text-slate-700"
            onClick={() => setOpen(false)}
          >
            Our Specialists
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-slate-700"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/book"
            className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
