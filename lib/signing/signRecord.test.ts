import { describe, expect, it } from "bun:test";
import { computeSignatureHash, verifySignatureHash } from "./signRecord";

describe("computeSignatureHash / verifySignatureHash (Phase E, docs/decision-log/0009)", () => {
  const base = {
    signerId: "doctor-1",
    recordId: "booking-1",
    content: "diagnosis: concurs; notes: example",
    signedAt: new Date("2026-01-01T00:00:00Z"),
  };

  it("is deterministic for identical input", () => {
    expect(computeSignatureHash(base)).toBe(computeSignatureHash({ ...base }));
  });

  it("changes if the content changes (tamper-evidence)", () => {
    const tampered = { ...base, content: "diagnosis: diverges; notes: changed" };
    expect(computeSignatureHash(base)).not.toBe(computeSignatureHash(tampered));
  });

  it("changes if the signer changes", () => {
    const otherSigner = { ...base, signerId: "doctor-2" };
    expect(computeSignatureHash(base)).not.toBe(computeSignatureHash(otherSigner));
  });

  it("verifySignatureHash confirms an untampered record and rejects a tampered one", () => {
    const hash = computeSignatureHash(base);
    expect(verifySignatureHash(base, hash)).toBe(true);
    expect(verifySignatureHash({ ...base, content: "changed" }, hash)).toBe(false);
  });
});
