import { describe, expect, it } from "bun:test";
import { seedDoctors } from "./doctors.seed";
import { doctors as medconnectDoctors } from "@/modules/medconnect/data";
import { globalDoctors } from "@/modules/medglobaldb/data";

describe("seedDoctors (unified doctor_profiles seed — spec §2.3/§3.1)", () => {
  it("contains all 15 original placeholder doctors (10 medconnect + 5 medglobaldb)", () => {
    // The kickoff spec's §0 describes medconnect as having 11 hardcoded
    // doctors; direct inspection of the actual pre-existing file (git
    // history) shows 10. This seed preserves the real file's content
    // exactly — see lib/db/seed/doctors.seed.ts's comment.
    expect(seedDoctors.length).toBe(15);
  });

  it("has unique slugs (stable identity for re-seeding / legacy URLs)", () => {
    const slugs = seedDoctors.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("never marks a doctor as vetting_status approved — none are real vetted doctors yet", () => {
    for (const doctor of seedDoctors) {
      expect(doctor.vettingStatus).toBe("pending");
    }
  });

  it("every entry has a name and specialty", () => {
    for (const doctor of seedDoctors) {
      expect(doctor.name.length).toBeGreaterThan(0);
      expect(doctor.specialty.length).toBeGreaterThan(0);
    }
  });
});

describe("modules/medconnect/data.ts adapter over the unified seed", () => {
  it("derives exactly the 10 endorsement-driven (local network) doctors", () => {
    expect(medconnectDoctors.length).toBe(10);
  });

  it("preserves the original doctor ids as slugs", () => {
    expect(medconnectDoctors.some((d) => d.id === "dr-elena-volkova")).toBe(true);
  });

  it("every doctor has a non-empty endorsement (medconnect's hallmark field)", () => {
    for (const doctor of medconnectDoctors) {
      expect(doctor.endorsement.length).toBeGreaterThan(0);
    }
  });
});

describe("modules/medglobaldb/data.ts adapter over the unified seed", () => {
  it("derives exactly the 5 academic-stats-driven (international directory) doctors", () => {
    expect(globalDoctors.length).toBe(5);
  });

  it("every doctor has an institution and country (medglobaldb's hallmark fields)", () => {
    for (const doctor of globalDoctors) {
      expect(doctor.institution.length).toBeGreaterThan(0);
      expect(doctor.country.length).toBeGreaterThan(0);
    }
  });
});
