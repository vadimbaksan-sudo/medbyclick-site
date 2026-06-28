import { Suspense } from "react";
import SymptomChecker from "@/modules/medai/components/SymptomChecker";
import { aiFeatures } from "@/modules/medai/data";

export const metadata = {
  title: "MedAI — AI Diagnostics · MedByClick",
  description: "AI-powered symptom analysis and specialist routing.",
};

export default function MedAIPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedAI Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Diagnostics</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Describe your symptoms and get an instant analysis — including likely conditions, recommended specialty, and urgency level.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Symptom Checker</h2>
            <Suspense fallback={<div className="animate-pulse h-64 bg-slate-100 rounded-2xl" />}>
              <SymptomChecker />
            </Suspense>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">How It Works</h2>
            <div className="space-y-4">
              {aiFeatures.map((f) => (
                <div key={f.title} className="flex gap-4 p-5 border border-slate-100 rounded-xl bg-slate-50">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">{f.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">Important Notice</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                MedAI is a decision-support tool, not a diagnostic service. All results should be reviewed by a qualified physician. MedByClick connects you to real specialists for confirmed diagnoses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
