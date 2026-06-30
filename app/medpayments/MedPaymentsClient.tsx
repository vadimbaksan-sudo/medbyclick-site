"use client";

import { useState, useRef } from "react";
import { plans } from "@/modules/medpayments/data";
import type { PricingPlan } from "@/modules/medpayments/types";
import PricingCard from "@/modules/medpayments/components/PricingCard";
import PaymentSelector from "@/modules/medpayments/components/PaymentSelector";

export default function MedPaymentsClient() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  function handlePlanSelect(plan: PricingPlan) {
    setSelectedPlan(plan);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={() => handlePlanSelect(plan)}
            />
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
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

      <div ref={paymentRef} className="bg-slate-50 border-t border-slate-100 py-16 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Choose a Payment Method</h2>
            {selectedPlan ? (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-3">
                <span className="text-sm font-semibold text-amber-900">{selectedPlan.name}</span>
                <span className="text-amber-500">·</span>
                <span className="text-sm text-amber-800">${selectedPlan.price}{selectedPlan.period !== "one-time" ? `/${selectedPlan.period}` : " one-time"}</span>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="ml-1 text-amber-500 hover:text-amber-700 text-xs font-bold"
                  aria-label="Clear plan"
                >
                  ✕
                </button>
              </div>
            ) : (
              <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
                Select a plan above or choose a payment method for Care Coordination ($490).
              </p>
            )}
          </div>
          <PaymentSelector
            plan={
              selectedPlan
                ? { id: selectedPlan.id, name: selectedPlan.name, price: selectedPlan.price }
                : undefined
            }
          />
        </div>
      </div>
    </>
  );
}
