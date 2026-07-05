import { describe, expect, it } from "bun:test";
import { BookingFormSchema, BookingActionSchema } from "./validation";

describe("BookingFormSchema", () => {
  it("accepts a minimal valid booking (only situation required)", () => {
    const result = BookingFormSchema.safeParse({ situation: "Something is wrong." });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.urgency).toBe("routine");
      expect(result.data.language).toBe("Russian");
    }
  });

  it("rejects an empty situation description", () => {
    const result = BookingFormSchema.safeParse({ situation: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a whitespace-only situation description", () => {
    const result = BookingFormSchema.safeParse({ situation: "   " });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid urgency value", () => {
    const result = BookingFormSchema.safeParse({ situation: "x", urgency: "asap" });
    expect(result.success).toBe(false);
  });

  it("accepts an explicit doctor slug and specialty", () => {
    const result = BookingFormSchema.safeParse({
      situation: "Need a second opinion.",
      doctor: "dr-elena-volkova",
      specialty: "Oncology",
      urgency: "urgent",
      language: "English",
    });
    expect(result.success).toBe(true);
  });
});

describe("BookingActionSchema", () => {
  const bookingId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  it("accepts a confirm action with no notes", () => {
    const result = BookingActionSchema.safeParse({ bookingId, action: "confirm" });
    expect(result.success).toBe(true);
  });

  it("accepts an add_notes action with notes text", () => {
    const result = BookingActionSchema.safeParse({
      bookingId,
      action: "add_notes",
      notes: "Patient responded well to treatment.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a non-uuid bookingId", () => {
    const result = BookingActionSchema.safeParse({ bookingId: "not-a-uuid", action: "confirm" });
    expect(result.success).toBe(false);
  });

  it("rejects an unrecognized action (e.g. cancel, which doctors may never do)", () => {
    const result = BookingActionSchema.safeParse({ bookingId, action: "cancel" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing action", () => {
    const result = BookingActionSchema.safeParse({ bookingId });
    expect(result.success).toBe(false);
  });
});
