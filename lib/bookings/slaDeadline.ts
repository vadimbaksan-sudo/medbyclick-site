import type { DbBooking } from "@/lib/db/schema";

/**
 * SLA deadline hours per urgency tier — spec §2 "Триаж и перевод с
 * использованием AI" names SLA-driven routing but leaves the actual
 * thresholds unspecified. These are illustrative starting values (CPWO's
 * call to adjust, not a Medical Advisory-reviewed clinical standard) — flag
 * to Medical Advisory before treating them as a real commitment to
 * patients, same caution as everywhere else urgency-driven timing appears.
 *
 * Pure/no DB access, deliberately split out of ./sla.ts (which needs
 * `"server-only"` for its DB-touching sweep) so this stays importable from
 * plain `bun test` files and from lib/bookings/actions.ts alike.
 */
const SLA_HOURS: Record<DbBooking["urgency"], number> = {
  urgent: 4,
  "semi-urgent": 24,
  routine: 48,
};

export function computeSlaDeadline(urgency: DbBooking["urgency"], from: Date = new Date()): Date {
  const hours = SLA_HOURS[urgency];
  return new Date(from.getTime() + hours * 60 * 60 * 1000);
}

/**
 * Abandonment threshold — mirrors ./sla.ts's ABANDONMENT_HOURS. Kept as a
 * separate pure constant (rather than importing from sla.ts, which is
 * "server-only") so isAbandonable below stays importable from plain
 * `bun test` files.
 */
const ABANDONMENT_HOURS = 72;

type SlaSweepableBooking = Pick<
  DbBooking,
  "slaDeadlineAt" | "escalatedAt" | "doctorId" | "caseStage" | "status" | "createdAt"
>;

/**
 * Pure mirror of ./sla.ts's runSlaSweep() `escalatable`/`abandonable` SQL
 * WHERE clauses — extracted so the mutual-exclusivity invariant between them
 * can be unit-tested without a live database (this project has no test-DB
 * infrastructure; see lib/db/client.ts). If the SQL in sla.ts changes, this
 * mirror must change with it, or the test below stops verifying reality.
 *
 * A booking is escalatable only when a doctor IS assigned — there's someone
 * to escalate to. 2026-08-20 /autoplan retrospective review caught that,
 * before this split, a booking overdue AND unassigned long enough to also
 * qualify as abandoned always resolved to "escalated" purely because that
 * UPDATE ran first in sla.ts — an accidental ordering dependency, not a
 * decision. Requiring doctorId here makes escalatable/abandonable disjoint
 * by construction instead.
 */
export function isEscalatable(booking: SlaSweepableBooking, now: Date): boolean {
  return (
    booking.slaDeadlineAt !== null &&
    booking.slaDeadlineAt < now &&
    booking.escalatedAt === null &&
    booking.doctorId !== null &&
    booking.caseStage !== "closed" &&
    booking.caseStage !== "transferred" &&
    booking.caseStage !== "abandoned" &&
    (booking.status === "requested" || booking.status === "confirmed")
  );
}

/** Pure mirror of the `abandonable` WHERE clause — see isEscalatable above. */
export function isAbandonable(booking: SlaSweepableBooking, now: Date): boolean {
  const cutoff = new Date(now.getTime() - ABANDONMENT_HOURS * 60 * 60 * 1000);
  return booking.caseStage === "submitted" && booking.doctorId === null && booking.createdAt < cutoff;
}
