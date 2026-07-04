import "server-only";
import { and, eq, count } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { doctorProfiles, bookings } from "@/lib/db/schema";
import type { DbDoctorProfile } from "@/lib/db/schema";

/**
 * Real Drizzle query layer over the unified `doctor_profiles` table (spec
 * §2.3/§3.1). modules/medconnect and modules/medglobaldb are two different
 * *views* over this same table, not two schemas — see the filter functions
 * below.
 *
 * These are used by the booking flow (to validate a doctorId exists / to
 * derive casesHandled from real completed bookings) and are available for
 * the browse pages to adopt directly. Every function returns `null` if the
 * database isn't configured, so callers can fall back to the static seed
 * data (modules/medconnect/data.ts, modules/medglobaldb/data.ts) rather than
 * crash when no Supabase project exists yet (this sandbox's situation).
 */

export async function getDoctorProfileById(id: string): Promise<DbDoctorProfile | null> {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db.select().from(doctorProfiles).where(eq(doctorProfiles.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getDoctorProfileBySlug(slug: string): Promise<DbDoctorProfile | null> {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db.select().from(doctorProfiles).where(eq(doctorProfiles.slug, slug)).limit(1);
  return rows[0] ?? null;
}

/** medconnect's view: the vetted local network. */
export async function listMedconnectDoctors(): Promise<DbDoctorProfile[] | null> {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  return db.select().from(doctorProfiles).where(eq(doctorProfiles.vettingStatus, "approved"));
}

/** medglobaldb's view: the broader international directory. */
export async function listGlobalDbDoctors(): Promise<DbDoctorProfile[] | null> {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  return db.select().from(doctorProfiles);
}

/**
 * spec §3.2 point 5: casesHandled should derive from real completed
 * bookings, not a hardcoded number. Falls back to the seed data's static
 * `casesHandledOverride` (via the caller) when the DB isn't configured or
 * has no bookings yet.
 */
export async function getCasesHandledCount(doctorProfileId: string): Promise<number | null> {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db
    .select({ value: count() })
    .from(bookings)
    .where(and(eq(bookings.doctorId, doctorProfileId), eq(bookings.status, "completed")));
  return rows[0]?.value ?? 0;
}
