import type { TravelDestination } from "../types";

export default function DestinationCard({ destination }: { destination: TravelDestination }) {
  return (
    <div className="border border-stone-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">{destination.country}</p>
          <h3 className="font-bold text-stone-900 text-lg leading-tight">{destination.tagline}</h3>
        </div>
        <p className="text-xs text-stone-400 mt-0.5 flex-shrink-0 text-right whitespace-nowrap">{destination.travelTime}</p>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-4">{destination.description}</p>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        {destination.hospitals.map((h) => (
          <div key={h.city} className="bg-stone-50 border border-stone-100 rounded-xl p-3">
            <p className="text-sm font-semibold text-stone-900">{h.city}</p>
            <p className="text-xs text-stone-500 mb-1.5">{h.hospital}</p>
            <div className="flex flex-wrap gap-1">
              {h.specialties.map((s) => (
                <span key={s} className="text-[11px] px-2 py-0.5 bg-white border border-stone-200 text-stone-600 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-500 mb-4">
        Languages: <span className="font-medium text-stone-700">{destination.languages.join(" / ")}</span>
      </p>

      <ul className="space-y-1">
        {destination.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 text-xs text-stone-500">
            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">✓</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-end">
        <a href="/book" className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
          Enquire →
        </a>
      </div>
    </div>
  );
}
