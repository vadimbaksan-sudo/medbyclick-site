import type { ClinicalTrial } from "../types";

const statusStyle: Record<ClinicalTrial["status"], string> = {
  recruiting: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  completed: "bg-slate-100 text-slate-600",
  pending: "bg-amber-100 text-amber-700",
};

export default function TrialCard({ trial }: { trial: ClinicalTrial }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded-full">Phase {trial.phase}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle[trial.status]}`}>
          {trial.status}
        </span>
      </div>

      <h3 className="font-bold text-slate-900 leading-snug mb-2">{trial.title}</h3>

      <div className="text-xs text-slate-500 mb-3 space-y-1">
        <p><span className="text-slate-400">Condition:</span> {trial.condition}</p>
        <p><span className="text-slate-400">Intervention:</span> {trial.intervention}</p>
        <p><span className="text-slate-400">Sponsor:</span> {trial.sponsor}</p>
        <p><span className="text-slate-400">Location:</span> {trial.location}</p>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">{trial.description}</p>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400 font-medium mb-2">Eligibility criteria</p>
        <ul className="space-y-1">
          {trial.eligibility.map((e) => (
            <li key={e} className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              {e}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-400">Est. completion: {trial.estimatedCompletion}</p>
        {trial.status === "recruiting" && (
          <a href="/book" className="text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors">
            Check Eligibility →
          </a>
        )}
      </div>
    </div>
  );
}
