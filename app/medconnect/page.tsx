import Link from "next/link";
import { getMedconnectDoctors } from "@/modules/medconnect/getDoctors";
import DoctorCard from "@/modules/medconnect/components/DoctorCard";
import CaseJourneySteps from "@/modules/medconnect/components/CaseJourneySteps";
import CaseChecklistShell from "@/modules/medconnect/components/CaseChecklistShell";
import SecondOpinionReportShell from "@/modules/medconnect/components/SecondOpinionReportShell";
import ConsiliumShell from "@/modules/medconnect/components/ConsiliumShell";
import ComingSoonGrid from "@/modules/medconnect/components/ComingSoonGrid";

export const metadata = {
  title: "MedConnect — Specialist Network · MedByClick",
  description: "Browse our personally vetted network of medical specialists.",
};

export default async function MedConnectPage() {
  const doctors = await getMedconnectDoctors();
  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MedConnect Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MedConnect — Clinical Interaction Hub</h1>
          <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
            Every doctor in this network has been personally vouched for by our founder — not matched by algorithm, not credentialed by committee.
          </p>
        </div>
      </div>

      <div className="bg-green-100 text-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 text-center">
            {[
              { value: `${doctors.length}`, label: "Verified specialists" },
              { value: `${doctors.reduce((s, d) => s + d.casesHandled, 0)}+`, label: "Cases coordinated" },
              { value: "3", label: "Countries covered" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-amber-700">{s.value}</p>
                <p className="text-xs text-stone-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-stone-900">All Specialists</h2>
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

      <div className="border-t border-stone-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-stone-900 mb-2">How a case moves through MedConnect</h2>
            <p className="text-sm text-stone-500 max-w-2xl leading-relaxed">
              The full 12-step case pipeline this module is built around — from intake to a signed
              report. Status per step reflects what&apos;s actually built today, not what&apos;s planned.
            </p>
          </div>
          <CaseJourneySteps />
        </div>
      </div>

      <div className="bg-stone-50 border-t border-stone-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Preview: inside an active case</h2>
            <p className="text-sm text-stone-500 max-w-2xl leading-relaxed">
              These normally live in a patient&apos;s or doctor&apos;s logged-in dashboard — shown here
              publicly with illustrative example data so you don&apos;t need an account to see them.
            </p>
          </div>
          <div className="space-y-10">
            <CaseChecklistShell />
            <SecondOpinionReportShell />
            <ConsiliumShell />
          </div>
        </div>
      </div>

      <div className="border-t border-stone-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-stone-900 mb-2">What&apos;s still being built</h2>
            <p className="text-sm text-stone-500 max-w-2xl leading-relaxed">
              These are separate, larger pieces of work — not previews, genuinely not started yet.
            </p>
          </div>
          <ComingSoonGrid />
        </div>
      </div>

      <div className="bg-stone-50 border-t border-stone-100 py-16">
        <div className="max-w-xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Need help choosing?</h2>
          <p className="text-stone-500 mb-6 text-sm">Tell us about your case — we route you to the right specialist within 24 hours.</p>
          <Link href="/book" className="inline-flex items-center justify-center px-6 py-3 bg-stone-900 hover:bg-stone-700 text-white font-medium rounded-lg text-sm transition-colors">
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
