import type { User } from "./types";

/**
 * @deprecated Pre-database mock data — superseded by lib/db/schema.ts's
 * `users` table + Supabase Auth (see modules/core/types.ts's deprecation
 * note). Not imported by any real code path; kept only as a historical
 * reference of the original two-user mock shape this repo started from.
 */
export const mockUsers: User[] = [
  { id: "u1", email: "admin@medbyclick.com", name: "Admin", role: "admin", createdAt: "2024-01-01" },
  { id: "u2", email: "patient@example.com", name: "Anna K.", role: "patient", createdAt: "2024-03-15" },
];
