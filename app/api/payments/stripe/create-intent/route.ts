import { NextRequest, NextResponse } from "next/server";
import { getAuthorizedUser } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { getStripeClient, isStripeConfigured } from "@/lib/payments/stripe";
import { createPendingPayment } from "@/lib/db/queries/payments";
import { plans } from "@/modules/medpayments/data";

// SAFETY / SCOPE NOTE — mirrors app/api/medai/intake/route.ts's pattern:
// the Stripe secret key must never reach the browser, which is the whole
// reason this is a server-side Route Handler. The price is looked up here
// from modules/medpayments/data.ts's `plans` — server-side, keyed by
// planId — never trusted from the client request body (spec §4.1 point 1).

interface CreateIntentRequestBody {
  planId?: unknown;
  bookingId?: unknown;
}

interface CreateIntentApiResponse {
  status: "ok" | "error";
  clientSecret?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  const auth = await getAuthorizedUser();
  if ("error" in auth) {
    return NextResponse.json<CreateIntentApiResponse>(
      { status: "error", message: "Please log in to make a payment." },
      { status: auth.error === "unauthenticated" ? 401 : 403 }
    );
  }

  let body: CreateIntentRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<CreateIntentApiResponse>(
      { status: "error", message: "Invalid request body." },
      { status: 400 }
    );
  }

  const planId = typeof body.planId === "string" ? body.planId : "";
  const plan = plans.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json<CreateIntentApiResponse>(
      { status: "error", message: "Unknown plan." },
      { status: 400 }
    );
  }

  const bookingId = typeof body.bookingId === "string" ? body.bookingId : null;

  if (!isStripeConfigured() || !isDatabaseConfigured()) {
    return NextResponse.json<CreateIntentApiResponse>(
      {
        status: "error",
        message:
          "Card payments are not configured yet in this environment " +
          "(Stripe test account / database not set up). Please contact a coordinator.",
      },
      { status: 503 }
    );
  }

  try {
    const stripe = getStripeClient();
    const amountInMinorUnits = Math.round(plan.price * 100);

    const intent = await stripe.paymentIntents.create({
      amount: amountInMinorUnits,
      currency: plan.currency.toLowerCase(),
      metadata: { planId: plan.id, userId: auth.user.id },
      automatic_payment_methods: { enabled: true },
    });

    await createPendingPayment({
      userId: auth.user.id,
      bookingId,
      planId: plan.id,
      amount: plan.price.toFixed(2),
      currency: plan.currency,
      paymentMethod: "card",
      status: "pending",
      provider: "stripe",
      providerPaymentIntentId: intent.id,
    });

    return NextResponse.json<CreateIntentApiResponse>({
      status: "ok",
      clientSecret: intent.client_secret ?? undefined,
    });
  } catch (err) {
    console.error("[payments/stripe/create-intent] Failed", err);
    return NextResponse.json<CreateIntentApiResponse>(
      { status: "error", message: "Could not start payment. Please try again." },
      { status: 502 }
    );
  }
}
