/**
 * Real seed script — run with `bun run db:seed` against a configured
 * DATABASE_URL (a real Supabase Postgres instance). Upserts the 11
 * medconnect + 5 medglobaldb placeholder doctors (lib/db/seed/doctors.seed.ts)
 * into `doctor_profiles`, keyed on `slug` so re-running is idempotent.
 *
 * This cannot be executed in this sandbox — there is no live Supabase
 * project / DATABASE_URL configured. It has not been run against a real
 * database as part of this change; it is provided so Vadim (or CI, once
 * credentials exist) can run it after `db:migrate`.
 */
import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { doctorProfiles } from "@/lib/db/schema";
import { seedDoctors } from "./doctors.seed";

async function main() {
  if (!isDatabaseConfigured()) {
    console.error(
      "DATABASE_URL is not set — cannot seed. Configure it (see .env.example) " +
        "and run `bun run db:migrate` first."
    );
    process.exit(1);
  }

  const db = getDb();

  for (const doctor of seedDoctors) {
    const existing = await db
      .select({ id: doctorProfiles.id })
      .from(doctorProfiles)
      .where(eq(doctorProfiles.slug, doctor.slug))
      .limit(1);

    if (existing[0]) {
      await db.update(doctorProfiles).set(doctor).where(eq(doctorProfiles.id, existing[0].id));
      console.log(`updated: ${doctor.slug}`);
    } else {
      await db.insert(doctorProfiles).values(doctor);
      console.log(`inserted: ${doctor.slug}`);
    }
  }

  console.log(`Seed complete — ${seedDoctors.length} doctor_profiles rows upserted.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
