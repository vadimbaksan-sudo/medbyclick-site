// Server-side client for NCBI's PubMed E-utilities (public NLM/NIH API —
// https://www.ncbi.nlm.nih.gov/books/NBK25501/). No API key required for
// this volume of traffic; NCBI's usage policy asks callers to identify
// themselves via `tool`/`email` params, which we do below (courtesy, not
// a hard auth requirement). Called only from app/api/pubmed/search/route.ts.
//
// SCOPE: this module is for MEDICAL STUDENTS/professionals — peer-reviewed
// journal literature search, not patient-facing content. It's added
// alongside mededu's existing patient course list, not replacing it — see
// docs/decision-log/0007-pubmed-integration.md. Results are unfiltered
// PubMed listings for a user-entered query: no MedByClick-authored medical
// interpretation or summary, same "link-out, not clinical guidance"
// boundary used for the ClinicalTrials.gov integration.

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const TOOL_PARAMS = "tool=medbyclick&email=info@medbyclick.com";

export interface PubMedArticle {
  pmid: string;
  title: string;
  journal: string;
  pubDate: string;
  authors: string[];
  url: string;
}

interface ESearchResponse {
  esearchresult?: { idlist?: string[] };
}

interface ESummaryResult {
  uid?: string;
  title?: string;
  fulljournalname?: string;
  source?: string;
  pubdate?: string;
  authors?: { name?: string }[];
}

interface ESummaryResponse {
  result?: Record<string, ESummaryResult | string[]>;
}

export async function searchPubMed(query: string, retmax = 10): Promise<PubMedArticle[]> {
  const searchParams = new URLSearchParams({
    db: "pubmed",
    term: query,
    retmax: String(retmax),
    retmode: "json",
    sort: "relevance",
  });

  const searchRes = await fetch(`${EUTILS_BASE}/esearch.fcgi?${searchParams.toString()}&${TOOL_PARAMS}`, {
    next: { revalidate: 3600 },
  });
  if (!searchRes.ok) throw new Error(`PubMed esearch returned ${searchRes.status}`);

  const searchData = (await searchRes.json()) as ESearchResponse;
  const ids = searchData.esearchresult?.idlist ?? [];
  if (ids.length === 0) return [];

  const summaryParams = new URLSearchParams({
    db: "pubmed",
    id: ids.join(","),
    retmode: "json",
  });

  const summaryRes = await fetch(`${EUTILS_BASE}/esummary.fcgi?${summaryParams.toString()}&${TOOL_PARAMS}`, {
    next: { revalidate: 3600 },
  });
  if (!summaryRes.ok) throw new Error(`PubMed esummary returned ${summaryRes.status}`);

  const summaryData = (await summaryRes.json()) as ESummaryResponse;

  return ids
    .map((id) => {
      const entry = summaryData.result?.[id];
      if (!entry || Array.isArray(entry)) return null;
      return {
        pmid: id,
        title: entry.title ?? "Untitled",
        journal: entry.fulljournalname ?? entry.source ?? "Unknown journal",
        pubDate: entry.pubdate ?? "Unknown date",
        authors: (entry.authors ?? []).map((a) => a.name).filter((n): n is string => Boolean(n)),
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      };
    })
    .filter((a): a is PubMedArticle => a !== null);
}
