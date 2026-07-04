import { Suspense } from "react";
import { redirect } from "next/navigation";
import MbcDashboard from "./MbcDashboard";
import BookingHistory from "./BookingHistory";
import PaymentHistory from "./PaymentHistory";
import MedicalHistoryShell from "./MedicalHistoryShell";
import { requireUser } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listBookingsForPatient } from "@/lib/db/queries/bookings";
import { listPaymentsForUser } from "@/lib/db/queries/payments";
import type { DbBooking, DbPayment } from "@/lib/db/schema";

// Always render per-request — this page reads the auth session (cookies)
// and per-user data. Forcing dynamic avoids Next baking a static snapshot
// of the "not logged in" fallback at build time in environments (like this
// sandbox) where Supabase env vars aren't present during `next build`.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard — MedByClick",
  description: "Track your consultations, payments, and medical history.",
};

export default async function DashboardPage() {
  const user = await requireUser();

  // Doctors get their own cabinet (spec §7) — /dashboard is the patient
  // surface. Admins aren't in scope for a dedicated dashboard in this pass.
  if (user.role === "doctor") redirect("/doctor-dashboard");

  let bookings: DbBooking[] = [];
  let payments: DbPayment[] = [];
  if (user.role === "patient" && isDatabaseConfigured()) {
    try {
      [bookings, payments] = await Promise.all([
        listBookingsForPatient(user.id),
        listPaymentsForUser(user.id),
      ]);
    } catch (err) {
      console.error("[dashboard] Failed to load patient history", err);
    }
  }

  return (
    <div>
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Account</p>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <BookingHistory bookings={bookings} />
        <PaymentHistory payments={payments} />
        <MedicalHistoryShell />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-slate-900">Token (preview)</h2>
          </div>
          <Suspense fallback={<div className="animate-pulse h-96 bg-slate-100 rounded-2xl" />}>
            <MbcDashboard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
