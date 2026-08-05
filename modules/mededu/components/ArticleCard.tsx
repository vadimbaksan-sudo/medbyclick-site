import type { PubMedArticle } from "@/lib/pubmed/api";

export default function ArticleCard({ article }: { article: PubMedArticle }) {
  return (
    <div className="border border-stone-100 rounded-2xl p-6 hover:border-stone-300 hover:shadow-md transition-all">
      <p className="font-semibold text-stone-900 leading-snug mb-1">{article.title}</p>
      <p className="text-sm text-stone-500 mb-1">
        {article.journal} · {article.pubDate}
      </p>
      {article.authors.length > 0 && (
        <p className="text-xs text-stone-400 mb-3">
          {article.authors.slice(0, 4).join(", ")}
          {article.authors.length > 4 ? ", et al." : ""}
        </p>
      )}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800"
      >
        View on PubMed →
      </a>
    </div>
  );
}
