import { referralCases } from "@/modules/medagent/data";
import PipelineBoard from "@/modules/medagent/components/PipelineBoard";

export const metadata = {
  title: "MedAgent — Referral Network · MedByClick",
  description: "B2B referral network for medical coordinators and agents.",
};

export default function MedAgentPage() {
  const totalCommission = referralCases.reduce(
    (sum, c) => sum + c.estimatedValue * c.commissionRate,
    0
  );

  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MedAgent Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Referral Network Pipeline</h1>
          <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
            A structured channel for medical coordinators and referral agents — every
            case tracked from inquiry to completed treatment, with transparent commission
            terms.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-stone-600 leading-relaxed">
            <strong className="text-stone-900">Preview module — not yet live.</strong> The
            pipeline below is illustrative placeholder data, not a real agent network or
            real commission liability. Agent onboarding requires identity/business
            verification and anti-fraud vetting that hasn't been built yet — no real
            referral fees are processed on this page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
          <div>
            <span className="text-stone-400">Active cases: </span>
            <span className="font-semibold text-stone-900">{referralCases.length}</span>
          </div>
          <div>
            <span className="text-stone-400">Illustrative commission pool: </span>
            <span className="font-semibold text-stone-900">
              USD {totalCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        <PipelineBoard cases={referralCases} />
      </div>
    </div>
  );
}
