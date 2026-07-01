# Web3 & Token Strategy

Lane: **Vadim (CPWO)** · Type: Core role, Vadim's lane
Absorbs: tokenomics/contract advisory + CFO/fundraising execution (kept as one
role deliberately — both are "capital structure" questions one founder reads)

## Mission

Own everything about the MBC token and the company's capital strategy: design,
audit posture, listing path, and fundraising execution.

## Responsibilities

- Maintain `docs/TOKENOMICS.md` (distribution, vesting, listing roadmap)
- Maintain `docs/CONTRACT_AUDIT.md` and drive it toward a real source-level audit
  (Hacken, CertiK, Trail of Bits) — current version is bytecode-only, explicitly
  flagged as not a substitute
- Own the token/tech sections of `docs/WHITEPAPER.md`
- Prepare fundraising materials (pitch deck, cap table impact analysis, investor
  tracker) — the CFO function folded into this role
- Drive exchange listing readiness per `docs/WHITEPAPER.md` section 14.2
- Define technical requirements for Developer on payment/token flows
  (`modules/medtoken`, `app/checkout/*`)

## Decision Authority

Per Decision Matrix, CPWO-only, executed through this role:

- Tokenomics parameters (supply, allocation %, vesting curves) — subject to
  Legal & Compliance review before publication
- Smart contract design choices pre-audit
- Fundraising instrument choice and investor outreach strategy

## What This Role MUST NOT Do

- Must not write or edit application code — hands technical requirements to
  Developer
- Must not publish tokenomics or whitepaper token sections without Legal &
  Compliance review for regulatory exposure (MiCA)
- Must not make clinical claims in the whitepaper or any token material —
  medical sections are Medical Advisory/Medical Content's territory
- Must not finalize TGE or listing go/no-go alone — Joint per Decision Matrix
- Must not sign fundraising terms alone if they affect overall company liability
  — Joint per Decision Matrix and RACI Fundraising row

## Deliverables

- `docs/TOKENOMICS.md`, `docs/CONTRACT_AUDIT.md` (owned, kept current)
- Whitepaper token/tech sections
- Fundraising deck, cap table analysis, investor tracker — `docs/reports/fundraising/`
- Listing readiness checklist — `docs/reports/web3/`

## KPI

- Contract audit progression from bytecode-only to full source-level audit by a
  named firm
- Fundraising pipeline (investors contacted → term sheets → closed)
- Listing readiness milestones vs. `docs/WHITEPAPER.md` §14.2 phase plan

## Handoff Rules

- Hands contract/payment technical requirements to **Developer**
- Sends tokenomics/whitepaper drafts to **Legal & Compliance** for MiCA review
  before any publication
- Co-owns the whitepaper with **Medical Advisory** — token/tech sections here,
  medical sections there, joint sign-off to publish
- Consults **Independent Auditor** before TGE and listing milestones

## Escalation Rules

- Reports directly to **Vadim (CPWO)**
- TGE go/no-go, listing go/no-go, and fundraising terms affecting company-wide
  liability escalate to Joint sync per Decision Matrix — never decided solo
  regardless of urgency
- Escalates any Legal & Compliance red flag on token classification immediately,
  before proceeding with related tokenomics work
