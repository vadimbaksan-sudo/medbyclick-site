type StepStatus = "live" | "preview" | "planned" | "blocked";

interface Step {
  n: number;
  title: string;
  description: string;
  status: StepStatus;
}

/**
 * Public visual walkthrough of MedConnect's 12-step case state machine
 * (source: "MedByClick — MedConnect — Центр клинического взаимодействия"
 * spec §3.2, supplied by Marina 2026-08-11; build status verified against
 * code per docs/decision-log/0009). Added 2026-08-19 per Vadim's request —
 * previously this pipeline had no visual representation anywhere on the
 * site, gated or not.
 *
 * Status per step reflects the actual codebase, not the spec's intent:
 * - live: real, working code, no compliance gate
 * - preview: real code exists but isn't reachable by a user yet. Usually a
 *   schema + synthetic-data UI shell (see the shells rendered below this
 *   component on /medconnect); step 5 is the one exception — its matching
 *   engine (lib/matching/doctorMatch.ts) is real and unit-tested, just not
 *   wired into a live page yet (2026-08-20 /autoplan retrospective review
 *   caught this step mislabeled "live").
 * - planned: nothing built yet
 * - blocked: real code exists but is intentionally gated behind a Legal &
 *   Compliance / Medical Advisory sign-off, not a "todo"
 */
const STEPS: Step[] = [
  {
    n: 1,
    title: "Structured intake",
    description: "Chief complaint, prior diagnoses, medications, allergies, treatment goals.",
    status: "planned",
  },
  {
    n: 2,
    title: "Document upload & AI structuring",
    description: "DICOM, lab PDFs, pathology reports — auto-extracted into a case timeline.",
    status: "preview",
  },
  {
    n: 3,
    title: "Completeness check",
    description: "Case can't proceed until every required document is present.",
    status: "preview",
  },
  {
    n: 4,
    title: "AI triage",
    description: "Urgency scoring (routine / priority / urgent) from symptoms and diagnosis code.",
    status: "blocked",
  },
  {
    n: 5,
    title: "Doctor & institution matching",
    description: "Two ranked, explainable shortlists — direct-to-doctor and via-institution.",
    status: "preview",
  },
  {
    n: 6,
    title: "Route selection",
    description: "Patient (or MedAgent) chooses: a specific doctor, or a hospital that assigns one.",
    status: "planned",
  },
  {
    n: 7,
    title: "Doctor confirms",
    description: "The assigned doctor accepts the case.",
    status: "live",
  },
  {
    n: 8,
    title: "Case accepted",
    description: "Doctor reviews the structured summary and imaging within the SLA window.",
    status: "live",
  },
  {
    n: 9,
    title: "Consultation",
    description: "Live video, async store-and-forward, or a multidisciplinary consilium.",
    status: "planned",
  },
  {
    n: 10,
    title: "Structured report drafted",
    description: "Diagnosis concurrence, alternatives, risk, next steps — doctor edits an AI draft.",
    status: "preview",
  },
  {
    n: 11,
    title: "Digital signature",
    description: "Unsigned or AI-only drafts can never be issued — a hard rule, not a setting.",
    status: "preview",
  },
  {
    n: 12,
    title: "Report issued, paid, closed",
    description: "Patient downloads the signed report; case closes or hands off to another module.",
    status: "planned",
  },
];

const STATUS_LABEL: Record<StepStatus, string> = {
  live: "Live",
  preview: "Preview",
  planned: "Planned",
  blocked: "Blocked (compliance)",
};

const STATUS_CLASS: Record<StepStatus, string> = {
  live: "bg-green-100 text-green-700",
  preview: "bg-amber-100 text-amber-700",
  planned: "bg-stone-100 text-stone-500",
  blocked: "bg-stone-200 text-stone-700",
};

export default function CaseJourneySteps() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STEPS.map((step) => (
          <div key={step.n} className="border border-stone-200 rounded-lg p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-stone-400">Step {step.n}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${STATUS_CLASS[step.status]}`}>
                {STATUS_LABEL[step.status]}
              </span>
            </div>
            <p className="text-sm font-semibold text-stone-900 mb-1">{step.title}</p>
            <p className="text-xs text-stone-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-5 text-xs text-stone-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" /> Live — real, working
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Preview — synthetic example only
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-stone-400" /> Planned — not started
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-stone-600" /> Blocked — built, pending compliance sign-off
        </span>
      </div>
    </div>
  );
}
