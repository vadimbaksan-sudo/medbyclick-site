import { Suspense } from "react";
import MbcDashboard from "./MbcDashboard";

export const metadata = {
  title: "Dashboard — MedByClick",
  description: "Manage your MBC token balance, view transaction history, and track your consultations.",
};

export default function DashboardPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Account</p>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="animate-pulse h-96 bg-slate-100 rounded-2xl" />}>
          <MbcDashboard />
        </Suspense>
      </div>
    </div>
  );
}
