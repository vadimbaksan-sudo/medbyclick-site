"use client";

import Link from "next/link";
import { getNavModules } from "@/modules/registry";
import T from "@/components/T";

export default function Footer() {
  const navModules = getNavModules();

  return (
    <footer className="bg-green-50 text-stone-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <p className="text-stone-900 font-semibold mb-2">MedByClick</p>
            <p className="text-sm leading-relaxed">
              <T
                en="A modular medical platform. Personally vetted specialists, AI diagnostics, global care coordination."
                ru="Модульная медицинская платформа. Лично проверенные специалисты, ИИ-диагностика, глобальная координация помощи."
              />
            </p>
          </div>

          <div>
            <p className="text-stone-900 text-sm font-medium mb-3"><T en="Platform" ru="Платформа" /></p>
            <div className="flex flex-col gap-2 text-sm">
              {navModules.map((mod) => (
                <Link key={mod.id} href={mod.href!} className="hover:text-stone-900 transition-colors flex items-center gap-1.5">
                  <span className="text-xs">{mod.icon}</span>
                  {mod.navLabel}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-stone-900 text-sm font-medium mb-3"><T en="Specialists" ru="Специалисты" /></p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/doctors" className="hover:text-stone-900 transition-colors"><T en="Browse Network" ru="Смотреть сеть" /></Link>
              <Link href="/#how-it-works" className="hover:text-stone-900 transition-colors"><T en="How It Works" ru="Как это работает" /></Link>
              <Link href="/book" className="hover:text-stone-900 transition-colors"><T en="Book a Consultation" ru="Записаться на консультацию" /></Link>
            </div>
          </div>

          <div>
            <p className="text-stone-900 text-sm font-medium mb-3"><T en="Contact" ru="Контакты" /></p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:info@medbyclick.com" className="hover:text-stone-900 transition-colors">
                info@medbyclick.com
              </a>
              <p>Israel — Russia — International</p>
              <p className="text-xs mt-2 text-stone-500">
                <T en="Active modules:" ru="Активных модулей:" /> <span className="text-stone-600">{navModules.length}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-stone-200 text-xs text-stone-500">
          {/* Legal/scope disclaimer — left English-only pending Legal & Compliance
              review of the translation, same caution as clinical content: a
              wrong translation here misrepresents the platform's service
              boundary, not just style. */}
          © {new Date().getFullYear()} MedByClick. All consultations are non-emergency advisory services.
        </div>
      </div>
    </footer>
  );
}
