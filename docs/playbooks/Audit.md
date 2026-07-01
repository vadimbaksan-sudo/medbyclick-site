# Playbook: Audit

Process owner: **Independent Auditor** — the role's own operating cadence

## When to Use

Standing weekly cadence, plus triggered reviews before TGE, before listing, and
whenever a Joint decision is contested between the founders.

## Weekly Cycle

1. **Pull inputs** — read the latest entries across all report folders:
   `docs/reports/medical/`, `docs/reports/product/`, `docs/reports/web3/`,
   `docs/reports/fundraising/`, `docs/reports/legal/`, `docs/reports/qa/`,
   `docs/reports/growth/`.
2. **Cross-check against governance** — verify decisions taken match
   `docs/governance/DECISION_MATRIX.md` (nothing CEO/CPWO-only was decided by
   the wrong lane; nothing Joint was decided unilaterally).
3. **Check the standing gaps list** — track known open items (e.g., missing
   `docs/ROADMAP.md`, empty `docs/legal/`, contract audit still bytecode-only,
   `TODOS.md` T1–T4 status) until each closes.
4. **Write the report** — findings, risk level, and whether each finding is new
   or a repeat of a previously-acknowledged-but-unresolved item.
5. **Deliver to both founders simultaneously** — `docs/reports/audit/`.

## Triggered Reviews

- **Pre-TGE**: full review per `docs/playbooks/TGE.md` preconditions.
- **Pre-listing**: full review per `docs/playbooks/Exchange Listing.md`.
- **Disagreement review**: per `docs/governance/FOUNDERS_AGREEMENT.md` deadlock
  process — document both positions, add a risk note, do not break the tie.

## What Good Looks Like

A healthy audit report has a mix of closed and open findings over time, not a
permanently empty list — an auditor with nothing to say for months is a sign
the review isn't being done rigorously, not a sign the project is flawless.

## Where This Lands

`docs/reports/audit/` for all reports; contested-decision notes also attach to
the relevant `docs/decision-log/` entry.
