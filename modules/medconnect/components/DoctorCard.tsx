import Link from "next/link";
import type { Doctor } from "../types";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="group block border border-slate-100 rounded-2xl p-6 hover:border-amber-300 hover:shadow-md transition-all bg-white"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-amber-400 font-bold text-xl flex-shrink-0">
          {doctor.name.split(" ").slice(-1)[0][0]}
        </div>
        <div>
          <p className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
            {doctor.name}
          </p>
          <p className="text-sm text-slate-400 mt-0.5">{doctor.title}</p>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          {doctor.specialty}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {doctor.subspecialties.map((sub) => (
          <span key={sub} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
            {sub}
          </span>
        ))}
      </div>

      <blockquote className="text-sm text-slate-500 leading-relaxed line-clamp-3 italic border-l-2 border-amber-300 pl-3 mb-4">
        {doctor.endorsement}
      </blockquote>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          {doctor.responseTime}
        </span>
        <span>{doctor.languages.join(" · ")}</span>
      </div>
    </Link>
  );
}
