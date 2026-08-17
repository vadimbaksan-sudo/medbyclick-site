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
