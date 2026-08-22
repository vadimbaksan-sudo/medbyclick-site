"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CreditCard, Stethoscope, Coins } from "lucide-react";
import { Skeleton } from "@/components/Skeleton";

const MBC_PRICE_USD = 0.10;
const DEFAULT_BALANCE = 5000;

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
}

function getBalance(): number {
  if (typeof window === "undefined") return DEFAULT_BALANCE;
  try {
    const v = localStorage.getItem("mbc_balance");
    const n = v !== null ? parseFloat(v) : DEFAULT_BALANCE;
    return isNaN(n) ? DEFAULT_BALANCE : n;
  } catch { return DEFAULT_BALANCE; }
}

function getTransactions(): Transaction[] {
  try {
    return JSON.parse(localStorage.getItem("mbc_transactions") ?? "[]");
  } catch { return []; }
}

function saveBalance(n: number) {
  try { localStorage.setItem("mbc_balance", n.toString()); } catch {}
}

function addTransaction(tx: Omit<Transaction, "id" | "date">) {
  try {
    const existing = getTransactions();
    existing.unshift({ id: Date.now(), date: new Date().toISOString(), ...tx });
    localStorage.setItem("mbc_transactions", JSON.stringify(existing.slice(0, 50)));
  } catch {}
}

// Mirrors the `grid lg:grid-cols-3` layout below — balance card + quick
// actions on the left, transaction history rows on the right. Shown only
// for the mount-time tick before the localStorage read resolves.
function MbcDashboardSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-green-50 rounded-2xl p-6">
          <Skeleton className="h-3 w-32 rounded mb-2" tone="light" />
          <Skeleton className="h-9 w-28 rounded mb-1" tone="light" />
          <Skeleton className="h-3.5 w-24 rounded mb-0.5" tone="light" />
          <Skeleton className="h-3 w-20 rounded mb-6" tone="light" />
          <div className="pt-5 border-t border-stone-200 space-y-2">
            <Skeleton className="h-3 w-full rounded" tone="light" />
            <Skeleton className="h-3 w-full rounded" tone="light" />
            <Skeleton className="h-3 w-full rounded" tone="light" />
          </div>
          <Skeleton className="h-10 w-full rounded-xl mt-5" tone="light" />
        </div>
        <div className="border border-stone-200 rounded-2xl p-5 space-y-3">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-9 w-full rounded-xl" />
          <Skeleton className="h-9 w-full rounded-xl" />
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>
      </div>
      <div className="lg:col-span-2">
        <Skeleton className="h-5 w-44 rounded mb-5" />
        <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-40 rounded" />
                <Skeleton className="h-3 w-28 rounded" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-16 rounded ml-auto" />
                <Skeleton className="h-3 w-12 rounded ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MbcDashboard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showBuy, setShowBuy] = useState(false);
  const [buyQty, setBuyQty] = useState("1000");
  const [buying, setBuying] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

  useEffect(() => {
    setBalance(getBalance());
    setTransactions(getTransactions());
  }, []);

  function handleBuy(e: React.FormEvent) {
    e.preventDefault();
    setBuying(true);
    const amount = parseInt(buyQty) || 1000;
    setTimeout(() => {
      const newBal = (balance ?? DEFAULT_BALANCE) + amount;
      saveBalance(newBal);
      addTransaction({ description: "Token purchase", amount, type: "credit" });
      setBalance(newBal);
      setTransactions(getTransactions());
      setBuying(false);
      setBuySuccess(true);
      setTimeout(() => { setBuySuccess(false); setShowBuy(false); }, 2000);
    }, 1200);
  }

  if (balance === null) {
    return <MbcDashboardSkeleton />;
  }

  const usdValue = balance * MBC_PRICE_USD;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Balance card */}
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-green-50 text-stone-900 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-xs text-stone-600">MBC Token Balance</p>
            <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded shrink-0">
              Sample data — no account required yet
            </span>
          </div>
          <p className="text-4xl font-black text-amber-700">{balance.toLocaleString()}</p>
          <p className="text-sm text-stone-600 mt-1">≈ ${usdValue.toFixed(2)} USD</p>
          <p className="text-xs text-stone-500 mt-0.5">at $0.10 / MBC</p>

          <div className="mt-6 pt-5 border-t border-stone-200 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-stone-600">Token symbol</span>
              <span className="font-semibold text-stone-900">MBC</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-600">Network</span>
              <span className="font-semibold text-stone-900">Ethereum (ERC-20)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-600">Current price</span>
              <span className="font-semibold text-amber-700">$0.10</span>
            </div>
          </div>

          <button
            onClick={() => { setShowBuy(!showBuy); setBuySuccess(false); }}
            className="mt-5 w-full py-2.5 border border-stone-300 hover:border-stone-400 text-stone-900 font-bold rounded-xl text-sm transition-colors"
          >
            {showBuy ? "Cancel" : "Add tokens"}
          </button>
        </div>

        {/* Buy tokens form */}
        {showBuy && (
          <div className="border border-stone-200 rounded-2xl p-5">
            {buySuccess ? (
              <p className="text-sm font-semibold text-green-700 text-center py-2">✓ Tokens added!</p>
            ) : (
              <form onSubmit={handleBuy} className="space-y-4">
                <p className="text-sm font-semibold text-stone-900">Buy MBC tokens</p>
                <div>
                  <label className="text-xs text-stone-500 mb-2 block">Choose amount</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {["500", "1000", "5000"].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setBuyQty(qty)}
                        className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                          buyQty === qty
                            ? "border-stone-900 bg-stone-900/5 text-stone-900 font-semibold"
                            : "border-stone-200 text-stone-600 hover:border-stone-400"
                        }`}
                      >
                        {parseInt(qty).toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={buyQty}
                    onChange={(e) => setBuyQty(e.target.value)}
                    min="100"
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
                  />
                  <p className="text-xs text-stone-400 mt-1.5">
                    Cost: ${(parseInt(buyQty || "0") * MBC_PRICE_USD).toFixed(2)} USD
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={buying}
                  className="w-full py-2.5 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors"
                >
                  {buying ? "Processing…" : `Buy ${parseInt(buyQty || "0").toLocaleString()} MBC`}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Quick actions */}
        <div className="border border-stone-200 rounded-2xl p-5 space-y-3">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest">Quick actions</p>
          <Link href="/medpayments/" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors group">
            <CreditCard className="w-5 h-5 text-stone-500" />
            <div>
              <p className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">Pay for a plan</p>
              <p className="text-xs text-stone-400">20% off with MBC tokens</p>
            </div>
          </Link>
          <Link href="/book/" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors group">
            <Stethoscope className="w-5 h-5 text-stone-500" />
            <div>
              <p className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">Book a consultation</p>
              <p className="text-xs text-stone-400">Earn 100 MBC per consultation</p>
            </div>
          </Link>
          <Link href="/medtoken/" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors group">
            <Coins className="w-5 h-5 text-stone-500" />
            <div>
              <p className="text-sm font-medium text-stone-900 group-hover:text-amber-700 transition-colors">Token details & roadmap</p>
              <p className="text-xs text-stone-400">MBC token info</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Transaction history */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-bold text-stone-900 mb-5">Transaction history</h2>
        {transactions.length === 0 ? (
          <div className="border border-stone-200 rounded-2xl p-10 text-center">
            <p className="text-stone-400 text-sm">No transactions yet.</p>
            <p className="text-stone-400 text-xs mt-1">
              Transactions will appear here when you pay for services or earn tokens.
            </p>
            <Link
              href="/medpayments/"
              className="inline-block mt-5 px-5 py-2.5 border border-stone-300 hover:border-stone-400 text-stone-900 text-sm font-semibold rounded-xl transition-colors"
            >
              Browse plans
            </Link>
          </div>
        ) : (
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="divide-y divide-stone-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-stone-50 transition-colors">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                    tx.type === "credit" ? "bg-green-100" : "bg-amber-100"
                  }`}>
                    {tx.type === "credit" ? "+" : "−"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{tx.description}</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {new Date(tx.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${tx.type === "credit" ? "text-green-600" : "text-stone-900"}`}>
                      {tx.type === "credit" ? "+" : "−"}{tx.amount.toLocaleString()} MBC
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      ${(tx.amount * MBC_PRICE_USD).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
