import { trials } from "@/modules/medtrials/data";
import TrialCard from "@/modules/medtrials/components/TrialCard";

export const metadata = {
  title: "MedTrials — Clinical Research · MedByClick",
  description: "Clinical trials access and experimental treatment matching.",
};

export default function MedTrialsPage() {
  const recruiting = trials.filter((t) => t.status === "recruiting");

  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedTrials Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Clinical Trials</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
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

        <div className="space-y-6">
          {trials.map((trial) => (
            <TrialCard key={trial.id} trial={trial} />
          ))}
        </div>
      </div>
    </div>
  );
}
