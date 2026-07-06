"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerDoctor } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { SPECIALTIES } from "@/lib/constants/specialties";

const initialState: AuthFormState | undefined = undefined;

export default function RegisterDoctorForm() {
  const [state, action, pending] = useActionState(registerDoctor, initialState);

  return (
    <>
      <form action={action} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-1.5">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Elena"
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
            {state?.errors?.firstName && (
              <p className="text-xs text-red-500 mt-1">{state.errors.firstName[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-1.5">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Volkova"
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
            {state?.errors?.lastName && (
              <p className="text-xs text-red-500 mt-1">{state.errors.lastName[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
          {state?.errors?.email && <p className="text-xs text-red-500 mt-1">{state.errors.email[0]}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
          {state?.errors?.password && (
            <p className="text-xs text-red-500 mt-1">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-stone-700 mb-1.5">
              Specialty
            </label>
            <select
              id="specialty"
              name="specialty"
              defaultValue=""
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 transition bg-white"
            >
              <option value="" disabled>
                Select a specialty
              </option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {state?.errors?.specialty && (
              <p className="text-xs text-red-500 mt-1">{state.errors.specialty[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-1.5">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. MD, Prof."
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="credentials" className="block text-sm font-medium text-stone-700 mb-1.5">
            Credentials
          </label>
          <input
            id="credentials"
            name="credentials"
            type="text"
            placeholder="Degrees, training, board certifications"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
        </div>

        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-stone-700 mb-1.5">
            Languages spoken
          </label>
          <input
            id="languages"
            name="languages"
            type="text"
            placeholder="e.g. Russian, English, Hebrew"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
          <p className="text-xs text-stone-400 mt-1">Comma-separated.</p>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-stone-700 mb-1.5">
            Short bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            placeholder="A brief self-description patients will see."
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
        </div>

        <div>
          <label htmlFor="preferredLanguage" className="block text-sm font-medium text-stone-700 mb-1.5">
            Dashboard language
          </label>
          <select
            id="preferredLanguage"
            name="preferredLanguage"
            defaultValue="ru"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 transition bg-white"
          >
            <option value="ru">Russian</option>
            <option value="en">English</option>
            <option value="he">Hebrew</option>
          </select>
        </div>

        {state?.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{state.message}</p>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            After registering, your profile is reviewed by Medical Community before you appear as
            bookable. You can log in and check your review status any time from the doctor
            dashboard.
          </p>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 bg-stone-900 hover:bg-stone-700 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          {pending ? "Creating account…" : "Create doctor account"}
        </button>
      </form>

      <p className="text-center text-xs text-stone-400 mt-4 leading-relaxed">
        By registering you agree to our terms of service and privacy policy.
      </p>

      <p className="text-center text-sm text-stone-500 mt-4">
        Already have an account?{" "}
        <Link href="/login/" className="text-stone-900 font-medium underline hover:no-underline">
          Log in
        </Link>
      </p>
      <p className="text-center text-sm text-stone-500 mt-2">
        Registering as a patient instead?{" "}
        <Link href="/register/patient/" className="text-stone-900 font-medium underline hover:no-underline">
          Patient sign up
        </Link>
      </p>
    </>
  );
}
