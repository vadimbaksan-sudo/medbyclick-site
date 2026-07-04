import type { MissionDestination } from "../types";

// Renders a doctor-travels-to-CIS partnership. Per
// docs/reports/product/2026-07-04-medtravel-bidirectional-flow-spec.md's
// addendum: Moscow and Moldova are real, confirmed partnerships, but the
// specific partner hospital name is not yet supplied — this card must make
// that unmistakably obvious in the UI, not present a placeholder string as
// if it were a real institution name.
export default function MissionDestinationCard({ destination }: { destination: MissionDestination }) {
  return (
    <div className="border border-dashed border-amber-300 rounded-2xl p-6 bg-amber-50/40">
      <div className="flex items-start justify-between mb-3 gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">{destination.country}</p>
        {destination.isPlaceholder && (
          <span className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 flex-shrink-0">
            Name pending
          </span>
        )}
      </div>
      <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2">{destination.partnerHospital}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{destination.description}</p>
    </div>
  );
}
