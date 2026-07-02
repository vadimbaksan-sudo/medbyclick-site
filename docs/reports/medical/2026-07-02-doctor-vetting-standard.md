# Doctor Vetting Standard

Owner: **Medical Advisory** (`docs/agents/MEDICAL_ADVISORY.md`) · Authority: **CEO-only**,
per `docs/governance/DECISION_MATRIX.md` ("Doctor vetting standard and admission
criteria — what 'qualified doctor' means on this platform")
Status: **Draft v1 — pending Marina's review/adoption.** This is a living
document; Medical Advisory is the only role permitted to change it.
Unblocks: `TODOS.md` T3 (owned by Medical Community, executed against Part 3 below).

## Purpose

The single definition of "qualified doctor" for the MedConnect network. Medical
Community runs the vetting *process* against this bar — it does not invent
criteria independently (see `docs/agents/MEDICAL_COMMUNITY.md` Handoff Rules).
Any change to what counts as "qualified" requires Medical Advisory sign-off,
same as this document's own updates.

## Scope

Applies to every physician/specialist seeking "Verified Doctor" status on
MedConnect: initial admission (Part 1–2) and continuous status maintenance
(Part 3–4). Vetting is not a one-time gate.

## Part 1 — Admission Criteria (hard gates, all required)

1. **Active, unrestricted medical license**, verified at primary source —
   direct confirmation with the issuing licensing board, not a self-reported
   credential or uploaded document alone.
2. **Specialty/subspecialty documented** against a fixed taxonomy, so the
   structured routing rubric in the whitepaper (§3.2, "matched against the
   verified specialist network using a structured rubric, not an algorithm")
   has clean categories to match against.
3. **No unresolved disciplinary action or license suspension.** Legal &
   Compliance checks public disciplinary/malpractice record at the licensing
   jurisdiction before activation.
4. **Institutional affiliation or reference validation** — a current or recent
   hospital/clinic appointment, or a minimum of two professional references
   from recognized institutions.
5. **Language capability matching the patient population** — verified fluency
   in Russian and/or Hebrew and/or English sufficient for direct case
   communication, or a documented translation-support arrangement. (MedByClick's
   core population is Russian-speaking patients; a doctor with no path to
   direct or supported communication does not clear this gate regardless of
   clinical strength.)
6. **Agreement to platform conduct standards** — response-time commitments
   matched to the case urgency tiers used in triage (routine / priority /
   urgent, whitepaper §3.2), and to the ongoing quality-review process in Part 3.
7. **Consent to case-outcome tracking** — aggregated, anonymized, per
   whitepaper §3.1.

All seven are gates, not a weighted score — failing any one is a fail, not a
partial credit toward the others.

### Explicitly NOT a clinical admission criterion

- **MBC Doctor Verification Stake** (1,000–5,000 MBC, whitepaper "Use Case 2:
  Doctor Verification Staking") is a Web3 & Token Strategy-owned financial/
  platform-access gate, separate from and downstream of clinical qualification.
  A doctor clears Part 1 *before* staking is offered. Stake amount or tier is
  never a proxy for, or substitute for, clinical qualification.
- **Featured/premium placement** (5,000 MBC tier) is a business placement
  decision, not a clinical one. A doctor can be fully qualified without opting
  into premium placement, and premium placement never substitutes for Part 1.
- Flagging this because whitepaper §3.1 currently lists the staking
  requirement as a bullet under "Verification," which reads as if staking were
  part of clinical verification. Recommend Web3 & Token Strategy tighten that
  wording at the next whitepaper revision so "clinically verified" and
  "staked" don't blur — this is a wording note, not a request to change token
  mechanics, and doesn't block this document's adoption.

## Part 2 — Verification Process

Medical Community executes; Medical Advisory holds the final clinical call.

1. Application intake (Medical Community)
2. Primary-source license verification (Medical Community, with Legal &
   Compliance for disciplinary/malpractice record — see Open Dependencies)
3. Reference / institutional-affiliation check (Medical Community)
4. Specialty taxonomy assignment + language-capability confirmation (Medical
   Community)
5. **Final clinical qualification decision** (Medical Advisory) — this
   judgment call is not delegable per the Decision Matrix, even though the
   legwork above is
6. Only after step 5 clears: handoff to Web3 & Token Strategy for staking /
   platform-access onboarding

## Part 3 — Ongoing Quality Review (canonical quality formula + T3 triage criteria)

**Quality formula (Phase 1):** monthly review sample of at least 20% of each
doctor's case volume, with a floor of 2 cases/doctor/month regardless of
volume.

**Triage criteria (`TODOS.md` T3)** — which cases fill that sample, in priority
order:

1. All case types/diagnosis categories not previously seen from that doctor
2. All cases where the doctor hesitated, asked for clarification, or flagged
   uncertainty during triage or case handling
3. All adverse outcomes and patient complaints — no exceptions, these are
   never part of the "random" portion
4. Random fill of remaining slots up to the 20%/2-per-doctor floor

**Why triage-first, not pure random:** a doctor who consistently misroutes one
case type could run for months before a random sample happens to catch it.
Triage-first sampling surfaces systemic errors faster and keeps review time on
the highest-signal cases as volume scales toward capacity. Medical Community
owns the day-to-day triage log implementing this against the criteria above.

## Part 4 — Grounds for Pause / Removal

Per the Decision Matrix, Medical Advisory has **immediate, unilateral
authority** to pause or remove a doctor for clinical reasons — no CPWO
sign-off required. Grounds:

- An adverse outcome traced to doctor error
- A patient-safety complaint
- Licensing board action
- Repeated quality-review findings that would fail Part 1 if reapplied fresh
- Misconduct

Any removal with a patient-safety dimension triggers
`docs/playbooks/Medical Incident.md` immediately, containment first. Removal
itself is a clinical-lane decision made here; any downstream consequence to
the doctor's stake ("stake is forfeited in cases of verified misconduct,"
whitepaper Use Case 2) is executed by Web3 & Token Strategy off the back of
this clinical determination — this document doesn't decide stake disposition,
only clinical status.

## Status / Review Cadence

v1, living document. Re-review triggers:

- Any medical incident whose root-cause step (Medical Incident playbook, step
  4) implicates the vetting standard itself
- Quarterly baseline review regardless of incidents

## Open Dependencies

- **Medical Community**: T3 is unblocked now — build the triage log against
  Part 3.
- **Legal & Compliance**: Part 1, gate 3 needs a confirmed methodology for
  checking disciplinary/malpractice record at source — no confirmed
  primary-source access is established yet for Israeli or foreign licensing
  boards doctors may be credentialed under. Flagging as open, not blocking
  adoption of this standard, but blocking real execution of that one gate.
- **Web3 & Token Strategy**: wording note on whitepaper §3.1 above (staking
  vs. clinical verification) — non-blocking, recommend at next whitepaper
  revision.
