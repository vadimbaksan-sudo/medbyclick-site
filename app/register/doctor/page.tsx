import Link from "next/link";
import RegisterDoctorForm from "./RegisterDoctorForm";

export const metadata = {
  title: "Doctor Registration — MedByClick",
  description: "Register as a doctor on MedByClick. Applications are reviewed before you appear as bookable.",
};

export default function RegisterDoctorPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="text-stone-900 font-semibold text-xl tracking-tight">
              MedByClick
            </Link>
            <p className="text-stone-500 text-sm mt-2">Register as a doctor</p>
          </div>

          <RegisterDoctorForm />
        </div>
      </div>
    </div>
  );
}
