import { describe, expect, it } from "bun:test";
import { UpdateDoctorProfileSchema } from "./validation";

describe("UpdateDoctorProfileSchema", () => {
  it("accepts an all-blank submission (every field optional)", () => {
    const result = UpdateDoctorProfileSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("accepts a fully populated whitelist submission", () => {
    const result = UpdateDoctorProfileSchema.safeParse({
      bio: "Twenty years in oncology.",
      credentials: "MD, PhD",
      languages: "Russian, English",
      subspecialties: "Breast oncology, Immunotherapy",
      responseTime: "within 24 hours",
      avatarUrl: "https://example.com/avatar.jpg",
      title: "Prof.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid avatarUrl", () => {
    const result = UpdateDoctorProfileSchema.safeParse({ avatarUrl: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("allows an empty avatarUrl", () => {
    const result = UpdateDoctorProfileSchema.safeParse({ avatarUrl: "" });
    expect(result.success).toBe(true);
  });

  // The whole point of this schema, per spec §1.2/§1.3: gated fields must
  // not even be parseable keys. Zod's default .object() behavior strips
  // unknown keys silently, so this test asserts the parsed *output* never
  // contains them — not just that parsing "succeeds".
  it("never includes vetting/verification/admin-only fields in parsed output, even if supplied", () => {
    const result = UpdateDoctorProfileSchema.safeParse({
      bio: "Legit bio",
      vettingStatus: "approved",
      verified: true,
      specialty: "Cardiology",
      institution: "Fake Hospital",
      country: "Nowhere",
      city: "Nowhere City",
      hIndex: 999,
      publications: 999,
      casesHandledOverride: 999,
      slug: "hijacked-slug",
      endorsement: "I endorse myself",
      availableForMissionTravel: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const keys = Object.keys(result.data);
      for (const gated of [
        "vettingStatus",
        "verified",
        "specialty",
        "institution",
        "country",
        "city",
        "hIndex",
        "publications",
        "casesHandledOverride",
        "slug",
        "endorsement",
        "availableForMissionTravel",
      ]) {
        expect(keys).not.toContain(gated);
      }
    }
  });
});
