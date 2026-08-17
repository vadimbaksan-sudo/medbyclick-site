import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en" translate="no" className={`${geistSans.variable} h-full antialiased notranslate`}>
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
