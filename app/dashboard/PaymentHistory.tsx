import Link from "next/link";
import type { DbPayment } from "@/lib/db/schema";

const STATUS_COLOR: Record<DbPayment["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  succeeded: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-slate-100 text-slate-500",
};

/**
 * Real payment history (spec §4.1 point 4) — persisted `payments` rows,
 * status updated by the Stripe webhook (the authoritative source, not the
 * client-side checkout UI). Replaces the old localStorage transaction log
 * that lived in MbcDashboard.
 */
export default function PaymentHistory({ payments }: { payments: DbPayment[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Payment history</h2>
        <Link href="/medpayments/" className="text-sm font-medium text-amber-700 hover:text-amber-900">
          Browse plans →
        </Link>
      </div>
      {payments.length === 0 ? (
        <div className="border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-sm">No payments yet.</p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="divide-y divide-slate-100">
            {payments.map((p) => (
              <div key={p.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{p.planId}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(p.createdAt).toLocaleDateString()} · {p.provider}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-900">
                    {p.currency} {Number(p.amount).toFixed(2)}
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLOR[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
