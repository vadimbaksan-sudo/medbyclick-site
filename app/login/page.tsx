import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log In — MedByClick",
  description: "Log in to your MedByClick account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="text-stone-900 font-semibold text-xl tracking-tight">
              MedByClick
            </Link>
            <p className="text-stone-500 text-sm mt-2">Log in to your account</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
