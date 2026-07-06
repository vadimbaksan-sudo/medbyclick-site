import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listEnrollmentsForUser } from "@/lib/db/queries/course-enrollments";
import { courses } from "@/modules/mededu/data";
import type { DbCourseEnrollment } from "@/lib/db/schema";

// See app/dashboard/page.tsx's identical note — this page reads the auth
// session and must not be statically snapshotted.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Student Dashboard — MedByClick",
  description: "Track your enrolled courses and progress.",
};

const STATUS_LABEL: Record<DbCourseEnrollment["status"], string> = {
  enrolled: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

export default async function StudentDashboardPage() {
  const user = await requireRole("student");

  let enrollments: DbCourseEnrollment[] = [];
  if (isDatabaseConfigured()) {
    try {
      enrollments = await listEnrollmentsForUser(user.id);
    } catch (err) {
      console.error("[student-dashboard] Failed to load enrollments", err);
    }
  }

  const enrolledCourses = enrollments
    .map((e) => ({ enrollment: e, course: courses.find((c) => c.id === e.courseId) }))
    .filter((row): row is { enrollment: DbCourseEnrollment; course: (typeof courses)[number] } => Boolean(row.course));

  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Account</p>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-stone-900">Your courses</h2>
          <Link href="/mededu/" className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
            Browse all courses →
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="border border-stone-200 rounded-2xl p-8 text-center bg-white">
            <p className="text-stone-500 text-sm mb-4">You haven&apos;t enrolled in any courses yet.</p>
            <Link
              href="/mededu/"
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-lg text-sm transition-colors"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {enrolledCourses.map(({ enrollment, course }) => (
              <div key={course.id} className="border border-stone-200 rounded-2xl p-6 bg-white">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-stone-900 leading-snug">{course.title}</h3>
                  <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full shrink-0">
                    {STATUS_LABEL[enrollment.status]}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mb-4">{course.instructor}</p>
                <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${enrollment.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-stone-500">{enrollment.progressPercent}% complete</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
