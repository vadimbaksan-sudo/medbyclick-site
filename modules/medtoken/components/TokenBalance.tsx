import { tiers } from "../data";

export default function TokenBalance({ balance = 750 }: { balance?: number }) {
  const currentTier = [...tiers].reverse().find((t) => balance >= t.minTokens) ?? tiers[0];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progress = nextTier
    ? ((balance - currentTier.minTokens) / (nextTier.minTokens - currentTier.minTokens)) * 100
    : 100;

  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-slate-400 mb-1">Your Balance</p>
          <p className="text-3xl font-black text-slate-900">{balance.toLocaleString()}</p>
          <p className="text-xs text-amber-600 font-medium mt-0.5">MED tokens</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 mb-1">Current Tier</p>
          <p className="font-bold text-slate-900">{currentTier.name}</p>
        </div>
      </div>

      {nextTier && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>{currentTier.name}</span>
            <span>{nextTier.name} at {nextTier.minTokens.toLocaleString()} tokens</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            {(nextTier.minTokens - balance).toLocaleString()} tokens to {nextTier.name}
          </p>
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-slate-500 mb-2">Your perks</p>
        <ul className="space-y-1.5">
          {currentTier.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="text-amber-500">✓</span>
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
