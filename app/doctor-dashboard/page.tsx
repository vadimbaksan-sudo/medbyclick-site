import { requireRole, getCurrentDoctorProfile } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listBookingsForDoctorProfile } from "@/lib/db/queries/bookings";
import type { DbBooking } from "@/lib/db/schema";

export const metadata = {
  title: "Doctor Dashboard — MedByClick",
  description: "Bookings assigned to you.",
};

/**
 * Minimal doctor cabinet (spec §3.2 point 4 / §7): authenticated doctor
 * sees bookings assigned to them. Explicitly NOT a full doctor
 * self-registration or profile-edit UI — spec §7 flags that as a follow-up
 * spec, out of scope for this pass (see docs/agents/DEVELOPER.md task
 * scope).
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!doctorProfile ? (
          <div className="border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              Your account isn&apos;t linked to a doctor profile yet. Doctor onboarding (linking a
              login to a <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">doctor_profiles</code> row)
              goes through Medical Community&apos;s vetting workflow, which is not part of this
              build — contact a coordinator to get set up.
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-500 text-sm">No bookings assigned to you yet.</p>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <div key={b.id} className="px-5 py-4 flex items-center justify-between gap-4">
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
