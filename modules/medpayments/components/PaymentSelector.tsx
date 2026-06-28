"use client";

import { useState } from "react";
import { paymentMethods, cryptoAddresses } from "../data";
import PaymentMethodCard from "./PaymentMethodCard";

export default function PaymentSelector({ amount }: { amount: number }) {
  const [selected, setSelected] = useState("card");

  const selectedMethod = paymentMethods.find((m) => m.id === selected);
  const discountedAmount = selectedMethod?.discount
    ? amount * (1 - selectedMethod.discount / 100)
    : amount;

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-4">Select Payment Method</h3>

      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            selected={selected === method.id}
            onSelect={() => setSelected(method.id)}
          />
        ))}
      </div>

      {/* Card payment form */}
      {selected === "card" && (
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-slate-500">Secure payment via Stripe</span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
              <input type="text" placeholder="4242 4242 4242 4242" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Expiry</label>
                <input type="text" placeholder="MM / YY" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">CVC</label>
                <input type="text" placeholder="123" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USDT payment */}
      {selected === "usdt" && (
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
          <p className="text-sm font-semibold text-slate-900 mb-3">Send USDT to one of these addresses:</p>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">ERC-20</span>
                <span className="text-xs text-slate-400">Ethereum Network</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <code className="text-xs text-slate-700 break-all font-mono">{cryptoAddresses.usdt_erc20}</code>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded">TRC-20</span>
                <span className="text-xs text-slate-400">Tron Network (lower fees)</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <code className="text-xs text-slate-700 break-all font-mono">{cryptoAddresses.usdt_trc20}</code>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Send exactly <span className="font-bold text-slate-700">${amount} USDT</span> to the address above.
            Confirmation typically takes 1–5 minutes. Our coordinator will confirm your payment and activate your service.
          </p>
        </div>
      )}

      {/* MBC Token payment */}
      {selected === "medtoken" && (
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded">ERC-20</span>
            <span className="text-xs text-slate-400">MBC Token on Ethereum</span>
          </div>
          <p className="text-sm text-slate-700 mb-3">
            Pay with MBC utility tokens and get a <span className="font-bold text-green-600">20% discount</span>.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Original price:</span>
              <span className="text-sm text-slate-400 line-through">${amount}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-slate-900">With MBC discount:</span>
              <span className="text-lg font-black text-green-600">${discountedAmount}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              ≈ {Math.ceil(discountedAmount * 10)} MBC tokens at current rate ($0.10/MBC)
            </p>
          </div>
          <div className="mb-3">
            <p className="text-xs font-medium text-slate-700 mb-1.5">Send MBC tokens to:</p>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <code className="text-xs text-slate-700 break-all font-mono">{cryptoAddresses.mbc_erc20}</code>
            </div>
          </div>
          <a href="/medtoken" className="text-xs text-amber-600 hover:text-amber-700 font-medium underline">
            Learn more about MBC Token &rarr;
          </a>
        </div>
      )}

      {/* Pay button */}
      <button className="w-full mt-6 bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
        {selected === "card" ? `Pay $${amount}` : `Confirm Payment — $${discountedAmount}`}
      </button>
    </div>
  );
}
