import Link from "next/link";
import { doctors } from "@/modules/medconnect/data";
import { getNavModules } from "@/modules/registry";

export default function HomePage() {
  const featured = doctors.slice(0, 3);
  const modules = getNavModules();

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              Personally vetted network · Israel & international
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              When every doctor says{" "}
              <span className="text-amber-400">they can&apos;t help</span>
              {" "}— we know who can.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              MedByClick is a curated network of specialists built over 40 years of clinical practice. Not a directory. Not AI-matched. Each doctor is personally vouched for — and personally reachable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/specialists/"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm"
              >
                Browse Specialists
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-600 hover:border-slate-400 text-white rounded-lg transition-colors text-sm"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: "500+", label: "Cases handled" },
              { value: "40 yrs", label: "Clinical network built over" },
              { value: "3", label: "Countries served" },
              { value: "24–48h", label: "Typical response time" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform modules */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">
              Modular Platform
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Everything you need, in one place
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              {modules.length} active modules — from AI diagnostics to global specialist access, medical travel, and education.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href!}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl mb-2">{mod.icon}</span>
                <p className="text-xs font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
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
                Not a directory
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                The right specialist isn&apos;t found by browsing. It&apos;s found by knowing.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Platforms like Teladoc give you access to thousands of doctors. MedByClick gives you access to the right one — because the founder has known them for decades and trusts them with the hardest cases.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our patients come when the system has failed them. Second opinions before surgery. Rare diagnoses. Cases other doctors gave up on. We don&apos;t compete on convenience — we compete on who picks up when you call.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "✓", title: "Personal vetting", body: "Every doctor in the network is known personally to the founder — not credentialed by an algorithm." },
                { icon: "✓", title: "Case-level routing", body: "We don't match by keyword. We read your case and connect you to the right person for your specific situation." },
                { icon: "✓", title: "Hard cases welcome", body: "Rare conditions, exhausted options, pre-surgery second opinions — this is exactly what the network was built for." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm font-bold flex items-center justify-center">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">Simple process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Tell us your situation", body: "Fill in a short form describing your case — diagnosis, what you've tried, what you need. No medical records required to start." },
              { step: "02", title: "We match you to the right doctor", body: "Our coordinator reviews your case and routes it to the specialist best suited for your specific situation. Usually within 24 hours." },
              { step: "03", title: "Consult directly", body: "Your appointment is confirmed. You speak directly with the specialist — in Russian, Hebrew, or English — and get a clear path forward." },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-5xl font-black text-slate-100 mb-4 leading-none select-none">{item.step}</p>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.body}</p>
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
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">Our specialists</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Meet the network</h2>
            </div>
            <Link href="/specialists/" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              See all specialists →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="group block border border-slate-100 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold text-lg mb-4">
                  {doctor.name.split(" ").slice(-1)[0][0]}
                </div>
                <p className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">{doctor.name}</p>
                <p className="text-sm text-slate-500 mt-0.5 mb-3">{doctor.specialty} · {doctor.title}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.languages.map((lang) => (
                    <span key={lang} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{lang}</span>
                  ))}
                </div>
                <blockquote className="text-sm text-slate-500 leading-relaxed line-clamp-3 italic border-l-2 border-amber-300 pl-3">
                  {doctor.endorsement}
                </blockquote>
                <p className="text-xs text-slate-400 mt-3 not-italic">— Founder&apos;s endorsement</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/specialists/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              See all specialists →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-50 border-t border-amber-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
            Ready to talk to the right specialist?
          </h2>
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            Tell us about your case. We&apos;ll match you to the right doctor — usually within 24 hours.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            Book a Consultation
          </Link>
          <p className="text-slate-400 text-sm mt-4">
            Not sure yet?{" "}
            <Link href="/specialists/" className="underline hover:text-slate-600">
              Browse our specialists first →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
