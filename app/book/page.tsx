import { Suspense } from "react";
import Link from "next/link";
import BookForm from "./BookForm";
import { getCurrentUser } from "@/lib/auth/dal";

// See app/dashboard/page.tsx's identical note — this page reads the auth
// session and must not be statically snapshotted.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book a Consultation — MedByClick",
  description: "Request a consultation with one of our vetted specialists.",
};

export default async function BookPage() {
  // Booking is the first place auth actually gates something (spec §3.2
  // point 1) — the patient identity comes from the verified session, not a
  // name/email field the client could tamper with. proxy.ts also does an
  // optimistic redirect to /login for /book, but this server-side check is
  // the real gate (per the auth guide: never rely on Proxy alone).
  const user = await getCurrentUser();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            Get started
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Book a consultation
          </h1>
          <p className="text-slate-300 leading-relaxed">
            Tell us about your situation. Our coordinator will review your case
            and confirm your appointment — usually within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {!user ? (
          <div className="max-w-md mx-auto text-center border border-slate-200 rounded-2xl p-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Log in to book a consultation</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Booking is tied to your patient account so you can track your request in your
              dashboard. Log in or create a free account to continue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 border border-slate-200 hover:border-slate-400 text-slate-700 rounded-lg text-sm transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        ) : user.role !== "patient" ? (
          <div className="max-w-md mx-auto text-center border border-slate-200 rounded-2xl p-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Patient accounts only</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Booking a consultation is available to patient accounts. You&apos;re logged in as a{" "}
              {user.role}.
            </p>
          </div>
        ) : (
          <Suspense fallback={<div className="animate-pulse h-96 bg-slate-100 rounded-xl" />}>
            <BookForm patientEmail={user.email} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
