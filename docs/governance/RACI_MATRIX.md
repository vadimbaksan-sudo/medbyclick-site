# RACI Matrix — Key Processes

Status: **Final** (adopted 2026-07-01)
Companion to: `docs/governance/DECISION_MATRIX.md` (final authority overrides "A" below
for any process/step marked Joint there), `docs/governance/ESCALATION_FLOW.md`

R = Responsible (does the work) · A = Accountable (final sign-off — should be one
per row; where the Decision Matrix requires Joint, both founders are marked A)
C = Consulted (two-way input before the decision) · I = Informed (told after)

Role key: **CEO** = Marina · **CPWO** = Vadim · **MED-ADV** = Medical Advisory ·
**MED-CON** = Medical Content · **MED-COM** = Medical Community · **CTO** = CTO/Product ·
**DEV** = Developer · **W3T** = Web3 & Token Strategy · **LEGAL** = Legal & Compliance ·
**QA** = QA/GStack · **GROWTH** = Growth/Marketing · **AUD** = Independent Auditor

## 1. Product Development

| Role | CEO | CPWO | CTO | DEV | QA | MED-ADV | AUD |
|---|---|---|---|---|---|---|---|
| RACI | I | A | R | R | C | C (if clinical feature) | C |

## 2. Smart Contract

| Role | CPWO | W3T | DEV | LEGAL | AUD | CEO |
|---|---|---|---|---|---|---|
| RACI | A | R | R | C | C | I |

## 3. Tokenomics

| Role | CPWO | W3T | LEGAL | AUD | CEO |
|---|---|---|---|---|---|
| RACI | A | R | C | C | I |

## 4. Whitepaper

| Role | CEO | CPWO | W3T | MED-ADV | CTO | LEGAL | AUD | GROWTH |
|---|---|---|---|---|---|---|---|---|
| RACI | A* | A* | R (token/tech sections) | R (medical sections) | C | C | C | I |

\* Joint accountability per Decision Matrix — publication requires both sign-offs, not either alone.

## 5. Medical Content

| Role | CEO | MED-CON | MED-ADV | LEGAL | CPWO | GROWTH |
|---|---|---|---|---|---|---|
| RACI | A | R | C | C | I | I |

## 6. Marketing

| Role | CPWO | GROWTH | CEO | MED-ADV | LEGAL | DEV |
|---|---|---|---|---|---|---|
| RACI | A | R | C* | C* | C | I |

\* C becomes a hard gate, not just input, whenever the content contains a clinical
claim — see `docs/agents/GROWTH_MARKETING.md` Handoff Rules.

## 7. Fundraising

| Role | CPWO | W3T | CEO | LEGAL | AUD | DEV | QA |
|---|---|---|---|---|---|---|---|
| RACI | A | R | C* | C | C | I | I |

\* Per Decision Matrix, fundraising instrument/outreach is CPWO-only, but investor
terms affecting overall company liability are Joint — CEO consultation is
mandatory before terms are signed.

## 8. Listing

| Role | CPWO | W3T | LEGAL | AUD | CEO |
|---|---|---|---|---|---|
| RACI | A | R | C | C | I |

## 9. Legal

| Role | LEGAL | CEO | CPWO | AUD |
|---|---|---|---|---|
| RACI | R | A (medical-regulatory findings) | A (crypto-regulatory findings) | C |

## 10. QA

| Role | QA | CTO | DEV | MED-ADV | CEO | AUD |
|---|---|---|---|---|---|---|
| RACI | R | A | C | C (content-related bugs) | I | I |

## 11. Release

| Role | DEV | CTO | CPWO | QA | AUD | CEO | GROWTH |
|---|---|---|---|---|---|---|---|
| RACI | R | R | A | C | C | I | I |

## 12. TGE

| Role | CPWO | W3T | CEO | LEGAL | AUD | GROWTH | DEV |
|---|---|---|---|---|---|---|---|
| RACI | A* | R | A* | C | C | I | I |

\* Joint per Decision Matrix — TGE go/no-go is irreversible and company-defining.

## Reading This Matrix

- A row with two "A" marks is not a RACI violation — it's a deliberate flag that
  the Decision Matrix requires joint sign-off for that process regardless of who
  did the operational work (R).
- If a process isn't listed here, don't guess — raise it via
  `docs/governance/ESCALATION_FLOW.md` and it gets added.
