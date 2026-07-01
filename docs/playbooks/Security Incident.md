# Playbook: Security Incident

Emergency bypass authority: **CPWO lane** (CTO/Product, Developer, Web3 & Token
Strategy) — per `docs/governance/ESCALATION_FLOW.md`

## When to Use

Data exposure, smart contract exploit, key compromise, broken auth, or any
finding QA/GStack or Developer flags as security-relevant rather than a normal
bug.

## Immediate Containment (Unilateral, No Sign-off Required)

Whoever discovers the incident (Developer, QA/GStack, Web3 & Token Strategy)
acts immediately:

1. **Contain** — pause the affected contract function, rotate compromised keys,
   take down the affected endpoint/feature, or revoke exposed credentials.
   Whichever action stops the bleeding fastest. No approval needed for this step.
2. **Notify** — both founders are notified immediately, in parallel, not
   sequentially through one lane.
3. **Preserve evidence** — logs, network traces (`$B network`, `$B console`),
   and a timeline before remediation destroys the evidence trail.

## Within 24–48 Hours (Mandatory Joint Review)

4. **Root cause** — Developer and CTO/Product determine what happened.
5. **Legal assessment** — Legal & Compliance assesses breach-notification
   obligations (GDPR-equivalent, exchange/regulator disclosure if TGE has
   occurred).
6. **Independent Auditor review** — assesses whether the containment was
   sufficient and whether the incident reveals a structural risk.
7. **Joint decision** — Marina and Vadim jointly decide on: further remediation,
   whether/how to disclose publicly, and whether any Joint-designated decision
   (e.g., delaying TGE) is triggered by this incident. Containment was
   unilateral; this decision is not.
8. **Log** — full incident writeup in `docs/decision-log/`, regardless of
   severity.

## What This Playbook Does Not Authorize

Emergency bypass covers containment only. It does not authorize unilaterally
deciding to delay/cancel a TGE, change tokenomics, or make public statements —
those remain Joint per `docs/governance/DECISION_MATRIX.md` even when triggered
by an incident.

## Where This Lands

Incident timeline and resolution: `docs/reports/audit/` (Independent Auditor's
review) and `docs/decision-log/` (the Joint decision record).
