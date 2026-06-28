import { destinations } from "@/modules/medtravel/data";
import DestinationCard from "@/modules/medtravel/components/DestinationCard";

export const metadata = {
  title: "MedTravel — Medical Tourism · MedByClick",
  description: "Curated international medical care destinations.",
};

export default function MedTravelPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedTravel Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Tourism</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            World-class care isn&apos;t always local. We coordinate treatment abroad — from consultation to recovery — so you focus on getting better.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">What we handle</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🗓", text: "Appointment scheduling in local time zones" },
              { icon: "📋", text: "Medical record translation & preparation" },
              { icon: "✈️", text: "Travel & accommodation recommendations" },
              { icon: "🔄", text: "Follow-up coordination back home" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
