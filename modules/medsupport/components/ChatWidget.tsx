"use client";

import { useState } from "react";

const MOCK_RESPONSES = [
  "Hello! I'm your MedByClick coordinator. How can I help you today?",
  "I understand. Could you tell me more about your situation — which condition or specialist are you looking for?",
  "Thank you. Based on what you've described, I'd recommend connecting you with one of our specialists. Can you share your preferred language for the consultation?",
  "Perfect. I'll prepare a case summary and route you to the right specialist within 24 hours. Is there anything else you'd like to add?",
];

interface Message {
  role: "user" | "agent";
  content: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", content: MOCK_RESPONSES[0] },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    const agentMsg: Message = { role: "agent", content: MOCK_RESPONSES[step] ?? "Thank you. A coordinator will follow up via email within 2 hours." };

    setMessages((prev) => [...prev, userMsg, agentMsg]);
    setInput("");
    setStep((s) => s + 1);
  }

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm max-w-lg">
      <div className="bg-slate-900 px-5 py-4 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
        <p className="text-white font-medium text-sm">MedByClick Support</p>
        <span className="ml-auto text-xs text-slate-400">24/7 · Avg reply: 2 min</span>
      </div>

      <div className="h-72 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-slate-900 text-white rounded-br-sm"
                  : "bg-slate-100 text-slate-700 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="border-t border-slate-100 px-4 py-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl text-sm transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
