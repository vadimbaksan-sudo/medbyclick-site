import { Suspense } from "react";
import StripeForm from "./StripeForm";

export const metadata = {
  title: "Card Checkout — MedByClick",
  description: "Secure credit/debit card payment powered by Stripe.",
};

export default function StripeCheckoutPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Checkout</p>
          <h1 className="text-3xl font-bold">Pay by card</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Suspense fallback={<div className="animate-pulse h-80 bg-slate-100 rounded-2xl" />}>
          <StripeForm />
        </Suspense>
      </div>
    </div>
  );
}
