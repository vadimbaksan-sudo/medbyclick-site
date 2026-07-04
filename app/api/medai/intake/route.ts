import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { runIntake } from "@/modules/medai/intake";
import type { IntakeApiResponse, SymptomInput } from "@/modules/medai/types";

// SAFETY / SCOPE NOTE — read before wiring this up to any real data source:
// This route must only receive synthetic/test patient input for now. Real
// patient symptom data may not be sent to any external LLM provider until
// Legal & Compliance's data-handling review clears it — see
// docs/reports/legal/2026-07-04-medai-llm-data-handling-review.md §3 and
// docs/reports/medical/2026-07-04-medai-llm-integration-clinical-safety-review.md
// Verdict condition 6. This code does not (and cannot, at this layer) enforce
// that on its own — it is a process constraint on whoever connects a real
// intake form/database to this endpoint, not a runtime check.
//
// The Anthropic API key must never reach the browser — that's the whole
// reason this is a server-side Route Handler rather than a client-side call.
// `new Anthropic()` reads ANTHROPIC_API_KEY from the environment; do not
// hardcode a key here.

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<IntakeApiResponse>(
      { status: "error", message: "Invalid request body." },
      { status: 400 }
    );
  }

  const input = parseSymptomInput(body);
  if (!input) {
    return NextResponse.json<IntakeApiResponse>(
      { status: "error", message: "Please describe your symptoms before submitting." },
      { status: 400 }
    );
  }

  let client: Anthropic;
  try {
    // No API key is expected to be configured in this development
    // environment — that's expected. This throws synchronously if no
    // credential source is available at all, so it's wrapped rather than
    // left to crash the request handler.
    client = new Anthropic();
  } catch (err) {
    console.error("[medai/intake] Failed to construct Anthropic client", err);
    return NextResponse.json<IntakeApiResponse>(
      { status: "error", message: "The AI intake service is not configured. Please contact a coordinator directly." },
      { status: 503 }
    );
  }

  const result = await runIntake(input, client);
  const httpStatus = result.status === "error" ? 502 : 200;
  return NextResponse.json<IntakeApiResponse>(result, { status: httpStatus });
}

function parseSymptomInput(body: unknown): SymptomInput | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  if (typeof b.symptoms !== "string" || !b.symptoms.trim()) return null;

  const severity = b.severity === "mild" || b.severity === "severe" ? b.severity : "moderate";
  const age = typeof b.age === "number" && Number.isFinite(b.age) && b.age > 0 ? b.age : 0;
  const duration = typeof b.duration === "string" ? b.duration : "";

  return {
    symptoms: b.symptoms,
    duration,
    severity,
    age,
  };
}
