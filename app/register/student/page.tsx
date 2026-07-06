import Link from "next/link";
import RegisterStudentForm from "./RegisterStudentForm";

export const metadata = {
  title: "Student Registration — MedByClick",
  description: "Create a student account to enroll in courses and track your progress.",
};

export default function RegisterStudentPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="text-stone-900 font-semibold text-xl tracking-tight">
              MedByClick
            </Link>
            <p className="text-stone-500 text-sm mt-2">Create your student account</p>
          </div>

          <RegisterStudentForm />
        </div>
      </div>
    </div>
  );
}
