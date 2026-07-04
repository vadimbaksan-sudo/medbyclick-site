import type { Config } from "drizzle-kit";

// Used by `drizzle-kit generate` / `drizzle-kit migrate` (see package.json's
// `db:generate` / `db:migrate` scripts). Requires DATABASE_URL only for the
// `migrate`/`push`/`studio` commands that actually connect to Postgres —
// `generate` only reads lib/db/schema.ts and does not need a live DB.
export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://placeholder/placeholder",
  },
  strict: true,
  verbose: true,
} satisfies Config;
