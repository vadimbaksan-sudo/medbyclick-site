import { plans, paymentMethods } from "@/modules/medpayments/data";
import PricingCard from "@/modules/medpayments/components/PricingCard";
import PaymentSelector from "@/modules/medpayments/components/PaymentSelector";

export const metadata = {
  title: "Pricing & Payment — MedByClick",
  description: "Transparent pricing. Pay with card, USDT, or MBC tokens.",
};

export default function MedPaymentsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedPayments
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing & Payment</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Transparent pricing. Multiple payment methods: cards, crypto (USDT), and MBC utility tokens with discount.
          </p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">Flexible Payments</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Choose How You Pay</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We accept credit cards, USDT stablecoin, and our internal MBC utility token. Pay with MBC and save up to 20%.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Payment method overview */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Accepted Methods</h3>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border border-slate-200 rounded-xl p-5 bg-white">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0">{method.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900 text-sm">{method.name}</h4>
                          {method.discount && (
                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              -{method.discount}% discount
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{method.description}</p>
                        {method.networks && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {method.networks.map((net) => (
                              <span key={net} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{net}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive payment selector */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
              <PaymentSelector amount={490} />
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🔒", title: "Stripe Secured", body: "PCI DSS Level 1 certified" },
            { icon: "₮", title: "USDT Accepted", body: "ERC-20 & TRC-20 networks" },
            { icon: "🪙", title: "MBC Token", body: "ERC-20 on Ethereum, 20% off" },
            { icon: "↩️", title: "Full Refund", body: "48h no-match guarantee" },
          ].map((item) => (
            <div key={item.title} className="p-5 border border-slate-100 rounded-xl">
              <span className="text-2xl">{item.icon}</span>
              <p className="font-semibold text-slate-900 mt-3 mb-1 text-sm">{item.title}</p>
              <p className="text-xs text-slate-500">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
