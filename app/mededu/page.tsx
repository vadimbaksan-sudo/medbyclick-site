import { courses } from "@/modules/mededu/data";
import CourseCard from "@/modules/mededu/components/CourseCard";

export const metadata = {
  title: "MedEdu — Medical Education · MedByClick",
  description: "Patient education courses taught by our specialist network.",
};

export default function MedEduPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            MedEdu Module
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Education</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Courses taught by the same specialists in our network. Real clinical knowledge — not generic health content.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900">All Courses</h2>
          <p className="text-sm text-slate-500">{courses.reduce((s, c) => s + c.enrolled, 0).toLocaleString()} students enrolled</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
