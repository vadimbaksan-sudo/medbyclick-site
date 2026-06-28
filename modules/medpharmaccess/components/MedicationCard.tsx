import type { Medication } from "../types";

const availabilityStyle: Record<Medication["availability"], { label: string; style: string }> = {
  available: { label: "Available", style: "bg-green-100 text-green-700" },
  limited: { label: "Limited Access", style: "bg-amber-100 text-amber-700" },
  "import-only": { label: "Import Only", style: "bg-orange-100 text-orange-700" },
  compassionate: { label: "Compassionate Use", style: "bg-red-100 text-red-700" },
};

export default function MedicationCard({ medication }: { medication: Medication }) {
  const avail = availabilityStyle[medication.availability];
  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="font-bold text-slate-900">{medication.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{medication.genericName}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${avail.style}`}>
          {avail.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{medication.category}</span>
      </div>

      <p className="text-xs text-slate-500 mb-1"><span className="text-slate-400">Indication:</span> {medication.indication}</p>
      <p className="text-sm text-slate-600 leading-relaxed my-3">{medication.description}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {medication.countries.map((c) => (
          <span key={c} className="text-xs bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">{c}</span>
        ))}
      </div>

      <a
        href="/book"
        className="block w-full text-center py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors"
      >
        Request Access Support
      </a>
    </div>
  );
}
