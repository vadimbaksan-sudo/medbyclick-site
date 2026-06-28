import Link from "next/link";
import { doctors } from "@/lib/doctors";

export const metadata = {
  title: "Our Specialists — MedByClick",
  description: "Browse our personally vetted network of medical specialists.",
};

export default function DoctorsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            Our specialists
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            The network
          </h1>
          <p className="text-slate-300 max-w-xl leading-relaxed">
            Every doctor here has been personally vetted by the founder — known through
            years of clinical collaboration, not credential review.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-slate-100 bg-slate-50 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-3 overflow-x-auto">
          {["All specialties", "Oncology", "Cardiology", "Neurology"].map(
            (filter, i) => (
              <button
                key={filter}
                className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors ${
                  i === 0
                    ? "bg-slate-900 text-white border-slate-900"
                    : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Doctor list */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/doctors/${doctor.id}`}
              className="group block border border-slate-100 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-xl flex-shrink-0">
                  {doctor.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                    {doctor.name}
                  </p>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {doctor.title}
                  </p>
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-4">
                <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  {doctor.specialty}
                </span>
              </div>

              {/* Subspecialties */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {doctor.subspecialties.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Endorsement preview */}
              <blockquote className="text-sm text-slate-500 leading-relaxed line-clamp-3 italic border-l-2 border-amber-300 pl-3 mb-4">
                {doctor.endorsement}
              </blockquote>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                  {doctor.responseTime}
                </span>
                <span>{doctor.languages.join(" · ")}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-xl mx-auto text-center px-4">
          <p className="text-slate-600 mb-6">
            Not sure which specialist is right for your case? Tell us what you&apos;re
            dealing with — we&apos;ll route you.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
