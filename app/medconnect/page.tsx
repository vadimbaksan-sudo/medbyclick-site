import Link from "next/link";
import { doctors } from "@/modules/medconnect/data";
import DoctorCard from "@/modules/medconnect/components/DoctorCard";

export const metadata = {
  title: "MedConnect — Specialist Network · MedByClick",
  description: "Browse our personally vetted network of medical specialists.",
};

export default function MedConnectPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedConnect Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Specialist Network</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Every doctor in this network has been personally vouched for by our founder — not matched by algorithm, not credentialed by committee.
          </p>
        </div>
      </div>

      <div className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 text-center">
            {[
              { value: `${doctors.length}`, label: "Verified specialists" },
              { value: `${doctors.reduce((s, d) => s + d.casesHandled, 0)}+`, label: "Cases coordinated" },
              { value: "3", label: "Countries covered" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-amber-400">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900">All Specialists</h2>
          <Link href="/book" className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
            Not sure? Let us match you →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Need help choosing?</h2>
          <p className="text-slate-500 mb-6 text-sm">Tell us about your case — we route you to the right specialist within 24 hours.</p>
          <Link href="/book" className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white font-medium rounded-lg text-sm transition-colors">
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
