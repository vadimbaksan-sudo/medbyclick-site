import { requireRole, getCurrentDoctorProfile } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listBookingsForDoctorProfile } from "@/lib/db/queries/bookings";
import type { DbBooking } from "@/lib/db/schema";
import ProfileEditForm from "./ProfileEditForm";
import BookingActions from "./BookingActions";

// See app/dashboard/page.tsx's identical note — this page reads the auth
// session and must not be statically snapshotted.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Doctor Dashboard — MedByClick",
  description: "Manage your profile and bookings.",
};

/**
 * Doctor cabinet (spec §1/§3/§7, implemented per
 * docs/reports/product/2026-07-05-architecture-review.md's finding that the
 * spec had not landed): authenticated doctor sees a pending-review state
 * until vetted, otherwise a profile self-edit form and their assigned
 * bookings with confirm/complete/decline/notes actions.
 *
 * Explicitly NOT built here (out of scope per the task): any
 * medical_history_entries read/write path, and any admin UI for approving
 * doctors (vettingStatus -> "approved") — that's a separate not-yet-specced
 * surface.
 */
export default async function DoctorDashboardPage() {
  const user = await requireRole("doctor");
  const doctorProfile = await getCurrentDoctorProfile();

  let bookings: DbBooking[] = [];
  if (doctorProfile && isDatabaseConfigured()) {
    try {
      bookings = await listBookingsForDoctorProfile(doctorProfile.id);
    } catch (err) {
      console.error("[doctor-dashboard] Failed to load bookings", err);
    }
  }

  // A pending/unapproved doctor should see zero bookings regardless of what
  // the query returns — the vetting gate is enforced here as well as at the
  // booking-assignment layer, so the dashboard never shows a booking that
  // shouldn't have been assignable in the first place.
  const isVetted = doctorProfile?.vettingStatus === "approved" && doctorProfile?.verified === true;

  return (
    <div>
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Doctor cabinet
          </p>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {!doctorProfile ? (
          <div className="border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              Your account isn&apos;t linked to a doctor profile yet. If you registered as a
              doctor, this can take a moment to appear — otherwise{" "}
              <a href="/register/doctor/" className="underline">register as a doctor</a> or
              contact a coordinator to get set up.
            </p>
          </div>
        ) : !isVetted ? (
          <div className="border border-amber-200 bg-amber-50 rounded-2xl p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
              Pending review
            </p>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Your application is being reviewed by Medical Community. You&apos;ll be able to see
              and manage assigned bookings once your profile is approved. You can still update
              your profile details below in the meantime.
            </p>
            <div className="mt-8 text-left">
              <ProfileEditForm doctorProfile={doctorProfile} />
            </div>
          </div>
        ) : (
          <>
            <ProfileEditForm doctorProfile={doctorProfile} />

            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Your bookings</h2>
              {bookings.length === 0 ? (
                <div className="border border-slate-200 rounded-2xl p-10 text-center">
                  <p className="text-slate-500 text-sm">No bookings assigned to you yet.</p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="divide-y divide-slate-100">
                    {bookings.map((b) => (
                      <div key={b.id} className="px-5 py-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {b.specialty ?? "General consultation"}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Requested {new Date(b.requestedAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 max-w-md line-clamp-2">
                              {b.situationNotes}
                            </p>
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 flex-shrink-0">
                            {b.status}
                          </span>
                        </div>
                        <BookingActions booking={b} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
