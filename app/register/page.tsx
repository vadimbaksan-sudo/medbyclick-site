import Link from "next/link";

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

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first" className="block text-sm font-medium text-slate-700 mb-1.5">
                  First name
                </label>
                <input
                  id="first"
                  type="text"
                  placeholder="Anna"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label htmlFor="last" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Last name
                </label>
                <input
                  id="last"
                  type="text"
                  placeholder="Ivanova"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
            By registering you agree to our terms of service and privacy policy.
          </p>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <Link href="/login/" className="text-slate-900 font-medium underline hover:no-underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
