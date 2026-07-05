"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { users, patientProfiles, doctorProfiles } from "@/lib/db/schema";
import {
  RegisterFormSchema,
  RegisterDoctorFormSchema,
  LoginFormSchema,
  type AuthFormState,
} from "./validation";

/**
 * Real sign-up Server Action — replaces app/register/page.tsx's no-op
 * <form> (spec §0/§1). Creates the Supabase Auth identity (password
 * hashing, verification email, etc. — all vendor-managed) and then a
 * matching public.users + patient_profiles row via Drizzle.
 *
 * Every account created through this form is role: "patient". Doctor
 * self-registration is a separate flow — see registerDoctor() below and
 * app/register/doctor.
 */
export async function registerPatient(
  _prevState: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const validated = RegisterFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    citizenshipOrCountry: formData.get("citizenshipOrCountry"),
    preferredLanguage: formData.get("preferredLanguage") || "ru",
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  if (!isSupabaseConfigured() || !isDatabaseConfigured()) {
    return {
      message:
        "Registration is not available yet — the Supabase project and database " +
        "have not been configured in this environment. Please contact support.",
    };
  }

  const { firstName, lastName, email, password, citizenshipOrCountry, preferredLanguage } =
    validated.data;
  const name = `${firstName} ${lastName}`.trim();

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) {
    return { message: error?.message ?? "Could not create your account. Please try again." };
  }

  try {
    const db = getDb();
    await db.insert(users).values({
      id: data.user.id,
      email,
      name,
      role: "patient",
      locale: preferredLanguage,
    });
    await db.insert(patientProfiles).values({
      userId: data.user.id,
      preferredLanguage,
      citizenshipOrCountry,
    });
  } catch (err) {
    console.error("[auth/actions] Failed to create profile rows after signUp", err);
    return {
      message:
        "Your account was created but we couldn't finish setting up your profile. " +
        "Please contact support.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/**
 * Doctor self-registration Server Action (spec §2) — creates the Supabase
 * Auth identity + a public.users row (role: "doctor") + a doctor_profiles
 * row, mirroring registerPatient()'s shape exactly.
 *
 * `vettingStatus: "pending"` and `verified: false` are HARD-CODED literals
 * below, never read from `validated.data` or any form/request field — the
 * Zod schema (RegisterDoctorFormSchema) doesn't even declare those keys, so
 * there is no path, crafted request or otherwise, that can set them at
 * registration. Per spec §2, a self-registered doctor must never be
 * bookable until Medical Community/Medical Advisory clear them
 * (`listMedconnectDoctors()` already filters on `vettingStatus ===
 * "approved"`); this action must never weaken that gate.
 */
export async function registerDoctor(
  _prevState: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const validated = RegisterDoctorFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    specialty: formData.get("specialty"),
    title: formData.get("title") || "",
    credentials: formData.get("credentials") || "",
    bio: formData.get("bio") || "",
    languages: formData.get("languages") || "",
    preferredLanguage: formData.get("preferredLanguage") || "ru",
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  if (!isSupabaseConfigured() || !isDatabaseConfigured()) {
    return {
      message:
        "Registration is not available yet — the Supabase project and database " +
        "have not been configured in this environment. Please contact support.",
    };
  }

  const {
    firstName,
    lastName,
    email,
    password,
    specialty,
    title,
    credentials,
    bio,
    languages,
    preferredLanguage,
  } = validated.data;
  const name = `${firstName} ${lastName}`.trim();
  const languageList = languages
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) {
    return { message: error?.message ?? "Could not create your account. Please try again." };
  }

  try {
    const db = getDb();
    await db.insert(users).values({
      id: data.user.id,
      email,
      name,
      role: "doctor",
      locale: preferredLanguage,
    });
    await db.insert(doctorProfiles).values({
      userId: data.user.id,
      name,
      title: title || null,
      specialty,
      languages: languageList,
      credentials: credentials || null,
      bio: bio || null,
      // Hard-coded — see the function comment. Never sourced from
      // `validated.data`, which has no such keys to begin with.
      vettingStatus: "pending",
      verified: false,
    });
  } catch (err) {
    console.error("[auth/actions] Failed to create doctor profile rows after signUp", err);
    return {
      message:
        "Your account was created but we couldn't finish setting up your profile. " +
        "Please contact support.",
    };
  }

  revalidatePath("/doctor-dashboard");
  redirect("/doctor-dashboard");
}

/**
 * Real login Server Action — replaces app/login/page.tsx's no-op <form>.
 */
export async function loginUser(
  _prevState: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const validated = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  if (!isSupabaseConfigured()) {
    return {
      message:
        "Login is not available yet — the Supabase project has not been " +
        "configured in this environment. Please contact support.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(validated.data);

  if (error) {
    return { message: "Invalid email or password." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function logoutUser(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/");
  redirect("/login");
}
