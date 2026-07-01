# MedByClick — Team Structure

Status: **Final** (adopted 2026-07-01)
Supersedes: earlier single-CEO draft of this document.

This file is the map. For the operating rules behind it, see `docs/governance/`.
For day-to-day execution rules per role, see `docs/agents/`.

## Founders

MedByClick is run by two co-founders, each with a full lane of AI roles and final
authority in their domain. Neither founder is "the CEO the other reports to" —
they are peers with different jurisdictions. See `docs/governance/FOUNDERS_AGREEMENT.md`
for the full operating agreement.

| Founder | Title | Domain |
|---|---|---|
| **Marina** | Co-Founder & Chief Executive Officer (CEO) | Medical expertise, clinical validity, medical content, medical community, doctor relations |
| **Vadim** | Co-Founder & Chief Product & Web3 Officer (CPWO) | Strategy, product, Web3/crypto, tokenomics, automation, AI infrastructure, development, investment |

## Organizational Chart

```
                          MARINA (CEO)              VADIM (CPWO)
                               │                          │
              ┌────────────────┼───────────┐  ┌───────────┼──────────────────┐
              │                │           │  │           │                  │
        Medical Advisory  Medical    Medical  CTO/       Developer      Web3 & Token
                          Content    Community Product                   Strategy
                                                                        (incl. CFO/
                                                                        fundraising fn.)

        ══════════════════════ SHARED SERVICES (report to both) ══════════════════════
              Legal & Compliance │ QA / GStack │ Growth / Marketing │ Independent Auditor
```

## Marina's Lane (CEO)

| Role | File | One-line mission |
|---|---|---|
| Medical Advisory | `docs/agents/MEDICAL_ADVISORY.md` | Sole clinical-accuracy authority; sign-off gate on any medical claim |
| Medical Content | `docs/agents/MEDICAL_CONTENT.md` | Writes content for doctors and patients |
| Medical Community | `docs/agents/MEDICAL_COMMUNITY.md` | Doctor recruitment, vetting workflow, doctor relations |

## Vadim's Lane (CPWO)

| Role | File | One-line mission |
|---|---|---|
| CTO / Product | `docs/agents/CTO_PRODUCT.md` | Technical roadmap, architecture, spec ownership |
| Developer | `docs/agents/DEVELOPER.md` | The only role permitted to change code |
| Web3 & Token Strategy | `docs/agents/WEB3_TOKEN_STRATEGY.md` | Tokenomics, smart contract strategy, listing, fundraising execution |

## Shared Services (dotted-line to both founders)

| Role | File | One-line mission |
|---|---|---|
| Legal & Compliance | `docs/agents/LEGAL_COMPLIANCE.md` | Routes medical-regulatory findings to Marina, crypto-regulatory findings to Vadim |
| QA / GStack | `docs/agents/QA_GSTACK.md` | Tests the live product; never edits code or content |
| Growth / Marketing | `docs/agents/GROWTH_MARKETING.md` | Acquisition strategy under Vadim; any clinical-claim content gated by Marina |
| Independent Auditor | `docs/agents/INDEPENDENT_AUDITOR.md` | Reports to neither lane — critiques both, captured by no one |

## How Decisions Get Made

Full detail: `docs/governance/DECISION_MATRIX.md`.

- **CEO-only**: clinical accuracy, doctor vetting standards, medical content tone, medical community policy.
- **CPWO-only**: technical architecture, tokenomics parameters, smart contract design choices, fundraising instrument/outreach strategy, AI-team infrastructure.
- **Joint (both founders)**: legal entity/jurisdiction, whitepaper publication, TGE go/no-go, exchange listing go/no-go, budget split between medical ops and tech/web3 ops, hiring real employees, crisis response, anything creating company-wide legal/financial liability.

## Cross-Role Responsibility (RACI)

Full matrix for 12 key processes (Product Development, Smart Contract, Tokenomics,
Whitepaper, Medical Content, Marketing, Fundraising, Listing, Legal, QA, Release, TGE):
`docs/governance/RACI_MATRIX.md`.

## Escalation

Full flow: `docs/governance/ESCALATION_FLOW.md`. Short version: a role escalates to
its own founder first; cross-lane or Decision-Matrix "Joint" items go to a joint
founders sync; unresolved risk goes to the Independent Auditor for documentation;
nothing gets silently dropped — everything lands in `docs/decision-log/`.

## Existing Project Documents This Structure Builds On (no duplicates created)

These already exist and are now owned/maintained by the roles below instead of
being orphaned:

| Existing document | Owning role | Used by |
|---|---|---|
| `docs/TOKENOMICS.md` | Web3 & Token Strategy | Tokenomics, TGE, Fundraising, Listing processes |
| `docs/WHITEPAPER.md` | Web3 & Token Strategy (token/tech sections) + Medical Advisory (medical sections) | Whitepaper process (joint sign-off) |
| `docs/CONTRACT_AUDIT.md` | Web3 & Token Strategy | Smart Contract process; input to Independent Auditor |
| `docs/LEGAL_BRIEF.md` | Legal & Compliance | Legal process; input for outside counsel engagement |
| `docs/legal/` (currently empty) | Legal & Compliance | Destination for jurisdiction-specific legal opinions once received |
| `TODOS.md` (T1–T4) | T1/T3 → Medical Community; T2 → CTO/Product; T4 → Growth/Marketing | Backlog items pre-dating this structure, now assigned |
| Prior `/office-hours` business design (`~/.gstack/projects/medbyclick/...design...md`) | CEO + CPWO jointly | Origin of the "trust network" business model this structure operationalizes |

## Reports

Each role's deliverables land in a dedicated folder under `docs/reports/`:
`daily/`, `medical/`, `product/`, `web3/`, `fundraising/`, `legal/`, `qa/`, `growth/`, `audit/`.
See each role file's Deliverables section for what goes where and how often.

## Scaling to Real Employees

Every AI role above is a placeholder for a future hire, not a permanent AI-only
function (except Independent Auditor — see that file for why it should stay
external even after the company has staff). Replace one role at a time; the role
file becomes that hire's job description on day one.
