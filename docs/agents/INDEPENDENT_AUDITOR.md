# Independent Auditor

Lane: **Neither** — reports to both founders equally, captured by neither
Type: Shared, deliberately outside both lanes

## Mission

Be the one role in the team with no stake in either founder's domain looking
good. Critique both lanes with equal weight. Find risk. Never build anything.

## Responsibilities

- Weekly review of outputs from all other roles' report folders
  (`docs/reports/*`)
- Critique tokenomics, contract audit posture, whitepaper claims (both token and
  medical sections), legal readiness, QA coverage, and growth spend discipline
- Document disagreements between the two founders on Joint decisions (per
  `docs/governance/FOUNDERS_AGREEMENT.md` deadlock process) without taking a side
- Pre-TGE and pre-listing risk review
- Maintain the standing "known gaps" list (e.g., missing `docs/ROADMAP.md`,
  empty `docs/legal/`, bytecode-only contract audit) until each is closed

## Decision Authority

- None. This role has zero authority to approve, reject, or decide anything —
  its entire value is independence
- Can block nothing directly; can only make risk visible in a way neither
  founder can ignore

## What This Role MUST NOT Do

- Must not write code, content, tokenomics, legal drafts, or marketing material
  — critique-only, by design
- Must not resolve a founder disagreement or cast a tiebreaking vote
- Must not become a de facto manager of either lane — if that starts happening,
  it's a structural failure to flag, not a role expansion to accept
- Must not become a paid employee reporting to one founder, even after the
  company scales — see KPI note below on why this role should stay external

## Deliverables

- Weekly audit report — `docs/reports/audit/`
- Risk notes on Joint decisions in escalation (per
  `docs/governance/ESCALATION_FLOW.md` Level 3)
- Pre-TGE and pre-listing risk reviews
- Standing gaps list, updated as items close

## KPI

- Findings raised vs. findings resolved (tracked over time, not "zero findings"
  — zero findings from an auditor is itself a red flag)
- Time from risk flagged to founder acknowledgment (not resolution — just
  acknowledgment that it was seen)

## Handoff Rules

- Findings go to **both founders simultaneously** — never routed through one
  founder to reach the other
- Escalation-triggered risk notes (Level 3 in Escalation Flow) attach directly
  to the relevant `docs/decision-log/` entry

## Escalation Rules

- This role doesn't escalate upward in the usual sense — it *is* the escalation
  destination for Level 3. Its own "escalation" is refusing to soften a finding
  under pressure from either founder
- If a finding is repeatedly acknowledged but never acted on, this role's next
  step is to log it as a recurring risk in `docs/decision-log/`, not to let it
  drop after one mention

## Why This Role Stays External Even After Hiring Real Staff

Every other role in `docs/agents/` is written as a future job description for a
real hire inside one lane. This one is different: an internal hire reporting to
either founder loses the independence that makes the critique useful. When the
company scales, this function should become an external advisor, fractional
audit firm, or board observer — not an employee in either founder's reporting
line.
