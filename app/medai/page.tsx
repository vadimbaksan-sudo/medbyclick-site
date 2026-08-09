import { Suspense } from "react";
import SymptomChecker from "@/modules/medai/components/SymptomChecker";
import { aiFeatures } from "@/modules/medai/data";

export const metadata = {
  title: "MedAI — AI Intake Assistant · MedByClick",
  description: "AI-assisted symptom intake and specialist routing, reviewed by a human coordinator before any medical decision is made.",
};

export default function MedAIPage() {
  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MedAI Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MedAI — Clinical Intelligence Engine</h1>
          <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
            Describe your symptoms and get a structured intake summary — including suggested specialty and queue priority — reviewed by a coordinator before anything happens next. This is not a diagnosis.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-6">Symptom Checker</h2>
            <Suspense fallback={<div className="animate-pulse h-64 bg-stone-100 rounded-2xl" />}>
              <SymptomChecker />
            </Suspense>
          </div>

          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-6">How It Works</h2>
            <div className="space-y-4">
              {aiFeatures.map((f) => (
                <div key={f.title} className="flex gap-4 p-5 border border-stone-100 rounded-xl bg-stone-50">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-1">{f.title}</p>
                    <p className="text-stone-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">Important Notice</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                MedAI structures your intake for a human coordinator — it does not diagnose, does not suggest treatment, and never books or dismisses a case on its own. A qualified doctor reviews your information before any medical decision is made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
