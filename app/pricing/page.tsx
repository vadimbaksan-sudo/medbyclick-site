import Link from "next/link";
import { plans } from "@/modules/medpayments/data";
import PricingCard from "@/modules/medpayments/components/PricingCard";
import PaymentSelector from "@/modules/medpayments/components/PaymentSelector";

export const metadata = {
  title: "Pricing — MedByClick",
  description: "Transparent pricing for specialist access and care coordination. No hidden fees.",
};

export default function PricingPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            Transparent pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, honest pricing</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            No hidden fees. No subscription traps. Pay for what you actually need.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🔒", title: "Stripe Secured", body: "All card payments processed by Stripe. PCI DSS Level 1 certified." },
            { icon: "↩️", title: "Full Refund", body: "If we can't match you to a specialist within 48 hours, you get a full refund." },
            { icon: "💬", title: "Invoice on Request", body: "Formal invoice available for insurance reimbursement or employer benefits." },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-slate-100 rounded-xl">
              <span className="text-3xl">{item.icon}</span>
              <p className="font-semibold text-slate-900 mt-3 mb-2 text-sm">{item.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Choose a Payment Method</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Pay by card via Stripe, send USDT stablecoin on Ethereum or TRON, or use MBC tokens and save 20%.
            </p>
          </div>
          <PaymentSelector basePrice={490} />
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to get started?</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Book a consultation and pay only after we&apos;ve confirmed your specialist match.
          </p>
          <Link
            href="/book/"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
