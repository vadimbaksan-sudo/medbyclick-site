"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Doctor } from "@/modules/medconnect/types";
import { avatarGradientClass } from "@/lib/ui/avatarColor";

export default function DoctorsGrid({ doctors }: { doctors: Doctor[] }) {
  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty))).sort(),
    [doctors]
  );
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? doctors.filter((d) => d.specialty === active) : doctors;

  return (
    <>
      {/* Filters */}
      <div className="border-b border-stone-100 bg-stone-50 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-3">
          <button
            onClick={() => setActive(null)}
            className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors ${
              active === null
                ? "bg-stone-900 text-white border-stone-900"
                : "border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            All specialties
          </button>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setActive(specialty)}
              className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full border transition-colors ${
                active === specialty
                  ? "bg-stone-900 text-white border-stone-900"
                  : "border-stone-200 text-stone-600 hover:border-stone-400"
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor list */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {visible.length === 0 ? (
          <p className="text-center text-stone-500 py-12">
            No specialists in {active} yet — try another specialty or{" "}
            <Link href="/book" className="text-amber-700 underline">
              tell us your case
            </Link>{" "}
            and we&apos;ll route you.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="group block border border-stone-100 rounded-2xl p-6 hover:border-stone-300 hover:shadow-md transition-all"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarGradientClass(doctor.id)} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}
                  >
                    {doctor.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors leading-tight">
                      {doctor.name}
                    </p>
                    <p className="text-sm text-stone-400 mt-0.5">
                      {doctor.title}
                    </p>
                  </div>
                </div>

                {/* Specialty */}
                <div className="mb-4">
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    {doctor.specialty}
                  </span>
                </div>

                {/* Subspecialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.subspecialties.map((sub) => (
                    <span
                      key={sub}
                      className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Endorsement preview */}
                <blockquote className="text-sm text-stone-500 leading-relaxed line-clamp-3 italic border-l-2 border-amber-300 pl-3 mb-4">
                  {doctor.endorsement}
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-stone-400 pt-4 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                    {doctor.responseTime}
                  </span>
                  <span>{doctor.languages.join(" · ")}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
