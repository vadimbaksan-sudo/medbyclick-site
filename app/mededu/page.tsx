import { courses } from "@/modules/mededu/data";
import CourseCard from "@/modules/mededu/components/CourseCard";
import ArticleSearch from "@/modules/mededu/components/ArticleSearch";
import { getCurrentUser } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { listEnrollmentsForUser } from "@/lib/db/queries/course-enrollments";

// Reads the auth session (cookies) to show enrollment state — same reason
// app/dashboard/page.tsx forces dynamic rendering.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "MedEdu — Medical Education · MedByClick",
  description: "Patient education courses taught by our specialist network.",
};

export default async function MedEduPage() {
  const user = await getCurrentUser();

  let enrollmentsByCourseId: Record<string, { status: "enrolled" | "in_progress" | "completed"; progressPercent: number }> = {};
  if (user && isDatabaseConfigured()) {
    try {
      const enrollments = await listEnrollmentsForUser(user.id);
      enrollmentsByCourseId = Object.fromEntries(
        enrollments.map((e) => [e.courseId, { status: e.status, progressPercent: e.progressPercent }])
      );
    } catch (err) {
      console.error("[mededu] Failed to load enrollments", err);
    }
  }

  return (
    <div>
      <div className="bg-green-50 text-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MedEdu Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Education</h1>
          <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
            Courses taught by the same specialists in our network. Real clinical knowledge — not generic health content.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-stone-900">All Courses</h2>
          <p className="text-sm text-stone-500">{courses.reduce((s, c) => s + c.enrolled, 0).toLocaleString()} students enrolled</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              enrollment={enrollmentsByCourseId[course.id] ?? null}
              loggedIn={Boolean(user)}
            />
          ))}
        </div>

        <div className="border-t border-stone-200 pt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">
            For Medical Students &amp; Professionals
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
            Search Medical Literature
          </h2>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-8">
            <p className="text-sm text-stone-600 leading-relaxed">
              Live results from PubMed, the U.S. National Library of Medicine&apos;s
              index of peer-reviewed journal literature — for coursework and
              clinical reference, not patient guidance. Each result links to the
              official listing on pubmed.ncbi.nlm.nih.gov.
            </p>
          </div>
          <ArticleSearch />
        </div>
      </div>
    </div>
  );
}
