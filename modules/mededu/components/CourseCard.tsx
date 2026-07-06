"use client";

import { useActionState } from "react";
import type { Course } from "../types";
import { enrollInCourse, updateCourseProgress } from "@/lib/mededu/actions";
import type { CourseActionState } from "@/lib/mededu/validation";

const levelBadge = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-red-100 text-red-700",
};

const initialState: CourseActionState = { status: "idle" };

interface Enrollment {
  status: "enrolled" | "in_progress" | "completed";
  progressPercent: number;
}

export default function CourseCard({
  course,
  enrollment,
  loggedIn,
}: {
  course: Course;
  enrollment: Enrollment | null;
  loggedIn: boolean;
}) {
  const [enrollState, enrollAction, enrollPending] = useActionState(enrollInCourse, initialState);
  const [progressState, progressAction, progressPending] = useActionState(
    updateCourseProgress,
    initialState
  );

  return (
    <div className="border border-stone-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
          {course.category}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize shrink-0 ${levelBadge[course.level]}`}>
          {course.level}
        </span>
      </div>

      <h3 className="font-bold text-stone-900 mb-2 leading-snug">{course.title}</h3>
      <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-3">{course.description}</p>

      <p className="text-xs text-stone-400 mb-4">{course.instructor}</p>

      <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
        <span>⏱ {course.duration}</span>
        <span>👥 {course.enrolled.toLocaleString()} enrolled</span>
        <span>★ {course.rating}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-5">
        {course.language.map((l) => (
          <span key={l} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{l}</span>
        ))}
      </div>

      {!loggedIn ? (
        <a
          href="/register/"
          className="block text-center w-full py-2.5 bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Log in to enroll
        </a>
      ) : !enrollment ? (
        <form action={enrollAction}>
          <input type="hidden" name="courseId" value={course.id} />
          <button
            type="submit"
            disabled={enrollPending}
            className="w-full py-2.5 bg-stone-900 hover:bg-stone-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {enrollPending ? "Enrolling…" : "Enroll Free"}
          </button>
        </form>
      ) : enrollment.status === "completed" ? (
        <div className="w-full py-2.5 text-center bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl">
          ✓ Completed
        </div>
      ) : (
        <div className="space-y-2">
          <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${enrollment.progressPercent}%` }}
            />
          </div>
          <form action={progressAction}>
            <input type="hidden" name="courseId" value={course.id} />
            <input
              type="hidden"
              name="action"
              value={enrollment.status === "enrolled" ? "start" : "complete"}
            />
            <button
              type="submit"
              disabled={progressPending}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {progressPending
                ? "Updating…"
                : enrollment.status === "enrolled"
                ? "Start course"
                : "Mark complete"}
            </button>
          </form>
        </div>
      )}
      {(enrollState.status === "error" || progressState.status === "error") && (
        <p className="text-xs text-red-500 mt-2 text-center">
          {enrollState.message || progressState.message}
        </p>
      )}
    </div>
  );
}
