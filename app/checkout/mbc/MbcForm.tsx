"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const MBC_PRICE_USD = 0.10;
const MBC_DISCOUNT = 0.20;
const DEFAULT_BALANCE = 5000;

function getBalance(): number {
  if (typeof window === "undefined") return DEFAULT_BALANCE;
  try {
    const v = localStorage.getItem("mbc_balance");
    const n = v !== null ? parseFloat(v) : DEFAULT_BALANCE;
    return isNaN(n) ? DEFAULT_BALANCE : n;
  } catch { return DEFAULT_BALANCE; }
}

function saveBalance(n: number) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem("mbc_balance", n.toString()); } catch {}
}

function addTransaction(tx: { description: string; amount: number; type: "debit" | "credit" }) {
  if (typeof window === "undefined") return;
  try {
    const existing = JSON.parse(localStorage.getItem("mbc_transactions") ?? "[]");
    existing.unshift({ id: Date.now(), date: new Date().toISOString(), ...tx });
    localStorage.setItem("mbc_transactions", JSON.stringify(existing.slice(0, 50)));
  } catch {}
}

type State = "idle" | "paying" | "success" | "buying" | "buy-success";

interface PageData {
  planName: string;
  originalPrice: number;
  discountedUsd: number;
  mbcRequired: number;
  balance: number;
}

