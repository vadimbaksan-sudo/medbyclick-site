"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getNavModules } from "@/modules/registry";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { logoutUser } from "@/lib/auth/actions";
import { CONTACT } from "@/lib/contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import T from "@/components/T";

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

  const navModules = getNavModules();
  const primary = navModules.find((m) => m.id === "medconnect");
  const platform = navModules.filter((m) => m.id !== "medconnect");

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

            {primary && primary.href !== "/medconnect" && (
              <Link
                href={primary.href!}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
              >
                {primary.navLabel}
              </Link>
            )}

            {platform.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setPlatformOpen(!platformOpen)}
                  onBlur={() => setTimeout(() => setPlatformOpen(false), 150)}
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
                      {platform.map((mod) => (
                        <Link
                          key={mod.id}
                          href={mod.href!}
                          onClick={() => setPlatformOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors group"
                        >
                          <span className="text-lg shrink-0">{mod.icon}</span>
                          <div>
                            <p className="text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors leading-tight">
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
              <span className="text-lg">🩺</span>
              <span className="text-sm font-medium text-stone-700"><T en="Specialists" ru="Специалисты" tr="Uzmanlar" es="Especialistas" fr="Spécialistes" /></span>
            </Link>
            <Link
              href="/medai/"
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <span className="text-lg">🧠</span>
              <span className="text-sm font-medium text-stone-700"><T en="AI Diagnostics" ru="ИИ-диагностика" tr="Yapay Zeka Tanı" es="Diagnóstico IA" fr="Diagnostic IA" /></span>
            </Link>
            <Link
              href="/pricing/"
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <span className="text-lg">💳</span>
              <span className="text-sm font-medium text-stone-700"><T en="Pricing" ru="Цены" tr="Fiyatlandırma" es="Precios" fr="Tarifs" /></span>
            </Link>
            <Link
              href="/medtravel/"
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <span className="text-lg">✈️</span>
              <span className="text-sm font-medium text-stone-700"><T en="Medical Travel" ru="Медицинские поездки" tr="Sağlık Turizmi" es="Viajes Médicos" fr="Voyage Médical" /></span>
            </Link>
            <Link
              href="/mededu/"
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <span className="text-lg">📚</span>
              <span className="text-sm font-medium text-stone-700"><T en="Education" ru="Образование" tr="Eğitim" es="Educación" fr="Éducation" /></span>
            </Link>

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
