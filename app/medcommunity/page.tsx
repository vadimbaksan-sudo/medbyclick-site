import { threads, categories } from "@/modules/medcommunity/data";
import ThreadCard from "@/modules/medcommunity/components/ThreadCard";

export const metadata = {
  title: "MedCommunity — Patient Forums · MedByClick",
  description: "Patient forums, shared experiences, and peer support.",
};

export default function MedCommunityPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedCommunity Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Patient Community</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            A moderated forum for patients navigating complex conditions. Real stories, practical advice, specialist-verified information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  i === 0 ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex-shrink-0 ml-4 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-semibold rounded-lg transition-colors">
            + New Post
          </button>
        </div>

        <div className="space-y-4">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      </div>
    </div>
  );
}
