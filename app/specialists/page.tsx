import Link from "next/link";
import { getMedconnectDoctors } from "@/modules/medconnect/getDoctors";
import { CONTACT } from "@/lib/contact";
import SpecialistsGrid from "./SpecialistsGrid";

export const metadata = {
  title: "Specialists — MedByClick",
  description:
    "Browse our personally vetted network of specialists across Sheba, Hadassah, Ichilov, and more. Hospital-agnostic — we route to whoever is right for your case.",
};

export default async function SpecialistsPage() {
  const doctors = await getMedconnectDoctors();
  return (
    <div>
      {/* Header */}
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
                Our network
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet the specialists</h1>
              <p className="text-stone-600 text-base max-w-2xl leading-relaxed">
                Every doctor in this network is personally known to the founder — vetted over decades of
                clinical practice, not credentialed by an algorithm. Sheba. Hadassah. Ichilov. Rambam.
                We work with all of them.
              </p>
            </div>

            {/* Contact options */}
            <div className="flex flex-col gap-2 shrink-0">
              {CONTACT.telegram && (
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#229ED9] hover:bg-[#1a8ec0] text-white font-medium rounded-lg text-sm transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.26l-2.95-.924c-.64-.203-.657-.64.136-.954l11.57-4.461c.537-.194 1.006.131.968.3z" />
                  </svg>
                  Write on Telegram
                </a>
              )}
              {CONTACT.whatsapp && (
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#1eb857] text-white font-medium rounded-lg text-sm transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.525 5.845L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.667-.507-5.193-1.391l-.373-.22-3.753.892.936-3.65-.242-.384A9.934 9.934 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Write on WhatsApp
                </a>
              )}
              <Link
                href="/book/"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-lg text-sm transition-colors"
              >
                Book a consultation
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-stone-200">
            <div>
              <p className="text-2xl font-bold text-amber-700">{doctors.length}</p>
              <p className="text-xs text-stone-500 mt-1">Specialists in the network</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">5+</p>
              <p className="text-xs text-stone-500 mt-1">Israeli hospitals covered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">40 yrs</p>
              <p className="text-xs text-stone-500 mt-1">Founder's clinical network</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-stone-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpecialistsGrid doctors={doctors} />
        </div>
      </div>
    </div>
  );
}
