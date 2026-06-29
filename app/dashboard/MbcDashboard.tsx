"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  try {
    const v = localStorage.getItem("mbc_balance");
    return v !== null ? parseFloat(v) : DEFAULT_BALANCE;
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
    return <div className="animate-pulse h-96 bg-slate-100 rounded-2xl" />;
  }

  const usdValue = balance * MBC_PRICE_USD;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Balance card */}
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-slate-900 text-white rounded-2xl p-6">
          <p className="text-xs text-slate-400 mb-1">MBC Token Balance</p>
          <p className="text-4xl font-black text-amber-400">{balance.toLocaleString()}</p>
          <p className="text-sm text-slate-300 mt-1">≈ ${usdValue.toFixed(2)} USD</p>
          <p className="text-xs text-slate-500 mt-0.5">at $0.10 / MBC</p>

          <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Token symbol</span>
              <span className="font-semibold text-white">MBC</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Network</span>
              <span className="font-semibold text-white">Ethereum (ERC-20)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Current price</span>
              <span className="font-semibold text-amber-400">$0.10</span>
            </div>
          </div>

          <button
            onClick={() => { setShowBuy(!showBuy); setBuySuccess(false); }}
            className="mt-5 w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl text-sm transition-colors"
          >
            {showBuy ? "Cancel" : "Add tokens"}
          </button>
        </div>

        {/* Buy tokens form */}
        {showBuy && (
          <div className="border border-slate-200 rounded-2xl p-5">
            {buySuccess ? (
              <p className="text-sm font-semibold text-green-700 text-center py-2">✓ Tokens added!</p>
            ) : (
              <form onSubmit={handleBuy} className="space-y-4">
                <p className="text-sm font-semibold text-slate-900">Buy MBC tokens</p>
                <div>
                  <label className="text-xs text-slate-500 mb-2 block">Choose amount</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {["500", "1000", "5000"].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setBuyQty(qty)}
                        className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                          buyQty === qty
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 text-slate-600 hover:border-slate-400"
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
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    Cost: ${(parseInt(buyQty || "0") * MBC_PRICE_USD).toFixed(2)} USD
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={buying}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors"
                >
                  {buying ? "Processing…" : `Buy ${parseInt(buyQty || "0").toLocaleString()} MBC`}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Quick actions */}
        <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Quick actions</p>
          <Link href="/medpayments/" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
            <span className="text-lg">💳</span>
            <div>
              <p className="text-sm font-medium text-slate-900 group-hover:text-amber-700 transition-colors">Pay for a plan</p>
              <p className="text-xs text-slate-400">20% off with MBC tokens</p>
            </div>
          </Link>
          <Link href="/book/" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
            <span className="text-lg">🩺</span>
            <div>
              <p className="text-sm font-medium text-slate-900 group-hover:text-amber-700 transition-colors">Book a consultation</p>
              <p className="text-xs text-slate-400">Earn 100 MBC per consultation</p>
            </div>
          </Link>
          <Link href="/medtoken/" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
            <span className="text-lg">🪙</span>
            <div>
              <p className="text-sm font-medium text-slate-900 group-hover:text-amber-700 transition-colors">Token details & roadmap</p>
              <p className="text-xs text-slate-400">MBC token info</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Transaction history */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Transaction history</h2>
        {transactions.length === 0 ? (
          <div className="border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-400 text-sm">No transactions yet.</p>
            <p className="text-slate-400 text-xs mt-1">
              Transactions will appear here when you pay for services or earn tokens.
            </p>
            <Link
              href="/medpayments/"
              className="inline-block mt-5 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors"
            >
              Browse plans
            </Link>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                    tx.type === "credit" ? "bg-green-100" : "bg-amber-100"
                  }`}>
                    {tx.type === "credit" ? "+" : "−"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{tx.description}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(tx.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${tx.type === "credit" ? "text-green-600" : "text-slate-900"}`}>
                      {tx.type === "credit" ? "+" : "−"}{tx.amount.toLocaleString()} MBC
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
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
