import type { DbDoctorProfile, DbBooking } from "@/lib/db/schema";

/**
 * Dual-route matching engine (Phase D, docs/decision-log/0009) — spec
 * §2 "Подбор врачей и организаций" / Step 5: given a case profile, return
 * two ranked, explainable lists — doctors for direct contact, and
 * institutions for routing through an organization. No ML: a weighted
 * scoring function over fields already on `doctor_profiles`, which is
 * sufficient for the spec's "explainable rationale" requirement (an exact
 * black-box model would be harder to explain, not easier).
 *
 * Pure functions — no DB access — so they're trivially testable against a
 * fixture array of DbDoctorProfile rows.
 */

export interface CaseProfile {
  specialty: string;
  language?: string;
  urgency: DbBooking["urgency"];
}

export interface DoctorMatch {
  doctor: DbDoctorProfile;
  score: number;
  rationale: string;
}

export interface InstitutionMatch {
  institution: string;
  score: number;
  doctorCount: number;
  rationale: string;
}

const WEIGHTS = {
  specialtyExact: 50,
  specialtySubstring: 20,
  language: 15,
  vetted: 10,
  caseVolume: 10, // scaled 0-10 by casesHandled / academic stats
  urgentResponseBonus: 15, // only applied when case is urgent and doctor's responseTime looks fast
};

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function specialtyScore(doctorSpecialty: string, caseSpecialty: string): { score: number; matched: "exact" | "partial" | "none" } {
  const a = normalize(doctorSpecialty);
  const b = normalize(caseSpecialty);
  if (!a || !b) return { score: 0, matched: "none" };
  if (a === b) return { score: WEIGHTS.specialtyExact, matched: "exact" };
  if (a.includes(b) || b.includes(a)) return { score: WEIGHTS.specialtySubstring, matched: "partial" };
  return { score: 0, matched: "none" };
}

function caseVolumeScore(d: DbDoctorProfile): number {
  // Two different "volume" signals depending on which view populated this
  // row (medconnect's casesHandledOverride vs. medglobaldb's publications) —
  // fold both into a single 0-10 scale so the two candidate pools are
  // comparable in one ranked list.
  const cases = d.casesHandledOverride ?? 0;
  const publications = d.publications ?? 0;
  const raw = Math.max(Math.min(cases / 50, 1), Math.min(publications / 100, 1));
  return raw * WEIGHTS.caseVolume;
}

function looksFastResponse(responseTime: string | null): boolean {
  if (!responseTime) return false;
  const hoursMatch = responseTime.match(/(\d+)\s*h/i);
  if (hoursMatch) return Number(hoursMatch[1]) <= 24;
  return /within (an? )?(hour|24)/i.test(responseTime);
}

/** Ranked list of individual doctors for direct-to-doctor routing. */
export function rankDoctorsForCase(candidates: DbDoctorProfile[], caseProfile: CaseProfile): DoctorMatch[] {
  const scored = candidates.map((doctor) => {
    const { score: specScore, matched } = specialtyScore(doctor.specialty, caseProfile.specialty);
    if (matched === "none") return null; // not a candidate at all for this case

    let score = specScore;
    const reasons: string[] = [matched === "exact" ? `specialty match (${doctor.specialty})` : `related specialty (${doctor.specialty})`];

    if (caseProfile.language && doctor.languages.some((l) => normalize(l) === normalize(caseProfile.language!))) {
      score += WEIGHTS.language;
      reasons.push(`speaks ${caseProfile.language}`);
    }

    if (doctor.vettingStatus === "approved") {
      score += WEIGHTS.vetted;
      reasons.push("vetted");
    }

    const volumeScore = caseVolumeScore(doctor);
    if (volumeScore > 0) {
      score += volumeScore;
      reasons.push(
        doctor.casesHandledOverride
          ? `${doctor.casesHandledOverride} cases via platform`
          : `${doctor.publications ?? 0} publications`
      );
    }

    if (caseProfile.urgency === "urgent" && looksFastResponse(doctor.responseTime)) {
      score += WEIGHTS.urgentResponseBonus;
      reasons.push(`fast response (${doctor.responseTime})`);
    }

    return {
      doctor,
      score: Math.round(score),
      rationale: reasons.join(", "),
    } satisfies DoctorMatch;
  });

  return scored
    .filter((m): m is DoctorMatch => m !== null)
    .sort((a, b) => b.score - a.score);
}

/**
 * Ranked list of institutions for the via-organization route — derived by
 * grouping the same candidate pool by `institution` (no separate
 * institutions table exists yet) and aggregating the member doctors' scores.
 * A doctor with no `institution` set (the local-network medconnect view
 * mostly has this null) contributes to the doctor-direct list only, never
 * an institution group.
 */
export function rankInstitutionsForCase(candidates: DbDoctorProfile[], caseProfile: CaseProfile): InstitutionMatch[] {
  const doctorMatches = rankDoctorsForCase(candidates, caseProfile);
  const byInstitution = new Map<string, DoctorMatch[]>();

  for (const match of doctorMatches) {
    const institution = match.doctor.institution;
    if (!institution) continue;
    const list = byInstitution.get(institution) ?? [];
    list.push(match);
    byInstitution.set(institution, list);
  }

  const institutions: InstitutionMatch[] = [];
  for (const [institution, matches] of byInstitution) {
    const bestScore = Math.max(...matches.map((m) => m.score));
    const avgScore = matches.reduce((sum, m) => sum + m.score, 0) / matches.length;
    // Weight toward the single best-matched doctor at that institution
    // (spec's "capability match" framing), with a small boost for having
    // multiple qualifying doctors on staff (redundancy / faster assignment
    // once routed).
    const score = bestScore * 0.8 + avgScore * 0.2 + Math.min(matches.length - 1, 3) * 2;
    institutions.push({
      institution,
      score: Math.round(score),
      doctorCount: matches.length,
      rationale: `${matches.length} matching specialist${matches.length > 1 ? "s" : ""} on staff, best match: ${matches[0].rationale}`,
    });
  }

  return institutions.sort((a, b) => b.score - a.score);
}
