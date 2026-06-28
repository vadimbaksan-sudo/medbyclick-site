"use client";

import { useState } from "react";
import { mockDiagnosticResult } from "../data";

const likelihoodColor = {
  high: "text-red-600 bg-red-50 border-red-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  low: "text-slate-500 bg-slate-50 border-slate-200",
};

const urgencyLabel = {
  routine: { label: "Routine — within a few weeks is fine", color: "text-green-600" },
  soon: { label: "Soon — within 1–2 weeks", color: "text-amber-600" },
  urgent: { label: "Urgent — seek care within 24–48 hours", color: "text-red-600" },
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
  const [result, setResult] = useState<typeof mockDiagnosticResult | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult(mockDiagnosticResult);
      setLoading(false);
    }, 1800);
  }

  return (
    <div>
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Describe your symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              required
              placeholder="E.g. Recurring headaches on the right side, worse in the morning, accompanied by nausea…"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="E.g. 3 weeks, 6 months"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as typeof severity)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              >
                <option value="mild">Mild — noticeable but manageable</option>
                <option value="moderate">Moderate — affects daily activities</option>
                <option value="severe">Severe — significantly disabling</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors text-sm disabled:opacity-60"
          >
            {loading ? "Analyzing symptoms…" : "Analyze Symptoms"}
          </button>

          <p className="text-xs text-slate-400 text-center">
            Not a diagnosis. For informational purposes only. Always consult a physician.
          </p>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">Possible conditions</p>
            <div className="space-y-3">
              {result.possibleConditions.map((c) => (
                <div key={c.name} className={`flex items-start gap-3 border rounded-xl p-4 ${likelihoodColor[c.likelihood]}`}>
                  <span className="text-xs font-bold uppercase tracking-wide mt-0.5 flex-shrink-0">{c.likelihood}</span>
                  <div>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-sm mt-0.5 opacity-80">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Recommended specialty</p>
              <p className="font-semibold text-slate-900">{result.recommendedSpecialty}</p>
            </div>
            <div className="border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Urgency</p>
              <p className={`font-semibold text-sm ${urgencyLabel[result.urgency].color}`}>
                {urgencyLabel[result.urgency].label}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
            {result.disclaimer}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setResult(null)}
              className="flex-1 py-3 border border-slate-200 hover:border-slate-400 text-slate-700 rounded-xl text-sm font-medium transition-colors"
            >
              Start Over
            </button>
            <a
              href="/book"
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold text-center transition-colors"
            >
              Book a Specialist →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
