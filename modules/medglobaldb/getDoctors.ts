import "server-only";
import type { GlobalDoctor } from "./types";
import { globalDoctors } from "./data";
import { listGlobalDbDoctors } from "@/lib/db/queries/doctors";
import type { DbDoctorProfile } from "@/lib/db/schema";

/**
 * DB-aware fetcher, split out from ./data.ts for the same "keep it
 * bun-test-safe" reason as modules/medconnect/getDoctors.ts.
 */

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
 * Real Drizzle query with a fallback to ./data.ts's static `globalDoctors`
 * array when no database is configured. See
 * modules/medconnect/getDoctors.ts's identical pattern.
 */
export async function getGlobalDbDoctors(): Promise<GlobalDoctor[]> {
  const rows = await listGlobalDbDoctors();
  return rows ? rows.map(mapDbDoctor) : globalDoctors;
}
