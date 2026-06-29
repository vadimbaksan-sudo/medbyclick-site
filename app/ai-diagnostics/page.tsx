import AiDiagnosticsForm from "./AiDiagnosticsForm";

export const metadata = {
  title: "AI Diagnostics — MedByClick",
  description: "Describe your symptoms and get an AI-powered preliminary assessment before your specialist consultation.",
};

export default function AiDiagnosticsPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            AI Diagnostics
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Symptom Analysis</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            Describe your symptoms and receive a preliminary AI assessment to help guide your consultation. This is not a medical diagnosis — always consult a specialist.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <AiDiagnosticsForm />

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-amber-800 mb-1">Important disclaimer</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            AI symptom analysis is a preliminary orientation tool only. It does not constitute a medical diagnosis. Results are informational and should be reviewed with a qualified specialist before any medical decisions are made. If you are experiencing a medical emergency, call emergency services immediately (Israel: 101 / Russia: 103).
          </p>
        </div>
      </div>
    </div>
  );
}
