# MedByClick — Product Roadmap

Owner: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Status: **Living document**
Extracted from `docs/WHITEPAPER.md` §18 (token-lifecycle roadmap) and `TODOS.md`,
per the known gap flagged in the CTO/Product role file's Escalation Rules. This
document is the engineering sequencing view — the whitepaper's §18 stays the
token/TGE-facing view for external readers and should be treated as downstream
of this one, not the other way around. Kept independently current here.

## Current State (as of 2026-07-02)

Every one of the 13 modules plus `core` is a **frontend-only mock scaffold**:
`types.ts` + `data.ts` (hardcoded arrays) + `index.ts` + one or two presentational
components. There is no database, no ORM, and no auth library in `package.json` —
the entire site is static/client-rendered against mock data. No `app/api` routes
exist.

The one partial exception: `app/checkout/stripe` uses real `@stripe/react-stripe-js`
Elements against a Stripe **test** publishable key, but there's no server-side
`PaymentIntent` creation or webhook — it's real UI wired to nothing on the back
end yet. `app/checkout/mbc` and `app/checkout/crypto` are fully simulated
(`localStorage` balance, manual "confirm" button, no wallet connection or
on-chain check).

This is the honest baseline every phase below builds from. "Real functionality"
in this document means: backed by a real data store and a real workflow, not
just a nicer mock.

## Sequencing Principles

1. **Revenue-independence first.** Per whitepaper §9, the company must be
   profitable in fiat regardless of token price. Fiat payment infrastructure
   is closer to done than anything else and is the actual revenue mechanism —
   it goes first.
2. **Nothing works without Core.** Auth, user identity, and persistence block
   every other module's real-functionality work (bookings, doctor profiles,
   payment records, community posts). Core is the dependency root.
3. **Clinical features wait for Medical Advisory.** Per this role's Handoff
   Rules, any clinically-relevant build (`medai`, `medtrials`) gets a Medical
   Advisory consult before greenlighting, not after.
4. **Token-dependent features wait for the smart contract, not the other way
   around.** `medtoken`'s real functionality and the escrow parts of
   `medtravel` are structurally gated on the audited BNB Chain contract
   (whitepaper §15.5, Phase 1 of §18) — building ahead of that produces UI with
   nothing real to connect to. This is a CPWO-only tokenomics timeline
   (Decision Matrix), consulted with Web3 & Token Strategy per Handoff Rules,
   not something engineering sequencing can pull earlier.
5. **Don't build what T2 might replace.** The Day-30 coordination-platform
   decision (`docs/reports/product/2026-07-02-t2-platform-evaluation-rubric.md`)
   may make `medsupport`'s custom build redundant. That module's phase is
   explicitly contingent on T2's outcome.

## Phase Summary

| Phase | Focus | Modules |
|---|---|---|
| 0 | Foundation infra | `core`, `medpayments` (fiat) |
| 1 | Core product loop | `medconnect`, `medglobaldb`, `medai`, `medsupport`* |
| 2 | Trust & content | `mededu`, `medcommunity` |
| 3 | Cross-border, non-token parts | `medtravel` (logistics only), `medevents` |
| 4 | Token-gated | `medtoken`, `medtravel` (escrow), `medtrials`, `medpharmaccess` |

\* `medsupport` phase is contingent — see Phase 1 notes.

Each phase kickoff gets its own spec from CTO/Product to Developer per Handoff
Rules; this document sets order, not implementation detail.

---

## Phase 0 — Foundation Infrastructure

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `core` | Real auth (session/identity), a real database, user records replacing `mockUsers` | Platform decision (T2) informs whether coordinator-side identity lives here or in the T2 platform | — |
| `medpayments` (fiat path only) | Server-side Stripe `PaymentIntent` + webhook confirmation + persisted receipts; live key swapped in only after QA sign-off | `core` (need a real user/order record to attach a payment to) | Independent Auditor (release playbook flags payments/checkout as consult-required) |

MBC and crypto checkout paths in `medpayments` stay mocked through this phase —
they're correctly sequenced in Phase 4 alongside `medtoken`.

