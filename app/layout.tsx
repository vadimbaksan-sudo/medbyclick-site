import type { Metadata } from "next";
import { Onest, PT_Serif, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

// DESIGN.md (2026-08-21): PT Serif for headlines, Onest for body/UI — both
// have real Cyrillic support, unlike the prior Geist-only system. IBM Plex
// Mono for data/case-mark contexts — previously referenced by globals.css's
// --font-mono var but never actually loaded, so font-mono silently fell
// back to the browser default; fixed here as part of the same font swap.
const onestSans = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "MedByClick — Expert Care When the System Has Failed You",
  description:
    "A curated network of personally vetted specialists. When you've exhausted normal options, we know who to call.",
  // The site's own language switcher (components/LanguageSwitcher.tsx) swaps
  // page text client-side after mount via components/T.tsx. A browser's own
  // "Translate this page" (e.g. Chrome/Google Translate) mutates the same
  // DOM nodes independently, racing that swap — the two collide and leave
  // garbled text fragments behind (e.g. a whole sentence collapsing to one
  // stray word). Since the site already provides accurate translations for
  // its supported languages, opt out of browser auto-translate entirely
  // rather than let it fight our own client-side rendering.
  other: { google: "notranslate" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${onestSans.variable} ${ptSerif.variable} ${plexMono.variable} h-full antialiased notranslate`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
