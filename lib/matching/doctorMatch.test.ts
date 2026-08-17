import { describe, expect, it } from "bun:test";
import { rankDoctorsForCase, rankInstitutionsForCase } from "./doctorMatch";
import type { DbDoctorProfile } from "@/lib/db/schema";

function makeDoctor(overrides: Partial<DbDoctorProfile>): DbDoctorProfile {
  return {
    id: overrides.id ?? "id-" + Math.random().toString(36).slice(2),
    userId: null,
    slug: null,
    name: "Dr. Test",
    title: "MD",
    specialty: "Oncology",
    subspecialties: [],
    languages: ["English"],
    credentials: null,
    bio: null,
    endorsement: null,
    avatarUrl: null,
    casesHandledOverride: null,
    responseTime: null,
    institution: null,
    country: null,
    city: null,
    hIndex: null,
    publications: null,
    verified: false,
    vettingStatus: "pending",
    availableForMissionTravel: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

describe("rankDoctorsForCase (Phase D, docs/decision-log/0009)", () => {
  it("excludes doctors with an unrelated specialty entirely", () => {
    const doctors = [makeDoctor({ specialty: "Dermatology" })];
    const result = rankDoctorsForCase(doctors, { specialty: "Oncology", urgency: "routine" });
    expect(result.length).toBe(0);
  });

  it("ranks an exact specialty match above a partial/substring match", () => {
    const exact = makeDoctor({ id: "exact", specialty: "Oncology" });
    const partial = makeDoctor({ id: "partial", specialty: "Pediatric Oncology" });
    const result = rankDoctorsForCase([partial, exact], { specialty: "Oncology", urgency: "routine" });
    expect(result[0].doctor.id).toBe("exact");
    expect(result[0].score).toBeGreaterThan(result[1].score);
  });

  it("rewards a language match with a higher score", () => {
    const speaksRussian = makeDoctor({ id: "ru", specialty: "Cardiology", languages: ["Russian", "English"] });
    const englishOnly = makeDoctor({ id: "en", specialty: "Cardiology", languages: ["English"] });
    const result = rankDoctorsForCase([englishOnly, speaksRussian], {
      specialty: "Cardiology",
      urgency: "routine",
      language: "Russian",
    });
    expect(result[0].doctor.id).toBe("ru");
  });

  it("gives an urgent case's fast-responder a bonus that a slow responder doesn't get", () => {
    const fast = makeDoctor({ id: "fast", specialty: "Neurology", responseTime: "Within 4 hours" });
    const slow = makeDoctor({ id: "slow", specialty: "Neurology", responseTime: "Within 5 days" });
    const urgentResult = rankDoctorsForCase([slow, fast], { specialty: "Neurology", urgency: "urgent" });
    const routineResult = rankDoctorsForCase([slow, fast], { specialty: "Neurology", urgency: "routine" });

    expect(urgentResult[0].doctor.id).toBe("fast");
    // The routine case shouldn't apply the same urgent-response bonus, so
    // the score gap between fast/slow should shrink once urgency drops.
    const urgentGap = urgentResult[0].score - urgentResult[1].score;
    const routineGap = Math.abs(routineResult[0].score - routineResult[1].score);
    expect(urgentGap).toBeGreaterThan(routineGap);
  });

  it("produces a non-empty, human-readable rationale for every match", () => {
    const doctors = [makeDoctor({ specialty: "Cardiology" })];
    const result = rankDoctorsForCase(doctors, { specialty: "Cardiology", urgency: "routine" });
    expect(result[0].rationale.length).toBeGreaterThan(0);
  });
});

describe("rankInstitutionsForCase (Phase D dual-route matching)", () => {
  it("groups matching doctors by institution and excludes doctors with no institution", () => {
    const withInstitution = makeDoctor({ id: "a", specialty: "Oncology", institution: "Sheba Medical Center" });
    const noInstitution = makeDoctor({ id: "b", specialty: "Oncology", institution: null });
    const result = rankInstitutionsForCase([withInstitution, noInstitution], {
      specialty: "Oncology",
      urgency: "routine",
    });
    expect(result.length).toBe(1);
    expect(result[0].institution).toBe("Sheba Medical Center");
    expect(result[0].doctorCount).toBe(1);
  });

  it("ranks an institution with more matching doctors above one with fewer, all else equal", () => {
    const bigHospital = [
      makeDoctor({ id: "a", specialty: "Cardiology", institution: "Big Hospital" }),
      makeDoctor({ id: "b", specialty: "Cardiology", institution: "Big Hospital" }),
    ];
    const smallClinic = [makeDoctor({ id: "c", specialty: "Cardiology", institution: "Small Clinic" })];
    const result = rankInstitutionsForCase([...bigHospital, ...smallClinic], {
      specialty: "Cardiology",
      urgency: "routine",
    });
    expect(result[0].institution).toBe("Big Hospital");
  });
});