## Phase 1 — Core Product Loop

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `medconnect` | Real doctor profiles, real booking/matching workflow, replacing `mockDoctors`-style data | `core`; doctor vetting standard (Medical Community, per T3) before doctors go live | Medical Community (vetting standard, doctor admission) |
| `medglobaldb` | Real specialist/clinic directory backing `medconnect`'s and `medtravel`'s cards | `core` | — |
| `medai` | Real symptom-intake flow feeding coordinator triage, per whitepaper §3.4 ("increase intake quality, not replace clinical judgment") | `core`, `medconnect` (intake needs somewhere to route to) | **Medical Advisory — required before build starts**, per this role's Must-Not-Do |
| `medsupport` | **Contingent on T2.** If Healthie/Jane App is selected, this module likely becomes an integration/embed layer against the chosen platform rather than a custom-built scheduling/coordination system. Do not spec a full custom build until the Day-30 decision lands. | T2 platform decision | QA/GStack before any release candidate |

Open spec question to resolve with Developer at Phase 1 kickoff, not decided
here: `medconnect` (specialist matching/booking) and `medglobaldb` (specialist/
clinic database) currently look like they may overlap in data model. Flagging
for the Phase 1 spec, not resolving unilaterally in this roadmap.

## Phase 2 — Trust & Content

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `mededu` | Real course/article content replacing `mockCourses`, backed by Medical Content's verified copy | `core`; Medical Content pipeline | Medical Content (copy), Medical Advisory (clinical accuracy of course content) |
| `medcommunity` | Real posts/threads with moderation, tied to real user accounts | `core`; a moderation policy from Medical Community | Medical Community (conduct rules, per Team Structure) |

Neither module is revenue-critical at current scale (whitepaper §9's Y1
projection doesn't lean on these); sequenced after the product loop and content
pipeline exist, ahead of anything token-gated.

## Phase 3 — Cross-Border, Non-Token Parts

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `medtravel` (logistics only) | Real clinic/hospital selection workflow and document coordination (whitepaper §3.3), **excluding** the MBC escrow mechanism | `medglobaldb`, `medconnect` | Legal & Compliance (cross-border medical travel has jurisdiction-specific requirements) |
| `medevents` | Real event/webinar listings and registration | `core` | — |

## Phase 4 — Token-Gated

| Module | Real-functionality definition | Depends on | Consult |
|---|---|---|---|
| `medtoken` | Real wallet connection, real balance reads, real transaction history — contingent on the audited BNB Chain contract deployment (whitepaper §15.5, §18 Phase 1) | Smart contract audit complete; Legal documents published (§16.5) | **Web3 & Token Strategy — required**, per this role's Must-Not-Do (no unilateral tokenomics approval) |
| `medtravel` (escrow) | MBC escrow smart-contract integration (whitepaper §6, Use Case 6) | `medtoken`'s contract layer | Web3 & Token Strategy, Legal & Compliance |
| `medtrials` | Real clinical trial listings and enrollment matching, plus token referral bounties | `core`; clinical accuracy of trial data | **Medical Advisory — required** (clinical feature); Web3 & Token Strategy (bounty mechanics) |
| `medpharmaccess` | Real pharmaceutical sourcing coordination — the most regulatory-exposed module (cross-border pharma access) | `core`; jurisdiction-by-jurisdiction legal review | **Legal & Compliance — required before any build**; Medical Advisory |

`medtoken`'s real functionality (beyond UI polish on `TokenBalance`) cannot
land before Phase 1 of the whitepaper's token roadmap (§18) completes: audit,
mainnet deployment, and published legal documents. Building ahead of that
produces a wallet UI with no contract to call.

## What This Document Does Not Cover

- Exact spec detail per module — that's delivered at each phase's kickoff,
  per Handoff Rules ("hands every implementation task to Developer with a
  spec — never asks Developer to figure out requirements").
- Dates. Phase order is fixed; timing depends on the T2 decision (Day 30),
  the coordinator hire (T1, Month 2 gate), and the smart contract audit
  timeline, none of which are CTO/Product-owned inputs.
- Token/TGE roadmap milestones (listings, liquidity, governance phases) — those
  remain in `docs/WHITEPAPER.md` §18 and are Web3 & Token Strategy's domain.
