"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = "idle" | "analyzing" | "done";

const BODY_SYSTEMS = [
  "Heart & Circulation",
  "Brain & Nervous System",
  "Lungs & Breathing",
  "Digestive System",
  "Bones & Joints",
  "Hormones & Metabolism",
  "Blood & Immune System",
  "Mental Health",
  "Skin",
  "Other / Unsure",
];

const DURATIONS = [
  "Less than 3 days",
  "3–7 days",
  "1–4 weeks",
  "1–3 months",
  "3–12 months",
  "Over a year",
];

interface AnalysisResult {
  summary: string;
  possibleAreas: string[];
  recommended: string;
  urgency: "low" | "moderate" | "high";
}

function mockAnalysis(symptoms: string, system: string): AnalysisResult {
  const lower = symptoms.toLowerCase();
  const isCardiac = system === "Heart & Circulation" || lower.includes("chest") || lower.includes("heart") || lower.includes("palpitat");
  const isNeuro = system === "Brain & Nervous System" || lower.includes("headache") || lower.includes("dizzy") || lower.includes("numb");
  const isGastro = system === "Digestive System" || lower.includes("stomach") || lower.includes("nausea") || lower.includes("bloat");

  if (isCardiac) {
    return {
      summary: "Your symptoms may involve the cardiovascular system. Chest-related symptoms warrant prompt evaluation to rule out cardiac causes.",
      possibleAreas: ["Cardiac arrhythmia", "Hypertensive episode", "Musculoskeletal chest pain", "Anxiety-related symptoms"],
      recommended: "Cardiology",
      urgency: "high",
    };
  }
  if (isNeuro) {
    return {
      summary: "Your description suggests possible involvement of the central or peripheral nervous system. A specialist assessment will help clarify the underlying cause.",
      possibleAreas: ["Tension headache / migraine", "Vestibular disorder", "Peripheral neuropathy", "Cervical spine involvement"],
      recommended: "Neurology",
      urgency: "moderate",
    };
  }
  if (isGastro) {
    return {
      summary: "Your symptoms point toward the gastrointestinal tract. Several common and treatable conditions can produce these patterns.",
      possibleAreas: ["Irritable bowel syndrome", "Gastroesophageal reflux", "Inflammatory bowel disease", "Functional dyspepsia"],
      recommended: "Gastroenterology",
      urgency: "low",
    };
  }
  return {
    summary: "Based on your description, a specialist review is recommended to rule out underlying conditions. The pattern you describe does not point to a single clear cause without further examination.",
    possibleAreas: ["Multiple potential systems involved", "Further diagnostic workup recommended"],
    recommended: "General Internal Medicine or the specialty matching your primary symptom",
    urgency: "moderate",
  };
}

export default function AiDiagnosticsForm() {
  const [form, setForm] = useState({ symptoms: "", system: "", duration: "", severity: "3" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("analyzing");
    setTimeout(() => {
      setResult(mockAnalysis(form.symptoms, form.system));
      setFormState("done");
    }, 1800);
  }

  function handleReset() {
    setForm({ symptoms: "", system: "", duration: "", severity: "3" });
    setResult(null);
    setFormState("idle");
  }

  const urgencyColors = {
    low: "bg-green-50 border-green-200 text-green-800",
    moderate: "bg-amber-50 border-amber-200 text-amber-800",
    high: "bg-red-50 border-red-200 text-red-800",
  };
  const urgencyLabels = { low: "Low urgency", moderate: "Moderate urgency", high: "Elevated urgency" };

  if (formState === "done" && result) {
    return (
      <div className="space-y-6">
        <div className={`border rounded-2xl p-6 ${urgencyColors[result.urgency]}`}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm">AI Assessment</p>
            <span className="text-xs font-bold px-3 py-1 rounded-full border border-current">
              {urgencyLabels[result.urgency]}
            </span>
          </div>
          <p className="text-sm leading-relaxed">{result.summary}</p>
        </div>

        <div className="border border-slate-200 rounded-2xl p-6 bg-white">
          <p className="text-sm font-semibold text-slate-700 mb-3">Possible areas to investigate</p>
          <ul className="space-y-2">
            {result.possibleAreas.map((area) => (
              <li key={area} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-slate-200 rounded-2xl p-6 bg-white">
          <p className="text-xs text-slate-400 mb-1">Recommended specialist</p>
          <p className="font-semibold text-slate-900">{result.recommended}</p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/book/"
            className="flex-1 text-center py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Book a consultation
          </Link>
          <button
            onClick={handleReset}
            className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-sm transition-colors"
          >
            Analyze again
          </button>
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          This is an AI-generated orientation only, not a medical diagnosis. Consult a qualified specialist before making any health decisions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 mb-1.5">
          Describe your symptoms <span className="text-red-400">*</span>
        </label>
        <textarea
          id="symptoms"
          name="symptoms"
          required
          rows={5}
          value={form.symptoms}
          onChange={handleChange}
          placeholder="Describe what you're experiencing — when it started, what it feels like, what makes it better or worse, any prior diagnoses or treatments you've tried…"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition resize-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="system" className="block text-sm font-medium text-slate-700 mb-1.5">
            Body system affected
          </label>
          <select
            id="system"
            name="system"
            value={form.system}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition bg-white"
          >
            <option value="">Select or leave blank…</option>
            {BODY_SYSTEMS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-1.5">
            How long have you had these symptoms?
          </label>
          <select
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition bg-white"
          >
            <option value="">Select duration…</option>
            {DURATIONS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="severity" className="block text-sm font-medium text-slate-700 mb-2">
          Severity (1 = mild, 10 = severe): <span className="font-bold text-slate-900">{form.severity}</span>
        </label>
        <input
          id="severity"
          name="severity"
          type="range"
          min="1"
          max="10"
          value={form.severity}
          onChange={handleChange}
          className="w-full accent-amber-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>1 — Mild</span>
          <span>10 — Severe</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={formState === "analyzing"}
        className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-semibold rounded-xl text-sm transition-colors"
      >
        {formState === "analyzing" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing symptoms…
          </span>
        ) : "Analyze my symptoms"}
      </button>
    </form>
  );
}
