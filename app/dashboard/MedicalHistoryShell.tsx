import { syntheticMedicalHistory } from "@/lib/db/seed/medical-history.seed";

const ENTRY_TYPE_LABEL: Record<string, string> = {
  visit_note: "Visit note",
  lab_result: "Lab result",
  prescription: "Prescription",
  diagnosis: "Diagnosis",
};

/**
 * Medical history / lab results UI shell — SYNTHETIC DATA ONLY (spec §5).
 * Legal & Compliance must clear retention policy, data residency, and
 * jurisdiction handling (§5.2) before any real patient-entered or
 * doctor-entered medical data is stored or displayed here. This component
 * renders lib/db/seed/medical-history.seed.ts's synthetic constants only —
 * it does not query the database and has no form/input path for real data.
 */
export default function MedicalHistoryShell() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-lg font-bold text-slate-900">Medical history &amp; lab results</h2>
        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
          Synthetic example data — pending Legal &amp; Compliance review
        </span>
      </div>
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <div className="divide-y divide-slate-100">
          {syntheticMedicalHistory.map((entry) => (
            <div key={entry.id} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3 mb-1">
                <p className="text-sm font-medium text-slate-900">{entry.title}</p>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {ENTRY_TYPE_LABEL[entry.entryType]}
                </span>
              </div>
              <p className="text-xs text-slate-500">{entry.summary}</p>
              <p className="text-xs text-slate-400 mt-1">{entry.recordedAt}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
        This section shows illustrative example data only — it is not connected to any real
        patient record. Real medical history storage is pending a Legal &amp; Compliance
        consult on retention policy and data residency.
      </p>
    </div>
  );
}
