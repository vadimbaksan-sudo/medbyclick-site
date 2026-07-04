import { describe, expect, it } from "bun:test";
import { BookingFormSchema } from "./validation";

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
