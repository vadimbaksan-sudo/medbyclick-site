import { campaigns } from "@/modules/medgive/data";
import CampaignCard from "@/modules/medgive/components/CampaignCard";

export const metadata = {
  title: "MedGive — Medical Crowdfunding · MedByClick",
  description: "Individually-verified medical crowdfunding and charitable patient support.",
};

export default function MedGivePage() {
  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MedGive Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MedGive — Individual Patient Medical Crowdfunding & Charitable Support</h1>
          <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
            Every campaign is tied to a specific, clinic-verified medical case. Funds are held in
            escrow and paid directly to the treating clinic — never disbursed as cash to the patient.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-stone-600 leading-relaxed">
            <strong className="text-stone-900">Preview module — not yet live.</strong> The campaigns
            below are illustrative placeholders, not real patients or real funds. MedGive requires
            jurisdiction-specific charitable-solicitation registration, KYC/AML review, and a
            formal legal sign-off before any real donation is processed. No money changes hands on
            this page yet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-500 mb-4 text-sm">
            Know a patient who needs verified, transparent fundraising support?
          </p>
          <a
            href="/book"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </div>
  );
}
