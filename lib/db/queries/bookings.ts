import "server-only";
import { and, eq, or, inArray, desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { bookings, doctorProfiles } from "@/lib/db/schema";
import type { NewDbBooking, DbBooking } from "@/lib/db/schema";

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

/**
 * requested -> confirmed. Also advances `caseStage` to
 * `consultation_scheduled` (Phase B, docs/decision-log/0009) — a doctor
 * confirming a booking is precisely the spec's Step 7 "Подтверждение
 * врача" checkpoint.
 */
export async function confirmBookingForDoctor(bookingId: string, doctorProfileId: string) {
  const db = getDb();
  const rows = await db
    .update(bookings)
    .set({ status: "confirmed", caseStage: "consultation_scheduled", updatedAt: new Date() })
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
    .set({ status: "completed", caseStage: "closed", updatedAt: new Date() })
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
    .set({ status: "requested", doctorId: null, caseStage: "submitted", updatedAt: new Date() })
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

/**
 * Coordinator/admin escalation queue (Phase F, docs/decision-log/0009,
 * spec §3.4's "Эскалирован"/"Оставлен" terminal states). No dedicated
 * "coordinator" role exists yet (docs/ROADMAP.md) — gated to `admin` in
 * app/coordinator/page.tsx as the interim standing-in role.
 */
export async function listEscalatedOrAbandonedBookings(): Promise<DbBooking[]> {
  const db = getDb();
  return db
    .select()
    .from(bookings)
    .where(inArray(bookings.caseStage, ["escalated", "abandoned"]))
    .orderBy(desc(bookings.escalatedAt), desc(bookings.updatedAt));
}

/**
 * Phase H cross-module handoff (spec §3.4's "Передан" terminal state /
 * §3.3 "если второе мнение рекомендует очное лечение за рубежом"). Marks a
 * case as continuing in another module without deleting/archiving the
 * MedConnect record — it stays visible as the case's system-of-record per
 * spec §1. Scoped to admin, not a specific doctor, since the receiving
 * module (medtravel/medtrials/medpharmaccess) is what actually owns the
 * case going forward; there's no doctor-authority reason to restrict who
 * flags a transfer the way there is for confirm/complete/decline.
 */
export async function transferBookingToModule(
  bookingId: string,
  targetModule: DbBooking["transferredToModule"]
) {
  const db = getDb();
  const now = new Date();
  const rows = await db
    .update(bookings)
    .set({
      caseStage: "transferred",
      transferredToModule: targetModule,
      transferredAt: now,
      updatedAt: now,
    })
    .where(eq(bookings.id, bookingId))
    .returning();
  return rows[0] ?? null;
}
