import { describe, expect, it } from "bun:test";
import { RegisterFormSchema, LoginFormSchema } from "./validation";

describe("RegisterFormSchema", () => {
  const valid = {
    firstName: "Anna",
    lastName: "Ivanova",
    email: "anna@example.com",
    password: "password1",
    citizenshipOrCountry: "Russia",
    preferredLanguage: "ru" as const,
  };

  it("accepts a fully valid registration", () => {
    const result = RegisterFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects a missing email", () => {
    const result = RegisterFormSchema.safeParse({ ...valid, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = RegisterFormSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a password under 8 characters", () => {
    const result = RegisterFormSchema.safeParse({ ...valid, password: "abc123" });
    expect(result.success).toBe(false);
  });

  it("rejects a password with no letters", () => {
    const result = RegisterFormSchema.safeParse({ ...valid, password: "12345678" });
    expect(result.success).toBe(false);
  });

  it("rejects a password with no numbers", () => {
    const result = RegisterFormSchema.safeParse({ ...valid, password: "abcdefgh" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing citizenship/country (the 152-FZ proxy field)", () => {
    const result = RegisterFormSchema.safeParse({ ...valid, citizenshipOrCountry: "" });
    expect(result.success).toBe(false);
  });

  it("defaults preferredLanguage to ru when omitted", () => {
    const { preferredLanguage: _omit, ...withoutLanguage } = valid;
    const result = RegisterFormSchema.safeParse(withoutLanguage);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.preferredLanguage).toBe("ru");
    }
  });

  it("rejects an unsupported locale", () => {
    const result = RegisterFormSchema.safeParse({ ...valid, preferredLanguage: "fr" });
    expect(result.success).toBe(false);
  });
});

describe("LoginFormSchema", () => {
  it("accepts a valid login", () => {
    const result = LoginFormSchema.safeParse({ email: "a@b.com", password: "anything" });
    expect(result.success).toBe(true);
  });

  it("rejects a missing password", () => {
    const result = LoginFormSchema.safeParse({ email: "a@b.com", password: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = LoginFormSchema.safeParse({ email: "nope", password: "x" });
    expect(result.success).toBe(false);
  });
});
