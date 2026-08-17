import "server-only";
import { and, lt, isNull, ne, or, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { bookings } from "@/lib/db/schema";

export { computeSlaDeadline } from "./slaDeadline";

/**
 * Case-abandonment threshold (spec §3.4 "Оставлен"): a case still sitting
 * in `submitted` with no doctor assigned and no stage progress this long
 * after creation gets flagged rather than silently expiring. Same
 * "illustrative, not clinically reviewed" caveat as slaDeadline.ts's
 * SLA_HOURS.
 */
const ABANDONMENT_HOURS = 72;

/**
 * The scheduled sweep (Phase F, docs/decision-log/0009): finds bookings
 * whose SLA deadline has passed while still unresolved and flips them to
 * `escalated`, and finds long-`submitted` bookings with no doctor ever
 * assigned and flips them to `abandoned`. Idempotent — `escalatedAt` is set
 * once and used as a guard so a booking already escalated isn't
 * re-processed by every run. Called from app/api/cron/sla-sweep/route.ts.
 */
export async function runSlaSweep(now: Date = new Date()): Promise<{
  escalated: number;
  abandoned: number;
}> {
  const db = getDb();

  const escalatable = await db
    .update(bookings)
    .set({ caseStage: "escalated", escalatedAt: now, updatedAt: now })
    .where(
      and(
        lt(bookings.slaDeadlineAt, now),
        isNull(bookings.escalatedAt),
        ne(bookings.caseStage, "closed"),
        ne(bookings.caseStage, "transferred"),
        ne(bookings.caseStage, "abandoned"),
        or(eq(bookings.status, "requested"), eq(bookings.status, "confirmed"))
      )
    )
    .returning({ id: bookings.id });

  const abandonmentCutoff = new Date(now.getTime() - ABANDONMENT_HOURS * 60 * 60 * 1000);
  const abandonable = await db
    .update(bookings)
    .set({ caseStage: "abandoned", updatedAt: now })
    .where(
      and(
        eq(bookings.caseStage, "submitted"),
        isNull(bookings.doctorId),
        lt(bookings.createdAt, abandonmentCutoff)
      )
    )
    .returning({ id: bookings.id });

  return { escalated: escalatable.length, abandoned: abandonable.length };
}
