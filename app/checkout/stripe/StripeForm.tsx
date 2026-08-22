"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Link from "next/link";

// Real publishable key from env — never hardcode. Falls back to Stripe's
// own public demo test key ONLY so `loadStripe` doesn't throw when
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY isn't configured (this sandbox has no
// real MedByClick Stripe account yet — see .env.example). The demo key
// can't actually process a payment against our server-created PaymentIntent
// (different Stripe account), so this path fails at confirmCardPayment
// time with a clear Stripe error rather than silently "succeeding".
const publishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx";
const stripePromise = loadStripe(publishableKey);

interface PageData {
  planId: string;
  planName: string;
  price: number;
}

function PaymentForm({ pageData }: { pageData: PageData }) {
  const stripe = useStripe();
  const elements = useElements();

  const [state, setState] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setState("processing");
    setErrorMsg(null);

    // Real confirmPayment flow using the client_secret from our server-
    // created PaymentIntent (spec §4.1 point 2) — replaces the old
    // createPaymentMethod()+console.log flow that never talked to a
    // backend at all.
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setState("error");
      setErrorMsg(error.message ?? "Please check your card details and try again.");
      return;
    }

    setState("success");
  }

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Payment confirmed</h2>
        <p className="text-stone-500 mb-1">
          {pageData.planName} — ${pageData.price.toFixed(2)}
        </p>
        <p className="text-stone-400 text-sm mb-2">
          Your payment history will appear in your dashboard once Stripe&apos;s webhook confirms
          it server-side.
        </p>
        <Link
          href="/dashboard/"
          className="inline-flex items-center px-5 py-2.5 border border-stone-300 hover:border-stone-400 text-stone-900 rounded-xl text-sm font-semibold transition-colors mt-6"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-10">
      <div className="md:col-span-3">
        <form onSubmit={handleSubmit} className="space-y-5">
          <PaymentElement />

          {state === "error" && errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || state === "processing"}
            className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors"
          >
            {state === "processing" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing…
              </span>
            ) : (
              `Pay $${pageData.price.toFixed(2)}`
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-400 pt-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secured by Stripe · Card details never touch our servers
          </div>
        </form>
      </div>

      <div className="md:col-span-2">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Order summary</p>
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-stone-900">{pageData.planName}</span>
            <span className="text-sm font-bold text-stone-900">${pageData.price.toFixed(2)}</span>
          </div>
          <div className="border-t border-stone-200 pt-4 flex justify-between">
            <span className="text-sm font-bold text-stone-900">Total</span>
            <span className="text-sm font-bold text-stone-900">${pageData.price.toFixed(2)}</span>
          </div>
          <p className="text-xs text-stone-400 mt-3 leading-relaxed">
            Test card: <span className="font-mono">4242 4242 4242 4242</span> · any future date · any CVC
          </p>
        </div>
        <p className="text-xs text-stone-400 mt-4 leading-relaxed text-center">
          Full refund if we can&apos;t match you to a specialist within 48 hours.
        </p>
      </div>
    </div>
  );
}

export default function StripeForm() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data: PageData = {
      planId: params.get("planId") ?? "professional",
      planName: params.get("plan") ?? "Care Coordination",
      price: parseFloat(params.get("price") ?? "490") || 490,
    };
    setPageData(data);

    // Server-side PaymentIntent creation (spec §4.1 point 1) — the price
    // is looked up server-side from modules/medpayments/data.ts's plans,
    // never trusted from these URL params (those are only used for the
    // order-summary display above).
    fetch("/api/payments/stripe/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: data.planId }),
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok || body.status !== "ok") {
          throw new Error(body.message ?? "Could not start payment.");
        }
        setClientSecret(body.clientSecret);
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : "Could not start payment.");
      });
  }, []);

  if (loadError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-sm mb-4">{loadError}</p>
        <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900 underline">
          Log in and try again
        </Link>
      </div>
    );
  }

  if (!pageData || !clientSecret) {
    return <div className="animate-pulse h-64 bg-stone-100 rounded-2xl" />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm pageData={pageData} />
    </Elements>
  );
}
