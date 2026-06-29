import Link from "next/link";
import { doctors } from "@/modules/medconnect/data";

export const metadata = {
  title: "Specialists — MedByClick",
  description: "Browse our personally vetted network of specialists across oncology, cardiology, neurology, and more.",
};

export default function SpecialistsPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            Our network
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet the specialists</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Every doctor in this network is personally known to the founder — vetted over decades of clinical practice, not credentialed by an algorithm.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/doctors/${doctor.id}/`}
              className="group block border border-slate-100 rounded-2xl p-6 hover:border-amber-300 hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg flex-shrink-0">
                  {doctor.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{doctor.title}</p>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  {doctor.specialty}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {doctor.subspecialties.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {doctor.languages.map((lang) => (
                  <span key={lang} className="text-xs px-2 py-0.5 border border-slate-200 text-slate-500 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>

              <blockquote className="text-xs text-slate-500 leading-relaxed line-clamp-3 italic border-l-2 border-amber-300 pl-3 mb-3">
                {doctor.endorsement}
              </blockquote>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span>{doctor.casesHandled} cases handled</span>
                <span className="text-amber-600 font-medium">{doctor.responseTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 bg-amber-50 border border-amber-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Not sure which specialist you need?
          </h2>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Describe your situation and our coordinator will match you to the right doctor — usually within 24 hours.
          </p>
          <Link
            href="/book/"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
