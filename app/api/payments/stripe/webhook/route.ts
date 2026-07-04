import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, isStripeConfigured } from "@/lib/payments/stripe";
import { isDatabaseConfigured } from "@/lib/db/client";
import { updatePaymentStatusByIntentId } from "@/lib/db/queries/payments";

// SAFETY NOTE: this is the authoritative confirmation of payment (spec
// §4.1 point 3) — the client-side "success" UI state alone can lie or fail
// to fire, so the webhook (not StripeForm.tsx) is the source of truth that
// updates a `payments` row to "succeeded"/"failed". Signature verification
// is mandatory: without it, anyone could POST a fake "succeeded" event.
//
// Register this endpoint in the Stripe Dashboard (Developers → Webhooks)
// once a real MedByClick Stripe account exists, or use `stripe listen
// --forward-to localhost:3000/api/payments/stripe/webhook` for local dev.
// STRIPE_WEBHOOK_SECRET must be set from that registration — see
// .env.example.

export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !isDatabaseConfigured()) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[payments/stripe/webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = getStripeClient();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("[payments/stripe/webhook] Signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const intent = event.data.object;
        await updatePaymentStatusByIntentId(intent.id, "succeeded");
        break;
      }
      case "payment_intent.payment_failed": {
        const intent = event.data.object;
        await updatePaymentStatusByIntentId(intent.id, "failed");
        break;
      }
      default:
        // Ignore other event types — we only track payment intent outcomes.
        break;
    }
  } catch (err) {
    console.error("[payments/stripe/webhook] Failed to update payment row", err);
    return NextResponse.json({ error: "Failed to process event" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
