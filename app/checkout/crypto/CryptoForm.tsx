"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Fuel, Hourglass, Clock } from "lucide-react";

const WALLETS = {
  ethereum: "0x4a3Bc7D8E9F2a1B6C5D4E3F2A1B6C5D4E3F2A1B6",
  tron: "TKFLZm3LFkHFpRNGqSuoJcVVCMkBqRpKzL",
};

const NETWORK_LABELS: Record<string, { name: string; token: string; time: string; fee: string }> = {
  ethereum: { name: "Ethereum", token: "USDT (ERC-20)", time: "~2–5 minutes", fee: "~$2–10 gas" },
  tron: { name: "TRON", token: "USDT (TRC-20)", time: "~30 seconds", fee: "<$0.01" },
};

export default function CryptoForm() {
  const params = useSearchParams();
  const planName = params.get("plan") ?? "Care Coordination";
  const price = parseFloat(params.get("price") ?? "490");
  const defaultNetwork = params.get("network") ?? "ethereum";

  const [network, setNetwork] = useState(defaultNetwork);
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const net = NETWORK_LABELS[network];
  const wallet = WALLETS[network as keyof typeof WALLETS];

  function copyAddress() {
    navigator.clipboard.writeText(wallet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Clipboard API blocked (iOS Safari, HTTP, privacy mode) — show address for manual copy
      setCopied(false);
    });
  }

  if (confirmed) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
          <Hourglass className="w-7 h-7 text-amber-700" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Awaiting confirmation</h2>
        <p className="text-stone-500 mb-1">{planName} — {price.toFixed(2)} USDT via {net.name}</p>
        <p className="text-stone-400 text-sm mb-1">We'll activate your plan as soon as the transaction confirms ({net.time}).</p>
        <p className="text-red-600 text-xs font-semibold mb-8">
          Demo mode — no real transaction was sent or is being monitored.
        </p>
        <Link href="/dashboard/" className="inline-flex items-center px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-10">
      <div className="md:col-span-3 space-y-6">
        {/* Network selector */}
        <div>
          <p className="text-sm font-medium text-stone-700 mb-3">Network</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(NETWORK_LABELS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setNetwork(key)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  network === key ? "border-stone-900 bg-stone-900/5" : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <p className="font-semibold text-sm text-stone-900">{val.token}</p>
                <p className="text-xs text-stone-500 mt-0.5">{val.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
          <p className="text-xs text-stone-500 mb-1">Exact amount to send</p>
          <p className="text-3xl font-black text-stone-900">{price.toFixed(2)} <span className="text-lg font-bold text-stone-500">USDT</span></p>
          <p className="text-xs text-stone-400 mt-1">Send exactly this amount — partial payments require manual review.</p>
        </div>

        {/* Wallet address */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-medium text-stone-700">Send to this address ({net.name})</p>
            <span className="text-[10px] font-bold uppercase tracking-wide text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
              Demo address — do not send funds
            </span>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-xs font-mono text-stone-800 break-all">
              {wallet}
            </code>
            <button
              onClick={copyAddress}
              className="flex-shrink-0 px-4 py-3 bg-stone-900 hover:bg-stone-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-stone-400">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {net.time}</span>
            <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" /> Fee: {net.fee}</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-amber-800 mb-1">Important</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Only send <strong>{net.token}</strong> to this address on the <strong>{net.name}</strong> network. Sending a different token or using the wrong network will result in permanent loss of funds.
          </p>
        </div>

        <button
          onClick={() => setConfirmed(true)}
          className="w-full py-3.5 bg-stone-900 hover:bg-stone-700 text-white font-bold rounded-xl text-sm transition-colors"
        >
          I've sent the payment
        </button>
      </div>

      <div className="md:col-span-2">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Order summary</p>
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold text-stone-900">{planName}</span>
            <span className="text-sm font-bold text-stone-900">{price.toFixed(2)} USDT</span>
          </div>
          <p className="text-xs text-stone-400 mb-4">via {net.token}</p>
          <div className="border-t border-stone-200 pt-4 flex justify-between">
            <span className="text-sm font-bold text-stone-900">Total</span>
            <span className="text-sm font-bold text-stone-900">{price.toFixed(2)} USDT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
