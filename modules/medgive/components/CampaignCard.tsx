import type { GivingCampaign } from "../types";

const URGENCY_LABEL: Record<GivingCampaign["urgency"], string> = {
  routine: "Routine",
  "time-sensitive": "Time-sensitive",
  urgent: "Urgent",
};

const URGENCY_CLASS: Record<GivingCampaign["urgency"], string> = {
  routine: "bg-stone-100 text-stone-600",
  "time-sensitive": "bg-amber-100 text-amber-700",
  urgent: "bg-red-100 text-red-700",
};

export default function CampaignCard({ campaign }: { campaign: GivingCampaign }) {
  const percent = Math.min(100, Math.round((campaign.amountRaised / campaign.fundingGoal) * 100));

  return (
    <div className="border border-stone-100 rounded-2xl p-6 hover:border-stone-300 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${URGENCY_CLASS[campaign.urgency]}`}>
          {URGENCY_LABEL[campaign.urgency]}
        </span>
        {campaign.verified && (
          <span className="flex items-center gap-1 text-xs font-medium text-amber-700">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified case
          </span>
        )}
      </div>

      <p className="font-semibold text-stone-900">{campaign.patientDisplayName}</p>
      <p className="text-sm text-stone-500 mt-0.5 mb-1">{campaign.condition}</p>
      <p className="text-xs text-stone-400 mb-4">{campaign.clinicName}</p>

      <p className="text-sm text-stone-500 leading-relaxed mb-4 italic border-l-2 border-amber-300 pl-3">
        {campaign.story}
      </p>

      <div className="mb-2">
        <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-stone-900">
          {campaign.currency} {campaign.amountRaised.toLocaleString()}
        </span>
        <span className="text-stone-400">
          of {campaign.currency} {campaign.fundingGoal.toLocaleString()} goal
        </span>
      </div>
      <p className="text-xs text-stone-400 mt-1">{campaign.daysRemaining} days remaining</p>
    </div>
  );
}
