"use client";

import { useState } from "react";
import type { RemoteTrial } from "@/lib/clinicaltrials/api";
import RemoteTrialCard from "./RemoteTrialCard";

export default function TrialSearch() {
  const [condition, setCondition] = useState("");
  const [trials, setTrials] = useState<RemoteTrial[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!condition.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/clinicaltrials/search?condition=${encodeURIComponent(condition)}`);
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setError(data.message ?? "Search failed. Please try again.");
        setTrials(null);
      } else {
        setTrials(data.trials);
      }
    } catch {
      setError("Could not reach ClinicalTrials.gov. Please try again shortly.");
      setTrials(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="Search by condition — e.g. lymphoma, multiple sclerosis, Parkinson's"
          className="flex-1 px-4 py-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={loading || !condition.trim()}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-300 text-white font-medium rounded-lg text-sm transition-colors"
        >
          {loading ? "Searching…" : "Search ClinicalTrials.gov"}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-600 mb-6">{error}</p>
      )}

      {trials && trials.length === 0 && !error && (
        <p className="text-sm text-stone-500 mb-6">No recruiting trials found for &ldquo;{condition}&rdquo;. Try a broader term.</p>
      )}

      {trials && trials.length > 0 && (
        <div className="space-y-6">
          {trials.map((trial) => (
            <RemoteTrialCard key={trial.nctId} trial={trial} />
          ))}
        </div>
      )}
    </div>
  );
}
