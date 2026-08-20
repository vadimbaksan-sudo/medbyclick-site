import { describe, expect, it } from "bun:test";
import { computeSlaDeadline, isAbandonable, isEscalatable } from "./slaDeadline";

describe("computeSlaDeadline (Phase F, docs/decision-log/0009)", () => {
  const from = new Date("2026-01-01T00:00:00Z");

  it("gives urgent the shortest deadline", () => {
    const deadline = computeSlaDeadline("urgent", from);
    expect(deadline.toISOString()).toBe("2026-01-01T04:00:00.000Z");
  });

  it("gives semi-urgent 24 hours", () => {
    const deadline = computeSlaDeadline("semi-urgent", from);
    expect(deadline.toISOString()).toBe("2026-01-02T00:00:00.000Z");
  });

  it("gives routine the longest deadline (48 hours)", () => {
    const deadline = computeSlaDeadline("routine", from);
    expect(deadline.toISOString()).toBe("2026-01-03T00:00:00.000Z");
  });

  it("orders deadlines urgent < semi-urgent < routine", () => {
    const urgent = computeSlaDeadline("urgent", from).getTime();
    const semiUrgent = computeSlaDeadline("semi-urgent", from).getTime();
    const routine = computeSlaDeadline("routine", from).getTime();
    expect(urgent).toBeLessThan(semiUrgent);
    expect(semiUrgent).toBeLessThan(routine);
  });
});

describe("isEscalatable / isAbandonable (Phase F precedence, 2026-08-20 /autoplan review)", () => {
  const now = new Date("2026-01-10T00:00:00Z");
  const longAgo = new Date("2026-01-01T00:00:00Z"); // 9 days before `now`
  const recently = new Date("2026-01-09T12:00:00Z"); // 12 hours before `now`

  function booking(overrides: Partial<Parameters<typeof isEscalatable>[0]>) {
    return {
      slaDeadlineAt: recently,
      escalatedAt: null,
      doctorId: null,
      caseStage: "submitted",
      status: "requested",
      createdAt: recently,
      ...overrides,
    };
  }

  it("escalates an overdue booking with a doctor assigned", () => {
    const b = booking({ doctorId: "doc-1", caseStage: "matched" });
    expect(isEscalatable(b, now)).toBe(true);
    expect(isAbandonable(b, now)).toBe(false);
  });

  it("abandons a long-unassigned, still-submitted booking", () => {
    const b = booking({ doctorId: null, caseStage: "submitted", createdAt: longAgo });
    expect(isAbandonable(b, now)).toBe(true);
    expect(isEscalatable(b, now)).toBe(false);
  });

  it("the regression case: overdue AND long-unassigned resolves to abandoned, not escalated", () => {
    const b = booking({
      doctorId: null,
      caseStage: "submitted",
      status: "requested",
      slaDeadlineAt: recently,
      createdAt: longAgo,
    });
    expect(isAbandonable(b, now)).toBe(true);
    expect(isEscalatable(b, now)).toBe(false);
  });

  it("never returns true for both, across a matrix of doctor/stage/age combinations", () => {
    const doctorIds = [null, "doc-1"];
    const stages = ["submitted", "matched", "consultation_scheduled", "escalated", "closed", "transferred"];
    const statuses = ["requested", "confirmed", "completed", "cancelled"];
    const ages = [longAgo, recently];

    for (const doctorId of doctorIds) {
      for (const caseStage of stages) {
        for (const status of statuses) {
          for (const createdAt of ages) {
            const b = booking({ doctorId, caseStage, status, createdAt });
            expect(isEscalatable(b, now) && isAbandonable(b, now)).toBe(false);
          }
        }
      }
    }
  });
});
