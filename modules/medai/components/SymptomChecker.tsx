"use client";

import { useState } from "react";
import { detectRedFlags } from "../redFlags";
import { MEDAI_LOCALE_LABELS, MEDAI_STRINGS, type MedaiLocale } from "../i18n";
import type { IntakeApiResponse, RedFlagMatch, SymptomInput } from "../types";

const urgencyLabel = {
  routine: { label: "Routine priority", color: "text-green-600" },
  soon: { label: "Soon priority", color: "text-amber-600" },
  urgent: { label: "Urgent priority", color: "text-red-600" },
};

type ViewState =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "emergency"; redFlag: RedFlagMatch }
  | { kind: "result"; response: Extract<IntakeApiResponse, { status: "ok" }> }
  | { kind: "declined"; message: string }
  | { kind: "error"; message: string };

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
  const [age, setAge] = useState("");
  const [locale, setLocale] = useState<MedaiLocale>("en");
  const [view, setView] = useState<ViewState>({ kind: "form" });

  const t = MEDAI_STRINGS[locale];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Hard-coded, deterministic red-flag check — runs client-side, BEFORE any
    // network call to the LLM-backed API route. This is plain pattern
    // matching, not a model call: see modules/medai/redFlags.ts.
    const redFlag = detectRedFlags(symptoms);
    if (redFlag) {
      setView({ kind: "emergency", redFlag });
      return;
    }

    setView({ kind: "loading" });

    const input: SymptomInput = {
      symptoms,
      duration,
      severity,
      age: Number(age) || 0,
    };

    try {
      const res = await fetch("/api/medai/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data: IntakeApiResponse = await res.json();

      switch (data.status) {
        case "emergency":
          // Defense-in-depth: the server-side gate also matched, even though
          // the client-side check above should already have caught this.
          setView({ kind: "emergency", redFlag: data.redFlag });
          break;
        case "ok":
          setView({ kind: "result", response: data });
          break;
        case "declined":
          setView({ kind: "declined", message: data.message });
          break;
        case "error":
          setView({ kind: "error", message: data.message });
          break;
      }
    } catch {
      setView({
        kind: "error",
        message: "We couldn't reach the intake service. Please try again, or describe your symptoms to a coordinator directly.",
      });
    }
  }

  function reset() {
    setSymptoms("");
    setDuration("");
    setSeverity("moderate");
    setAge("");
    setView({ kind: "form" });
  }

  return (
    <div className="space-y-6">
      <LocaleToggle locale={locale} onChange={setLocale} />

      {/* Persistent, non-dismissible disclaimer and emergency banner — shown
          before input starts and stays visible while using the tool, per
          the clinical safety review's UX requirements. */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
        {t.disclaimer}
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-red-700 mb-1">{t.emergencyBannerTitle}</p>
        <p className="text-xs text-red-700 leading-relaxed">{t.emergencyBannerBody}</p>
      </div>

      {view.kind === "emergency" && (
        <div className="bg-red-600 text-white rounded-xl p-5 space-y-2">
          <p className="font-bold">{t.emergencyResultTitle}</p>
          <p className="text-sm leading-relaxed">{t.emergencyResultBody}</p>
          <p className="text-xs text-red-100">
            Matched: {view.redFlag.label}
          </p>
          <button
            onClick={reset}
            className="mt-2 text-xs underline underline-offset-2 text-red-100 hover:text-white"
          >
            Start over
          </button>
        </div>
      )}

      {view.kind === "declined" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-amber-800 text-sm">We couldn&apos;t structure this automatically</p>
          <p className="text-sm text-amber-800 leading-relaxed">{view.message}</p>
          <button
            onClick={reset}
            className="text-xs underline underline-offset-2 text-amber-800 hover:text-amber-900"
          >
            Start over
          </button>
        </div>
      )}

      {view.kind === "error" && (
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-slate-800 text-sm">Something went wrong</p>
          <p className="text-sm text-slate-700 leading-relaxed">{view.message}</p>
          <button
            onClick={reset}
            className="text-xs underline underline-offset-2 text-slate-700 hover:text-slate-900"
          >
            Try again
          </button>
        </div>
      )}

      {(view.kind === "form" || view.kind === "loading") && (
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

          <div className="grid sm:grid-cols-3 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
              <input
                type="number"
                min={0}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                placeholder="E.g. 34"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600">
            {t.consentNotice}
          </div>

          <button
            type="submit"
            disabled={view.kind === "loading"}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors text-sm disabled:opacity-60"
          >
            {view.kind === "loading" ? "Structuring your intake…" : "Send to Coordinator"}
          </button>

          <p className="text-xs text-slate-400 text-center">{t.coordinatorNote}</p>
        </form>
      )}

      {view.kind === "result" && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            Your symptoms have been structured and sent to a coordinator for review.
            {/* STUB: there is no real coordinator dashboard/queue in this codebase
                yet — this message describes the intended flow, but nothing is
                actually queued anywhere. Wire this up to a real coordinator
                inbox/ticket system when one exists; do not present this as a
                completed hand-off beyond this UI copy. */}
          </div>

          <div className="space-y-3">
            <Field label="Chief complaint" value={view.response.summary.chiefComplaint} />
            <Field label="Timeline" value={view.response.summary.timeline} />
            <Field label="Severity summary" value={view.response.summary.severitySummary} />
            {view.response.summary.relevantHistory && (
              <Field label="Relevant history" value={view.response.summary.relevantHistory} />
            )}
            {view.response.summary.associatedSymptoms.length > 0 && (
              <Field label="Associated symptoms" value={view.response.summary.associatedSymptoms.join(", ")} />
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Suggested specialty (for coordinator to confirm)</p>
              <p className="font-semibold text-slate-900">{view.response.summary.recommendedSpecialty}</p>
            </div>
            <div className="border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Queue priority (staff-facing, not a medical judgment)</p>
              <p className={`font-semibold text-sm ${urgencyLabel[view.response.summary.urgencyTier].color}`}>
                {urgencyLabel[view.response.summary.urgencyTier].label}
              </p>
            </div>
          </div>

          {view.response.summary.clarifyingQuestions.length > 0 && (
            <div className="border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-2">Your coordinator may also ask</p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {view.response.summary.clarifyingQuestions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
            {t.disclaimer}
          </div>

          <div className="flex gap-3">
            <button
              onClick={reset}
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

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="border border-slate-100 rounded-xl p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm text-slate-800 leading-relaxed">{value}</p>
    </div>
  );
}

function LocaleToggle({ locale, onChange }: { locale: MedaiLocale; onChange: (l: MedaiLocale) => void }) {
  return (
    <div className="flex gap-2 text-xs">
      {(Object.keys(MEDAI_LOCALE_LABELS) as MedaiLocale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={`px-3 py-1.5 rounded-full border transition-colors ${
            locale === code
              ? "bg-slate-900 text-white border-slate-900"
              : "border-slate-200 text-slate-500 hover:border-slate-400"
          }`}
        >
          {MEDAI_LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
