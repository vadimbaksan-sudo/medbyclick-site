import type { GlobalDoctor } from "../types";

export default function GlobalDoctorCard({ doctor }: { doctor: GlobalDoctor }) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-300 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-amber-400 font-bold text-lg flex-shrink-0">
          {doctor.name.split(" ").slice(-1)[0][0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-slate-900 truncate">{doctor.name}</p>
            {doctor.verified && (
              <span className="text-xs font-medium bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full flex-shrink-0">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{doctor.title} · {doctor.specialty}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p className="text-xs">{doctor.institution}</p>
        <p className="text-xs text-slate-400">{doctor.city}, {doctor.country}</p>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
        <span>h-index: <strong className="text-slate-700">{doctor.hIndex}</strong></span>
        <span>{doctor.publications} publications</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {doctor.languages.map((l) => (
          <span key={l} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{l}</span>
        ))}
      </div>

      <a
        href="/book"
        className="mt-4 block w-full text-center text-xs font-medium text-amber-700 hover:text-amber-900 border border-amber-200 hover:border-amber-400 py-2 rounded-lg transition-colors"
      >
        Request Introduction
      </a>
    </div>
  );
}
