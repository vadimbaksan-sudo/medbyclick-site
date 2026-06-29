"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Link from "next/link";

// Replace with live key before going live: pk_live_...
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "15px",
      color: "#0f172a",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#dc2626" },
  },
};

interface PageData { planName: string; price: number }

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [name, setName] = useState("");
  const [cardError, setCardError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPageData({
      planName: params.get("plan") ?? "Care Coordination",
      price: parseFloat(params.get("price") ?? "490") || 490,
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || !pageData) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    setState("processing");
    setErrorMsg(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: { name },
    });

    if (error) {
      setCardError(error.message ?? "Card error");
      setState("error");
      setErrorMsg(error.message ?? "Please check your card details and try again.");
      return;
    }

    // Card validated — send paymentMethod.id to your backend to confirm the PaymentIntent
    console.log("Stripe PaymentMethod:", paymentMethod.id);
    setState("success");
  }

  if (!pageData) {
    return <div className="animate-pulse h-64 bg-slate-100 rounded-2xl" />;
  }

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment confirmed</h2>
        <p className="text-slate-500 mb-1">{pageData.planName} — ${pageData.price.toFixed(2)}</p>
        <p className="text-slate-400 text-sm mb-8">A confirmation email will be sent shortly.</p>
        <Link href="/dashboard/" className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-10">
      <div className="md:col-span-3">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Name on card</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="cc-name"
              placeholder="Jane Smith"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Card details</label>
            <div className="border border-slate-200 rounded-xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-slate-300 transition">
              <CardElement
                options={CARD_STYLE}
                onChange={(e) => {
                  setCardError(e.error?.message ?? null);
                  if (state === "error") setState("idle");
                }}
              />
            </div>
            {cardError && <p className="text-xs text-red-500 mt-1.5">{cardError}</p>}
          </div>

          {state === "error" && errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || state === "processing" || !name.trim()}
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
            ) : `Pay $${pageData.price.toFixed(2)}`}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secured by Stripe · Card details never touch our servers
          </div>
        </form>
      </div>

      <div className="md:col-span-2">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Order summary</p>
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-slate-900">{pageData.planName}</span>
            <span className="text-sm font-bold text-slate-900">${pageData.price.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-200 pt-4 flex justify-between">
            <span className="text-sm font-bold text-slate-900">Total</span>
            <span className="text-sm font-bold text-slate-900">${pageData.price.toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Test card: <span className="font-mono">4242 4242 4242 4242</span> · any future date · any CVC
          </p>
        </div>
        <p className="text-xs text-slate-400 mt-4 leading-relaxed text-center">
          Full refund if we can&apos;t match you to a specialist within 48 hours.
        </p>
      </div>
    </div>
  );
}

export default function StripeForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
