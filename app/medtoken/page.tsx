import TokenBalance from "@/modules/medtoken/components/TokenBalance";
import { rewards, earnActions, tiers, tokenInfo, tokenDistribution, tokenRoadmap, tokenUseCases } from "@/modules/medtoken/data";

export const metadata = {
  title: "MBC Token — ERC-20 Utility Token · MedByClick",
  description: "MedByClick utility token (MBC) on Ethereum. Pay with discount, earn rewards, stake, and govern the platform.",
};

export default function MedTokenPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedToken / MedEconomy
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                MBC Token <span className="text-amber-400">— ERC-20</span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                The MedByClick utility token powers the entire platform economy.
                Pay for services with a 20% discount, earn through engagement, stake for rewards, and govern platform decisions.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/medpayments" className="inline-flex items-center px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors">
                  Pay with MBC
                </a>
                <a href="#tokenomics" className="inline-flex items-center px-5 py-2.5 border border-slate-600 hover:border-slate-400 text-white rounded-lg text-sm transition-colors">
                  View Tokenomics
                </a>
              </div>
            </div>
            <div className="border border-slate-700 rounded-2xl p-6 bg-slate-800/50">
              <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Token Details</h3>
              <div className="space-y-3">
                {[
                  ["Token Name", tokenInfo.name],
                  ["Symbol", tokenInfo.symbol],
                  ["Standard", tokenInfo.standard],
                  ["Network", tokenInfo.network],
                  ["Total Supply", tokenInfo.totalSupply],
                  ["Decimals", String(tokenInfo.decimals)],
                  ["Current Price", `$${tokenInfo.priceUsd}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-700/50 last:border-0">
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className="text-sm font-semibold text-white">{value}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="text-xs text-slate-400 mb-1">Contract Address</p>
                  <div className="bg-slate-900 rounded-lg p-2.5">
                    <code className="text-xs text-amber-400 break-all font-mono">{tokenInfo.contractAddress}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">Utility</p>
            <h2 className="text-3xl font-bold text-slate-900">What can you do with MBC?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tokenUseCases.map((uc) => (
              <div key={uc.title} className="border border-slate-200 rounded-xl p-6 hover:border-amber-300 transition-colors">
                <span className="text-2xl">{uc.icon}</span>
                <h3 className="font-semibold text-slate-900 mt-3 mb-2 text-sm">{uc.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tokenomics */}
      <div id="tokenomics" className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">Tokenomics</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Token Distribution</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Total supply: <span className="font-bold text-slate-900">{tokenInfo.totalSupply}</span>. 
              Designed for sustainable growth and long-term platform value.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokenDistribution.map((item) => (
              <div key={item.category} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 text-sm">{item.category}</h3>
                  <span className="text-lg font-black text-amber-600">{item.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">Roadmap</p>
            <h2 className="text-3xl font-bold text-slate-900">MBC Token Development</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tokenRoadmap.map((phase) => (
              <div
                key={phase.phase}
                className={`rounded-xl p-6 border-2 ${
                  phase.status === "active"
                    ? "border-amber-400 bg-amber-50"
                    : phase.status === "completed"
                    ? "border-green-300 bg-green-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    phase.status === "active"
                      ? "bg-amber-200 text-amber-800"
                      : phase.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-slate-200 text-slate-600"
                  }`}>
                    {phase.phase}
                  </span>
                  {phase.status === "active" && (
                    <span className="text-xs text-amber-600 font-medium">Current</span>
                  )}
                  {phase.status === "completed" && (
                    <span className="text-xs text-green-600 font-medium">Done</span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className={`mt-0.5 flex-shrink-0 ${
                        phase.status === "completed" ? "text-green-500" : "text-amber-500"
                      }`}>
                        {phase.status === "completed" ? "✓" : "○"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loyalty + Rewards */}
      <div className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Your Balance</h2>
              <TokenBalance balance={750} />

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">How to earn MBC</h3>
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
                      <span className="text-sm font-bold text-amber-600">{reward.cost} MBC</span>
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
                  <div key={tier.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                    <p className="font-bold text-slate-900 text-sm mb-1">{tier.name}</p>
                    <p className="text-xs text-slate-400 mb-3">{tier.minTokens.toLocaleString()}+ MBC</p>
                    <ul className="space-y-1">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="text-xs text-slate-500 flex items-start gap-1">
                          <span className="text-amber-500 flex-shrink-0">✓</span>
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

      {/* CTA */}
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Start using MBC today</h2>
          <p className="text-slate-300 mb-8">Pay for any MedByClick service with MBC tokens and get 20% off instantly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/medpayments" className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors">
              Pay with MBC Token
            </a>
            <a href="/book" className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 hover:border-slate-400 text-white rounded-lg text-sm transition-colors">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
