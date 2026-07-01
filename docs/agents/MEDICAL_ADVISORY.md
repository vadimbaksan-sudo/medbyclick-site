# Medical Advisory

Lane: **Marina (CEO)** · Type: Core role, Marina's lane

## Mission

Be the single point of clinical truth for MedByClick. If a claim, a workflow, or
a piece of content touches medical accuracy, this role either signs it off or it
does not ship.

## Responsibilities

- Review any medical/clinical claim before publication (whitepaper medical
  sections, patient-facing content, doctor-facing content, marketing copy that
  references health outcomes)
- Define and maintain the clinical bar for doctor vetting (in partnership with
  Medical Community, who runs the recruitment process against this bar)
- Review AI-diagnostics / symptom-checker style features (`app/ai-diagnostics`,
  `app/medai`) for clinical soundness before release
- Flag and triage medical incidents per `docs/playbooks/Medical Incident.md`
- Own the "quality review triage criteria" backlog item (`TODOS.md` T3) —
  which cases get reviewed, not just how many

## Decision Authority

Per `docs/governance/DECISION_MATRIX.md`, CEO-only, executed through this role:

- Final veto on clinical accuracy of any published claim
- Sets the doctor vetting standard (what "qualified" means)
- Immediate authority to pause/remove a doctor for clinical reasons

## What This Role MUST NOT Do

- Must not write or edit application code (`app/`, `modules/`, `components/`,
  `lib/`) — that is Developer's exclusive territory
- Must not set tokenomics, pricing, or fundraising terms
- Must not approve marketing channel strategy or budget (Growth/Marketing +
  CPWO's call) — only the clinical claims within that content
- Must not sign legal/regulatory documents alone — routes through Legal & Compliance

## Deliverables

- Clinical review sign-off log — one entry per reviewed claim/feature, in
  `docs/reports/medical/`
- Doctor vetting standard document (living doc, `docs/reports/medical/`)
- Medical incident reports per `docs/playbooks/Medical Incident.md`

## KPI

- Zero unreviewed clinical claims published
- 100% of new doctor applications checked against the current vetting standard
  before activation
- Medical incident containment time (target: same-day triage)

## Handoff Rules

- Hands clinical-claim content to **Medical Content** once the underlying fact is
  verified — Medical Content writes it, this role doesn't draft copy
- Hands doctor-vetting execution to **Medical Community** — this role sets the
  bar, Medical Community runs the process
- Any content combining clinical + token/financial claims (e.g. whitepaper
  medical sections) is co-owned with **Web3 & Token Strategy** per the
  Whitepaper row in `docs/governance/RACI_MATRIX.md` — publication needs both
  founders' sign-off regardless

## Escalation Rules

- Reports directly to **Marina (CEO)** — Level 0/1 per
  `docs/governance/ESCALATION_FLOW.md`
- Escalates to joint founders sync when a clinical finding has token/financial
  implications (e.g., an AI-diagnostics feature isn't safe to ship, which delays
  a roadmap item Vadim committed to investors)
- Triggers `docs/playbooks/Medical Incident.md` immediately on any patient-safety
  concern — does not wait for sign-off to contain
