"use client";

import Link from "next/link";
import { doctors } from "@/modules/medconnect/data";
import { getNavModules } from "@/modules/registry";
import { avatarGradientClass } from "@/lib/ui/avatarColor";
import T from "@/components/T";
import { useLanguage, type LanguageCode } from "@/components/LanguageProvider";
import { Check } from "lucide-react";

const HERO_HEADLINE: Record<LanguageCode, { before: string; emphasis: string; after: string }> = {
  en: { before: "When every doctor says", emphasis: "they can't help", after: "— we know who can." },
  ru: { before: "Когда врачи говорят", emphasis: "«мы не можем помочь»", after: "— мы знаем, кто может." },
  tr: { before: "Doktorlar", emphasis: "yardımcı olamayız", after: "dediğinde — kimin yardımcı olabileceğini biliriz." },
  es: { before: "Cuando todos los médicos dicen que", emphasis: "no pueden ayudar", after: "— nosotros sabemos quién sí puede." },
  fr: { before: "Quand tous les médecins disent qu'ils", emphasis: "ne peuvent pas aider", after: "— nous savons qui le peut." },
};

export default function HomePage() {
  const { code } = useLanguage();
  const featured = doctors.slice(0, 3);
  const modules = getNavModules();
  const headline = HERO_HEADLINE[code];

  return (
    <>
      {/* Hero */}
      <section className="bg-green-50 text-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
              <T
                en="Personally vetted network · Israel & international"
                ru="Лично проверенная сеть врачей · Израиль и другие страны"
                tr="Kişisel olarak onaylanmış ağ · İsrail ve uluslararası"
                es="Red verificada personalmente · Israel e internacional"
                fr="Réseau vérifié personnellement · Israël et international"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              {headline.before}{" "}
              <span className="text-amber-700">{headline.emphasis}</span>
              {" "}{headline.after}
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-10 max-w-2xl">
              <T
                en="MedByClick is a curated network of specialists built over 40 years of clinical practice. Not a directory. Not AI-matched. Each doctor is personally vouched for — and personally reachable."
                ru="MedByClick — это отобранная сеть специалистов, выстроенная за 40 лет клинической практики. Это не каталог и не подбор по алгоритму. За каждого врача мы ручаемся лично — и с каждым можно связаться напрямую."
                tr="MedByClick, 40 yıllık klinik deneyim üzerine kurulmuş, özenle seçilmiş bir uzman ağıdır. Bir dizin değildir. Yapay zeka eşleştirmesi değildir. Her doktor kişisel olarak garanti edilir — ve kişisel olarak ulaşılabilir."
                es="MedByClick es una red curada de especialistas construida a lo largo de 40 años de práctica clínica. No es un directorio. No es un emparejamiento por IA. Cada médico está avalado personalmente — y es personalmente accesible."
                fr="MedByClick est un réseau de spécialistes soigneusement sélectionné, bâti sur 40 ans de pratique clinique. Ce n'est pas un annuaire. Ce n'est pas un appariement par IA. Chaque médecin est personnellement recommandé — et personnellement joignable."
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <T en="Book a Consultation" ru="Записаться на консультацию" tr="Randevu Alın" es="Reservar una consulta" fr="Réserver une consultation" />
              </Link>
              <Link
                href="/specialists/"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-stone-300 hover:border-stone-400 text-stone-900 rounded-lg transition-colors text-sm"
              >
                <T en="Browse Specialists" ru="Смотреть специалистов" tr="Uzmanlara Göz At" es="Ver especialistas" fr="Parcourir les spécialistes" />
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
              { value: "500+", en: "Cases handled", ru: "Обработано случаев", tr: "İşlenen vaka", es: "Casos atendidos", fr: "Cas traités" },
              { value: "40 yrs", en: "Clinical network built over", ru: "лет выстраивалась сеть", tr: "yıllık klinik ağ", es: "años construyendo la red", fr: "ans de construction du réseau" },
              { value: "3", en: "Countries served", ru: "страны охвата", tr: "ülkede hizmet", es: "países atendidos", fr: "pays desservis" },
              { value: "24–48h", en: "Typical response time", ru: "Обычное время ответа", tr: "Ortalama yanıt süresi", es: "Tiempo de respuesta típico", fr: "Délai de réponse habituel" },
            ].map((stat) => (
              <div key={stat.en}>
                <p className="text-2xl font-bold text-amber-700">{stat.value}</p>
                <p className="text-sm text-stone-600 mt-1"><T en={stat.en} ru={stat.ru} tr={stat.tr} es={stat.es} fr={stat.fr} /></p>
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
              <T en="Modular Platform" ru="Модульная платформа" tr="Modüler Platform" es="Plataforma Modular" fr="Plateforme Modulaire" />
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              <T en="Everything you need, in one place" ru="Всё необходимое — в одном месте" tr="İhtiyacınız olan her şey, tek yerde" es="Todo lo que necesitas, en un solo lugar" fr="Tout ce dont vous avez besoin, au même endroit" />
            </h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              {
                {
                  en: `${modules.length} active modules — from AI diagnostics to global specialist access, medical travel, and education.`,
                  ru: `${modules.length} активных модулей — от ИИ-диагностики до глобальной базы специалистов, медицинских поездок и образования.`,
                  tr: `${modules.length} aktif modül — yapay zeka tanısından küresel uzman erişimine, sağlık turizmine ve eğitime kadar.`,
                  es: `${modules.length} módulos activos — desde diagnóstico por IA hasta acceso global a especialistas, viajes médicos y educación.`,
                  fr: `${modules.length} modules actifs — du diagnostic par IA à l'accès mondial aux spécialistes, en passant par le voyage médical et l'éducation.`,
                }[code]
              }
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href!}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all"
              >
                <mod.icon className="w-6 h-6 mb-2 text-stone-600 group-hover:text-amber-700 transition-colors" />
                <p className="text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors leading-tight break-words">
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
                <T en="Not a directory" ru="Это не каталог" tr="Bu bir dizin değil" es="No es un directorio" fr="Ce n'est pas un annuaire" />
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-6">
                <T
                  en="The right specialist isn't found by browsing. It's found by knowing."
                  ru="Нужного специалиста не находят перебором. Его находят через личное знакомство."
                  tr="Doğru uzman göz atarak bulunmaz. Tanıyarak bulunur."
                  es="El especialista adecuado no se encuentra navegando. Se encuentra conociendo."
                  fr="Le bon spécialiste ne se trouve pas en parcourant une liste. Il se trouve en le connaissant."
                />
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                <T
                  en="Platforms like Teladoc give you access to thousands of doctors. MedByClick gives you access to the right one — because the founder has known them for decades and trusts them with the hardest cases."
                  ru="Такие платформы, как Teladoc, дают доступ к тысячам врачей. MedByClick даёт доступ к нужному врачу — потому что основатель знает их лично десятилетиями и доверяет им самые сложные случаи."
                  tr="Teladoc gibi platformlar binlerce doktora erişim sağlar. MedByClick size doğru olana erişim sağlar — çünkü kurucu onları on yıllardır tanır ve en zor vakaları onlara emanet eder."
                  es="Plataformas como Teladoc te dan acceso a miles de médicos. MedByClick te da acceso al adecuado — porque el fundador los conoce desde hace décadas y les confía los casos más difíciles."
                  fr="Des plateformes comme Teladoc vous donnent accès à des milliers de médecins. MedByClick vous donne accès au bon médecin — parce que le fondateur les connaît depuis des décennies et leur confie les cas les plus difficiles."
                />
              </p>
              <p className="text-stone-600 leading-relaxed">
                <T
                  en="Our patients come when the system has failed them. Second opinions before surgery. Rare diagnoses. Cases other doctors gave up on. We don't compete on convenience — we compete on who picks up when you call."
                  ru="Наши пациенты приходят, когда система их подвела. Второе мнение перед операцией. Редкие диагнозы. Случаи, от которых отказались другие врачи. Мы конкурируем не удобством, а тем, кто возьмёт трубку, когда вы позвоните."
                  tr="Hastalarımız, sistem onları hayal kırıklığına uğrattığında gelir. Ameliyat öncesi ikinci görüş. Nadir tanılar. Diğer doktorların vazgeçtiği vakalar. Kolaylıkla değil, telefonunuzu kimin açacağıyla rekabet ediyoruz."
                  es="Nuestros pacientes llegan cuando el sistema los ha fallado. Segundas opiniones antes de una cirugía. Diagnósticos raros. Casos que otros médicos abandonaron. No competimos en conveniencia — competimos en quién contesta cuando llamas."
                  fr="Nos patients arrivent quand le système les a laissés tomber. Deuxièmes avis avant une opération. Diagnostics rares. Cas que d'autres médecins ont abandonnés. Nous ne rivalisons pas sur la commodité — nous rivalisons sur qui décroche quand vous appelez."
                />
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  en: { title: "Personal vetting", body: "Every doctor in the network is known personally to the founder — not credentialed by an algorithm." },
                  ru: { title: "Личная проверка", body: "Каждый врач в сети лично известен основателю — а не отобран алгоритмом." },
                  tr: { title: "Kişisel değerlendirme", body: "Ağdaki her doktor kurucu tarafından kişisel olarak tanınır — bir algoritma tarafından belgelendirilmez." },
                  es: { title: "Verificación personal", body: "Cada médico de la red es conocido personalmente por el fundador — no acreditado por un algoritmo." },
                  fr: { title: "Vérification personnelle", body: "Chaque médecin du réseau est connu personnellement du fondateur — et non accrédité par un algorithme." },
                },
                {
                  en: { title: "Case-level routing", body: "We don't match by keyword. We read your case and connect you to the right person for your specific situation." },
                  ru: { title: "Подбор по сути случая", body: "Мы не сопоставляем по ключевым словам. Мы читаем ваш случай и связываем вас с нужным человеком именно для вашей ситуации." },
                  tr: { title: "Vaka bazlı yönlendirme", body: "Anahtar kelimeyle eşleştirmiyoruz. Vakanızı okuyoruz ve sizi durumunuza en uygun kişiyle buluşturuyoruz." },
                  es: { title: "Enrutamiento por caso", body: "No emparejamos por palabras clave. Leemos tu caso y te conectamos con la persona adecuada para tu situación específica." },
                  fr: { title: "Orientation au cas par cas", body: "Nous ne faisons pas de correspondance par mot-clé. Nous lisons votre dossier et vous mettons en relation avec la bonne personne pour votre situation." },
                },
                {
                  en: { title: "Hard cases welcome", body: "Rare conditions, exhausted options, pre-surgery second opinions — this is exactly what the network was built for." },
                  ru: { title: "Сложные случаи — по адресу", body: "Редкие заболевания, исчерпанные варианты, второе мнение перед операцией — именно для этого создана сеть." },
                  tr: { title: "Zor vakalar için doğru adres", body: "Nadir hastalıklar, tükenmiş seçenekler, ameliyat öncesi ikinci görüş — ağ tam olarak bunun için kuruldu." },
                  es: { title: "Los casos difíciles son bienvenidos", body: "Enfermedades raras, opciones agotadas, segundas opiniones antes de cirugía — para esto se construyó exactamente esta red." },
                  fr: { title: "Les cas difficiles sont les bienvenus", body: "Maladies rares, options épuisées, deuxièmes avis avant opération — c'est exactement pour cela que ce réseau a été créé." },
                },
              ].map((item) => (
                <div key={item.en.title} className="flex gap-4 p-5 rounded-xl border border-stone-100 bg-stone-50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-1">
                      <T en={item.en.title} ru={item.ru.title} tr={item.tr.title} es={item.es.title} fr={item.fr.title} />
                    </p>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      <T en={item.en.body} ru={item.ru.body} tr={item.tr.body} es={item.es.body} fr={item.fr.body} />
                    </p>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">
              <T en="Simple process" ru="Простой процесс" tr="Basit süreç" es="Proceso simple" fr="Processus simple" />
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              <T en="How it works" ru="Как это работает" tr="Nasıl çalışır" es="Cómo funciona" fr="Comment ça marche" />
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                en: { title: "Tell us your situation", body: "Fill in a short form describing your case — diagnosis, what you've tried, what you need. No medical records required to start." },
                ru: { title: "Расскажите о своей ситуации", body: "Заполните короткую форму: диагноз, что уже пробовали, что нужно. Медицинские документы для начала не требуются." },
                tr: { title: "Durumunuzu anlatın", body: "Vakanızı açıklayan kısa bir form doldurun — tanı, denedikleriniz, ihtiyacınız olan şey. Başlamak için tıbbi kayıt gerekmez." },
                es: { title: "Cuéntanos tu situación", body: "Completa un breve formulario describiendo tu caso — diagnóstico, qué has probado, qué necesitas. No se requieren historiales médicos para empezar." },
                fr: { title: "Parlez-nous de votre situation", body: "Remplissez un court formulaire décrivant votre cas — diagnostic, ce que vous avez essayé, ce dont vous avez besoin. Aucun dossier médical requis pour commencer." },
              },
              {
                step: "02",
                en: { title: "We match you to the right doctor", body: "Our coordinator reviews your case and routes it to the specialist best suited for your specific situation. Usually within 24 hours." },
                ru: { title: "Мы подбираем нужного врача", body: "Наш координатор изучает случай и направляет его специалисту, который лучше всего подходит именно вашей ситуации. Обычно в течение 24 часов." },
                tr: { title: "Sizi doğru doktorla eşleştiriyoruz", body: "Koordinatörümüz vakanızı inceler ve durumunuza en uygun uzmana yönlendirir. Genellikle 24 saat içinde." },
                es: { title: "Te conectamos con el médico adecuado", body: "Nuestro coordinador revisa tu caso y lo dirige al especialista más adecuado para tu situación específica. Normalmente en 24 horas." },
                fr: { title: "Nous vous orientons vers le bon médecin", body: "Notre coordinateur examine votre cas et l'oriente vers le spécialiste le mieux adapté à votre situation. Généralement sous 24 heures." },
              },
              {
                step: "03",
                en: { title: "Consult directly", body: "Your appointment is confirmed. You speak directly with the specialist — in Russian, Hebrew, or English — and get a clear path forward." },
                ru: { title: "Консультация напрямую", body: "Приём подтверждён. Вы говорите напрямую со специалистом — на русском, иврите или английском — и получаете чёткий план действий." },
                tr: { title: "Doğrudan görüşün", body: "Randevunuz onaylandı. Uzmanla doğrudan konuşuyorsunuz — Rusça, İbranice veya İngilizce — ve net bir yol haritası alıyorsunuz." },
                es: { title: "Consulta directa", body: "Tu cita está confirmada. Hablas directamente con el especialista — en ruso, hebreo o inglés — y obtienes un camino claro a seguir." },
                fr: { title: "Consultez directement", body: "Votre rendez-vous est confirmé. Vous parlez directement avec le spécialiste — en russe, en hébreu ou en anglais — et obtenez une voie claire à suivre." },
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-5xl font-black text-stone-300 mb-4 leading-none select-none">{item.step}</p>
                <h3 className="text-lg font-semibold text-stone-900 mb-3">
                  <T en={item.en.title} ru={item.ru.title} tr={item.tr.title} es={item.es.title} fr={item.fr.title} />
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">
                  <T en={item.en.body} ru={item.ru.body} tr={item.tr.body} es={item.es.body} fr={item.fr.body} />
                </p>
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
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">
                <T en="Our specialists" ru="Наши специалисты" tr="Uzmanlarımız" es="Nuestros especialistas" fr="Nos spécialistes" />
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                <T en="Meet the network" ru="Познакомьтесь с сетью" tr="Ağımızla tanışın" es="Conoce la red" fr="Découvrez le réseau" />
              </h2>
            </div>
            <Link href="/specialists/" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
              <T en="See all specialists →" ru="Все специалисты →" tr="Tüm uzmanları gör →" es="Ver todos los especialistas →" fr="Voir tous les spécialistes →" />
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
                  <T
                    en="— Founder's endorsement"
                    ru="— Личная рекомендация основателя"
                    tr="— Kurucunun tavsiyesi"
                    es="— Recomendación del fundador"
                    fr="— Recommandation du fondateur"
                  />
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/specialists/" className="text-sm font-medium text-stone-600 hover:text-stone-900">
              <T en="See all specialists →" ru="Все специалисты →" tr="Tüm uzmanları gör →" es="Ver todos los especialistas →" fr="Voir tous les spécialistes →" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-50 border-t border-amber-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-5">
            <T
              en="Ready to talk to the right specialist?"
              ru="Готовы поговорить с нужным специалистом?"
              tr="Doğru uzmanla konuşmaya hazır mısınız?"
              es="¿Listo para hablar con el especialista adecuado?"
              fr="Prêt à parler au bon spécialiste ?"
            />
          </h2>
          <p className="text-stone-600 mb-8 text-lg leading-relaxed">
            <T
              en="Tell us about your case. We'll match you to the right doctor — usually within 24 hours."
              ru="Расскажите о своём случае. Мы подберём нужного врача — обычно в течение 24 часов."
              tr="Vakanızı bize anlatın. Sizi doğru doktorla eşleştireceğiz — genellikle 24 saat içinde."
              es="Cuéntanos tu caso. Te conectaremos con el médico adecuado — normalmente en 24 horas."
              fr="Parlez-nous de votre cas. Nous vous orienterons vers le bon médecin — généralement sous 24 heures."
            />
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors"
          >
            <T en="Book a Consultation" ru="Записаться на консультацию" tr="Randevu Alın" es="Reservar una consulta" fr="Réserver une consultation" />
          </Link>
          <p className="text-stone-400 text-sm mt-4">
            <T en="Not sure yet?" ru="Ещё не уверены?" tr="Henüz emin değil misiniz?" es="¿Aún no estás seguro?" fr="Pas encore sûr ?" />{" "}
            <Link href="/specialists/" className="underline hover:text-stone-600">
              <T
                en="Browse our specialists first →"
                ru="Сначала посмотреть специалистов →"
                tr="Önce uzmanlarımıza göz atın →"
                es="Primero explora nuestros especialistas →"
                fr="Parcourez d'abord nos spécialistes →"
              />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
