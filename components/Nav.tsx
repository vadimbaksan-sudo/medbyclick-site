"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getNavModules } from "@/modules/registry";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { logoutUser } from "@/lib/auth/actions";
import { CONTACT } from "@/lib/contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import T from "@/components/T";
import { Stethoscope, CreditCard } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  // Session awareness so "Log out" is reachable from the header on any
  // page, not just /dashboard. Uses the browser Supabase client (reads the
  // same cookie-based session lib/supabase/server.ts / proxy.ts maintain)
  // rather than a server-fetched prop, so the rest of the site can stay
  // statically rendered — see lib/supabase/client.ts.
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let supabase;
    try {
      supabase = createSupabaseBrowserClient();
    } catch {
      // Supabase not configured in this environment — stay logged-out UI.
      return;
    }

    supabase.auth.getUser().then(({ data }) => setLoggedIn(Boolean(data.user)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(Boolean(session?.user));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Previously split into a `primary` (medconnect, meant to render as its
  // own top-level link) + `platform` (everything else, in the dropdown)
  // pair. The `primary` link's guard condition (`primary.href !==
  // "/medconnect"`) could never be true for the medconnect module itself,
  // so that link never rendered — medconnect silently vanished from the
  // desktop nav entirely (still visible in the footer, which doesn't do
  // this split). Fix: medconnect goes back into the same dropdown as every
  // other module, exactly like the other 14. "Специалисты" below stays a
  // separate, deliberately distinct top-level link — it's a real,
  // already-working doctor-browse page in its own right, not meant to be
  // medconnect's nav entry point (2026-08-19 conversation with Vadim).
  const navModules = getNavModules();

  function closeAll() {
    setOpen(false);
    setPlatformOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeAll}>
            <span className="text-stone-900 font-semibold text-lg tracking-tight">MedByClick</span>
            <span className="hidden sm:inline-block text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <T en="Platform" ru="Платформа" tr="Platform" es="Plataforma" fr="Plateforme" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/specialists/"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <T en="Specialists" ru="Специалисты" tr="Uzmanlar" es="Especialistas" fr="Spécialistes" />
            </Link>

            {navModules.length > 0 && (
              <div
                className="relative"
                onKeyDown={(e) => {
                  // Bubbles up from the button or any link inside the open
                  // panel, so Escape closes it regardless of which of the
                  // two currently has focus.
                  if (e.key === "Escape") setPlatformOpen(false);
                }}
              >
                <button
                  onClick={() => setPlatformOpen(!platformOpen)}
                  onBlur={() => setTimeout(() => setPlatformOpen(false), 150)}
                  aria-haspopup="true"
                  aria-expanded={platformOpen}
                  className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <T en="Platform" ru="Платформа" tr="Platform" es="Plataforma" fr="Plateforme" />
                  <svg className={`w-3.5 h-3.5 transition-transform ${platformOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {platformOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-2 grid grid-cols-2 gap-0.5">
                      {navModules.map((mod) => (
                        <Link
                          key={mod.id}
                          href={mod.href!}
                          onClick={() => setPlatformOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors group"
                        >
                          <mod.icon className="w-4 h-4 shrink-0 text-stone-500 group-hover:text-amber-700 transition-colors" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors leading-tight break-words">
                              {mod.navLabel}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-stone-200">
              <Link
                href="/dashboard/"
                className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
              >
                <T en="Dashboard" ru="Кабинет" tr="Panel" es="Panel" fr="Tableau de bord" />
              </Link>
              {loggedIn ? (
                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    <T en="Log out" ru="Выйти" tr="Çıkış yap" es="Cerrar sesión" fr="Se déconnecter" />
                  </button>
                </form>
              ) : (
                <>
                  <Link
                    href="/login/"
                    className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    <T en="Log in" ru="Войти" tr="Giriş yap" es="Iniciar sesión" fr="Se connecter" />
                  </Link>
                  <Link
                    href="/register/"
                    className="text-sm font-medium bg-stone-100 hover:bg-stone-200 text-stone-900 px-3 py-2 rounded-lg transition-colors"
                  >
                    <T en="Register" ru="Регистрация" tr="Kayıt ol" es="Registrarse" fr="S'inscrire" />
                  </Link>
                </>
              )}
              {CONTACT.telegram && (
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-stone-500 hover:text-[#229ED9] hover:bg-stone-50 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.26l-2.95-.924c-.64-.203-.657-.64.136-.954l11.57-4.461c.537-.194 1.006.131.968.3z" />
                  </svg>
                </a>
              )}
              <LanguageSwitcher />
              <Link
                href="/book/"
                className="text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
              >
                <T en="Book a Consultation" ru="Записаться" tr="Randevu Al" es="Reservar" fr="Réserver" />
              </Link>
            </div>
          </nav>

          {/* Mobile: language switcher stays visible in the top corner even
              with the menu closed, next to the hamburger */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 -mr-1 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-100 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/specialists/"
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-stone-500" />
              <span className="text-sm font-medium text-stone-700"><T en="Specialists" ru="Специалисты" tr="Uzmanlar" es="Especialistas" fr="Spécialistes" /></span>
            </Link>
            <Link
              href="/pricing/"
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-stone-500" />
              <span className="text-sm font-medium text-stone-700"><T en="Pricing" ru="Цены" tr="Fiyatlandırma" es="Precios" fr="Tarifs" /></span>
            </Link>
            {/* Same bug class as the desktop dropdown fix (see navModules
                comment above): this was a hardcoded 5-module list that never
                got updated when modules were added, so most of them
                (including MedConnect) were unreachable from mobile nav
                entirely. Now loops over the same getNavModules() the desktop
                dropdown uses, so the two can never drift apart again. */}
            {navModules.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href!}
                onClick={closeAll}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <mod.icon className="w-4 h-4 text-stone-500" />
                <span className="text-sm font-medium text-stone-700">{mod.navLabel}</span>
              </Link>
            ))}

            <div className="pt-2 border-t border-stone-100 mt-2 space-y-2">
              {loggedIn ? (
                <div className="flex gap-2">
                  <Link
                    href="/dashboard/"
                    onClick={closeAll}
                    className="flex-1 text-center py-2.5 border border-stone-200 text-stone-700 text-sm font-medium rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    <T en="Dashboard" ru="Кабинет" tr="Panel" es="Panel" fr="Tableau de bord" />
                  </Link>
                  <form action={logoutUser} className="flex-1" onSubmit={closeAll}>
                    <button
                      type="submit"
                      className="w-full text-center py-2.5 bg-stone-100 text-stone-900 text-sm font-medium rounded-xl hover:bg-stone-200 transition-colors"
                    >
                      <T en="Log out" ru="Выйти" tr="Çıkış yap" es="Cerrar sesión" fr="Se déconnecter" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login/"
                    onClick={closeAll}
                    className="flex-1 text-center py-2.5 border border-stone-200 text-stone-700 text-sm font-medium rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    <T en="Log in" ru="Войти" tr="Giriş yap" es="Iniciar sesión" fr="Se connecter" />
                  </Link>
                  <Link
                    href="/register/"
                    onClick={closeAll}
                    className="flex-1 text-center py-2.5 bg-stone-100 text-stone-900 text-sm font-medium rounded-xl hover:bg-stone-200 transition-colors"
                  >
                    <T en="Register" ru="Регистрация" tr="Kayıt ol" es="Registrarse" fr="S'inscrire" />
                  </Link>
                </div>
              )}
              {CONTACT.telegram && (
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeAll}
                  className="flex items-center justify-center gap-2 py-2.5 border border-stone-200 text-stone-700 text-sm font-medium rounded-xl hover:bg-stone-50 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#229ED9]">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.26l-2.95-.924c-.64-.203-.657-.64.136-.954l11.57-4.461c.537-.194 1.006.131.968.3z" />
                  </svg>
                  Telegram
                </a>
              )}
              <Link
                href="/book/"
                onClick={closeAll}
                className="block text-center py-3 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-colors"
              >
                <T en="Book a Consultation" ru="Записаться на консультацию" tr="Randevu Alın" es="Reservar una consulta" fr="Réserver une consultation" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
