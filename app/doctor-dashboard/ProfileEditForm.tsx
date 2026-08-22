"use client";

import { useActionState } from "react";
import { updateOwnDoctorProfile } from "@/lib/doctor-profile/actions";
import type { DoctorProfileFormState } from "@/lib/doctor-profile/validation";
import type { DbDoctorProfile } from "@/lib/db/schema";

const initialState: DoctorProfileFormState = { status: "idle" };

interface ProfileEditFormProps {
  doctorProfile: DbDoctorProfile;
}

/**
 * Doctor profile self-edit form (spec §1.1). Only renders inputs for the
 * whitelisted fields — bio, credentials, languages, subspecialties,
 * responseTime, avatarUrl, title. Fields the doctor cannot self-edit
 * (specialty, vettingStatus, verified, institution, country, city, hIndex,
 * publications, slug, endorsement) are shown read-only below, with a note
 * on how to request a change, so it's clear this isn't a bug — it's the
 * vetting-integrity boundary from spec §1.2.
 */
export default function ProfileEditForm({ doctorProfile }: ProfileEditFormProps) {
  const [state, action, pending] = useActionState(updateOwnDoctorProfile, initialState);

  return (
    <div className="border border-stone-200 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-stone-900 mb-1">Your profile</h2>
      <p className="text-sm text-stone-500 mb-5">
        These fields are visible to patients. Fields not shown here (specialty, vetting status,
        institution, etc.) require Medical Community review to change.
      </p>

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-1.5">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={doctorProfile.title ?? ""}
              placeholder="e.g. MD, Prof."
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
          </div>
          <div>
            <label htmlFor="responseTime" className="block text-sm font-medium text-stone-700 mb-1.5">
              Typical response time
            </label>
            <input
              id="responseTime"
              name="responseTime"
              type="text"
              defaultValue={doctorProfile.responseTime ?? ""}
              placeholder="e.g. within 24 hours"
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
            defaultValue={doctorProfile.credentials ?? ""}
            placeholder="Degrees, training, board certifications"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-stone-700 mb-1.5">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={doctorProfile.bio ?? ""}
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="languages" className="block text-sm font-medium text-stone-700 mb-1.5">
              Languages
            </label>
            <input
              id="languages"
              name="languages"
              type="text"
              defaultValue={(doctorProfile.languages ?? []).join(", ")}
              placeholder="Comma-separated"
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
          </div>
          <div>
            <label htmlFor="subspecialties" className="block text-sm font-medium text-stone-700 mb-1.5">
              Subspecialties
            </label>
            <input
              id="subspecialties"
              name="subspecialties"
              type="text"
              defaultValue={(doctorProfile.subspecialties ?? []).join(", ")}
              placeholder="Comma-separated"
              className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="avatarUrl" className="block text-sm font-medium text-stone-700 mb-1.5">
            Avatar URL
          </label>
          <input
            id="avatarUrl"
            name="avatarUrl"
            type="text"
            defaultValue={doctorProfile.avatarUrl ?? ""}
            placeholder="https://…"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
          />
          {state.errors?.avatarUrl && (
            <p className="text-xs text-red-500 mt-1">{state.errors.avatarUrl[0]}</p>
          )}
        </div>

        {state.status === "error" && state.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{state.message}</p>
          </div>
        )}
        {state.status === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">{state.message ?? "Profile updated."}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="py-2.5 px-5 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          {pending ? "Saving…" : "Save profile"}
        </button>
      </form>

      <dl className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
        <dt className="text-stone-400">Specialty</dt>
        <dd className="text-stone-600">{doctorProfile.specialty}</dd>
        <dt className="text-stone-400">Vetting status</dt>
        <dd className="text-stone-600 capitalize">{doctorProfile.vettingStatus}</dd>
      </dl>
    </div>
  );
}
