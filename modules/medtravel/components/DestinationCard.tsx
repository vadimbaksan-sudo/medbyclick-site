import type { TravelDestination } from "../types";

const priceColors: Record<string, string> = {
  "$": "text-green-600",
  "$$": "text-amber-600",
  "$$$": "text-red-500",
};

export default function DestinationCard({ destination }: { destination: TravelDestination }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">{destination.country}</p>
          <h3 className="font-bold text-slate-900 text-lg leading-tight">{destination.hospital}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{destination.city}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <span className={`text-lg font-bold ${priceColors[destination.priceRange] ?? "text-slate-600"}`}>
            {destination.priceRange}
          </span>
          <p className="text-xs text-slate-400 mt-0.5">{destination.travelTime}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mb-4">{destination.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {destination.specialties.map((s) => (
          <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{s}</span>
        ))}
      </div>

      <ul className="space-y-1">
        {destination.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">✓</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-sm font-semibold text-slate-900">{destination.rating}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
        <a href="/book" className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
          Enquire →
        </a>
      </div>
    </div>
  );
}
