interface ComingSoonItem {
  title: string;
  description: string;
}

/**
 * Honest "not built yet" list for the large pieces of the MedConnect spec
 * that are genuinely separate bodies of work, not a shell-able preview —
 * per Vadim's 2026-08-19 request to list these explicitly rather than
 * pretend they don't exist in the spec. See docs/decision-log/0009 for the
 * full gap analysis this is drawn from.
 */
const ITEMS: ComingSoonItem[] = [
  {
    title: "Live video consultations",
    description: "HD video/audio rooms with a shared DICOM viewer and screen share.",
  },
  {
    title: "Real-time medical translation",
    description: "Live and async translation of consultations and reports across languages.",
  },
  {
    title: "Doctor license verification",
    description: "Per-jurisdiction telemedicine license checks before a case can be accepted.",
  },
  {
    title: "MedPharmaAccess integration",
    description: "Prescribed medications routed automatically for cross-border access checks.",
  },
  {
    title: "MedTrials integration",
    description: "Automatic flagging when a case matches an active clinical trial's criteria.",
  },
  {
    title: "MedAgent integration",
    description: "Concierge intake and scheduling on a patient's behalf.",
  },
  {
    title: "Metrics & reporting dashboard",
    description: "Case volume by urgency, SLA breach rate, completeness fail rate, cycle time.",
  },
];

export default function ComingSoonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ITEMS.map((item) => (
        <div key={item.title} className="border border-dashed border-stone-300 rounded-lg p-5 bg-stone-50">
          <span className="text-[10px] font-bold uppercase tracking-wide text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
            Coming soon
          </span>
          <p className="text-sm font-semibold text-stone-900 mt-2 mb-1">{item.title}</p>
          <p className="text-xs text-stone-500 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
