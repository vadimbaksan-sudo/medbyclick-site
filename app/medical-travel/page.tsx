import Link from "next/link";

export const metadata = {
  title: "Medical Travel — MedByClick",
  description: "End-to-end medical travel coordination for international patients seeking treatment in Israel.",
};

const services = [
  {
    icon: "✈️",
    title: "Travel Coordination",
    description: "Flight and accommodation recommendations timed to your treatment schedule, with medical transport arranged where needed.",
  },
  {
    icon: "🏥",
    title: "Hospital & Clinic Access",
    description: "Direct access to Israel's top-tier medical centers including Sheba, Hadassah, Rabin, and Sourasky.",
  },
  {
    icon: "🌐",
    title: "Translation & Interpretation",
    description: "Medical interpreters in Russian, Hebrew, and English — in the room with you for every consultation.",
  },
  {
    icon: "📋",
    title: "Record Management",
    description: "We gather, translate, and organise your medical records before you arrive so your doctors can focus on care.",
  },
  {
    icon: "🏨",
    title: "Recovery Accommodation",
    description: "Vetted apartments and hotel rooms near major medical centers, suitable for post-procedure recovery.",
  },
  {
    icon: "📞",
    title: "24/7 Coordination Line",
    description: "A direct line to our coordinator throughout your trip — for questions, emergencies, or last-minute scheduling changes.",
  },
];

const destinations = [
  { city: "Tel Aviv", hospitals: "Sourasky (Ichilov), Assuta", specialties: "Oncology, Cardiology, Orthopedics" },
  { city: "Jerusalem", hospitals: "Hadassah Ein Kerem & Mt Scopus", specialties: "Neurology, Rare diseases, Hematology" },
  { city: "Petah Tikva", hospitals: "Rabin Medical Center (Beilinson)", specialties: "Gastroenterology, Transplant, Pediatrics" },
  { city: "Haifa", hospitals: "Rambam Health Care Campus", specialties: "Trauma, Oncology, Cardiac surgery" },
];

export default function MedicalTravelPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            Medical travel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Treatment in Israel, handled end-to-end</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            We coordinate every aspect of your medical journey — from the first specialist consultation to your flight home. You focus on your health; we handle the logistics.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/book/"
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors"
            >
              Start planning my trip
            </Link>
            <Link
              href="/specialists/"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 hover:border-slate-400 text-white rounded-lg text-sm transition-colors"
            >
              Browse specialists
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">What we handle for you</h2>
        <p className="text-slate-500 text-sm mb-10">Full-service coordination from first inquiry to return home.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-sm transition-all">
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Treatment destinations</h2>
          <p className="text-slate-500 text-sm mb-8">Israel's leading medical centers, accessible through our network.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((d) => (
              <div key={d.city} className="bg-white border border-slate-200 rounded-2xl p-5">
                <p className="font-bold text-slate-900 mb-1">{d.city}</p>
                <p className="text-xs text-slate-500 mb-2">{d.hospitals}</p>
                <p className="text-xs text-amber-700 font-medium">{d.specialties}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "40+", label: "Years of clinical relationships", sub: "Founder's personal network" },
              { value: "15+", label: "Countries patients travel from", sub: "Primarily CIS and Europe" },
              { value: "24h", label: "Typical coordination response", sub: "From inquiry to plan" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-black text-amber-500 mb-2">{stat.value}</p>
                <p className="font-semibold text-slate-900 text-sm">{stat.label}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-t border-amber-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to plan your trip?</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Tell us about your condition and your travel dates. We&apos;ll match you to the right specialist and coordinate the rest.
          </p>
          <Link
            href="/book/"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
