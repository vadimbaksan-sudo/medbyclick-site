import { logisticsCases } from "@/modules/medlogistics/data";
import LogisticsCaseCard from "@/modules/medlogistics/components/LogisticsCaseCard";

export const metadata = {
  title: "MedLogistics — Travel & Visa Coordination · MedByClick",
  description: "Visa, travel, and on-ground coordination for patients and physician trainees.",
};

export default function MedLogisticsPage() {
  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MedLogistics Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel &amp; Visa Coordination</h1>
          <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
            Turns a confirmed treatment plan or training placement into a coordinated
            physical journey — flights, visas, accommodation, and on-ground support.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-stone-600 leading-relaxed">
            <strong className="text-stone-900">Preview module — not yet live.</strong> The
            cases below are illustrative placeholder data, not real travelers or real
            bookings. Real visa facilitation and travel booking require partner
            integrations that haven&apos;t been built yet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {logisticsCases.map((item) => (
            <LogisticsCaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
