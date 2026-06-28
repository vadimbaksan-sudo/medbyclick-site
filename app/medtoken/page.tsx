import TokenBalance from "@/modules/medtoken/components/TokenBalance";
import { rewards, earnActions, tiers, tokenInfo } from "@/modules/medtoken/data";

export const metadata = {
  title: "MBC Token — MedByClick",
  description: "MBC is the MedByClick ERC-20 utility token on Ethereum. Earn rewards, pay for services with a 20% discount, and participate in governance.",
};

export default function MedTokenPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedToken Module
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                MBC Token
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed mb-8">
                The MedByClick utility token powers every interaction on the platform — from discounted payments to governance votes and staking rewards.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Symbol", value: tokenInfo.symbol },
                  { label: "Network", value: tokenInfo.network },
                  { label: "Standard", value: tokenInfo.standard },
                  { label: "Price", value: `$${tokenInfo.priceUsd.toFixed(2)}` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                    <p className="font-bold text-amber-400 text-lg">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs text-slate-400 mb-2">Total Supply</p>
              <p className="text-5xl font-black text-amber-400 mb-1">
                {(tokenInfo.totalSupply / 1_000_000).toFixed(0)}M
              </p>
              <p className="text-slate-400 text-sm">MBC tokens</p>
              <div className="mt-6 pt-6 border-t border-white/10 text-left space-y-3">
                {tokenInfo.tokenomics.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-amber-400 font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${item.percentage}%`, opacity: 0.4 + item.percentage / 100 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Token Use Cases</h2>
        <p className="text-slate-500 text-sm mb-8">Six ways MBC creates value across the MedByClick ecosystem.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tokenInfo.useCases.map((uc) => (
            <div key={uc.id} className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-sm transition-all">
              <span className="text-3xl mb-4 block">{uc.icon}</span>
              <h3 className="font-semibold text-slate-900 mb-2">{uc.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tokenomics */}
      <div className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tokenomics</h2>
          <p className="text-slate-500 text-sm mb-8">Distribution of the 100M MBC total supply.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokenInfo.tokenomics.map((item) => (
              <div key={item.label} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-semibold text-slate-900 text-sm">{item.label}</span>
                  <span className="text-2xl font-black text-amber-500">{item.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${item.percentage * 2}%` }} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                <p className="text-xs font-semibold text-slate-700 mt-2">
                  {(tokenInfo.totalSupply * item.percentage / 100).toLocaleString()} MBC
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Roadmap</h2>
        <p className="text-slate-500 text-sm mb-10">Four phases from contract deployment to global decentralized healthcare infrastructure.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tokenInfo.roadmap.map((phase) => (
            <div
              key={phase.phase}
              className={`rounded-2xl p-6 border-2 ${
                phase.completed
                  ? "border-amber-400 bg-amber-400/5"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    phase.completed
                      ? "bg-amber-400 text-slate-900"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  Phase {phase.phase}
                </span>
                {phase.completed && <span className="text-amber-500 text-xs">✓ Done</span>}
              </div>
              <h3 className="font-bold text-slate-900 mb-0.5">{phase.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{phase.period}</p>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className={`flex-shrink-0 mt-0.5 ${phase.completed ? "text-amber-500" : "text-slate-300"}`}>
                      {phase.completed ? "✓" : "○"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Loyalty & Rewards */}
      <div className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <div key={tier.id} className="border border-slate-200 rounded-xl p-4 text-center bg-white">
                    <p className="font-bold text-slate-900 text-sm mb-1">{tier.name}</p>
                    <p className="text-xs text-slate-400 mb-2">{tier.minTokens.toLocaleString()}+ tokens</p>
                    <ul className="space-y-1 text-left">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="text-[10px] text-slate-500 flex items-start gap-1">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
