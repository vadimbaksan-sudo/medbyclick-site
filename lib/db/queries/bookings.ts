import "server-only";
import { and, eq, or } from "drizzle-orm";
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

/**
 * Doctor-side booking mutations (spec §3.2/§3.4). Every function below is
 * scoped by `and(eq(bookings.id, bookingId), eq(bookings.doctorId,
 * doctorProfileId))` — the doctor can only ever mutate a booking already
 * assigned to their own doctor_profiles.id, never an arbitrary booking id.
 * `doctorProfileId` must come from the caller's own session-derived profile
 * (see lib/bookings/actions.ts), never from client input. Each function
 * additionally scopes on the valid prior `status` so an out-of-order
 * transition (e.g. completing a booking that was never confirmed) simply
 * matches zero rows instead of silently succeeding.
 */

/** requested -> confirmed. */
export async function confirmBookingForDoctor(bookingId: string, doctorProfileId: string) {
  const db = getDb();
  const rows = await db
    .update(bookings)
    .set({ status: "confirmed", updatedAt: new Date() })
    .where(
      and(
        eq(bookings.id, bookingId),
        eq(bookings.doctorId, doctorProfileId),
        eq(bookings.status, "requested")
      )
    )
    .returning();
  return rows[0] ?? null;
}

/**
 * confirmed -> completed. Deliberately requires `confirmed` as the only
 * valid prior state (no skipping straight from `requested`) so there's
 * always a confirm step in the audit trail — this is also what feeds
 * getCasesHandledCount(), so it's the transition with the most downstream
 * effect on case-count integrity.
 */
export async function completeBookingForDoctor(bookingId: string, doctorProfileId: string) {
  const db = getDb();
  const rows = await db
    .update(bookings)
    .set({ status: "completed", updatedAt: new Date() })
    .where(
      and(
        eq(bookings.id, bookingId),
        eq(bookings.doctorId, doctorProfileId),
        eq(bookings.status, "confirmed")
      )
    )
    .returning();
  return rows[0] ?? null;
}

/**
 * requested/confirmed -> back to requested, unassigned (doctorId: null).
 * Never sets `cancelled` — a decline is "route this elsewhere," not "this
 * booking didn't happen" (spec §3.2). Never reassigns to a specific other
 * doctor — that's coordinator/matching-workflow territory, out of scope.
 */
export async function declineBookingForDoctor(bookingId: string, doctorProfileId: string) {
  const db = getDb();
  const rows = await db
    .update(bookings)
    .set({ status: "requested", doctorId: null, updatedAt: new Date() })
    .where(
      and(
        eq(bookings.id, bookingId),
        eq(bookings.doctorId, doctorProfileId),
        or(eq(bookings.status, "requested"), eq(bookings.status, "confirmed"))
      )
    )
    .returning();
  return rows[0] ?? null;
}

/**
 * Doctor-authored notes, distinct from patient-authored `situationNotes` (no
 * status change). No prior-status restriction — a doctor may add notes at
 * any point in the booking's lifecycle they're still assigned to it.
 */
export async function addDoctorNotesToBooking(
  bookingId: string,
  doctorProfileId: string,
  doctorNotes: string
) {
  const db = getDb();
  const rows = await db
    .update(bookings)
    .set({ doctorNotes, updatedAt: new Date() })
    .where(and(eq(bookings.id, bookingId), eq(bookings.doctorId, doctorProfileId)))
    .returning();
  return rows[0] ?? null;
}
