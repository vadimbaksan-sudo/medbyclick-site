import { requireRole } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listEscalatedOrAbandonedBookings } from "@/lib/db/queries/bookings";
import type { DbBooking } from "@/lib/db/schema";

// Same reasoning as app/dashboard/page.tsx: reads the auth session per
// request, must not be statically snapshotted.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Coordinator Queue — MedByClick",
  description: "Escalated and abandoned cases requiring coordinator attention.",
};

const STAGE_LABEL: Record<string, string> = {
  escalated: "Escalated",
  abandoned: "Abandoned",
};

const STAGE_CLASS: Record<string, string> = {
  escalated: "bg-red-100 text-red-700",
  abandoned: "bg-stone-200 text-stone-600",
};

/**
 * Phase F (docs/decision-log/0009), spec §3.4's "Эскалирован"/"Оставлен"
 * terminal states — the case list a coordinator works from. Gated to
 * `admin`: no dedicated coordinator role exists yet in `userRoleEnum`
 * (lib/db/schema.ts), and admin is the closest existing stand-in rather
 * than inventing a new role for a single page.
 */
export default async function CoordinatorPage() {
  // requireRole redirects unauthenticated users to /login and wrong-role
  // users to / — same pattern as every other role-gated page in this repo.
  await requireRole("admin");

  let bookings: DbBooking[] = [];
  let dbError = false;
  if (isDatabaseConfigured()) {
    try {
      bookings = await listEscalatedOrAbandonedBookings();
    } catch (err) {
      console.error("[coordinator] Failed to load escalation queue", err);
      dbError = true;
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
          Coordinator queue
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900">Escalated &amp; abandoned cases</h1>
        <p className="text-stone-500 text-sm mt-2 leading-relaxed max-w-2xl">
          Cases here missed their SLA window while unresolved (Escalated) or sat unassigned with no
          doctor for 72+ hours (Abandoned) — spec §3.4. Both require a coordinator to reach out, not
          a silent timeout.
        </p>
      </div>

      {!isDatabaseConfigured() && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-sm text-stone-600">
          No database is configured in this environment — this queue is empty because there's nowhere
          to read bookings from, not because nothing is escalated.
        </div>
      )}

      {dbError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-700">
          Failed to load the queue. Check server logs.
        </div>
      )}

      {isDatabaseConfigured() && !dbError && bookings.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-stone-700">
          Queue is empty — nothing escalated or abandoned right now.
        </div>
      )}

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="border border-stone-200 rounded-xl p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${STAGE_CLASS[booking.caseStage] ?? "bg-stone-100 text-stone-600"}`}
              >
                {STAGE_LABEL[booking.caseStage] ?? booking.caseStage}
              </span>
              <span className="text-xs text-stone-400">
                {booking.urgency} · {booking.specialty ?? "unspecified specialty"}
              </span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed line-clamp-2 mb-2">
              {booking.situationNotes}
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <span>Requested {booking.requestedAt.toLocaleString()}</span>
              {booking.slaDeadlineAt && <span>SLA was {booking.slaDeadlineAt.toLocaleString()}</span>}
              {booking.escalatedAt && <span>Escalated {booking.escalatedAt.toLocaleString()}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
