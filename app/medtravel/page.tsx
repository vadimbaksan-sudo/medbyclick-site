import { destinations, missionDestinations } from "@/modules/medtravel/data";
import DestinationCard from "@/modules/medtravel/components/DestinationCard";
import MissionDestinationCard from "@/modules/medtravel/components/MissionDestinationCard";

export const metadata = {
  title: "MedTravel — Medical Travel · MedByClick",
  description: "Cross-border care coordination between CIS countries and Israel — in both directions.",
};

// Per docs/reports/product/2026-07-04-medtravel-bidirectional-flow-spec.md
// (+ same-day addendum): the real business is bidirectional CIS<->Israel
// travel, not general international medical tourism. This page has two
// sections — patient travels to Israel (real, named hospitals) and doctor
// travels to a CIS partner hospital (real partnership countries, hospital
// name pending) — not a single undifferentiated destination list.
export default function MedTravelPage() {
  return (
    <div>
      <div className="bg-stone-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedTravel Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Travel</h1>
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed">
            World-class care isn&apos;t always local. Whether you travel to Israel or an Israeli doctor
            travels to you, we coordinate treatment end-to-end — from consultation to recovery.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-xl font-bold text-stone-900 mb-1">Travel to Israel for treatment</h2>
          <p className="text-sm text-stone-500 mb-6">
            Israel&apos;s leading medical centers, accessible through our network — primarily for
            patients traveling from CIS countries.
          </p>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-stone-900 mb-1">An Israeli doctor travels to you</h2>
          <p className="text-sm text-stone-500 mb-6">
            Confirmed hospital partnerships where a visiting Israeli doctor treats patients on-site
            under the host hospital&apos;s own licensing framework. Partner hospital names below are
            still pending — the partnership countries are real, the names are not yet published.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {missionDestinations.map((d) => (
              <MissionDestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </section>

        <div className="bg-stone-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6">What we handle</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🗓", text: "Appointment scheduling in local time zones" },
              { icon: "📋", text: "Medical record translation & preparation" },
              { icon: "✈️", text: "Travel & accommodation recommendations" },
              { icon: "🔄", text: "Follow-up coordination back home" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
