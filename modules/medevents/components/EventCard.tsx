import type { MedEvent } from "../types";
import { Calendar, MapPin } from "lucide-react";

const typeBadge: Record<MedEvent["type"], string> = {
  conference: "bg-blue-100 text-blue-700",
  webinar: "bg-violet-100 text-violet-700",
  workshop: "bg-green-100 text-green-700",
  summit: "bg-amber-100 text-amber-700",
};

export default function EventCard({ event }: { event: MedEvent }) {
  return (
    <div className="border border-stone-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${typeBadge[event.type]}`}>
          {event.type}
        </span>
        {event.registrationOpen ? (
          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            Registration Open
          </span>
        ) : (
          <span className="text-xs font-medium bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
            Coming Soon
          </span>
        )}
      </div>

      <h3 className="font-bold text-stone-900 leading-snug mb-2">{event.title}</h3>

      <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
      </div>

      <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-3">{event.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {event.topics.map((t) => (
          <span key={t} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{t}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <span className="text-xs text-stone-400">{event.price}</span>
        <button
          disabled={!event.registrationOpen}
          className="text-sm font-medium bg-stone-900 hover:bg-stone-700 disabled:opacity-40 text-white px-4 py-1.5 rounded-lg transition-colors"
        >
          {event.registrationOpen ? "Register" : "Notify Me"}
        </button>
      </div>
    </div>
  );
}
