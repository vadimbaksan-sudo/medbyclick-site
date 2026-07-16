"use client";

import Link from "next/link";
import { doctors } from "@/modules/medconnect/data";
import { getNavModules } from "@/modules/registry";
import { avatarGradientClass } from "@/lib/ui/avatarColor";
import T from "@/components/T";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomePage() {
  const { code } = useLanguage();
  const featured = doctors.slice(0, 3);
  const modules = getNavModules();

  return (
    <>
      {/* Hero */}
      <section className="bg-green-50 text-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
              <T en="Personally vetted network · Israel & international" ru="Лично проверенная сеть врачей · Израиль и другие страны" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              {code === "ru" ? (
                <>
                  Когда врачи говорят{" "}
                  <span className="text-amber-700">«мы не можем помочь»</span>
                  {" "}— мы знаем, кто может.
                </>
              ) : (
                <>
                  When every doctor says{" "}
                  <span className="text-amber-700">they can&apos;t help</span>
                  {" "}— we know who can.
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-10 max-w-2xl">
              <T
                en="MedByClick is a curated network of specialists built over 40 years of clinical practice. Not a directory. Not AI-matched. Each doctor is personally vouched for — and personally reachable."
                ru="MedByClick — это отобранная сеть специалистов, выстроенная за 40 лет клинической практики. Это не каталог и не подбор по алгоритму. За каждого врача мы ручаемся лично — и с каждым можно связаться напрямую."
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/specialists/"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-lg transition-colors text-sm"
              >
                <T en="Browse Specialists" ru="Смотреть специалистов" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-stone-300 hover:border-stone-400 text-stone-900 rounded-lg transition-colors text-sm"
              >
                <T en="Book a Consultation" ru="Записаться на консультацию" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-green-100 text-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: "500+", en: "Cases handled", ru: "Обработано случаев" },
              { value: "40 yrs", en: "Clinical network built over", ru: "лет выстраивалась сеть" },
              { value: "3", en: "Countries served", ru: "страны охвата" },
              { value: "24–48h", en: "Typical response time", ru: "Обычное время ответа" },
            ].map((stat) => (
              <div key={stat.en}>
                <p className="text-2xl font-bold text-amber-700">{stat.value}</p>
                <p className="text-sm text-stone-600 mt-1"><T en={stat.en} ru={stat.ru} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform modules */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">
              <T en="Modular Platform" ru="Модульная платформа" />
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              <T en="Everything you need, in one place" ru="Всё необходимое — в одном месте" />
            </h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              {code === "ru"
                ? `${modules.length} активных модулей — от ИИ-диагностики до глобальной базы специалистов, медицинских поездок и образования.`
                : `${modules.length} active modules — from AI diagnostics to global specialist access, medical travel, and education.`}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href!}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl mb-2">{mod.icon}</span>
                <p className="text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors leading-tight">
                  {mod.navLabel}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">
                <T en="Not a directory" ru="Это не каталог" />
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-6">
                <T
                  en="The right specialist isn't found by browsing. It's found by knowing."
                  ru="Нужного специалиста не находят перебором. Его находят через личное знакомство."
                />
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                <T
                  en="Platforms like Teladoc give you access to thousands of doctors. MedByClick gives you access to the right one — because the founder has known them for decades and trusts them with the hardest cases."
                  ru="Такие платформы, как Teladoc, дают доступ к тысячам врачей. MedByClick даёт доступ к нужному врачу — потому что основатель знает их лично десятилетиями и доверяет им самые сложные случаи."
                />
              </p>
              <p className="text-stone-600 leading-relaxed">
                <T
                  en="Our patients come when the system has failed them. Second opinions before surgery. Rare diagnoses. Cases other doctors gave up on. We don't compete on convenience — we compete on who picks up when you call."
                  ru="Наши пациенты приходят, когда система их подвела. Второе мнение перед операцией. Редкие диагнозы. Случаи, от которых отказались другие врачи. Мы конкурируем не удобством, а тем, кто возьмёт трубку, когда вы позвоните."
                />
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: "✓",
                  en: { title: "Personal vetting", body: "Every doctor in the network is known personally to the founder — not credentialed by an algorithm." },
                  ru: { title: "Личная проверка", body: "Каждый врач в сети лично известен основателю — а не отобран алгоритмом." },
                },
                {
                  icon: "✓",
                  en: { title: "Case-level routing", body: "We don't match by keyword. We read your case and connect you to the right person for your specific situation." },
                  ru: { title: "Подбор по сути случая", body: "Мы не сопоставляем по ключевым словам. Мы читаем ваш случай и связываем вас с нужным человеком именно для вашей ситуации." },
                },
                {
                  icon: "✓",
                  en: { title: "Hard cases welcome", body: "Rare conditions, exhausted options, pre-surgery second opinions — this is exactly what the network was built for." },
                  ru: { title: "Сложные случаи — по адресу", body: "Редкие заболевания, исчерпанные варианты, второе мнение перед операцией — именно для этого создана сеть." },
                },
              ].map((item) => (
                <div key={item.en.title} className="flex gap-4 p-5 rounded-xl border border-stone-100 bg-stone-50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm font-bold flex items-center justify-center">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-1"><T en={item.en.title} ru={item.ru.title} /></p>
                    <p className="text-stone-500 text-sm leading-relaxed"><T en={item.en.body} ru={item.ru.body} /></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4"><T en="Simple process" ru="Простой процесс" /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900"><T en="How it works" ru="Как это работает" /></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                en: { title: "Tell us your situation", body: "Fill in a short form describing your case — diagnosis, what you've tried, what you need. No medical records required to start." },
                ru: { title: "Расскажите о своей ситуации", body: "Заполните короткую форму: диагноз, что уже пробовали, что нужно. Медицинские документы для начала не требуются." },
              },
              {
                step: "02",
                en: { title: "We match you to the right doctor", body: "Our coordinator reviews your case and routes it to the specialist best suited for your specific situation. Usually within 24 hours." },
                ru: { title: "Мы подбираем нужного врача", body: "Наш координатор изучает случай и направляет его специалисту, который лучше всего подходит именно вашей ситуации. Обычно в течение 24 часов." },
              },
              {
                step: "03",
                en: { title: "Consult directly", body: "Your appointment is confirmed. You speak directly with the specialist — in Russian, Hebrew, or English — and get a clear path forward." },
                ru: { title: "Консультация напрямую", body: "Приём подтверждён. Вы говорите напрямую со специалистом — на русском, иврите или английском — и получаете чёткий план действий." },
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-5xl font-black text-stone-100 mb-4 leading-none select-none">{item.step}</p>
                <h3 className="text-lg font-semibold text-stone-900 mb-3"><T en={item.en.title} ru={item.ru.title} /></h3>
                <p className="text-stone-500 leading-relaxed text-sm"><T en={item.en.body} ru={item.ru.body} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured doctors */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4"><T en="Our specialists" ru="Наши специалисты" /></p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900"><T en="Meet the network" ru="Познакомьтесь с сетью" /></h2>
            </div>
            <Link href="/specialists/" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
              <T en="See all specialists →" ru="Все специалисты →" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="group block border border-stone-100 rounded-2xl p-6 hover:border-stone-300 hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradientClass(doctor.id)} flex items-center justify-center text-white font-semibold text-lg mb-4`}
                >
                  {doctor.name.split(" ").slice(-1)[0][0]}
                </div>
                <p className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">{doctor.name}</p>
                <p className="text-sm text-stone-500 mt-0.5 mb-3">{doctor.specialty} · {doctor.title}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.languages.map((lang) => (
                    <span key={lang} className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">{lang}</span>
                  ))}
                </div>
                <blockquote className="text-sm text-stone-500 leading-relaxed line-clamp-3 italic border-l-2 border-amber-300 pl-3">
                  {doctor.endorsement}
                </blockquote>
                <p className="text-xs text-stone-400 mt-3 not-italic">
                  <T en="— Founder's endorsement" ru="— Личная рекомендация основателя" />
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/specialists/" className="text-sm font-medium text-stone-600 hover:text-stone-900">
              <T en="See all specialists →" ru="Все специалисты →" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-50 border-t border-amber-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-5">
            <T en="Ready to talk to the right specialist?" ru="Готовы поговорить с нужным специалистом?" />
          </h2>
          <p className="text-stone-600 mb-8 text-lg leading-relaxed">
            <T
              en="Tell us about your case. We'll match you to the right doctor — usually within 24 hours."
              ru="Расскажите о своём случае. Мы подберём нужного врача — обычно в течение 24 часов."
            />
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 hover:bg-stone-700 text-white font-semibold rounded-lg transition-colors"
          >
            <T en="Book a Consultation" ru="Записаться на консультацию" />
          </Link>
          <p className="text-stone-400 text-sm mt-4">
            <T en="Not sure yet?" ru="Ещё не уверены?" />{" "}
            <Link href="/specialists/" className="underline hover:text-stone-600">
              <T en="Browse our specialists first →" ru="Сначала посмотреть специалистов →" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
