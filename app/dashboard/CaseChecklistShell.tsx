import { syntheticCaseDocuments } from "@/lib/db/seed/case-content.seed";

const DOC_TYPE_LABEL: Record<string, string> = {
  dicom_imaging: "Imaging (DICOM)",
  lab_report: "Lab report",
  pathology_report: "Pathology report",
  discharge_summary: "Discharge summary",
  prescription: "Prescription",
  other: "Other",
};

/**
 * Document completeness checklist UI shell — SYNTHETIC DATA ONLY (spec §2
 * "Приём и структурирование случаев" / Step 3 completeness gate,
 * docs/decision-log/0009 Phase C). Same gate as MedicalHistoryShell: Legal
 * & Compliance must clear real (non-synthetic) document storage before any
 * real upload flow exists. This renders
 * lib/db/seed/case-content.seed.ts's constants only — no upload input, no
 * DB write path.
 */
export default function CaseChecklistShell() {
  const missing = syntheticCaseDocuments.filter((d) => d.status === "missing");

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-lg font-bold text-stone-900">Case documents</h2>
        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
          Synthetic example data — pending Legal &amp; Compliance review
        </span>
      </div>
      <div className="border border-stone-200 rounded-2xl overflow-hidden">
        <div className="divide-y divide-stone-100">
          {syntheticCaseDocuments.map((doc) => (
            <div key={doc.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-stone-900">{doc.title}</p>
                <p className="text-xs text-stone-400">{DOC_TYPE_LABEL[doc.documentType]}</p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  doc.status === "uploaded" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {doc.status === "uploaded" ? "Uploaded" : "Missing"}
              </span>
            </div>
          ))}
        </div>
      </div>
      {missing.length > 0 && (
        <p className="text-xs text-stone-500 mt-3 leading-relaxed">
          Example: a case can't move to specialist matching until every required document is
          present (spec Step 3) — real completeness checking isn't wired to live uploads yet.
        </p>
      )}
    </div>
  );
}
