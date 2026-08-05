import type { RemoteTrial } from "@/lib/clinicaltrials/api";

const STATUS_LABEL: Record<string, string> = {
  RECRUITING: "Recruiting",
  ACTIVE_NOT_RECRUITING: "Active, not recruiting",
  NOT_YET_RECRUITING: "Not yet recruiting",
  COMPLETED: "Completed",
};

export default function RemoteTrialCard({ trial }: { trial: RemoteTrial }) {
  return (
    <div className="border border-stone-100 rounded-2xl p-6 hover:border-stone-300 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
          {STATUS_LABEL[trial.status] ?? trial.status}
        </span>
        {trial.phases.length > 0 && trial.phases[0] !== "NA" && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
            Phase {trial.phases.join("/")}
          </span>
        )}
        <span className="text-xs text-stone-400 ml-auto">{trial.nctId}</span>
      </div>

      <p className="font-semibold text-stone-900 leading-snug">{trial.title}</p>
      {trial.conditions.length > 0 && (
        <p className="text-sm text-stone-500 mt-0.5 mb-1">{trial.conditions.join(", ")}</p>
      )}
      <p className="text-xs text-stone-400 mb-3">{trial.sponsor}</p>

      {trial.summary && (
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-3 mb-3">{trial.summary}</p>
      )}

      {trial.locations.length > 0 && (
        <p className="text-xs text-stone-400 mb-3">
          <span className="font-medium text-stone-500">Locations:</span> {trial.locations.join(" · ")}
        </p>
      )}

      <a
        href={trial.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800"
      >
        View full listing on ClinicalTrials.gov →
      </a>
    </div>
  );
}
