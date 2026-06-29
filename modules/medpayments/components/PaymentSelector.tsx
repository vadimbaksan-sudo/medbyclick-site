"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { paymentMethods } from "../data";
import type { PaymentMethod } from "../types";

interface SelectedPlan {
  id: string;
  name: string;
  price: number;
}

function MethodCard({
  method,
  selected,
  onSelect,
}: {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}) {
  const isMbc = method.id === "mbc";

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl p-5 border-2 transition-all ${
        selected
          ? isMbc
            ? "border-amber-400 bg-amber-400/5"
            : "border-slate-900 bg-slate-900/5"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
              selected
                ? isMbc
                  ? "bg-amber-400/20"
                  : "bg-slate-900/10"
                : "bg-slate-100"
            }`}
          >
            {method.icon}
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-900 text-sm">{method.name}</span>
              {method.network && (
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {method.network}
                </span>
              )}
              {isMbc && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  20% OFF
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{method.description}</p>
          </div>
        </div>
        <span
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            selected
              ? isMbc
                ? "border-amber-400 bg-amber-400"
                : "border-slate-900 bg-slate-900"
              : "border-slate-300"
          }`}
        >
          {selected && <span className="w-2 h-2 rounded-full bg-white" />}
        </span>
      </div>

      {selected && (
        <ul className="mt-4 space-y-1.5 pl-13">
          {method.details.map((d) => (
            <li key={d} className="flex items-center gap-2 text-xs text-slate-600">
              <span className={isMbc ? "text-amber-500" : "text-slate-400"}>✓</span>
              {d}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

export default function PaymentSelector({
  basePrice = 490,
  plan,
}: {
  basePrice?: number;
  plan?: SelectedPlan;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("stripe");

  const method = paymentMethods.find((m) => m.id === selected)!;
  const discount = method.discount ?? 0;
  const effectivePrice = plan?.price ?? basePrice;
  const finalPrice = discount > 0 ? effectivePrice * (1 - discount / 100) : effectivePrice;

  function handlePayNow() {
    const params = new URLSearchParams({
      planId: plan?.id ?? "custom",
      plan: plan?.name ?? "Custom",
      price: effectivePrice.toString(),
    });

    if (selected === "stripe") {
      router.push(`/checkout/stripe/?${params}`);
    } else if (selected === "usdt-erc20") {
      params.set("network", "ethereum");
      router.push(`/checkout/crypto/?${params}`);
    } else if (selected === "usdt-trc20") {
      params.set("network", "tron");
      router.push(`/checkout/crypto/?${params}`);
    } else if (selected === "mbc") {
      router.push(`/checkout/mbc/?${params}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-3">
        {paymentMethods.map((m) => (
          <MethodCard
            key={m.id}
            method={m}
            selected={selected === m.id}
            onSelect={() => setSelected(m.id)}
          />
        ))}
      </div>

      <div
        className={`mt-6 rounded-2xl p-6 flex items-center justify-between gap-4 ${
          discount > 0
            ? "bg-amber-400 text-slate-900"
            : "bg-slate-900 text-white"
        }`}
      >
        <div>
          <p className={`text-xs font-medium mb-1 ${discount > 0 ? "text-amber-800" : "text-slate-400"}`}>
            {plan ? `${plan.name} — ` : ""}Total due with {method.name}
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black">${finalPrice.toFixed(2)}</span>
            {discount > 0 && (
              <span className="text-sm line-through text-amber-700">${effectivePrice.toFixed(2)}</span>
            )}
          </div>
          {discount > 0 && (
            <p className="text-xs font-semibold text-amber-800 mt-0.5">
              You save ${(effectivePrice - finalPrice).toFixed(2)} ({discount}% MBC discount)
            </p>
          )}
        </div>
        <button
          onClick={handlePayNow}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors flex-shrink-0 ${
            discount > 0
              ? "bg-slate-900 hover:bg-slate-800 text-white"
              : "bg-amber-400 hover:bg-amber-300 text-slate-900"
          }`}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