export default function MbcForm() {
  const [data, setData] = useState<PageData | null>(null);
  const [state, setState] = useState<State>("idle");
  const [buyAmount, setBuyAmount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planName = params.get("plan") ?? "Care Coordination";
    const originalPrice = parseFloat(params.get("price") ?? "490") || 490;
    const discountedUsd = originalPrice * (1 - MBC_DISCOUNT);
    const mbcRequired = Math.ceil(discountedUsd / MBC_PRICE_USD);
    const balance = getBalance();
    setData({ planName, originalPrice, discountedUsd, mbcRequired, balance });
    setBuyAmount(Math.max(mbcRequired - balance, mbcRequired));
  }, []);

  if (!data) {
    return <div className="animate-pulse h-64 bg-slate-100 rounded-2xl" />;
  }

  const { planName, originalPrice, discountedUsd, mbcRequired } = data;
  let { balance } = data;
  const hasSufficientBalance = balance >= mbcRequired;

  function handlePayFromBalance() {
    setState("paying");
    setTimeout(() => {
      const newBal = balance - mbcRequired;
      saveBalance(newBal);
      addTransaction({ description: `${planName} — MedByClick`, amount: mbcRequired, type: "debit" });
      setData((d) => d ? { ...d, balance: newBal } : d);
      setState("success");
    }, 1500);
  }

  function handleBuyTokens(e: React.FormEvent) {
    e.preventDefault();
    setState("buying");
    setTimeout(() => {
      const newBal = balance + buyAmount;
      saveBalance(newBal);
      addTransaction({ description: "Token purchase", amount: buyAmount, type: "credit" });
      setData((d) => d ? { ...d, balance: newBal } : d);
      setState("buy-success");
    }, 1500);
  }

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment successful</h2>
        <p className="text-slate-500 mb-1">{planName} — {mbcRequired.toLocaleString()} MBC deducted</p>
        <p className="text-slate-400 text-sm mb-1">New balance: {data.balance.toLocaleString()} MBC</p>
        <p className="text-slate-400 text-sm mb-8">You saved ${(originalPrice * MBC_DISCOUNT).toFixed(2)} vs. card payment.</p>
        <Link href="/dashboard/" className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
          View dashboard
        </Link>
      </div>
    );
  }

  if (state === "buy-success") {
    balance = data.balance;
    const canPayNow = balance >= mbcRequired;
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
          <p className="font-semibold text-green-800">Tokens added!</p>
          <p className="text-sm text-green-700 mt-1">
            New balance: {balance.toLocaleString()} MBC (${(balance * MBC_PRICE_USD).toFixed(2)})
          </p>
        </div>
        {canPayNow ? (
          <button
            onClick={handlePayFromBalance}
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl text-sm transition-colors"
          >
            Pay {mbcRequired.toLocaleString()} MBC from balance
          </button>
        ) : (
          <p className="text-sm text-slate-500 text-center">
            Still need {(mbcRequired - balance).toLocaleString()} more MBC.
          </p>
        )}
      </div>
    );
  }

  const shortfall = Math.max(0, mbcRequired - balance);
  const presets = [
    Math.ceil(shortfall) || mbcRequired,
    mbcRequired,
    mbcRequired * 2,
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="grid md:grid-cols-5 gap-10">
      {/* Left: balance + action */}
      <div className="md:col-span-3 space-y-6">
        {/* Balance widget */}
        <div className={`rounded-2xl p-6 border-2 ${hasSufficientBalance ? "border-amber-400 bg-amber-400/5" : "border-slate-200 bg-slate-50"}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Your MBC balance</p>
              <p className="text-3xl font-black text-slate-900">{balance.toLocaleString()}</p>
              <p className="text-xs text-amber-600 font-medium mt-0.5">
                ≈ ${(balance * MBC_PRICE_USD).toFixed(2)} USD
              </p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              hasSufficientBalance ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"
            }`}>
              {hasSufficientBalance ? "Sufficient" : "Insufficient"}
            </span>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Required for this plan</span>
              <span className="font-semibold text-slate-900">{mbcRequired.toLocaleString()} MBC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">USD value (20% off)</span>
              <span className="font-semibold text-slate-900">${discountedUsd.toFixed(2)}</span>
            </div>
            {!hasSufficientBalance && (
              <div className="flex justify-between text-sm">
                <span className="text-red-500">Shortfall</span>
                <span className="font-semibold text-red-600">{shortfall.toLocaleString()} MBC</span>
              </div>
            )}
          </div>
        </div>

        {hasSufficientBalance ? (
          <button
            onClick={handlePayFromBalance}
            disabled={state === "paying"}
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-900 font-bold rounded-xl text-sm transition-colors"
          >
            {state === "paying" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing…
              </span>
            ) : `Pay ${mbcRequired.toLocaleString()} MBC from balance`}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-800 mb-1">Not enough MBC tokens</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                You need {shortfall.toLocaleString()} more MBC. Buy tokens below or{" "}
                <Link href="/medpayments/" className="underline">choose a different payment method</Link>.
              </p>
            </div>

            <form onSubmit={handleBuyTokens} className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <p className="font-semibold text-slate-900 text-sm">Buy MBC tokens</p>
              <div>
                <label className="text-xs text-slate-500 mb-2 block">Choose amount</label>
                <div className="flex gap-2 mb-3">
                  {presets.map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setBuyAmount(qty)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                        buyAmount === qty
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {qty.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  min="100"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                />
                <p className="text-xs text-slate-400 mt-1.5">
                  Cost: ${(buyAmount * MBC_PRICE_USD).toFixed(2)} USD at $0.10 / MBC
                </p>
              </div>
              <button
                type="submit"
                disabled={state === "buying" || buyAmount < 1}
                className="w-full py-3 bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors"
              >
                {state === "buying"
                  ? "Processing…"
                  : `Buy ${buyAmount.toLocaleString()} MBC — $${(buyAmount * MBC_PRICE_USD).toFixed(2)}`}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Right: order summary */}
      <div className="md:col-span-2">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Order summary</p>
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-semibold text-slate-900">{planName}</span>
            <span className="text-sm text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-amber-600 font-medium">20% MBC discount</span>
            <span className="text-xs text-amber-600 font-medium">−${(originalPrice * MBC_DISCOUNT).toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-200 pt-4 flex justify-between">
            <span className="text-sm font-bold text-slate-900">Total</span>
            <span className="text-sm font-bold text-amber-600">{mbcRequired.toLocaleString()} MBC</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 text-right">(${discountedUsd.toFixed(2)})</p>
        </div>
        <Link href="/dashboard/" className="block text-center text-xs text-slate-400 hover:text-slate-600 mt-4 underline">
          View your MBC dashboard →
        </Link>
      </div>
    </div>
  );
}
