import MedPaymentsClient from "@/app/medpayments/MedPaymentsClient";

export const metadata = {
  title: "Pricing — MedByClick",
  description: "Transparent pricing for specialist access and care coordination. No hidden fees.",
};

export default function PricingPage() {
  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
            Transparent pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, honest pricing</h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            No hidden fees. No subscription traps. Pay for what you actually need.
          </p>
        </div>
      </div>

      <MedPaymentsClient />

      <div className="py-16 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Ready to get started?</h2>
          <p className="text-stone-500 text-sm mb-8 leading-relaxed">
            Book a consultation and pay only after we&apos;ve confirmed your specialist match.
          </p>
          <a
            href="/book/"
            className="inline-flex items-center justify-center px-8 py-4 border border-stone-300 hover:border-stone-400 text-stone-900 font-semibold rounded-lg transition-colors"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
