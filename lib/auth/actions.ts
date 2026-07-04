"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { users, patientProfiles } from "@/lib/db/schema";
import { RegisterFormSchema, LoginFormSchema, type AuthFormState } from "./validation";

/**
 * Real sign-up Server Action — replaces app/register/page.tsx's no-op
 * <form> (spec §0/§1). Creates the Supabase Auth identity (password
 * hashing, verification email, etc. — all vendor-managed) and then a
 * matching public.users + patient_profiles row via Drizzle.
 *
 * Doctor self-registration is explicitly out of scope for this pass (see
 * docs/agents/DEVELOPER.md task scope) — every account created through this
 * form is role: "patient".
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
