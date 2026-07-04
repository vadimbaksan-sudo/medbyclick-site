import type { GlobalDoctor } from "./types";
import { seedDoctors } from "@/lib/db/seed/doctors.seed";

/**
 * medglobaldb's view over the unified `doctor_profiles` table (spec
 * §2.3/§3.1): the broader international directory, academic-stats-driven.
 *
 * Adapter over lib/db/seed/doctors.seed.ts — see modules/medconnect/data.ts's
 * identical comment. Once a live Supabase database is seeded, swap this for
 * `listGlobalDbDoctors()` from lib/db/queries/doctors.ts. Filtered here by
 * the presence of academic-stats fields (institution/hIndex), which is what
 * always distinguished medglobaldb's international directory entries.
 * Content is unchanged from the original 5-doctor mock array.
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
