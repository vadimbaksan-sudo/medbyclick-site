import { Suspense } from "react";
import CryptoForm from "./CryptoForm";

export const metadata = {
  title: "Crypto Checkout — MedByClick",
  description: "Pay with USDT on Ethereum or TRON.",
};

export default function CryptoCheckoutPage() {
  return (
    <div>
      <div className="bg-red-600 text-white py-3 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <span className="text-xl leading-none flex-shrink-0" aria-hidden="true">⚠️</span>
          <p className="text-sm font-bold leading-snug">
            DEMO / TEST MODE — this page is not connected to a real wallet or blockchain.
            Do not send real USDT or any other cryptocurrency to the address shown below —
            any funds sent will not be recovered.
          </p>
        </div>
      </div>
      <div className="bg-stone-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Checkout</p>
          <h1 className="text-3xl font-bold">Pay with USDT</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Suspense fallback={<div className="animate-pulse h-80 bg-stone-100 rounded-2xl" />}>
          <CryptoForm />
        </Suspense>
      </div>
    </div>
  );
}
