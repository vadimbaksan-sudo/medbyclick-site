"use client";

import { useState } from "react";
import ChatWidget from "@/modules/medsupport/components/ChatWidget";
import { faqs } from "@/modules/medsupport/data";

export default function MedSupportPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            MedSupport · Online Now
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">24/7 Patient Support</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Our coordinators are available around the clock. Average response time: 2 minutes during business hours, 2 hours overnight.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Chat with a Coordinator</h2>
            <ChatWidget />

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Email", value: "support@medbyclick.com", href: "mailto:support@medbyclick.com" },
                { label: "WhatsApp", value: "+972 50 000 0000", href: "#" },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="block p-4 border border-slate-200 rounded-xl hover:border-amber-300 transition-colors"
                >
                  <p className="text-xs text-slate-400 mb-1">{contact.label}</p>
                  <p className="text-sm font-medium text-slate-900">{contact.value}</p>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-medium text-slate-900 text-sm pr-4">{faq.question}</span>
                    <span className="text-slate-400 flex-shrink-0">{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
