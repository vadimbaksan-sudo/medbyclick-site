"use client";

import { useState } from "react";
import type { PubMedArticle } from "@/lib/pubmed/api";
import ArticleCard from "./ArticleCard";

export default function ArticleSearch() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<PubMedArticle[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pubmed/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok || data.status !== "ok") {
        setError(data.message ?? "Search failed. Please try again.");
        setArticles(null);
      } else {
        setArticles(data.articles);
      }
    } catch {
      setError("Could not reach PubMed. Please try again shortly.");
      setArticles(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search journal literature — e.g. cladribine multiple sclerosis, CAR-T lymphoma"
          className="flex-1 px-4 py-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-300 text-white font-medium rounded-lg text-sm transition-colors"
        >
          {loading ? "Searching…" : "Search PubMed"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

      {articles && articles.length === 0 && !error && (
        <p className="text-sm text-stone-500 mb-6">No results for &ldquo;{query}&rdquo;. Try different terms.</p>
      )}

      {articles && articles.length > 0 && (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.pmid} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
