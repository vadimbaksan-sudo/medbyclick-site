import type { LogisticsCase } from "../types";

const STATUS_CLASS: Record<LogisticsCase["status"], string> = {
  on_track: "bg-green-100 text-green-700",
  at_risk: "bg-amber-100 text-amber-700",
  delayed: "bg-red-100 text-red-700",
  resolved: "bg-stone-200 text-stone-600",
};

const STATUS_LABEL: Record<LogisticsCase["status"], string> = {
  on_track: "On Track",
  at_risk: "At Risk",
  delayed: "Delayed",
  resolved: "Resolved",
};

const VISA_LABEL: Record<LogisticsCase["visaStatus"], string> = {
  not_started: "Visa: not started",
  documents_requested: "Visa: documents requested",
  under_review: "Visa: under embassy review",
  approved: "Visa: approved",
};

const TYPE_LABEL: Record<LogisticsCase["travelerType"], string> = {
  patient: "Patient",
  physician_trainee: "Physician / Trainee",
};

export default function LogisticsCaseCard({ item }: { item: LogisticsCase }) {
  return (
    <div className="border border-stone-100 rounded-2xl p-6 hover:border-stone-300 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_CLASS[item.status]}`}>
          {STATUS_LABEL[item.status]}
        </span>
        <span className="text-xs text-stone-400">{TYPE_LABEL[item.travelerType]}</span>
      </div>

      <p className="font-semibold text-stone-900">{item.travelerRef}</p>
      <p className="text-sm text-stone-500 mb-1">
        {item.originCountry} → {item.destinationCity}, {item.destinationCountry}
      </p>
      <p className="text-xs text-stone-400 mb-3">Travel date: {item.travelDate}</p>

      <p className="text-xs font-medium text-stone-600 mb-2">{VISA_LABEL[item.visaStatus]}</p>
      <p className="text-sm text-stone-500 leading-relaxed italic border-l-2 border-amber-300 pl-3">
        {item.notes}
      </p>
    </div>
  );
}
