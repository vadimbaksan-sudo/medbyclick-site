import { describe, expect, it } from "bun:test";
import { detectRedFlags } from "./redFlags";

describe("detectRedFlags", () => {
  it("returns null for benign, non-emergency input", () => {
    expect(detectRedFlags("Recurring headaches on the right side, worse in the morning, with some nausea")).toBeNull();
  });

  it("returns null for empty or whitespace-only input", () => {
    expect(detectRedFlags("")).toBeNull();
    expect(detectRedFlags("   ")).toBeNull();
  });

  it("detects chest pain", () => {
    const match = detectRedFlags("I have crushing chest pain and shortness of breath");
    expect(match?.category).toBe("chest_pain");
  });

  it("detects stroke signs (facial droop / slurred speech)", () => {
    expect(detectRedFlags("His face is drooping on one side and his speech is slurred")?.category).toBe("stroke_signs");
  });

  it("detects worst headache of life phrasing", () => {
    expect(detectRedFlags("Sudden onset, worst headache of my life")?.category).toBe("stroke_signs");
  });

  it("detects severe breathing difficulty", () => {
    expect(detectRedFlags("I can't breathe and my lips are turning blue")?.category).toBe("breathing_difficulty");
  });

  it("detects uncontrolled bleeding", () => {
    expect(detectRedFlags("Cut my arm, bleeding heavily and it won't stop")?.category).toBe("severe_bleeding");
  });

  it("detects anaphylaxis", () => {
    expect(detectRedFlags("My throat is closing after eating peanuts")?.category).toBe("anaphylaxis");
  });

  it("detects suicidal ideation", () => {
    expect(detectRedFlags("I want to kill myself")?.category).toBe("suicidal_self_harm");
  });

  it("detects unresponsive infant with fever", () => {
    expect(detectRedFlags("My baby has a high fever and is completely limp and won't wake up")?.category).toBe(
      "infant_unresponsive"
    );
  });

  it("requires BOTH pregnancy and severe abdominal pain for the compound rule", () => {
    expect(detectRedFlags("I am pregnant and have mild indigestion")).toBeNull();
    expect(detectRedFlags("Severe abdominal pain")).toBeNull();
    expect(detectRedFlags("I am 20 weeks pregnant with severe abdominal pain")?.category).toBe(
      "pregnancy_abdominal_pain"
    );
  });

  it("detects supplementary Russian keyword matches", () => {
    expect(detectRedFlags("У меня сильное кровотечение и не могу дышать")?.category).toBe(
      "possible_emergency_non_english"
    );
  });

  it("detects supplementary Hebrew keyword matches", () => {
    expect(detectRedFlags("יש לי כאב בחזה חזק")?.category).toBe("possible_emergency_non_english");
  });
});
