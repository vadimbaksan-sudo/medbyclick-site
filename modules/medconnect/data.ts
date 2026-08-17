import type { Doctor } from "./types";
import { seedDoctors } from "@/lib/db/seed/doctors.seed";

/**
 * medconnect's view over the unified `doctor_profiles` table (spec
 * §2.3/§3.1): the vetted local (Israel) network, endorsement-driven.
 *
 * `doctors` (static array below) is the seed-derived fallback, used when no
 * live database is configured. Content is unchanged from the original
 * 10-doctor mock array.
 *
 * Deliberately NO `"server-only"` import anywhere in this file's chain
 * (unlike getDoctors.ts below) — lib/db/seed/doctors.seed.test.ts and any
 * other plain `bun test` file needs to import this module without pulling
 * in a module Next.js's bundler special-cases but bun's test runner can't
 * resolve. Keep it that way; put anything DB-aware in ./getDoctors.ts.
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
