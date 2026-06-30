import Link from "next/link";

export const metadata = {
  title: "Log In — MedByClick",
  description: "Log in to your MedByClick account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="text-slate-900 font-semibold text-xl tracking-tight">
              MedByClick
            </Link>
            <p className="text-slate-500 text-sm mt-2">Log in to your account</p>
          </div>

          <form className="space-y-4">
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
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register/" className="text-slate-900 font-medium underline hover:no-underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
