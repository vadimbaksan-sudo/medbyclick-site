# Playbook: Token Generation Event (TGE)

Process owner (RACI Accountable): **Joint (CEO + CPWO)** — irreversible, company-defining

## When to Use

Preparing for and executing the MBC token generation event, per the parameters
in `docs/TOKENOMICS.md` (100,000,000 MBC hard cap, TGE price $0.05, 10.7% TGE
circulating supply).

## Preconditions (all required before go/no-go)

- `docs/CONTRACT_AUDIT.md` has progressed from bytecode-only to a full
  source-level audit by a named firm (Hacken, CertiK, Trail of Bits) — Web3 &
  Token Strategy owns closing this gap
- Legal & Compliance has completed MiCA classification review and the legal
  entity is registered in the chosen jurisdiction
- `docs/TOKENOMICS.md` distribution table and vesting schedule are final and
  unchanged from what's been communicated to private-sale participants
- Independent Auditor has completed a pre-TGE risk review

## Steps

1. **Readiness check** — Web3 & Token Strategy confirms all preconditions above,
   compiles a readiness report to `docs/reports/web3/`.
2. **Legal sign-off** — Legal & Compliance confirms no outstanding regulatory
   blocker.
3. **Auditor review** — Independent Auditor reviews the readiness report and
   contract audit, flags any residual risk to both founders.
4. **Joint go/no-go** — Marina and Vadim jointly decide. Logged in
   `docs/decision-log/` regardless of outcome, using `Decision Template.md`.
5. **Execute** — Web3 & Token Strategy coordinates the on-chain event with
   Developer for any required technical support (liquidity pool setup,
   contract interaction).
6. **Post-TGE report** — Web3 & Token Strategy reports circulating supply,
   market cap, and any deviation from plan to `docs/reports/web3/`. Growth is
   informed for any announcement/marketing.

## Emergency Stop

If a contract vulnerability or exploit is discovered mid-process, Developer and
Web3 & Token Strategy have unilateral authority to halt/pause per
`docs/playbooks/Security Incident.md`. Resuming after a halt returns to the
Joint go/no-go step — it is not automatic.

## Where This Lands

Readiness reports, go/no-go decision, and post-TGE report: `docs/reports/web3/`
and `docs/decision-log/`.
