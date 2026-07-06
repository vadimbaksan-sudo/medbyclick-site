import "server-only";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { courseEnrollments } from "@/lib/db/schema";

/**
 * Real Drizzle query layer for course enrollments (mededu). Course content
 * itself is still static data (modules/mededu/data.ts) — only the per-user
 * enrollment/progress relationship is a real row. Callers (Server Actions)
 * must check isDatabaseConfigured() themselves, same convention as
 * lib/db/queries/bookings.ts.
 */

export async function listEnrollmentsForUser(userId: string) {
  const db = getDb();
  return db
    .select()
    .from(courseEnrollments)
    .where(eq(courseEnrollments.userId, userId));
}

export async function findEnrollment(userId: string, courseId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(courseEnrollments)
    .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
    .limit(1);
  return rows[0] ?? null;
}

export async function createEnrollment(userId: string, courseId: string) {
  const db = getDb();
  const rows = await db
    .insert(courseEnrollments)
    .values({ userId, courseId })
    .onConflictDoNothing({ target: [courseEnrollments.userId, courseEnrollments.courseId] })
    .returning();
  return rows[0] ?? (await findEnrollment(userId, courseId));
}

export async function updateEnrollmentProgress(
  userId: string,
  courseId: string,
  status: "in_progress" | "completed",
) {
  const db = getDb();
  const rows = await db
    .update(courseEnrollments)
    .set({
      status,
      progressPercent: status === "completed" ? 100 : 50,
      completedAt: status === "completed" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
    .returning();
  return rows[0] ?? null;
}
