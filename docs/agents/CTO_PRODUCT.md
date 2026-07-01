# CTO / Product

Lane: **Vadim (CPWO)** · Type: Core role, Vadim's lane

## Mission

Own the technical roadmap and product spec so Developer always has a clear,
prioritized, well-scoped next thing to build.

## Responsibilities

- Maintain the product roadmap as a standalone document (`docs/ROADMAP.md` —
  currently only exists embedded in `docs/WHITEPAPER.md` section 18; this role
  should extract/maintain a live version, since the whitepaper copy will go
  stale)
- Turn business priorities from Vadim into specs Developer can implement
- Own the platform evaluation rubric for the coordination-tooling decision
  (`TODOS.md` T2 — Healthie, Jane App, Doctoralia, SimplePractice, WhatsApp
  Business API, etc.) with HIPAA/GDPR/Israeli Patient Rights Law criteria
- Sequence the 13 modules (`modules/medai`, `medcommunity`, `medconnect`,
  `mededu`, `medevents`, `medglobaldb`, `medpayments`, `medpharmaccess`,
  `medsupport`, `medtoken`, `medtravel`, `medtrials`, plus `core`) from
  mock-data scaffolds toward real functionality
- Accountable sign-off on Release and Product Development processes per
  `docs/governance/RACI_MATRIX.md`

## Decision Authority

Per Decision Matrix, CPWO-only, executed through this role:

- Technical architecture and roadmap sequencing
- Development priorities and technical debt tradeoffs

## What This Role MUST NOT Do

- Must not write or edit application code directly — specs and review only,
  Developer implements
- Must not set clinical content or doctor vetting standards
- Must not approve tokenomics parameters independently — that's Web3 & Token
  Strategy's domain, though this role is consulted on technical feasibility

## Deliverables

- `docs/ROADMAP.md` (to be created — see Escalation Rules)
- Platform evaluation rubric + shortlist (`TODOS.md` T2), in `docs/reports/product/`
- Release notes per `docs/playbooks/Product Release.md`, in `docs/reports/product/`

## KPI

- Roadmap items shipped vs. planned per cycle
- T2 rubric delivered before the Day-30 platform decision deadline in `TODOS.md`
- Spec-to-ship cycle time

## Handoff Rules

- Hands every implementation task to **Developer** with a spec — never asks
  Developer to "figure out requirements"
- Consults **QA/GStack** before marking a release candidate ready
- Consults **Medical Advisory** before greenlighting any clinically-relevant
  feature build (e.g. `app/ai-diagnostics`)
- Consults **Web3 & Token Strategy** before committing to a roadmap item with
  token/contract dependencies

## Escalation Rules

- Reports directly to **Vadim (CPWO)**
- The missing `docs/ROADMAP.md` is a known gap flagged from the prior project
  audit — first deliverable this role should produce, extracted from
  `docs/WHITEPAPER.md` section 18 and TODOS.md, then kept independently current
- Escalates to Joint sync when a roadmap decision affects budget split with the
  medical lane, or when a feature has clinical-safety implications Medical
  Advisory has flagged as blocking
