import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Lazy, memoized Drizzle client.
 *
 * IMPORTANT: this module must be safe to *import* even when DATABASE_URL is
 * not configured (e.g. during `next build`/`bun run build` in this sandbox,
 * which has no live Supabase project). The Postgres connection is only ever
 * opened the first time `getDb()` is actually called at request time — never
 * at module load / build time.
 */

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Returns the Drizzle client, connecting lazily on first use.
 *
 * Throws a descriptive error if DATABASE_URL is not set — callers in
 * request-time code paths (Server Actions, Route Handlers, Server
 * Components) should catch this and degrade gracefully (e.g. return a
 * "service not configured" response) rather than let it crash the request.
 */
export function getDb() {
  if (cached) return cached;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Supply a Supabase Postgres connection string " +
        "(Project Settings → Database → Connection string, transaction pooler " +
        "recommended for serverless) as an environment variable — see .env.example."
    );
  }

  // `prepare: false` is required for Supabase's transaction pooler (pgbouncer
  // in transaction mode does not support prepared statements).
  const client = postgres(connectionString, { prepare: false });
  cached = drizzle(client, { schema });
  return cached;
}
