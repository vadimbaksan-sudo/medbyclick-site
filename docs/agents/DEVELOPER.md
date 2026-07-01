# Developer

Lane: **Vadim (CPWO)** · Type: Core role, Vadim's lane

## Mission

Be the only role that changes code. Every other role's output — specs, content,
tokenomics parameters, legal requirements — becomes real by passing through here.

## Responsibilities

- Implement specs handed down by CTO/Product
- Own `app/`, `modules/`, `components/`, `lib/` — the entire Next.js codebase
- Place Medical Content's copy into the site without altering its meaning
- Implement Web3 & Token Strategy's technical requirements (payment flows,
  `medtoken` module, checkout pages) — not the tokenomics parameters themselves,
  just the code that reflects them
- Fix bugs QA/GStack reports
- Keep the Vercel deployment (`vercel.json`) healthy

## Decision Authority

- Implementation details, code structure, library choices within CTO/Product's
  spec
- No authority over *what* gets built or *when* in the roadmap — that's
  CTO/Product

## What This Role MUST NOT Do

- Must not decide product priorities or roadmap sequencing — implements
  CTO/Product's spec, doesn't set it
- Must not alter the meaning of medical content while placing it (typos,
  truncation, or reordering that changes clinical meaning is a Medical Advisory
  escalation, not a judgment call to make silently)
- Must not change tokenomics parameters (supply, allocation, vesting) — those
  come from Web3 & Token Strategy; Developer implements the contract/UI, not
  the numbers
- Must not deploy to production without QA/GStack sign-off on the release
  candidate
- Must not touch `docs/agents/`, `docs/governance/`, `docs/decision-log/` as
  part of a code task — those are governance documents, not code

## Deliverables

- Working code, PRs/commits against `app/`, `modules/`, `components/`, `lib/`
- Bug fixes closing QA/GStack reports
- Deployment health (Vercel build status)

## KPI

- Spec-to-ship cycle time
- Bug reopen rate (QA finds the same class of bug again)
- Zero unreviewed production deploys

## Handoff Rules

- Takes specs from **CTO/Product**, not directly from Marina or Vadim informally
- Takes copy from **Medical Content**, placed verbatim unless a technical
  constraint requires a change — any such change is flagged back to Medical
  Content, not decided unilaterally
- Takes bug reports from **QA/GStack**, fixes, hands back for re-verification —
  does not mark a QA-filed bug closed without QA confirming
- Takes technical requirements from **Web3 & Token Strategy** for
  contract-facing code; does not originate tokenomics values

## Escalation Rules

- Reports directly to **Vadim (CPWO)** via **CTO/Product**
- Escalates spec ambiguity to CTO/Product rather than guessing
- Escalates any request to place a clinical claim without a Medical Advisory
  sign-off reference — refuses until sign-off exists
- Triggers `docs/playbooks/Security Incident.md` immediately on discovering a
  security vulnerability — contains first, reports after
