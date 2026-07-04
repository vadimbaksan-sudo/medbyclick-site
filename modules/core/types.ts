/**
 * @deprecated This is the pre-database mock shape (see modules/core/data.ts's
 * `mockUsers`). Real auth/user data now lives in lib/db/schema.ts's `users`
 * table (Drizzle, queried against Supabase Postgres) with identity verified
 * server-side via Supabase Auth — see lib/auth/dal.ts and lib/auth/actions.ts.
 * `role: "patient" | "doctor" | "admin"` was kept as-is in the real schema
 * per spec §1.5 ("it's already correctly shaped"); this file is retained
 * only as a historical reference and is not imported by any real code path.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor" | "admin";
  createdAt: string;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: string;
}
