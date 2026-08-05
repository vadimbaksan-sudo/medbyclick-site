import { NextRequest, NextResponse } from "next/server";
import { searchPubMed } from "@/lib/pubmed/api";

// Proxies to NCBI PubMed E-utilities (no API key — see lib/pubmed/api.ts
// for the scope note: literature search for students/professionals,
// link-out only, no MedByClick-authored medical interpretation).
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json(
      { status: "error", message: "Please enter a search term." },
      { status: 400 }
    );
  }

  try {
    const articles = await searchPubMed(query, 10);
    return NextResponse.json({ status: "ok", articles });
  } catch (err) {
    console.error("[api/pubmed/search] fetch failed", err);
    return NextResponse.json(
      { status: "error", message: "PubMed is temporarily unavailable. Please try again shortly." },
      { status: 502 }
    );
  }
}
