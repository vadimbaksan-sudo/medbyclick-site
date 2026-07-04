import "server-only";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { bookings, doctorProfiles } from "@/lib/db/schema";
import type { NewDbBooking } from "@/lib/db/schema";

/**
 * Real Drizzle query layer for bookings — replaces
 * app/book/BookForm.tsx's fake `setTimeout` (spec §3.2). Requires
 * DATABASE_URL; callers (Server Actions) must check isDatabaseConfigured()
 * themselves and degrade gracefully — these functions assume the caller
 * already did that check (see lib/booking/actions.ts).
 */

export async function createBooking(input: NewDbBooking) {
  const db = getDb();
  const rows = await db.insert(bookings).values(input).returning();
  return rows[0];
}

export async function listBookingsForPatient(patientId: string) {
  const db = getDb();
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.patientId, patientId))
    .orderBy(bookings.requestedAt);
}

/** Doctor dashboard (spec §3.2 point 4 / §7): bookings assigned to a doctor. */
export async function listBookingsForDoctorProfile(doctorProfileId: string) {
  const db = getDb();
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.doctorId, doctorProfileId))
    .orderBy(bookings.requestedAt);
}

export async function findDoctorProfileBySlugOrId(doctorIdOrSlug: string) {
  const db = getDb();
  const bySlug = await db
    .select()
    .from(doctorProfiles)
    .where(eq(doctorProfiles.slug, doctorIdOrSlug))
    .limit(1);
  if (bySlug[0]) return bySlug[0];

  const byId = await db
    .select()
    .from(doctorProfiles)
    .where(eq(doctorProfiles.id, doctorIdOrSlug))
    .limit(1);
  return byId[0] ?? null;
}
