import { NextRequest, NextResponse } from "next/server";
import { searchClinicalTrials } from "@/lib/clinicaltrials/api";

// Proxies to the public ClinicalTrials.gov API v2 (no API key — see
// lib/clinicaltrials/api.ts for the scope note on why this is display/
// link-out only, not clinical guidance).
export async function GET(request: NextRequest) {
  const condition = request.nextUrl.searchParams.get("condition")?.trim();

  if (!condition) {
    return NextResponse.json(
      { status: "error", message: "Please enter a condition to search." },
      { status: 400 }
    );
  }

  try {
    const { trials } = await searchClinicalTrials(condition, 10);
    return NextResponse.json({ status: "ok", trials });
  } catch (err) {
    console.error("[api/clinicaltrials/search] fetch failed", err);
    return NextResponse.json(
      {
        status: "error",
        message: "ClinicalTrials.gov is temporarily unavailable. Please try again shortly.",
      },
      { status: 502 }
    );
  }
}
