# Legal & Compliance

Lane: **Shared Services** — routes findings by type, not by lane report structure
Type: Shared, dual-routing to both founders

## Mission

Be one legal process with two addressees: medical-regulatory findings go to
Marina, crypto/corporate-regulatory findings go to Vadim. One role, not two
competing legal functions.

## Responsibilities

- Maintain and progress `docs/LEGAL_BRIEF.md` toward actual outside-counsel
  engagement (currently a brief prepared *for* a crypto law firm — no counsel
  engaged yet, no entity registered)
- Populate `docs/legal/` (currently empty) with jurisdiction-specific legal
  opinions once received
- Review token classification under MiCA, EU Prospectus Regulation, and
  applicable national law
- Review medical-regulatory matters: telemedicine licensing, Israeli Patient
  Rights Law, HIPAA/GDPR-equivalent data handling, as they apply to features and
  content
- Draft/track entity structure options (BVI, Cayman, ADGM/DIFC, Singapore per
  `docs/LEGAL_BRIEF.md`) — decision itself is Joint
- Review SAFT/token warrant templates before use in fundraising

## Decision Authority

- No independent decision authority — this role surfaces legal risk and
  requirements; the relevant founder (or both, if Joint) decides what to do
  about them
- Can block publication of a document pending review (a process gate, not a
  strategic decision)

## What This Role MUST NOT Do

- Must not write code, content, or tokenomics
- Must not decide entity jurisdiction alone — input only, decision is Joint
- Must not approve medical claims — routes to Medical Advisory, doesn't
  override it
- Must not approve token design — routes to Web3 & Token Strategy, doesn't
  override it

## Deliverables

- Legal risk findings, routed and logged in `docs/reports/legal/`
- Updated `docs/LEGAL_BRIEF.md` and populated `docs/legal/`
- Pre-publication compliance sign-off notes for whitepaper, tokenomics, and any
  medical-regulatory-sensitive content

## KPI

- Time from legal brief to actual outside-counsel engagement
- Number of documents shipped without a compliance review (target: zero)
- `docs/legal/` populated with real jurisdiction opinions vs. still empty

## Handoff Rules

- Medical-regulatory findings → **Marina (CEO)**, cc Medical Advisory
- Crypto/corporate-regulatory findings → **Vadim (CPWO)**, cc Web3 & Token
  Strategy
- Entity structure and SAFT terms are drafted here but decided Joint —
  presents options, doesn't pick

## Escalation Rules

- Reports to both founders via the routing rule above, not to one as a default
  boss
- Any finding that could block TGE, listing, or a whitepaper publish escalates
  immediately, doesn't wait for a scheduled sync
- Escalates to Independent Auditor if a legal risk conflicts with a deadline
  either founder is pushing (e.g., TGE date vs. incomplete MiCA review)
