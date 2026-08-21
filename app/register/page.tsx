import Link from "next/link";
import { User, Stethoscope, BookOpen } from "lucide-react";

export const metadata = {
  title: "Register — MedByClick",
  description: "Create your MedByClick account — as a patient, a doctor, or a student.",
};

const ROLES = [
  {
    href: "/register/patient/",
    icon: User,
    title: "I'm a patient",
    description: "Book consultations with our vetted specialist network and track your care.",
  },
  {
    href: "/register/doctor/",
    icon: Stethoscope,
    title: "I'm a doctor",
    description: "Join the network. Applications are reviewed before you appear as bookable.",
  },
  {
    href: "/register/student/",
    icon: BookOpen,
    title: "I'm here to learn",
    description: "Enroll in courses and track your progress through the education module.",
  },
];

export default function RegisterChooserPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-lg px-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-stone-900 font-semibold text-xl tracking-tight">
            MedByClick
          </Link>
          <p className="text-stone-500 text-sm mt-2">Create your account — who are you?</p>
        </div>

        <div className="space-y-3">
          {ROLES.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="group flex items-center gap-4 bg-white border border-stone-200 rounded-2xl p-5 hover:border-amber-300 hover:shadow-sm transition-all"
            >
              <role.icon className="w-7 h-7 shrink-0 text-stone-500 group-hover:text-amber-700 transition-colors" />
              <div>
                <p className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {role.title}
                </p>
                <p className="text-sm text-stone-500 leading-relaxed mt-0.5">{role.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-stone-500 mt-6">
          Already have an account?{" "}
          <Link href="/login/" className="text-stone-900 font-medium underline hover:no-underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
