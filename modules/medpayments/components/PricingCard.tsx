import type { PricingPlan } from "../types";

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col ${
        plan.highlighted
          ? "bg-slate-900 text-white border-2 border-amber-400"
          : "bg-white border border-slate-200"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={`font-bold text-lg mb-1 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
          {plan.name}
        </h3>
        <p className={`text-sm leading-relaxed ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span className={`text-4xl font-black ${plan.highlighted ? "text-amber-400" : "text-slate-900"}`}>
          ${plan.price}
        </span>
        <span className={`text-sm ml-1 ${plan.highlighted ? "text-slate-400" : "text-slate-400"}`}>
          {plan.period === "one-time" ? "one-time" : `/ ${plan.period}`}
        </span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className={`flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-amber-400" : "text-amber-600"}`}>✓</span>
            <span className={plan.highlighted ? "text-slate-200" : "text-slate-600"}>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="/book"
        className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
          plan.highlighted
            ? "bg-amber-400 hover:bg-amber-300 text-slate-900"
            : "bg-slate-900 hover:bg-slate-700 text-white"
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}
