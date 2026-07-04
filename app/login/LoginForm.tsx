"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";

const initialState: AuthFormState | undefined = undefined;

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginUser, initialState);

  return (
    <>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
          />
          {state?.errors?.email && <p className="text-xs text-red-500 mt-1">{state.errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
          />
          {state?.errors?.password && (
            <p className="text-xs text-red-500 mt-1">{state.errors.password[0]}</p>
          )}
        </div>

        {state?.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{state.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register/" className="text-slate-900 font-medium underline hover:no-underline">
          Register
        </Link>
      </p>
    </>
  );
}
