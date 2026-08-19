import { syntheticSecondOpinionReport } from "@/lib/db/seed/case-content.seed";

const CONCURRENCE_LABEL: Record<string, string> = {
  concurs: "Concurs with prior diagnosis",
  diverges: "Diverges from prior diagnosis",
  partial: "Partially concurs",
};

/**
 * Signed second-opinion report UI shell — SYNTHETIC DATA ONLY (spec Step
 * 10/11, docs/decision-log/0009 Phase E). Same gate as
 * MedicalHistoryShell/CaseChecklistShell. The signing *mechanism*
 * (lib/signing/signRecord.ts) is real and ready to use; what's gated is
 * storing real clinical opinion content, not the hash-signing math itself.
 *
 * Shared component: rendered on the logged-in patient dashboard and
 * publicly on /medconnect — see CaseChecklistShell.tsx's identical note.
 */
export default function SecondOpinionReportShell() {
  const report = syntheticSecondOpinionReport;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-lg font-bold text-stone-900">Second-opinion report</h2>
        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
          Synthetic example — pending Legal &amp; Compliance review
        </span>
      </div>
      <div className="border border-stone-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-stone-900">{report.doctorName}</p>
          <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
            ✓ Signed {new Date(report.signedAt).toLocaleDateString()}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">Diagnosis</p>
          <p className="text-sm text-stone-700 mb-1">{CONCURRENCE_LABEL[report.diagnosisConcurrence]}</p>
          <p className="text-sm text-stone-600 leading-relaxed">{report.diagnosisNotes}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">Alternative treatments</p>
          <p className="text-sm text-stone-600 leading-relaxed">{report.alternativeTreatments}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">Risk assessment</p>
          <p className="text-sm text-stone-600 leading-relaxed">{report.riskAssessment}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">Recommended next steps</p>
          <p className="text-sm text-stone-600 leading-relaxed">{report.recommendedNextSteps}</p>
        </div>
      </div>
      <p className="text-xs text-stone-400 mt-3 leading-relaxed">
        This is an illustrative example, not a real signed report — no real diagnostic content is
        stored until Legal &amp; Compliance clears real clinical-content storage.
      </p>
    </div>
  );
}
