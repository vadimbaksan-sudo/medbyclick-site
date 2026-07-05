"use client";

import { useActionState, useState } from "react";
import { updateBookingAssignedToSelf } from "@/lib/bookings/actions";
import type { BookingActionState } from "@/lib/bookings/validation";
import type { DbBooking } from "@/lib/db/schema";

const initialState: BookingActionState = { status: "idle" };

interface BookingActionsProps {
  booking: DbBooking;
}

/**
 * Per-booking action controls for the doctor dashboard (spec §3.2). Renders
 * only the actions valid for the booking's current status — confirm
 * (requested only), complete (confirmed only), decline (requested or
 * confirmed), plus an always-available notes field. No reassignment, no
 * cancellation — those aren't in a doctor's authority per spec §3.3.
 */
export default function BookingActions({ booking }: BookingActionsProps) {
  const [state, action, pending] = useActionState(updateBookingAssignedToSelf, initialState);
  const [notesOpen, setNotesOpen] = useState(false);

  const canConfirm = booking.status === "requested";
  const canComplete = booking.status === "confirmed";
  const canDecline = booking.status === "requested" || booking.status === "confirmed";

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {canConfirm && (
          <form action={action}>
            <input type="hidden" name="bookingId" value={booking.id} />
            <input type="hidden" name="action" value="confirm" />
            <button
              type="submit"
              disabled={pending}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-900 text-white hover:bg-stone-700 disabled:opacity-60 transition-colors"
            >
              Confirm
            </button>
          </form>
        )}
        {canComplete && (
          <form action={action}>
            <input type="hidden" name="bookingId" value={booking.id} />
            <input type="hidden" name="action" value="complete" />
            <button
              type="submit"
              disabled={pending}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 transition-colors"
            >
              Mark completed
            </button>
          </form>
        )}
        {canDecline && (
          <form action={action}>
            <input type="hidden" name="bookingId" value={booking.id} />
            <input type="hidden" name="action" value="decline" />
            <button
              type="submit"
              disabled={pending}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-300 text-stone-600 hover:bg-stone-50 disabled:opacity-60 transition-colors"
            >
              Decline (return to pool)
            </button>
          </form>
        )}
        <button
          type="button"
          onClick={() => setNotesOpen((v) => !v)}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors"
        >
          {notesOpen ? "Hide notes" : "Add notes"}
        </button>
      </div>

      {notesOpen && (
        <form action={action} className="space-y-2">
          <input type="hidden" name="bookingId" value={booking.id} />
          <input type="hidden" name="action" value="add_notes" />
          <textarea
            name="notes"
            rows={3}
            defaultValue={booking.doctorNotes ?? ""}
            placeholder="Clinical notes, visible only to you and coordinators."
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
          <button
            type="submit"
            disabled={pending}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-900 text-white hover:bg-stone-700 disabled:opacity-60 transition-colors"
          >
            Save notes
          </button>
        </form>
      )}

      {state.status === "error" && state.message && (
        <p className="text-xs text-red-600">{state.message}</p>
      )}
    </div>
  );
}
