import { NextRequest, NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/db/client";
import { runSlaSweep } from "@/lib/bookings/sla";

/**
 * Phase F (docs/decision-log/0009): scheduled SLA-escalation /
 * abandoned-case sweep for spec §3.4's "Эскалирован"/"Оставлен" terminal
 * states. Invoked by Vercel Cron per vercel.json's `crons` entry — Vercel
 * signs the request with `Authorization: Bearer $CRON_SECRET` when that env
 * var is set (https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs);
 * this route rejects any request that doesn't present it, so it's not an
 * open unauthenticated mutation endpoint. If CRON_SECRET isn't configured
 * yet, requests are rejected closed (fails safe) rather than open.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  try {
    const result = await runSlaSweep();
    return NextResponse.json({ status: "ok", ...result });
  } catch (err) {
    console.error("[cron/sla-sweep] Sweep failed", err);
    return NextResponse.json({ error: "Sweep failed." }, { status: 500 });
  }
}
