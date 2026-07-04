import "server-only";
import Stripe from "stripe";

/**
 * Server-side Stripe client factory — the secret key must never reach the
 * browser (same principle app/api/medai/intake/route.ts already documents
 * for the Anthropic key). Constructed lazily so importing this module
 * doesn't throw at build time when STRIPE_SECRET_KEY isn't configured (this
 * sandbox has no real MedByClick Stripe account — see .env.example).
 */

let cached: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripeClient(): Stripe {
  if (cached) return cached;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Supply a real MedByClick Stripe (test mode " +
        "is fine to start) secret key — see .env.example. The hardcoded " +
        "pk_test_TYooMQauvdEDq54NiTphI7jx previously in app/checkout/stripe was " +
        "Stripe's own public demo key, not a real account."
    );
  }

  cached = new Stripe(secretKey);
  return cached;
}
