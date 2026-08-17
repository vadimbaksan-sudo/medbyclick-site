import "server-only";
import type { Doctor } from "./types";
import { doctors } from "./data";
import { listMedconnectDoctors } from "@/lib/db/queries/doctors";
import type { DbDoctorProfile } from "@/lib/db/schema";

/**
 * DB-aware fetcher, split out from ./data.ts so that file can stay
 * `"server-only"`-free and importable from plain `bun test` files
 * (lib/db/seed/doctors.seed.test.ts) — see ./data.ts's comment for why.
 */

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
 * Real Drizzle query with a fallback to ./data.ts's static `doctors` array
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
