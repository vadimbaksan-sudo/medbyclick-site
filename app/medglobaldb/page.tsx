import { globalDoctors } from "@/modules/medglobaldb/data";
import GlobalDoctorCard from "@/modules/medglobaldb/components/GlobalDoctorCard";

export const metadata = {
  title: "MedGlobalDB — Global Specialist Database · MedByClick",
  description: "Searchable database of verified international specialists.",
};

export default function MedGlobalDBPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedGlobalDB Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Specialist Database</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            {globalDoctors.length.toLocaleString()}+ verified specialists across {new Set(globalDoctors.map((d) => d.country)).size} countries. Searchable by specialty, language, and institution.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <input
            type="search"
            placeholder="Search by name, specialty, or country…"
            className="w-full border border-slate-200 rounded-xl px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {globalDoctors.map((doctor) => (
            <GlobalDoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-3">Can&apos;t find who you need?</h2>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
            Our database is curated — not crowdsourced. If you need a specialist not listed, tell us and we&apos;ll source one through our global network.
          </p>
          <a
            href="/book"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors"
          >
            Request a Specialist
          </a>
        </div>
      </div>
    </div>
  );
}
