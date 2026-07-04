import Link from "next/link";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register — MedByClick",
  description: "Create your MedByClick account to track consultations and manage your health journey.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="text-slate-900 font-semibold text-xl tracking-tight">
              MedByClick
            </Link>
            <p className="text-slate-500 text-sm mt-2">Create your account</p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
