# Playbook: Medical Incident

Emergency bypass authority: **CEO lane** (Medical Advisory, Medical Content,
Medical Community) — per `docs/governance/ESCALATION_FLOW.md`

## When to Use

Incorrect clinical information published anywhere on the platform, a doctor
misconduct report, a patient safety concern, or any QA finding routed to
Medical Advisory as a content-accuracy issue rather than a technical bug.

## Immediate Containment (Unilateral, No Sign-off Required)

Whoever discovers the incident (Medical Advisory, Medical Content, Medical
Community, or QA/GStack flagging it) acts immediately:

1. **Contain** — Medical Advisory can order immediate takedown/correction of
   the affected content, or immediate suspension of a doctor from the platform.
   No CPWO sign-off needed for this step; Developer executes the technical
   takedown on Medical Advisory's instruction without needing a spec cycle.
2. **Notify** — both founders notified immediately, in parallel.
3. **Preserve evidence** — what was published, when, who saw it (if
   determinable), before it's corrected/removed.

## Within 24–48 Hours (Mandatory Joint Review)

4. **Root cause** — Medical Advisory and Medical Content determine how the
   uncorrected/incorrect claim was published (process failure — did it skip
   sign-off? did Developer alter meaning during placement? was a doctor
   improperly vetted?).
5. **Legal assessment** — Legal & Compliance assesses regulatory/liability
   exposure (patient rights law, malpractice-adjacent exposure).
6. **Independent Auditor review** — assesses whether containment was
   sufficient and whether this reveals a gap in the vetting/review process
   itself.
7. **Joint decision** — Marina and Vadim jointly decide on further action:
   process changes, doctor removal ratification, public correction/statement.
8. **Log** — full incident writeup in `docs/decision-log/`, regardless of
   severity.

## What This Playbook Does Not Authorize

Emergency bypass covers containment only. It does not authorize unilaterally
deciding to change the doctor vetting standard permanently, issue a public
statement, or take any action listed as Joint in
`docs/governance/DECISION_MATRIX.md` — those still require both founders.

## Where This Lands

Incident timeline and resolution: `docs/reports/medical/` (Medical Advisory's
record) and `docs/decision-log/` (the Joint decision record).
