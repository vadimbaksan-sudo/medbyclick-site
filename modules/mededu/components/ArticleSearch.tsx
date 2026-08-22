"use client";

import { useState } from "react";
import type { PubMedArticle } from "@/lib/pubmed/api";
import ArticleCard from "./ArticleCard";
import { Skeleton } from "@/components/Skeleton";

function ArticleCardSkeleton() {
  return (
    <div className="border border-stone-100 rounded-2xl p-6">
      <Skeleton className="h-4 w-3/4 rounded mb-2" />
      <Skeleton className="h-3.5 w-1/2 rounded mb-2" />
      <Skeleton className="h-3 w-2/5 rounded mb-3" />
      <Skeleton className="h-3.5 w-28 rounded" />
    </div>
  );
}

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
          className="px-6 py-3 border border-stone-300 hover:border-stone-400 disabled:opacity-60 text-stone-900 font-medium rounded-lg text-sm transition-colors"
        >
          {loading ? "Searching…" : "Search PubMed"}
        </button>
      </form>

      {loading && (
        <div className="space-y-4">
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </div>
      )}

      {!loading && error && <p className="text-sm text-red-600 mb-6">{error}</p>}

      {!loading && articles && articles.length === 0 && !error && (
        <p className="text-sm text-stone-500 mb-6">No results for &ldquo;{query}&rdquo;. Try different terms.</p>
      )}

      {!loading && articles && articles.length > 0 && (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.pmid} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
