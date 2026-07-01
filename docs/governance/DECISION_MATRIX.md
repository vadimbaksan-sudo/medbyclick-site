# Decision Matrix

Status: **Final** (adopted 2026-07-01)
Companion to: `docs/governance/FOUNDERS_AGREEMENT.md`, `docs/governance/RACI_MATRIX.md`

This file lists concrete decision types and who has final authority. "Final
authority" means: can decide alone, without waiting for the other founder, and
the decision stands. It does not mean "works alone" — Consulted parties from the
RACI matrix still get consulted; they just don't hold veto.

## CEO-Only (Marina)

| Decision | Notes |
|---|---|
| Clinical accuracy of any published claim | Final veto, no override |
| Doctor vetting standard and admission criteria | What "qualified doctor" means on this platform |
| Medical content tone/structure for patients vs. doctors | `docs/agents/MEDICAL_CONTENT.md` executes |
| Medical community policy | Conduct rules, escalation of doctor complaints |
| Pausing/removing a doctor from the platform for clinical reasons | Immediate, does not require CPWO sign-off |

## CPWO-Only (Vadim)

| Decision | Notes |
|---|---|
| Technical architecture and roadmap sequencing | What gets built and in what order |
| Tokenomics parameters (supply, allocation %, vesting curves) | Subject to Legal & Compliance review before publication |
| Smart contract design choices pre-audit | Post-audit changes with material risk findings go through Legal |
| Fundraising instrument choice and investor outreach strategy | Which investors to approach, SAFT vs. equity vs. token warrant |
| AI-team infrastructure and automation | This document system itself, gstack usage, tooling choices |
| Development priorities and technical debt tradeoffs | Day-to-day, does not require CEO sign-off |

## Joint (Both Founders Required)

| Decision | Why it's joint |
|---|---|
| Legal entity structure and jurisdiction | Affects both token issuance (Vadim) and medical practice liability (Marina) |
| Publishing the whitepaper, or any document mixing clinical and financial/token claims | Wrong claim on either side damages both the medical trust and the token's legal standing |
| TGE go/no-go and timing | Irreversible, company-defining, affects both lanes' credibility |
| Exchange listing go/no-go | Same — irreversible and cross-domain |
| Budget allocation between medical operations and tech/Web3 operations | Direct tradeoff between the two founders' domains |
| Hiring real employees to replace an AI role | Changes the operating structure itself |
| Crisis response: security incident with patient data exposure, or medical incident with reputational/regulatory exposure | See emergency bypass in the relevant playbook — immediate containment is unilateral, but the response plan and comms are joint |
| Equity or token allocation affecting the founders themselves | Self-dealing risk — never unilateral |
| Any decision that creates legal or financial liability for the company as a whole | Catch-all — if in doubt, treat as Joint |

## How to Use This Matrix

1. Identify which bucket the decision falls in. If it's not listed, ask: does it
   only affect medical/clinical matters (→ CEO), only technical/token/capital
   matters (→ CPWO), or both/company-wide (→ Joint)?
2. If CEO-only or CPWO-only: the relevant founder decides, informs the other via
   the daily report (`docs/reports/daily/`), no blocking required.
3. If Joint: follow `docs/governance/ESCALATION_FLOW.md` to bring it to a joint
   sync and log it in `docs/decision-log/`.
4. When a RACI row in `docs/governance/RACI_MATRIX.md` assigns a single
   "Accountable" but the decision type appears in the Joint list above, **this
   matrix wins** — RACI describes operational accountability, this file
   describes final decision authority.
