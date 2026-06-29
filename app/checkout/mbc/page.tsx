import { Suspense } from "react";
import MbcForm from "./MbcForm";

export const metadata = {
  title: "MBC Token Checkout — MedByClick",
  description: "Pay with MBC tokens and save 20% on your consultation.",
};

export default function MbcCheckoutPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Checkout</p>
          <h1 className="text-3xl font-bold">Pay with MBC tokens</h1>
          <p className="text-slate-300 text-sm mt-2">20% discount applied — tokens deducted from your balance.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Suspense fallback={<div className="animate-pulse h-80 bg-slate-100 rounded-2xl" />}>
          <MbcForm />
        </Suspense>
      </div>
    </div>
  );
}
