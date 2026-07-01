# Escalation Flow

Status: **Final** (adopted 2026-07-01)

## Levels

**Level 0 — Within-role.**
A role hits a question inside its own Decision Authority (see its file in
`docs/agents/`). It decides and records the outcome in its own report folder
under `docs/reports/`. No escalation needed.

**Level 1 — Founder lane.**
A role hits a question outside its Decision Authority, but the question is
clearly CEO-only or CPWO-only per `docs/governance/DECISION_MATRIX.md`. It
escalates to its lane's founder (Marina for Medical Advisory/Content/Community;
Vadim for CTO/Product/Developer/Web3 & Token Strategy). Shared Services roles
route by finding type, per their own Handoff Rules — Legal & Compliance sends
medical-regulatory items to Marina and crypto-regulatory items to Vadim; QA sends
technical bugs to Vadim's lane and content-accuracy bugs to Marina's lane.

**Level 2 — Joint sync.**
The question is cross-lane or explicitly listed as Joint in the Decision Matrix.
The founder who received the Level 1 escalation brings it to the other founder.
No AI role decides a Joint-listed matter on its own, even if asked directly.

**Level 3 — Independent Auditor review.**
If a Joint decision carries unresolved risk, or the two founders disagree, the
Independent Auditor is looped in. The Auditor does not decide or vote — it writes
a risk note to `docs/reports/audit/` describing the tradeoffs and exposure. This
is a documentation step, not a resolution step.

**Level 4 — Decision Log, open item.**
If still unresolved after Auditor review, the item is logged as `OPEN` in
`docs/decision-log/` using `docs/decision-log/Decision Template.md`, with both
founders' positions stated. No unilateral action on an `OPEN` Joint item, except
under the emergency bypass below. The item is revisited at the next joint sync
until it closes.

## Emergency Bypass (Security / Medical Incidents Only)

Two situations override the normal escalation order because delay itself is the
risk:

- **Security incident** (data exposure, contract exploit, key compromise): the
  CPWO lane (CTO/Product, Developer, Web3 & Token Strategy) has immediate
  unilateral authority to contain the incident — see
  `docs/playbooks/Security Incident.md`.
- **Medical incident** (incorrect clinical information published, doctor
  misconduct report, patient safety concern): the CEO lane (Medical Advisory,
  Medical Content, Medical Community) has immediate unilateral authority to
  contain the incident — see `docs/playbooks/Medical Incident.md`.

In both cases: containment is unilateral and immediate, but a **joint
post-incident review within 24–48 hours is mandatory**, and the incident and its
resolution are logged in `docs/decision-log/` regardless of how it was resolved.
Emergency bypass authority is for containment only — it does not extend to the
underlying Joint decision (e.g., whether to pause the TGE after a contract
exploit is still Joint, even though freezing the vulnerable function was
unilateral).

## What Never Gets Silently Dropped

Every escalation that reaches Level 2 or higher ends with an entry in
`docs/decision-log/`, whether resolved or left `OPEN`. If you can't find a
decision-log entry for something that was clearly cross-lane, that's a process
failure — file it retroactively rather than let it stay undocumented.
