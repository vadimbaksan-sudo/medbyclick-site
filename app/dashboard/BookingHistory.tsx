import Link from "next/link";
import type { DbBooking } from "@/lib/db/schema";

const STATUS_LABEL: Record<DbBooking["status"], string> = {
  requested: "Requested",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_COLOR: Record<DbBooking["status"], string> = {
  requested: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-slate-100 text-slate-500",
};

/** Real booking history (spec §3.2 point 4 / §7) — not mock/localStorage. */
export default function BookingHistory({ bookings }: { bookings: DbBooking[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Your bookings</h2>
        <Link href="/book/" className="text-sm font-medium text-amber-700 hover:text-amber-900">
          Book a consultation →
        </Link>
      </div>
      {bookings.length === 0 ? (
        <div className="border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-sm">No consultation requests yet.</p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <div key={b.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {b.specialty ?? "General consultation"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Requested {new Date(b.requestedAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${STATUS_COLOR[b.status]}`}
                >
                  {STATUS_LABEL[b.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
