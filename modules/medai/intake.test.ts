import { describe, expect, it } from "bun:test";
import { runIntake, type AnthropicMessagesClient } from "./intake";
import type { SymptomInput } from "./types";

const baseInput: SymptomInput = {
  symptoms: "Recurring headaches on the right side, worse in the morning, with some nausea",
  duration: "3 weeks",
  severity: "moderate",
  age: 34,
};

function mockClient(create: AnthropicMessagesClient["messages"]["create"]): AnthropicMessagesClient {
  return { messages: { create } };
}

describe("runIntake", () => {
  it("short-circuits on a red flag and never calls the model", async () => {
    let called = false;
    const client = mockClient(async () => {
      called = true;
      throw new Error("the model must not be called when a red flag is present");
    });

    const result = await runIntake(
      { ...baseInput, symptoms: "Crushing chest pain radiating to my left arm" },
      client
    );

    expect(result.status).toBe("emergency");
    expect(called).toBe(false);
  });

  it("returns a structured summary from a mocked model response", async () => {
    const client = mockClient(async () => ({
      stop_reason: "end_turn",
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "structured",
            chiefComplaint: "Recurring right-sided headaches",
            timeline: "3 weeks, worse in the morning",
            associatedSymptoms: ["nausea"],
            relevantHistory: "",
            severitySummary: "Moderate, affects daily activities",
            recommendedSpecialty: "Neurology",
            urgencyTier: "routine",
            clarifyingQuestions: ["Any visual changes before the headache starts?"],
            declineReason: "",
          }),
        },
      ],
    }));

    const result = await runIntake(baseInput, client);

    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.summary.recommendedSpecialty).toBe("Neurology");
      expect(result.summary.urgencyTier).toBe("routine");
      expect(result.summary.associatedSymptoms).toEqual(["nausea"]);
      // The schema has no diagnosis/condition field at all — assert the
      // parsed summary object doesn't carry one even if the model tried.
      expect((result.summary as unknown as Record<string, unknown>).diagnosis).toBeUndefined();
      expect((result.summary as unknown as Record<string, unknown>).possibleConditions).toBeUndefined();
    }
  });

  it("surfaces a graceful decline from the model as status: declined", async () => {
    const client = mockClient(async () => ({
      stop_reason: "end_turn",
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "declined",
            chiefComplaint: "",
            timeline: "",
            associatedSymptoms: [],
            relevantHistory: "",
            severitySummary: "",
            recommendedSpecialty: "",
            urgencyTier: "",
            clarifyingQuestions: [],
            declineReason: "Input describes a possible emergency; advised the patient to contact their coordinator directly.",
          }),
        },
      ],
    }));

    const result = await runIntake(baseInput, client);

    expect(result.status).toBe("declined");
    if (result.status === "declined") {
      expect(result.message).toContain("coordinator");
    }
  });

  it("maps a stop_reason of refusal to status: declined", async () => {
    const client = mockClient(async () => ({ stop_reason: "refusal", content: [] }));
    const result = await runIntake(baseInput, client);
    expect(result.status).toBe("declined");
  });

  it("returns status: error when the Anthropic client throws (e.g. no API key configured)", async () => {
    const client = mockClient(async () => {
      throw new Error("Could not resolve authentication method");
    });
    const result = await runIntake(baseInput, client);
    expect(result.status).toBe("error");
  });

  it("returns status: error when the response has no text content block", async () => {
    const client = mockClient(async () => ({ stop_reason: "end_turn", content: [] }));
    const result = await runIntake(baseInput, client);
    expect(result.status).toBe("error");
  });

  it("returns status: error when the model output is not valid JSON", async () => {
    const client = mockClient(async () => ({
      stop_reason: "end_turn",
      content: [{ type: "text", text: "not valid json" }],
    }));
    const result = await runIntake(baseInput, client);
    expect(result.status).toBe("error");
  });
});
