import { medications } from "@/modules/medpharmaccess/data";
import MedicationCard from "@/modules/medpharmaccess/components/MedicationCard";

export const metadata = {
  title: "MedPharmAccess — Pharmacy Access · MedByClick",
  description: "Cross-border medication access and rare drug sourcing.",
};

export default function MedPharmAccessPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedPharmAccess Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pharmacy Access</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Cross-border medication sourcing, compassionate use coordination, and insurance authorization support for hard-to-access drugs.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Important:</strong> MedByClick does not dispense medication. We coordinate access — including compassionate use applications, insurance prior authorizations, and cross-border import documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {medications.map((med) => (
            <MedicationCard key={med.id} medication={med} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4 text-sm">Looking for a medication not listed here?</p>
          <a
            href="/book"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Contact Our Pharmacy Coordinator
          </a>
        </div>
      </div>
    </div>
  );
}
