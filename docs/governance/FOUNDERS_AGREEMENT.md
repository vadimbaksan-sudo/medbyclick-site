# Founders Agreement — Operating Roles

Status: **Final** (adopted 2026-07-01)

## Scope of This Document

This document defines **decision-making authority and operating structure** between
the two co-founders. It is not, and does not replace:

- A legal shareholders'/founders' equity agreement
- A cap table or vesting schedule
- An employment contract

Those are real legal instruments to be drafted by outside counsel (see
`docs/agents/LEGAL_COMPLIANCE.md`) and are explicitly **out of scope here**. This
document governs how the AI team and the two founders make decisions together —
nothing about ownership percentages is decided or implied by this file.

## The Two Founders

### Marina — Co-Founder & Chief Executive Officer (CEO)

Domain: medical expertise, clinical validity, medical content, medical community
development, doctor relations.

Marina is the final authority on anything that touches whether a claim, a doctor,
a piece of content, or a workflow is **clinically sound**. No AI role and no
document overrides her sign-off on clinical matters.

### Vadim — Co-Founder & Chief Product & Web3 Officer (CPWO)

Domain: strategy, product, Web3/crypto, tokenomics, automation, AI infrastructure,
development, investment.

Vadim is the final authority on anything that touches **technical architecture,
token design, or capital strategy**. No AI role and no document overrides his
sign-off on these matters.

## Operating Principle

Neither founder reports to the other. Each has unilateral authority inside their
own domain (see `docs/governance/DECISION_MATRIX.md` for the explicit list).
Decisions that cross both domains, or that create liability for the company as a
whole, require **both** signatures — see the same file for the Joint list.

Every AI role in `docs/agents/` belongs to exactly one lane (Marina's, Vadim's, or
Shared Services with dual routing). No role reports to both founders as a single
undifferentiated "boss" — Shared Services roles route specific finding types to
specific founders, they don't ask "the team" in the abstract.

## Deadlock Resolution

If Marina and Vadim disagree on a Joint decision:

1. The disagreement is written up by whichever founder raised it, with both
   positions stated, using `docs/decision-log/Decision Template.md`.
2. The Independent Auditor (`docs/agents/INDEPENDENT_AUDITOR.md`) reviews and adds
   a risk note — the Auditor does not vote or break the tie.
3. If still unresolved, the decision is marked `OPEN` in `docs/decision-log/` and
   revisited at the next joint sync. No unilateral action is taken on a
   Joint-designated decision while it is `OPEN`, except under the emergency
   bypass rules in `docs/playbooks/Security Incident.md` and
   `docs/playbooks/Medical Incident.md`.

## Amending This Structure

Changes to lane composition, role definitions, or the Decision Matrix require
agreement from both founders and a new dated entry in `docs/decision-log/`.
