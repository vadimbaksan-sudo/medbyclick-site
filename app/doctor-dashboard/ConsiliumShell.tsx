import { syntheticConsiliumOpinions } from "@/lib/db/seed/case-content.seed";

/**
 * Multidisciplinary consilium UI shell — SYNTHETIC DATA ONLY (spec §2
 * "Мультидисциплинарные консилиумы", docs/decision-log/0009 Phase G). Same
 * gate as the other case-content shells: real per-doctor clinical opinions
 * about a real case require Legal & Compliance sign-off before storage.
 * The spec's requirement that dissenting opinions are recorded, not just
 * the majority view, is reflected here even in the illustrative data.
 */
export default function ConsiliumShell() {
  const opinions = syntheticConsiliumOpinions;
  const dissenting = opinions.filter((o) => !o.concurs);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-lg font-semibold text-stone-900">Consilium (example case)</h2>
        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
          Synthetic example — pending Legal &amp; Compliance review
        </span>
      </div>
      <div className="border border-stone-200 rounded-2xl overflow-hidden">
        <div className="divide-y divide-stone-100">
          {opinions.map((op) => (
            <div key={op.doctorName} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3 mb-1">
                <p className="text-sm font-medium text-stone-900">
                  {op.doctorName}
                  {op.role === "lead" && (
                    <span className="ml-2 text-[10px] font-semibold uppercase text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                      Lead
                    </span>
                  )}
                </p>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    op.concurs ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {op.concurs ? "Concurs" : "Dissents"}
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">{op.opinionText}</p>
            </div>
          ))}
        </div>
      </div>
      {dissenting.length > 0 && (
        <p className="text-xs text-stone-500 mt-3 leading-relaxed">
          {dissenting.length} dissenting opinion{dissenting.length > 1 ? "s" : ""} recorded — the spec
          requires the consensus document to preserve these, not just the majority recommendation.
        </p>
      )}
    </div>
  );
}
