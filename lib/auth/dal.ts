import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { users, patientProfiles, doctorProfiles } from "@/lib/db/schema";
import type { DbUser } from "@/lib/db/schema";

/**
 * Data Access Layer (DAL) — the single place server-verified session/role
 * checks happen, per the Next 16 auth guide's recommended pattern
 * (node_modules/next/dist/docs/01-app/02-guides/authentication.md
 * "Creating a Data Access Layer (DAL)"). Every Server Action, Route Handler,
 * and Server Component that needs to know "who is this and what are they
 * allowed to do" should go through this file — never trust a client-supplied
 * user id or role.
 *
 * `getUser()` (not `getSession()`) is used deliberately: per @supabase/ssr's
 * documented caveat, `getSession()` reads the cookie without contacting the
 * Auth server and must not be used for authorization decisions.
 */

export interface AppSession {
  /** Supabase auth user id — same UUID as our public.users.id. */
  userId: string;
  email: string;
}

/**
 * Verifies the Supabase session server-side. Returns null if there is no
 * authenticated user (does NOT redirect — callers decide whether a missing
 * session means "redirect to /login" or "return 401 JSON").
 *
 * Memoized per-request via React's cache() so multiple call sites in the
 * same render/request don't each re-contact the Supabase Auth server.
 */
export const verifySession = cache(async (): Promise<AppSession | null> => {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return { userId: data.user.id, email: data.user.email ?? "" };
  } catch (err) {
    console.error("[dal] verifySession failed", err);
    return null;
  }
});

/**
 * Loads the full application user row (role, name, locale) for the current
 * session, joined from our public.users table (not the Supabase auth.users
 * table, which only has email/identity — role/profile data lives with us).
 */
export const getCurrentUser = cache(async (): Promise<DbUser | null> => {
  const session = await verifySession();
  if (!session) return null;
  if (!isDatabaseConfigured()) return null;

  try {
    const db = getDb();
    const rows = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.error("[dal] getCurrentUser failed", err);
    return null;
  }
});

/** Loads the current user plus their patient_profiles row, if any. */
export const getCurrentPatientProfile = cache(async () => {
  const user = await getCurrentUser();
  if (!user || user.role !== "patient") return null;
  if (!isDatabaseConfigured()) return null;

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(patientProfiles)
      .where(eq(patientProfiles.userId, user.id))
      .limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.error("[dal] getCurrentPatientProfile failed", err);
    return null;
  }
});

/** Loads the current user plus their doctor_profiles row, if any. */
export const getCurrentDoctorProfile = cache(async () => {
  const user = await getCurrentUser();
  if (!user || user.role !== "doctor") return null;
  if (!isDatabaseConfigured()) return null;

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(doctorProfiles)
      .where(eq(doctorProfiles.userId, user.id))
      .limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.error("[dal] getCurrentDoctorProfile failed", err);
    return null;
  }
});

/**
 * For Server Components / pages: redirects unauthenticated users to /login.
 * Use in page.tsx server components, NOT in shared layouts (per the auth
 * guide's warning — layouts don't re-run on every navigation due to partial
 * rendering, so auth checks belong close to the data/page, not the layout).
 */
export async function requireUser(): Promise<DbUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/**
 * For Server Components / pages: redirects to /login if unauthenticated,
 * or to / if authenticated but the wrong role.
 */
export async function requireRole(role: DbUser["role"]): Promise<DbUser> {
  const user = await requireUser();
  if (user.role !== role) redirect("/");
  return user;
}

/**
 * For Server Actions / Route Handlers: returns null instead of redirecting
 * so the caller can return a proper 401/403 JSON response (per the auth
 * guide's Route Handlers section) rather than a redirect, which doesn't
 * make sense for an API response.
 */
export async function getAuthorizedUser(
  allowedRoles?: Array<DbUser["role"]>
): Promise<{ user: DbUser } | { error: "unauthenticated" | "forbidden" }> {
  const user = await getCurrentUser();
  if (!user) return { error: "unauthenticated" };
  if (allowedRoles && !allowedRoles.includes(user.role)) return { error: "forbidden" };
  return { user };
}
