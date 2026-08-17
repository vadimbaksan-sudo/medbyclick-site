import { createHash } from "node:crypto";

/**
 * Internal signed-record mechanism (Phase E, docs/decision-log/0009) — a
 * SHA-256 hash binding a signer's identity, the exact record content, and
 * the moment of signing, in lieu of a third-party e-signature vendor
 * (DocuSign/HelloSign) for MVP. This is NOT a legally-binding electronic
 * signature under any specific jurisdiction's e-signature statute; it is a
 * tamper-evidence mechanism — recomputing the hash from stored content and
 * comparing it to the stored `signatureHash` proves the content hasn't
 * changed since signing. Revisit the vendor question once real volume
 * justifies the cost (see the linked decision log).
 *
 * `content` should be a stable, deterministic serialization of every
 * signed field — callers must serialize the same way at verify time as at
 * sign time (e.g. JSON.stringify with sorted keys), or the hash won't
 * reproduce. Not used anywhere yet with real (non-synthetic) content —
 * every current caller is a schema/UI shell per the linked decision log's
 * Legal & Compliance gate.
 */
export function computeSignatureHash(params: {
  signerId: string;
  recordId: string;
  content: string;
  signedAt: Date;
}): string {
  const payload = [params.signerId, params.recordId, params.content, params.signedAt.toISOString()].join("|");
  return createHash("sha256").update(payload, "utf8").digest("hex");
}

export function verifySignatureHash(
  params: { signerId: string; recordId: string; content: string; signedAt: Date },
  expectedHash: string
): boolean {
  return computeSignatureHash(params) === expectedHash;
}
