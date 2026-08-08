import type { PipelineStage, ReferralCase } from "../types";

const STAGE_LABEL: Record<PipelineStage, string> = {
  inquiry: "Inquiry",
  qualification: "Qualification",
  quote_sent: "Quote Sent",
  quote_accepted: "Quote Accepted",
  treatment_in_progress: "In Progress",
  treatment_complete: "Complete",
};

const STAGES: PipelineStage[] = [
  "inquiry",
  "qualification",
  "quote_sent",
  "quote_accepted",
  "treatment_in_progress",
  "treatment_complete",
];

const TIER_CLASS: Record<ReferralCase["agentTier"], string> = {
  gold: "bg-amber-100 text-amber-700",
  silver: "bg-stone-200 text-stone-700",
  bronze: "bg-orange-100 text-orange-800",
};

function CaseCard({ item }: { item: ReferralCase }) {
  return (
    <div className="border border-stone-100 rounded-xl p-4 bg-white hover:border-stone-300 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full ${TIER_CLASS[item.agentTier]}`}>
          {item.agentTier}
        </span>
        <span className="text-xs text-stone-400">{item.lastUpdated}</span>
      </div>
      <p className="text-sm font-semibold text-stone-900">{item.patientRef}</p>
      <p className="text-xs text-stone-500 mb-1">{item.condition}</p>
      <p className="text-xs text-stone-400 mb-2">{item.destinationInstitution}</p>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-stone-700">
          {item.currency} {item.estimatedValue.toLocaleString()}
        </span>
        <span className="text-stone-400">{Math.round(item.commissionRate * 100)}% commission</span>
      </div>
    </div>
  );
}

export default function PipelineBoard({ cases }: { cases: ReferralCase[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {STAGES.map((stage) => {
        const stageCases = cases.filter((c) => c.stage === stage);
        return (
          <div key={stage} className="bg-stone-50 border border-stone-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-3">
              {STAGE_LABEL[stage]} <span className="text-stone-400 font-normal">({stageCases.length})</span>
            </p>
            <div className="space-y-3">
              {stageCases.map((item) => (
                <CaseCard key={item.id} item={item} />
              ))}
              {stageCases.length === 0 && (
                <p className="text-xs text-stone-300 italic">No cases</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
