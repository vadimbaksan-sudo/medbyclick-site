// Server-side client for the ClinicalTrials.gov API v2 (public NIH/NLM
// registry — https://clinicaltrials.gov/data-api/api). No API key exists
// for this API; it is fully open for read access. Called only from
// app/api/clinicaltrials/search/route.ts, never directly from the browser,
// so we have one place to add caching/timeouts/error handling later.
//
// SCOPE NOTE: this returns raw, government-registry trial listings for
// display and link-out only — it does not generate, summarize, or assert
// any clinical judgment about a trial's suitability for a given patient.
// Per docs/ROADMAP.md Sequencing Principle 3, medtrials is a clinical
// feature that gets a Medical Advisory consult before the *product*
// treats this as a real, launched feature (framing, eligibility-matching
// claims, etc.) — see docs/decision-log/0006-clinicaltrials-gov-integration.md.

const CTGOV_BASE_URL = "https://clinicaltrials.gov/api/v2/studies";

const FIELDS = [
  "NCTId",
  "BriefTitle",
  "OverallStatus",
  "Condition",
  "Phase",
  "InterventionName",
  "LeadSponsorName",
  "LocationCity",
  "LocationCountry",
  "EligibilityCriteria",
  "CompletionDate",
  "BriefSummary",
].join(",");

export interface RemoteTrial {
  nctId: string;
  title: string;
  status: string;
  conditions: string[];
  phases: string[];
  interventions: string[];
  sponsor: string;
  locations: string[];
  eligibilitySummary: string;
  completionDate: string;
  summary: string;
  url: string;
}

interface CtGovStudy {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string };
    statusModule?: { overallStatus?: string; completionDateStruct?: { date?: string } };
    conditionsModule?: { conditions?: string[] };
    designModule?: { phases?: string[] };
    armsInterventionsModule?: { interventions?: { name?: string }[] };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    contactsLocationsModule?: { locations?: { city?: string; country?: string }[] };
    eligibilityModule?: { eligibilityCriteria?: string };
    descriptionModule?: { briefSummary?: string };
  };
}

function mapStudy(study: CtGovStudy): RemoteTrial | null {
  const p = study.protocolSection;
  const nctId = p?.identificationModule?.nctId;
  if (!nctId) return null;

  return {
    nctId,
    title: p?.identificationModule?.briefTitle ?? "Untitled study",
    status: p?.statusModule?.overallStatus ?? "UNKNOWN",
    conditions: p?.conditionsModule?.conditions ?? [],
    phases: p?.designModule?.phases ?? [],
    interventions: (p?.armsInterventionsModule?.interventions ?? [])
      .map((i) => i.name)
      .filter((n): n is string => Boolean(n)),
    sponsor: p?.sponsorCollaboratorsModule?.leadSponsor?.name ?? "Unknown sponsor",
    locations: (p?.contactsLocationsModule?.locations ?? [])
      .map((l) => [l.city, l.country].filter(Boolean).join(", "))
      .filter((s, i, arr) => s && arr.indexOf(s) === i)
      .slice(0, 5),
    eligibilitySummary: (p?.eligibilityModule?.eligibilityCriteria ?? "").slice(0, 600),
    completionDate: p?.statusModule?.completionDateStruct?.date ?? "Not specified",
    summary: (p?.descriptionModule?.briefSummary ?? "").slice(0, 500),
    url: `https://clinicaltrials.gov/study/${nctId}`,
  };
}

export async function searchClinicalTrials(
  condition: string,
  pageSize = 10
): Promise<{ trials: RemoteTrial[]; totalHint: number }> {
  const params = new URLSearchParams({
    "query.cond": condition,
    "filter.overallStatus": "RECRUITING",
    pageSize: String(pageSize),
    fields: FIELDS,
  });

  const res = await fetch(`${CTGOV_BASE_URL}?${params.toString()}`, {
    // Public, slow-changing registry data — cache at the edge for an hour
    // rather than hitting clinicaltrials.gov on every page view.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`ClinicalTrials.gov API returned ${res.status}`);
  }

  const data = (await res.json()) as { studies?: CtGovStudy[] };
  const trials = (data.studies ?? [])
    .map(mapStudy)
    .filter((t): t is RemoteTrial => t !== null);

  return { trials, totalHint: trials.length };
}
