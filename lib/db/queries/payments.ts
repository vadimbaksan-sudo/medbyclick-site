import "server-only";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { payments } from "@/lib/db/schema";
import type { NewDbPayment } from "@/lib/db/schema";

/**
 * Real Drizzle query layer for `payments` (spec §4.1). A row is created
 * with status "pending" at PaymentIntent-creation time and updated to
 * "succeeded"/"failed" by the Stripe webhook — the webhook, not the client
 * UI, is the source of truth for "did we actually get paid" (spec §4.1
 * point 3).
 */

export async function createPendingPayment(input: NewDbPayment) {
  const db = getDb();
  const rows = await db.insert(payments).values(input).returning();
  return rows[0];
}

export async function updatePaymentStatusByIntentId(
  providerPaymentIntentId: string,
  status: (typeof payments.$inferSelect)["status"]
) {
  const db = getDb();
  const rows = await db
    .update(payments)
    .set({ status, updatedAt: new Date() })
    .where(eq(payments.providerPaymentIntentId, providerPaymentIntentId))
    .returning();
  return rows[0] ?? null;
}

export async function listPaymentsForUser(userId: string) {
  const db = getDb();
  return db.select().from(payments).where(eq(payments.userId, userId)).orderBy(payments.createdAt);
}
