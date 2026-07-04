import type { Doctor } from "./types";
import { seedDoctors } from "@/lib/db/seed/doctors.seed";

/**
 * medconnect's view over the unified `doctor_profiles` table (spec
 * §2.3/§3.1): the vetted local (Israel) network, endorsement-driven.
 *
 * This is no longer a standalone hardcoded array — it's an adapter over
 * lib/db/seed/doctors.seed.ts, the same seed data lib/db/seed/run.ts
 * inserts into `doctor_profiles`. Once a live Supabase database is seeded,
 * swap this for `listMedconnectDoctors()` from lib/db/queries/doctors.ts
 * (which queries `WHERE vetting_status = 'approved'`); until then, this
 * static derivation keeps the existing browse pages working without a live
 * DB connection, filtered the same way medconnect's cards always were —
 * doctors with a founder endorsement, the local-network hallmark. Content
 * is unchanged from the original 10-doctor mock array.
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
