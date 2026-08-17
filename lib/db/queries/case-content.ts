import "server-only";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { caseDocuments, secondOpinionReports, consiliumOpinions } from "@/lib/db/schema";

/**
 * SYNTHETIC-DATA-ONLY query layer for case_documents /
 * second_opinion_reports / consilium_opinions (Phase C/E/G,
 * docs/decision-log/0009). Mirrors lib/db/queries/medical-history.ts's
 * exact pattern: no application code path in this build inserts a real row
 * into any of these three tables — the case-detail UI shells
 * (app/dashboard, app/doctor-dashboard) render
 * lib/db/seed/case-content.seed.ts's static constants directly and never
 * query the database. These functions exist as the future DB-backed read
 * path once Legal & Compliance clears real clinical-content storage; each
 * hard-codes `isSynthetic = true` into its WHERE clause as defense in
 * depth, so it structurally cannot return a real row even if wired up
 * before that consult completes.
 *
 * There is intentionally no insert function for any of the three tables
 * anywhere in this codebase. Do not add one without a Legal & Compliance
 * sign-off reference (docs/agents/DEVELOPER.md's escalation rules).
 */

export async function getSyntheticCaseDocuments(bookingId: string) {
  const db = getDb();
  return db
    .select()
    .from(caseDocuments)
    .where(and(eq(caseDocuments.bookingId, bookingId), eq(caseDocuments.isSynthetic, true)));
}

export async function getSyntheticSecondOpinionReport(bookingId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(secondOpinionReports)
    .where(and(eq(secondOpinionReports.bookingId, bookingId), eq(secondOpinionReports.isSynthetic, true)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getSyntheticConsiliumOpinions(bookingId: string) {
  const db = getDb();
  return db
    .select()
    .from(consiliumOpinions)
    .where(and(eq(consiliumOpinions.bookingId, bookingId), eq(consiliumOpinions.isSynthetic, true)));
}
