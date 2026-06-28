import type { Course } from "../types";

const levelBadge = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-red-100 text-red-700",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex-shrink-0">
          {course.category}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${levelBadge[course.level]}`}>
          {course.level}
        </span>
      </div>

      <h3 className="font-bold text-slate-900 mb-2 leading-snug">{course.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">{course.description}</p>

      <p className="text-xs text-slate-400 mb-4">{course.instructor}</p>

      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
        <span>⏱ {course.duration}</span>
        <span>👥 {course.enrolled.toLocaleString()} enrolled</span>
        <span>★ {course.rating}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-5">
        {course.language.map((l) => (
          <span key={l} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{l}</span>
        ))}
      </div>

      <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors">
        Enroll Free
      </button>
    </div>
  );
}
