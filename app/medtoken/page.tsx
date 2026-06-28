import TokenBalance from "@/modules/medtoken/components/TokenBalance";
import { rewards, earnActions, tiers } from "@/modules/medtoken/data";

export const metadata = {
  title: "MedToken — Loyalty Program · MedByClick",
  description: "Earn tokens and unlock rewards for using the MedByClick platform.",
};

export default function MedTokenPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedToken Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Loyalty Program</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Earn MED tokens every time you use the platform. Redeem them for free consultations, priority routing, and exclusive services.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Your Balance</h2>
            <TokenBalance balance={750} />

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">How to earn tokens</h3>
              <div className="space-y-2">
                {earnActions.map((a) => (
                  <div key={a.action} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-600">{a.action}</span>
                    <span className="text-sm font-semibold text-amber-600">+{a.tokens}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Redeem Rewards</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {rewards.map((reward) => (
                <div key={reward.id} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-300 transition-colors">
                  <p className="text-xs text-amber-600 font-medium mb-1">{reward.category}</p>
                  <h3 className="font-semibold text-slate-900 mb-1">{reward.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-600">{reward.cost} tokens</span>
                    <button className="text-xs font-medium bg-slate-900 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                      Redeem
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-4">Membership Tiers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tiers.map((tier) => (
                <div key={tier.id} className="border border-slate-200 rounded-xl p-4 text-center">
                  <p className="font-bold text-slate-900 text-sm mb-1">{tier.name}</p>
                  <p className="text-xs text-slate-400">{tier.minTokens.toLocaleString()}+ tokens</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
