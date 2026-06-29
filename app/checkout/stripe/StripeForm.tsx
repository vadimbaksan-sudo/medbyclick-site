"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type State = "idle" | "processing" | "success";

export default function StripeForm() {
  const params = useSearchParams();
  const planName = params.get("plan") ?? "Care Coordination";
  const price = parseFloat(params.get("price") ?? "490");

  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ card: "", expiry: "", cvc: "", name: "" });

  function fmt(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;
    if (name === "card") value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "expiry") value = value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
    if (name === "cvc") value = value.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("processing");
    setTimeout(() => setState("success"), 2000);
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
        <p className="text-slate-500 mb-1">{planName} — ${price.toFixed(2)}</p>
        <p className="text-slate-400 text-sm mb-8">You'll receive a confirmation email with your invoice shortly.</p>
        <Link href="/dashboard/" className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-10">
      <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Name on card</label>
          <input
            name="name" required value={form.name} onChange={fmt}
            placeholder="Anna Ivanova"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Card number</label>
          <input
            name="card" required value={form.card} onChange={fmt}
            placeholder="4242 4242 4242 4242"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiry</label>
            <input
              name="expiry" required value={form.expiry} onChange={fmt}
              placeholder="MM/YY"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">CVC</label>
            <input
              name="cvc" required value={form.cvc} onChange={fmt}
              placeholder="•••"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={state === "processing"}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors"
        >
          {state === "processing" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing…
            </span>
          ) : `Pay $${price.toFixed(2)}`}
        </button>
        <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
          <span>🔒</span> Secured by Stripe — PCI DSS Level 1
        </p>
      </form>

      <div className="md:col-span-2">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Order summary</p>
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold text-slate-900">{planName}</span>
            <span className="text-sm font-bold text-slate-900">${price.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
            <span className="text-sm font-bold text-slate-900">Total</span>
            <span className="text-sm font-bold text-slate-900">${price.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4 leading-relaxed text-center">
          Full refund if we can&apos;t match you to a specialist within 48 hours.
        </p>
      </div>
    </div>
  );
}
