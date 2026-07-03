# Finding: Token Unit Economics and Raise Adequacy

**Date:** 2026-07-03
**Filed by:** Web3 & Token Strategy
**Type:** Tokenomics/financial-viability — routed to Vadim (CPWO), for joint review with Marina (CEO) and the parallel Independent Auditor whole-business report
**Related:** `docs/LEGAL_BRIEF.md` Parts 0, 4, 10; `docs/CONTRACT_AUDIT.md` §0.3;
`docs/WHITEPAPER.md` §9, §10, §11.3; `docs/TOKENOMICS.md` §3.7, §7, §8, §11;
`docs/reports/web3/2026-07-02-tokenomics-audit-review.md`;
`docs/reports/audit/2026-07-03-business-token-viability-audit.md` (parallel, Independent Auditor)

Vadim asked directly: does the ~$540,000 raise cover real costs, is Y1 token
demand real, and does this need a token at all. Answered plainly below, with
the numbers, not reassurance.

---

## 1. Does the $540,000 raise cover real costs? No — it's short, likely by $50,000–$150,000+, and that's before Tier-2/bridge ambitions.

**Target raise** (`docs/LEGAL_BRIEF.md` Part 4): Private Sale ~$140,000 +
Public Sale/IDO ~$400,000 = **~$540,000**, assuming both close at 100% of
target — itself optimistic for an unaudited, unlisted, first-time team.

**Realistic one-time cost stack, sourced from the repo's own numbers:**

| Item | Source | Low | High |
|---|---|---|---|
| Legal (opinion letter, MiCA white paper review, SAFT template, offshore + Israel entity setup) | `docs/LEGAL_BRIEF.md` Part 0 §0.5 fee table | $29,500 | $95,000+ (ADGM/DIFC/Singapore push offshore entity alone to $50,000+) |
| Smart contract audit (Tier-3, Hacken-class) | `docs/WHITEPAPER.md` §11.3 ("Budget for audit: $30,000–$80,000") | $30,000 | $80,000 |
| Liquidity — USDT counterpart only (MBC side is allocation, not cash) | `docs/TOKENOMICS.md` §10.1 / `docs/WHITEPAPER.md` §10.1 ($175,000 MBC + $175,000 USDT) | $175,000 | $175,000 |
| Tier-3 CEX listing fees | `docs/WHITEPAPER.md` §11.3, `docs/TOKENOMICS.md` §11.2 | $20,000 | $80,000 |
| **Subtotal, one-time cash need** | | **~$255,000** | **~$430,000** |

Plus a **recurring** cost the raise wasn't sized for at all: ongoing legal
retainer $3,000–$10,000/month post-TGE (`docs/LEGAL_BRIEF.md` Part 0 §0.5) —
$36,000–$120,000/year, indefinitely, not a one-time draw from the raise.

**Against $540,000:** at the optimistic end (~$255,000), the raise covers
one-time costs with ~$285,000 left for marketing, dev, and reserve. At the
realistic-to-pessimistic end (~$430,000+), it leaves ~$110,000 — thin, and
that's *only* to reach Tier-3-listed, single-audit status. It does **not**
fund: the CertiK "secondary audit" `docs/TOKENOMICS.md` §11.3 already
requires before Tier-2 (KuCoin/Bybit), or the Trail-of-Bits bridge audit
`docs/CONTRACT_AUDIT.md` §0.3 flags as the most expensive of the three
candidates specifically because the LayerZero cross-chain logic is novel —
both are explicitly deferred to post-TGE Treasury funding, which itself
depends on the token performing well enough to fund itself. That's a
dependency loop, not a plan.

**One more internal inconsistency worth flagging directly:** `docs/TOKENOMICS.md`
§3.7 itself earmarks the $140,000 Private Sale for "Smart contract
development and audit (~$60,000)... Legal structure and MiCA advisory
(~$40,000)... marketing (~$25,000)... reserve (~$15,000)" — a $100,000
combined legal+audit budget that is **already below** the $59,500–$175,000
this report finds for legal and audit alone, using this same repo's other
documents. The private-sale use-of-funds table was written without
reconciling against `docs/LEGAL_BRIEF.md`'s own fee table or
`docs/WHITEPAPER.md`'s own audit budget line. This isn't a new number I'm
inventing — it's the repo disagreeing with itself, and the disagreement
runs one direction: every other estimate is higher than the number the
Private Sale was actually sized against.

**Bottom line:** $540,000, raised in full, gets MedByClick to "legally
clean, Tier-3-audited, Tier-3-listed" with little to no margin — and does
not fund the Tier-2 path or the Ethereum bridge the whitepaper's own roadmap
commits to. Realistically, expect to raise less than target (unaudited
pre-product tokens routinely underperform their target), which makes the
gap worse, not better.

---

## 2. Is Y1 demand real or a treadmill? It's real in direction, too small in scale to matter for 18–24 months — and PR #2's own (closed) audit already reached the same conclusion.

Using `docs/WHITEPAPER.md` §9.1's own conservative Y1 volumes (100 case
reviews/mo, 40 care coordinations/mo, 50 subscribers, 10 travel
packages/mo, ~$72,400/month total fiat revenue) and `docs/TOKENOMICS.md`
§7.1's own adoption assumption (30% of revenue paid in MBC, 40% of MBC
payments burned):

