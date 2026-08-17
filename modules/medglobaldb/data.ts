import type { GlobalDoctor } from "./types";
import { seedDoctors } from "@/lib/db/seed/doctors.seed";
import { listGlobalDbDoctors } from "@/lib/db/queries/doctors";
import type { DbDoctorProfile } from "@/lib/db/schema";

/**
 * medglobaldb's view over the unified `doctor_profiles` table (spec
 * §2.3/§3.1): the broader international directory, academic-stats-driven.
 *
 * `globalDoctors` (static array below) is the seed-derived fallback, used
 * when no live database is configured. Filtered by the presence of
 * academic-stats fields (institution/hIndex), which is what always
 * distinguished medglobaldb's international directory entries. Content is
 * unchanged from the original 5-doctor mock array.
 */
export const globalDoctors: GlobalDoctor[] = seedDoctors
  .filter((d) => Boolean(d.institution))
  .map((d): GlobalDoctor => ({
    id: d.slug,
    name: d.name,
    title: d.title ?? "",
    specialty: d.specialty,
    institution: d.institution ?? "",
    country: d.country ?? "",
    city: d.city ?? "",
    languages: (d.languages as string[] | undefined) ?? [],
    hIndex: d.hIndex ?? 0,
    publications: d.publications ?? 0,
    verified: d.verified ?? false,
  }));

function mapDbDoctor(d: DbDoctorProfile): GlobalDoctor {
  return {
    id: d.slug ?? d.id,
    name: d.name,
    title: d.title ?? "",
    specialty: d.specialty,
    institution: d.institution ?? "",
    country: d.country ?? "",
    city: d.city ?? "",
    languages: d.languages ?? [],
    hIndex: d.hIndex ?? 0,
    publications: d.publications ?? 0,
    verified: d.verified,
  };
}

/**
 * Real Drizzle query with a fallback to the static `globalDoctors` array
 * above when no database is configured. See modules/medconnect/data.ts's
 * `getMedconnectDoctors()` for the identical pattern (docs/decision-log/0009).
 */
export async function getGlobalDbDoctors(): Promise<GlobalDoctor[]> {
  const rows = await listGlobalDbDoctors();
  return rows ? rows.map(mapDbDoctor) : globalDoctors;
}
