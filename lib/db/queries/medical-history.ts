import "server-only";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { medicalHistoryEntries } from "@/lib/db/schema";

/**
 * SYNTHETIC-DATA-ONLY query layer for medical_history_entries (spec §5.2).
 *
 * No application code path in this build inserts a *real* row into this
 * table — the dashboard shell (app/dashboard/MedicalHistoryShell.tsx)
 * renders lib/db/seed/medical-history.seed.ts's static constants directly
 * and never queries the database at all. This function exists as the
 * future DB-backed read path once Legal & Compliance clears real data
 * storage (§5.2) — it hard-codes `isSynthetic: true` into the WHERE clause
 * as defense in depth, so that even if it's wired up before that consult
 * completes, it structurally cannot return a real (non-synthetic) row.
 *
 * There is currently no insert function for this table anywhere in the
 * codebase — intentionally. Do not add one without a Legal & Compliance
 * sign-off reference (see docs/agents/DEVELOPER.md's escalation rules).
 */
export async function getSyntheticMedicalHistoryForPatient(patientId: string) {
  const db = getDb();
  return db
    .select()
    .from(medicalHistoryEntries)
    .where(and(eq(medicalHistoryEntries.patientId, patientId), eq(medicalHistoryEntries.isSynthetic, true)))
    .orderBy(medicalHistoryEntries.recordedAt);
}