- MBC payment volume: 0.30 × $72,400 ≈ $21,720/month → at $0.05/MBC ≈
  **434,400 MBC/month transacted**.
- Burn (40% of that): **~173,760 MBC/month ≈ ~2.1M MBC/year**, roughly
  **2.1% of total supply annually** at these volumes.

Compare that to what the corrected `docs/TOKENOMICS.md` §5 Unlock Calendar
actually releases in the same window: **~12.2M MBC (12.2% of supply)
unlocks in just the first 6 months** (TGE + Public Sale + Rewards + Private
Sale vesting). Burn-driven demand over that same 6 months is roughly
~1.0M MBC — **under 10% of what's being unlocked and sold into the market
in the same period.** Doctor/clinic staking adds a one-time lock of
~250,000 MBC in Y1 (`docs/TOKENOMICS.md` §7.2) — a rounding error against
12.2M unlocked.

This is a real, structural gap, not a rhetorical one: **at Y1 conservative
volumes, usage-driven demand (burn + staking) is roughly an order of
magnitude too small to offset vesting-driven sell pressure.** Price support
in Year 1 depends almost entirely on new buyer inflow (speculative demand,
IDO momentum, exchange listing bumps) — not on the platform being used.
The mechanism only starts to matter at meaningfully larger scale (Year 2+
figures in `docs/TOKENOMICS.md` §7.1 — 1,000 consultations/month, 40%
adoption — get burn to ~8.6% of supply/year), and by then most of the
vesting schedule has also completed, so the two curves cross only in year
2–3, not year 1. This is not a new finding: PR #2's own (closed, unmerged)
bundled tokenomics audit independently flagged the exact same issue —
"token velocity problem... not addressed anywhere... low Year 1 velocity is
largely structural... the key question is whether utility sinks grow fast
enough to absorb new circulating tokens... depends on platform adoption."
Two independent passes reach the same number: **real mechanism, wrong
order of magnitude for the first 18–24 months.**

---

## 3. Does this need a token at all? Honestly: no, not for the core business — and the whitepaper's own §9 already says so.

`docs/WHITEPAPER.md` §9 states its own operating principle directly:
*"MedByClick must be a profitable company regardless of MBC token price...
A company whose survival depends on token price appreciation is running a
Ponzi structure, not a business."* Section 9.1's own Y1 projection
(~$870,000/year) is 100% fiat, 100% token-independent. Bookings, payments,
doctor verification, and clinic listings are all things a normal SaaS/
marketplace business runs in plain fiat, on Stripe or a bank rail, starting
tomorrow, with zero blockchain involved. Nothing in the core product
description requires a token to function.

What the token actually adds, honestly assessed:

- **A discount mechanism** (5–20% off if paid in MBC) — this is a loyalty/
  coupon program. It does not require a token; a points system or a
  Stripe-coupon equivalent achieves the identical patient-facing effect
  without any of the MiCA exposure, audit cost, or bridge complexity
  documented across this repo.
- **Doctor/clinic staking as a commitment device** — closer to a real,
  token-native use case (skin-in-the-game, portable across the platform),
  but functionally equivalent outcomes (refundable deposits, verification
  bonds) are achievable in fiat escrow.
- **A capital-raising vehicle** — this is where the token does something
  fiat can't as cleanly: it lets the company raise ~$540,000 from ~20
  private investors plus a public sale without giving up equity. This is
  real, and it's the actual reason to build one.

**Honest read: the token is a fundraising and incentive-marketing
instrument wearing a utility-token architecture, not a component the core
business needs to function.** That's not disqualifying — plenty of
legitimate projects raise this way — but it should be named accurately
internally, because it changes the real question. The question isn't "is
the utility model sound" (it's directionally fine, just slow — see §2). The
question is: **does a ~$540,000 raise, with a realistic $255,000–$430,000+
cost floor and demand that doesn't meaningfully support price for 18–24
months, justify the MiCA exposure, audit spend, and multi-year listing
roadmap documented across this repo, versus raising the same amount as a
SAFE/equity round with no token at all?** That's a Joint decision (fundraising
instrument choice is this role's decision authority per
`docs/agents/WEB3_TOKEN_STRATEGY.md`, but a decision this consequential
given what §3 shows should not be finalized without Marina and Vadim both
seeing the same numbers this report and the parallel Independent Auditor
report show).

---

## Next step

This report does not recommend killing the token — that's a decision this
role can advise on but not make unilaterally at this stakes level. It
recommends: (1) Vadim and Marina read this alongside
`docs/reports/audit/2026-07-03-business-token-viability-audit.md` before
any further capital or engineering is committed to the token track; (2) if
the token proceeds, budget to the realistic $430,000+ one-time figure, not
the $140,000 private-sale use-of-funds table currently in
`docs/TOKENOMICS.md` §3.7, and treat Y1 as a speculative-demand-dependent
period, not a utility-demand-supported one; (3) either path — proceed or
not — routes through Legal & Compliance before anything here is published
externally, per this role's Must-Not-Do.
