import { events } from "@/modules/medevents/data";
import EventCard from "@/modules/medevents/components/EventCard";

export const metadata = {
  title: "MedEvents — Conferences & Webinars · MedByClick",
  description: "Medical conferences, webinars, and patient advocacy events.",
};

export default function MedEventsPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedEvents Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Conferences</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Medical conferences, patient advocacy summits, and specialist webinars — organized by and for the MedByClick network.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
