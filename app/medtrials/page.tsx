import { trials } from "@/modules/medtrials/data";
import TrialCard from "@/modules/medtrials/components/TrialCard";
import TrialSearch from "@/modules/medtrials/components/TrialSearch";

export const metadata = {
  title: "MedTrials — Clinical Research · MedByClick",
  description: "Clinical trials access and experimental treatment matching.",
};

export default function MedTrialsPage() {
  const recruiting = trials.filter((t) => t.status === "recruiting");

  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MedTrials Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Clinical Trials</h1>
          <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
            Access to ongoing research studies with our network hospitals. {recruiting.length} trials currently recruiting.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>MedByClick does not enroll patients in trials directly.</strong> We help you understand eligibility, connect with the principal investigator, and coordinate travel or logistics if needed.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {trials.map((trial) => (
            <TrialCard key={trial.id} trial={trial} />
          ))}
        </div>

        <div className="border-t border-stone-200 pt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">
            Global Registry Search
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
            Search ClinicalTrials.gov
          </h2>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-8">
            <p className="text-sm text-stone-600 leading-relaxed">
              Live results from the U.S. National Library of Medicine&apos;s public
              clinical trial registry — this is a link-out search, not a MedByClick
              recommendation or eligibility match. <strong className="text-stone-900">
              Always confirm eligibility with the study team before making any decisions.</strong>
            </p>
          </div>
          <TrialSearch />
        </div>
      </div>
    </div>
  );
}
