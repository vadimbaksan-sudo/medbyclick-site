import Link from "next/link";
import {
  rewards,
  earnActions,
  tiers,
  tokenInfo,
  vestingSchedule,
  founderCompensation,
  burnMechanics,
} from "@/modules/medtoken/data";
import TokenBalance from "@/modules/medtoken/components/TokenBalance";

export const metadata = {
  title: "MBC Token — MedByClick",
  description:
    "MBC is the MedByClick BEP-20 utility token on BNB Chain. Pay for services with a 15% discount, support doctor verification, and participate in the ecosystem.",
};

const TGE_CIRCULATING = 10_700_000;
const TOTAL_SUPPLY = 100_000_000;

export default function MedTokenPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedToken Module
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">MBC Token</h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed mb-8">
                The MedByClick utility token. Pay for healthcare services at a
                15% discount, support doctor verification, and earn rewards for
                growing the ecosystem.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Symbol", value: tokenInfo.symbol },
                  { label: "Network", value: tokenInfo.network },
                  { label: "Standard", value: tokenInfo.standard },
                  { label: "TGE Price", value: `$${tokenInfo.priceUsd.toFixed(2)}` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                  >
                    <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                    <p className="font-bold text-amber-400 text-lg">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                <p className="text-xs text-amber-300 font-medium mb-1">Legal Notice</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  MBC is a utility token providing access to MedByClick platform services.
                  It is not a security, investment, or financial product.
                  Acquiring MBC carries risk of total loss. Not available to US or UK residents.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Total Supply</p>
                  <p className="text-3xl font-black text-amber-400">100M</p>
                  <p className="text-slate-500 text-xs">hard cap · no mint</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">TGE Circulating</p>
                  <p className="text-3xl font-black text-white">
                    {(TGE_CIRCULATING / 1_000_000).toFixed(1)}M
                  </p>
                  <p className="text-slate-500 text-xs">
                    {((TGE_CIRCULATING / TOTAL_SUPPLY) * 100).toFixed(1)}% of supply
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">FDV at TGE</p>
                  <p className="text-2xl font-black text-white">$5M</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Initial Market Cap</p>
                  <p className="text-2xl font-black text-white">$535K</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 space-y-2">
                {tokenInfo.tokenomics.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-amber-400 font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${item.percentage * 2.5}%`, opacity: 0.5 + item.percentage / 60 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6 Core Use Cases ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Token Utility</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Six reasons to hold MBC</h2>
          <p className="text-slate-500 text-sm max-w-2xl">
            Every use case below provides immediate, calculable economic value — even if the token price never changes.
            This is the design principle: utility first, speculation optional.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tokenInfo.useCases.map((uc) => (
            <div
              key={uc.id}
              className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-sm transition-all"
            >
              <span className="text-3xl mb-4 block">{uc.icon}</span>
              <h3 className="font-semibold text-slate-900 mb-2">{uc.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Burn Mechanics ───────────────────────────────────────── */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Deflationary Design</p>
            <h2 className="text-2xl font-bold mb-2">How MBC is burned</h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Every service transaction is a burn event. As platform volume grows, the burn rate grows proportionally —
              not through tokenomics engineering, but through real healthcare activity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {burnMechanics.map((m) => (
              <div key={m.source} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-black text-amber-400">{m.burnPercent}%</span>
                  <span className="text-sm text-slate-300 font-medium">burned</span>
                </div>
                <p className="font-semibold text-white text-sm mb-1">{m.source}</p>
                <p className="text-xs text-slate-400">{m.notes}</p>
              </div>
            ))}
          </div>

          {/* Payment flow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">Payment Split on Every MBC Transaction</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { pct: "40%", label: "Burned permanently", color: "bg-red-500/80", sub: "→ 0x000...dead" },
                { pct: "40%", label: "To Treasury", color: "bg-amber-500/80", sub: "→ 3-of-5 multisig" },
                { pct: "20%", label: "Doctor & Clinic Rewards", color: "bg-teal-500/80", sub: "→ Rewards pool" },
              ].map((item) => (
                <div key={item.label} className="flex-1 rounded-xl overflow-hidden">
                  <div className={`${item.color} px-4 py-3 text-center`}>
                    <p className="text-2xl font-black text-white">{item.pct}</p>
                  </div>
                  <div className="bg-white/5 px-4 py-3 text-center">
                    <p className="text-sm font-medium text-white mb-0.5">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tokenomics Distribution ──────────────────────────────── */}
      <div className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Tokenomics</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Distribution of 100,000,000 MBC</h2>
            <p className="text-slate-500 text-sm">
              Hard cap. No mint function. Every allocation percentage is enforced by on-chain vesting contracts.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokenInfo.tokenomics.map((item) => (
              <div key={item.label} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-semibold text-slate-900 text-sm">{item.label}</span>
                  <span className="text-2xl font-black text-amber-500">{item.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${Math.min(item.percentage * 3, 100)}%` }}
                  />
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

      {/* ── Vesting Schedule ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Vesting</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unlock Schedule</h2>
          <p className="text-slate-500 text-sm max-w-2xl">
            All vesting is enforced on-chain. No allocation can be accessed ahead of schedule by any party,
            including founders. TGE circulating supply: <strong>10,700,000 MBC (10.7%)</strong>.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Category</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">Amount</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">TGE Unlock</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">Cliff</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">Vesting</th>
              </tr>
            </thead>
            <tbody>
              {vestingSchedule.map((row, i) => (
                <tr
                  key={row.category}
                  className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                >
                  <td className="px-4 py-3 font-medium text-slate-800">{row.category}</td>
                  <td className="px-4 py-3 text-right text-slate-600">
                    {(row.amount / 1_000_000).toFixed(0)}M MBC
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-semibold ${row.tgePercent === 0 ? "text-slate-400" : "text-amber-600"}`}>
                      {row.tgePercent}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500">{row.cliff}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{row.vest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          {[
            { label: "TGE Market Cap", value: "~$535,000", note: "at $0.05/MBC" },
            { label: "Fully Diluted Valuation", value: "$5,000,000", note: "100M × $0.05" },
            { label: "Liquidity Locked", value: "24 months", note: "on-chain via PinkLock" },
          ].map((s) => (
            <div key={s.label} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-xs text-amber-700 font-medium mb-1">{s.label}</p>
              <p className="text-xl font-black text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Founder Compensation Transparency ────────────────────── */}
      <div className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Transparency</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Founder Compensation Structure</h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              MedByClick has two founders. Their compensation is split into two independent, public streams —
              to prevent any ambiguity about how founders benefit from the project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center">1</span>
                <h3 className="font-semibold text-slate-900">Token Allocation — Long-term Equity</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Founder 1</span>
                  <span className="font-semibold text-slate-800">7,500,000 MBC (7.5%)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Founder 2</span>
                  <span className="font-semibold text-slate-800">7,500,000 MBC (7.5%)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">TGE Unlock</span>
                  <span className="font-semibold text-slate-800">0% — nothing at launch</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Cliff</span>
                  <span className="font-semibold text-slate-800">12 months</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Vesting</span>
                  <span className="font-semibold text-slate-800">36 months linear</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Self-imposed sell cap: max 20% of monthly vested amount may be sold in any calendar month during the first 24 months after cliff.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center">2</span>
                <h3 className="font-semibold text-slate-900">Treasury Compensation — Operational Salary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 text-slate-400 font-medium">Period</th>
                      <th className="text-right py-2 text-slate-400 font-medium">Per Founder</th>
                      <th className="text-right py-2 text-slate-400 font-medium">Total/mo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {founderCompensation.map((row) => (
                      <tr key={row.phase} className="border-b border-slate-50 last:border-0">
                        <td className="py-2 text-slate-600">{row.phase}</td>
                        <td className="py-2 text-right font-semibold text-slate-800">{row.perFounder}</td>
                        <td className="py-2 text-right text-slate-500">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-1.5">
                {[
                  "Requires 2-of-5 multisig approval",
                  "Founders recused from approving own payments",
                  "Paid in USD — Treasury never sells MBC for salaries",
                  "Published in quarterly Treasury report",
                ].map((rule) => (
                  <div key={rule} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="text-teal-500 flex-shrink-0 mt-0.5">✓</span>
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
            <strong>Why two separate streams?</strong> Token allocation is long-term equity alignment with the ecosystem.
            Treasury compensation is payment for current operational work. Separating them makes founder incentives
            transparent and prevents the impression of double-dipping — which is important for investor trust and exchange compliance.
          </div>
        </div>
      </div>

      {/* ── Roadmap ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Roadmap</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">From MVP to global ecosystem</h2>
          <p className="text-slate-500 text-sm">Four phases. Honest timelines. No completed phases until they are actually complete.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tokenInfo.roadmap.map((phase) => (
            <div
              key={phase.phase}
              className={`rounded-2xl p-6 border-2 ${
                phase.completed ? "border-amber-400 bg-amber-400/5" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    phase.completed ? "bg-amber-400 text-slate-900" : "bg-slate-100 text-slate-500"
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

      {/* ── Loyalty & Rewards ────────────────────────────────────── */}
      <div className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Loyalty Program</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Earn and redeem MBC</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Your Balance</h3>
              <TokenBalance balance={750} />
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">How to earn MBC</h3>
                <div className="space-y-0">
                  {earnActions.map((a) => (
                    <div
                      key={a.action}
                      className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0"
                    >
                      <span className="text-sm text-slate-600">{a.action}</span>
                      <span className="text-sm font-semibold text-amber-600 flex-shrink-0 ml-2">+{a.tokens}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Redeem Rewards</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-300 transition-colors"
                  >
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

              <h3 className="text-sm font-semibold text-slate-700 mb-3">Membership Tiers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tiers.map((tier) => (
                  <div key={tier.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                    <p className="font-bold text-slate-900 text-sm mb-1">{tier.name}</p>
                    <p className="text-xs text-slate-400 mb-2">{tier.minTokens.toLocaleString()}+ MBC</p>
                    <ul className="space-y-1">
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

      {/* ── Legal / Disclaimer ───────────────────────────────────── */}
      <div className="border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Risk Disclosure</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              MBC is a utility token that provides access to MedByClick platform services.
              It is not a security, investment contract, or financial product. It does not entitle holders
              to dividends, profit shares, or equity. Acquiring MBC carries the risk of total loss.
              The value of MBC may fluctuate significantly. Not available to residents of the United States,
              United Kingdom, or sanctioned jurisdictions.
              Past performance is not indicative of future results. This page does not constitute financial advice.
              Always seek independent legal and financial advice before acquiring any crypto asset.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/docs/WHITEPAPER.md"
                className="text-xs font-medium text-amber-600 hover:text-amber-700 underline"
              >
                Read Whitepaper →
              </Link>
              <Link
                href="/docs/TOKENOMICS.md"
                className="text-xs font-medium text-amber-600 hover:text-amber-700 underline"
              >
                Tokenomics Paper →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
