import Link from "next/link";

export const metadata = {
  title: "Medical Education — MedByClick",
  description: "Patient education resources: understand your diagnosis, navigate treatment options, and prepare for specialist consultations.",
};

const courses = [
  {
    id: "understanding-diagnosis",
    category: "Patient Essentials",
    title: "Understanding Your Diagnosis",
    description: "How to read medical reports, what questions to ask your doctor, and how to evaluate recommended treatments.",
    duration: "45 min",
    modules: 5,
  },
  {
    id: "second-opinions",
    category: "Patient Essentials",
    title: "When and How to Get a Second Opinion",
    description: "The cases where second opinions matter most, how to prepare your records, and what to look for in an expert's assessment.",
    duration: "30 min",
    modules: 4,
  },
  {
    id: "cancer-basics",
    category: "Oncology",
    title: "Cancer Staging & Treatment Overview",
    description: "A plain-language introduction to staging systems, treatment modalities, and how oncologists make decisions.",
    duration: "60 min",
    modules: 6,
  },
  {
    id: "cardio-basics",
    category: "Cardiology",
    title: "Heart Disease: What Patients Need to Know",
    description: "Understanding coronary artery disease, arrhythmia, and heart failure — including lifestyle and medication management.",
    duration: "50 min",
    modules: 5,
  },
  {
    id: "neuro-basics",
    category: "Neurology",
    title: "Navigating Neurological Conditions",
    description: "MS, Parkinson's, and rare neurological conditions explained — what the diagnosis means and what to expect.",
    duration: "55 min",
    modules: 6,
  },
  {
    id: "medical-records",
    category: "Patient Essentials",
    title: "Organising Your Medical Records",
    description: "Step-by-step guide to gathering, organising, and presenting your medical history for a specialist consultation.",
    duration: "25 min",
    modules: 3,
  },
  {
    id: "clinical-trials",
    category: "Advanced",
    title: "Understanding Clinical Trials",
    description: "How to find open trials, what phases mean, and how to evaluate whether a trial is right for your situation.",
    duration: "40 min",
    modules: 4,
  },
  {
    id: "israel-healthcare",
    category: "Medical Travel",
    title: "Israeli Healthcare System: A Patient Guide",
    description: "How Israel's hospitals work, what to expect, and how to navigate the system as an international patient.",
    duration: "35 min",
    modules: 4,
  },
];

const categories = [...new Set(courses.map((c) => c.category))];

export default function EducationPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            Patient education
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Know more. Decide better.</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Clear, expert-written guides to help you understand your diagnosis, prepare for specialist consultations, and navigate complex medical decisions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((cat) => (
          <div key={cat} className="mb-14">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
              {cat}
              <span className="h-px flex-1 bg-slate-100" />
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.filter((c) => c.category === cat).map((course) => (
                <div
                  key={course.id}
                  className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-300 hover:shadow-sm transition-all flex flex-col"
                >
                  <p className="text-xs text-amber-600 font-medium mb-2">{course.category}</p>
                  <h3 className="font-semibold text-slate-900 mb-2 leading-tight">{course.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{course.duration}</span>
                      <span>·</span>
                      <span>{course.modules} modules</span>
                    </div>
                    <button className="text-xs font-medium bg-slate-900 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                      Start →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border-t border-amber-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Education is the start. Expert care is the next step.
          </h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Once you understand your situation, our coordinators can match you with the right specialist — usually within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book/"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Book a consultation
            </Link>
            <Link
              href="/ai-diagnostics/"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg text-sm transition-colors"
            >
              Try AI diagnostics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
