"use client";

import { useState } from "react";
import Link from "next/link";
import type { Doctor } from "@/modules/medconnect/types";
import { avatarGradientClass } from "@/lib/ui/avatarColor";

const DOCTOR_HOSPITAL: Record<string, { name: string; short: string }> = {
  "dr-elena-volkova":   { name: "Sheba Medical Center",            short: "Sheba" },
  "dr-mikhail-stern":   { name: "Hadassah Medical Center",         short: "Hadassah" },
  "dr-rina-goldberg":   { name: "Tel Aviv University Medical",     short: "TAU Medical" },
  "dr-ariel-ben-david": { name: "Rabin Medical Center",            short: "Rabin" },
  "dr-natalya-chernova":{ name: "Sourasky Medical Center (Ichilov)", short: "Ichilov" },
  "dr-yossi-levi":      { name: "Assuta Medical Center",           short: "Assuta" },
  "dr-sofia-abramov":   { name: "Rambam Health Care Campus",       short: "Rambam" },
  "dr-david-ofer":      { name: "Hadassah Medical Center",         short: "Hadassah" },
  "dr-irina-blum":      { name: "Wolfson Medical Center",          short: "Wolfson" },
  "dr-amir-cohen":      { name: "Soroka University Medical Center", short: "Soroka" },
};

const ALL_HOSPITALS = Array.from(
  new Set(Object.values(DOCTOR_HOSPITAL).map((h) => h.short))
).sort();

export default function SpecialistsGrid({ doctors }: { doctors: Doctor[] }) {
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [hospitalFilter, setHospitalFilter] = useState("All");

  const specialties = ["All", ...Array.from(new Set(doctors.map((d) => d.specialty))).sort()];
  const hospitals = ["All", ...ALL_HOSPITALS];

  const filtered = doctors.filter((d) => {
    const matchSpec = specialtyFilter === "All" || d.specialty === specialtyFilter;
    const matchHosp =
      hospitalFilter === "All" ||
      (DOCTOR_HOSPITAL[d.id]?.short ?? "") === hospitalFilter;
    return matchSpec && matchHosp;
  });

  return (
    <div>
      {/* No-conflict-of-interest banner */}
      <div className="bg-slate-900 text-white rounded-lg p-5 mb-8 flex gap-4 items-start">
        <div className="w-1 bg-amber-400 rounded-full self-stretch shrink-0" />
        <div>
          <p className="text-sm font-semibold text-white mb-1">
            Hospital-agnostic — zero conflict of interest
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every competitor on this market routes you to their own hospital. We have no financial
            relationship with any of the hospitals below — Sheba, Hadassah, Ichilov, Assuta, Rambam.
            We route to whoever is right for your specific case.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Specialty</p>
          <div className="flex flex-wrap gap-1.5">
            {specialties.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpecialtyFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  specialtyFilter === s
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Hospital</p>
          <div className="flex flex-wrap gap-1.5">
            {hospitals.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHospitalFilter(h)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  hospitalFilter === h
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-slate-400 mb-5">
        {filtered.length} specialist{filtered.length !== 1 ? "s" : ""}
        {specialtyFilter !== "All" || hospitalFilter !== "All" ? " matching filters" : " in the network"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          No specialists match these filters.{" "}
          <button
            type="button"
            onClick={() => { setSpecialtyFilter("All"); setHospitalFilter("All"); }}
            className="underline hover:text-slate-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((doctor) => {
            const hospital = DOCTOR_HOSPITAL[doctor.id];
            return (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}/`}
                className="group block border border-slate-100 rounded-lg p-6 hover:border-amber-300 hover:shadow-md transition-all bg-white"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-linear-to-br ${avatarGradientClass(doctor.id)} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                  >
                    {doctor.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                      {doctor.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{doctor.title}</p>
                    {hospital && (
                      <p className="text-xs text-amber-700 font-medium mt-1">{hospital.short}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-block text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                    {doctor.specialty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {doctor.subspecialties.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>

                <blockquote className="text-xs text-slate-500 leading-relaxed line-clamp-3 italic border-l-2 border-amber-300 pl-3 mb-3">
                  {doctor.endorsement}
                </blockquote>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <span className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang) => (
                      <span key={lang} className="border border-slate-200 px-1.5 py-0.5 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </span>
                  <span className="text-amber-600 font-medium shrink-0 ml-2">{doctor.responseTime}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-14 bg-amber-50 border border-amber-100 rounded-lg p-8 text-center">
        <p className="text-sm text-slate-500 mb-1 font-medium">Not sure which specialist you need?</p>
        <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Describe your situation and our coordinator will match you to the right doctor — usually within 24 hours.
        </p>
        <Link
          href="/book/"
          className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          Get matched to a specialist
        </Link>
      </div>
    </div>
  );
}
