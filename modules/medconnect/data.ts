import type { Doctor } from "./types";
import { seedDoctors } from "@/lib/db/seed/doctors.seed";
import { listMedconnectDoctors } from "@/lib/db/queries/doctors";
import type { DbDoctorProfile } from "@/lib/db/schema";

/**
 * medconnect's view over the unified `doctor_profiles` table (spec
 * §2.3/§3.1): the vetted local (Israel) network, endorsement-driven.
 *
 * `doctors` (static array below) is the seed-derived fallback, used when no
 * live database is configured. Content is unchanged from the original
 * 10-doctor mock array.
 */
export const doctors: Doctor[] = seedDoctors
  .filter((d) => Boolean(d.endorsement))
  .map((d): Doctor => ({
    id: d.slug,
    name: d.name,
    title: d.title ?? "",
    specialty: d.specialty,
    subspecialties: (d.subspecialties as string[] | undefined) ?? [],
    languages: (d.languages as string[] | undefined) ?? [],
    credentials: d.credentials ?? "",
    endorsement: d.endorsement ?? "",
    bio: d.bio ?? "",
    casesHandled: d.casesHandledOverride ?? 0,
    responseTime: d.responseTime ?? "",
  }));

function mapDbDoctor(d: DbDoctorProfile): Doctor {
  return {
    id: d.slug ?? d.id,
    name: d.name,
    title: d.title ?? "",
    specialty: d.specialty,
    subspecialties: d.subspecialties ?? [],
    languages: d.languages ?? [],
    credentials: d.credentials ?? "",
    endorsement: d.endorsement ?? "",
    bio: d.bio ?? "",
    casesHandled: d.casesHandledOverride ?? 0,
    responseTime: d.responseTime ?? "",
  };
}

/**
 * Real Drizzle query with a fallback to the static `doctors` array above
 * when no database is configured (`listMedconnectDoctors()` returns `null`
 * in that case — see lib/db/queries/doctors.ts). Prefer this over the
 * static `doctors` export in any new Server Component; the static export
 * stays only for the handful of Client Component / build-time (SSG)
 * call sites that can't `await` (docs/decision-log/0009).
 */
export async function getMedconnectDoctors(): Promise<Doctor[]> {
  const rows = await listMedconnectDoctors();
  return rows ? rows.map(mapDbDoctor) : doctors;
}
