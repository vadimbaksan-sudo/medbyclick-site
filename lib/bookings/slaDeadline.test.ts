import { describe, expect, it } from "bun:test";
import { computeSlaDeadline } from "./slaDeadline";

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
