"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { doctors } from "@/lib/doctors";

type FormState = "idle" | "submitting" | "success";

const SPECIALTIES = [
  "Oncology",
  "Cardiology",
  "Neurology",
  "Gastroenterology",
  "Endocrinology",
  "Orthopedic Surgery",
  "Hematology",
  "Rheumatology",
  "Pulmonology",
  "Psychiatry",
  "Other / Not sure",
];

export default function BookForm() {
  const searchParams = useSearchParams();
  const preselectedDoctor = searchParams.get("doctor") ?? "";

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: preselectedDoctor,
    specialty: "",
    situation: "",
    urgency: "routine",
    language: "Russian",
  });

  useEffect(() => {
    if (preselectedDoctor) {
      setForm((f) => ({ ...f, doctor: preselectedDoctor }));
    }
  }, [preselectedDoctor]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1200);
  }

  if (formState === "success") {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Request received
          </h2>
          <p className="text-slate-500 mb-2 leading-relaxed">
            We&apos;ve received your request and will review your case. You&apos;ll
            hear from us within 24 hours with the next steps.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Check your email at {form.email}
          </p>
          <Link
            href="/specialists/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 underline"
          >
            ← Back to our specialists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-10">
      {/* Form */}
      <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Full name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Phone (WhatsApp preferred)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+972 50 000 0000"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition"
            />
          </div>
          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Preferred language
            </label>
            <select
              id="language"
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition bg-white"
            >
              <option>Russian</option>
              <option>Hebrew</option>
              <option>English</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="specialty"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Medical specialty needed
            </label>
            <select
              id="specialty"
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition bg-white"
            >
              <option value="">Select specialty…</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="urgency"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition bg-white"
            >
              <option value="routine">Routine — within 1–2 weeks</option>
              <option value="semi-urgent">Semi-urgent — within a few days</option>
              <option value="urgent">Urgent — as soon as possible</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="doctor"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Preferred specialist{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <select
            id="doctor"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition bg-white"
          >
            <option value="">Let us match me to the right specialist</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="situation"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Describe your case <span className="text-red-400">*</span>
          </label>
          <textarea
            id="situation"
            name="situation"
            required
            rows={6}
            value={form.situation}
            onChange={handleChange}
            placeholder="What's happening? What have you already tried? What are you looking for — a second opinion, a specialist referral, a specific type of consultation? The more detail you share, the better we can match you."
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition resize-none"
          />
          <p className="text-xs text-slate-400 mt-1.5">
            No medical records required at this stage — just your description.
          </p>
        </div>

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          {formState === "submitting"
            ? "Sending…"
            : "Submit consultation request"}
        </button>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          Your information is confidential. We do not share patient details
          with any third parties.
        </p>
      </form>

      {/* Sidebar */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-slate-50 rounded-xl p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">
            What happens next
          </p>
          <ol className="space-y-3 text-sm text-slate-600">
            {[
              "We review your case — usually within 24 hours.",
              "We match you with the right specialist for your situation.",
              "You receive a confirmation with appointment details.",
              "You speak directly with your specialist.",
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs flex items-center justify-center font-medium mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-amber-800 mb-2">
            Emergency?
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">
            MedByClick handles consultations and specialist referrals — not
            emergencies. If you&apos;re in immediate danger, please call emergency
            services (Israel: 101 / Russia: 103).
          </p>
        </div>

        <div className="text-sm text-slate-500 leading-relaxed">
          <p>
            Not sure which specialist you need?{" "}
            <Link
              href="/specialists/"
              className="text-slate-700 underline hover:text-slate-900"
            >
              Browse the network
            </Link>{" "}
            first — or just describe your case and we&apos;ll route you.
          </p>
        </div>
      </div>
    </div>
  );
}
