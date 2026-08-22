import Link from "next/link";
import { getMedconnectDoctors } from "@/modules/medconnect/getDoctors";
import DoctorsGrid from "./DoctorsGrid";

export const metadata = {
  title: "Our Specialists — MedByClick",
  description: "Browse our personally vetted network of medical specialists.",
};

export default async function DoctorsPage() {
  const doctors = await getMedconnectDoctors();
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
            Our specialists
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            The network
          </h1>
          <p className="text-stone-600 max-w-xl leading-relaxed">
            Every doctor here has been personally vetted by the founder — known through
            years of clinical collaboration, not credential review.
          </p>
        </div>
      </div>

      <DoctorsGrid doctors={doctors} />

      {/* CTA */}
      <div className="bg-stone-50 border-t border-stone-100 py-16">
        <div className="max-w-xl mx-auto text-center px-4">
          <p className="text-stone-600 mb-6">
            Not sure which specialist is right for your case? Tell us what you&apos;re
            dealing with — we&apos;ll route you.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
