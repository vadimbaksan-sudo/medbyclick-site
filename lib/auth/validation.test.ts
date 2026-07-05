import { describe, expect, it } from "bun:test";
import { RegisterFormSchema, RegisterDoctorFormSchema, LoginFormSchema } from "./validation";

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
    const withoutLanguage: Partial<typeof valid> = { ...valid };
    delete withoutLanguage.preferredLanguage;
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

describe("RegisterDoctorFormSchema", () => {
  const valid = {
    firstName: "Elena",
    lastName: "Volkova",
    email: "elena@example.com",
    password: "password1",
    specialty: "Oncology",
    title: "MD",
    credentials: "MD, PhD",
    bio: "Twenty years of experience.",
    languages: "Russian, English",
    preferredLanguage: "ru" as const,
  };

  it("accepts a fully valid doctor registration", () => {
    const result = RegisterDoctorFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects a missing specialty", () => {
    const result = RegisterDoctorFormSchema.safeParse({ ...valid, specialty: "" });
    expect(result.success).toBe(false);
  });

  it("accepts an omitted title/credentials/bio/languages (all optional)", () => {
    const minimal = {
      firstName: valid.firstName,
      lastName: valid.lastName,
      email: valid.email,
      password: valid.password,
      specialty: valid.specialty,
    };
    const result = RegisterDoctorFormSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  // The hard requirement from the Developer task: vettingStatus/verified
  // must never be settable via this schema, even if a crafted request
  // supplies them — they simply aren't declared keys, so Zod strips them.
  it("never includes vettingStatus/verified in parsed output, even if supplied", () => {
    const result = RegisterDoctorFormSchema.safeParse({
      ...valid,
      vettingStatus: "approved",
      verified: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const keys = Object.keys(result.data);
      expect(keys).not.toContain("vettingStatus");
      expect(keys).not.toContain("verified");
    }
  });

  it("rejects a password under 8 characters", () => {
    const result = RegisterDoctorFormSchema.safeParse({ ...valid, password: "abc123" });
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
