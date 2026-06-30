import MedPaymentsClient from "./MedPaymentsClient";

export const metadata = {
  title: "Pricing — MedByClick",
  description: "Transparent pricing for specialist access and care coordination.",
};

export default function MedPaymentsPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedPayments Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            No hidden fees. No subscription traps. Pay for what you actually need.
          </p>
        </div>
      </div>
      <MedPaymentsClient />
    </div>
  );
}
