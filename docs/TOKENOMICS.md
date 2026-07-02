# MBC Token — Tokenomics Paper
### Version 1.1 | June 2026 *(v1.1 currency review — July 2026, see revision note)*
### MedByClick — Medical Coordination Platform

---

> **Disclaimer:** This document is for informational purposes only. MBC is a utility token. Nothing herein constitutes financial advice, an offer to purchase securities, or a guarantee of returns. Acquiring MBC carries risk of total or partial loss.

> **Revision note (v1.1, 2026-07-02):** Web3 & Token Strategy currency review. Fixed
> a Private Sale vesting arithmetic error (§3.7/§4) that over-distributed the
> allocation by 700,000 MBC versus the stated 7,000,000 cap. Flagged — but did not
> hand-patch — a stale illustrative figure in the §5 Unlock Calendar, a circulating-supply
> definition inconsistency (LP inclusion), and a schedule mismatch in §3.2 Platform
> Rewards. Full findings: `docs/reports/web3/2026-07-02-tokenomics-audit-review.md`.
> Items with MiCA/regulatory exposure are cross-referenced there for Legal &
> Compliance, not duplicated here.

---

## 1. Token Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Token Name | MedByClick Token | Platform brand alignment |
| Symbol | MBC | Short, memorable, medical prefix |
| Blockchain | BNB Chain (native) | Low gas fees for end users; Ethereum bridge Phase 3 |
| Standard | BEP-20 | Industry-standard fungible token |
| Total Supply | **100,000,000 MBC** | Hard cap — no mint function |
| Decimals | 18 | Standard |
| TGE Price | $0.05 | Honest valuation for early stage |
| Private Sale Price | $0.02 | 60% discount to public; justified by early risk |
| Fully Diluted Valuation | $5,000,000 | Target at TGE |
| TGE Circulating Supply | 10,700,000 MBC (10.7%) | Conservative launch — prevents immediate sell pressure |
| TGE Market Cap | ~$535,000 | Achievable, credible for Tier-3 CEX listing |
| Mint Function | **NONE** | Permanently disabled in contract |
| Admin Pause | Temporary (renounced after Phase 1) | For emergency only; renounced at Month 6 |

---

## 2. Distribution Table

```
TOTAL SUPPLY: 100,000,000 MBC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Ecosystem Treasury   ████████████████████████████  25%  25,000,000 MBC
  Platform Rewards     ████████████████████          20%  20,000,000 MBC
  Founders & Team      ███████████████               15%  15,000,000 MBC
  Strategic Partners   ████████                       8%   8,000,000 MBC
  Public Sale / IDO    ████████                       8%   8,000,000 MBC
  Liquidity Pool       ███████                        7%   7,000,000 MBC
  Private Sale         ███████                        7%   7,000,000 MBC
  Reserve              ██████                         6%   6,000,000 MBC
  Advisors             ████                           4%   4,000,000 MBC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TOTAL                                             100%  100,000,000 MBC
```

---

## 3. Allocation Breakdown — Rationale for Every Percentage

### 3.1 Ecosystem Treasury — 25% (25,000,000 MBC)

**Why 25%?**
The Treasury is the engine of the entire ecosystem. It funds platform development, pays for audits, supports liquidity, funds partnerships, and serves as the emergency backstop. 25% is the minimum to sustain a 4-year operating runway for a healthcare platform at the scale MedByClick targets.

Comparable benchmarks:
- Uniswap: 43% community treasury
- Aave: 30% ecosystem reserve
- Chainlink: 35% ecosystem development

25% is actually conservative. We justify the lower allocation because MedByClick has real fiat revenue (unlike pure protocol tokens) and does not need the Treasury to fund basic company operations.

**Management:** 3-of-5 multisig (Gnosis Safe). All transactions above $50,000 subject to 7-day public timelock.

**Vesting:** 0% TGE, 6-month cliff, 48-month linear release
- Monthly release after cliff: 520,833 MBC/month
- Rationale: 4-year vest signals long-term commitment; no TGE release prevents Treasury dump

---

### 3.2 Platform Rewards — 20% (20,000,000 MBC)

**Why 20%?**
Rewards drive user acquisition and retention. This pool funds:
- Patient referral bonuses (50–150 MBC per successful referral)
- Doctor referral bonuses (500 MBC per verified doctor)
- Content creation rewards (MedCommunity, MedEdu)
- Completion bonuses for MedEdu courses

20% over 36 months = approximately 556,000 MBC/month gross maximum. With monthly emission caps decreasing 10% every 6 months, actual monthly emission is significantly lower. This prevents reward inflation while maintaining sufficient incentive budget for platform growth phases.

**Emission Cap Schedule:**

| Period | Monthly Cap | Cumulative |
|--------|-------------|------------|
| TGE (Month 0) | 1,000,000 (one-time seed) | 1,000,000 |
| Month 1–6 | 556,000/month | +3,336,000 |
| Month 7–12 | 500,000/month (−10%) | +3,000,000 |
| Month 13–18 | 450,000/month (−10%) | +2,700,000 |
| Month 19–24 | 405,000/month (−10%) | +2,430,000 |
| Month 25–30 | 364,000/month (−10%) | +2,184,000 |
| Month 31–36 | 328,000/month (−10%) | +1,968,000 |
| **Total** | | **~17,618,000** |

Remaining ~2,382,000 MBC transferred to Treasury at Month 36 for ongoing ecosystem use.

**Why decreasing emission?** Early platform stages need aggressive rewards to acquire users. Later stages have network effects and organic retention — rewards become less critical and continued high emission would create unnecessary sell pressure.

> **Flagged 2026-07-02:** this cap schedule (556,000/month starting Month 1, no
> cliff) does not match the vesting schedule used in §4/§5 for the same pool
> (5% TGE, 3-month cliff, 527,778/month starting Month 3). Both cannot be
> literally true at once. Needs reconciliation — either this is a ceiling that
> the vesting schedule never actually reaches (state that explicitly), or this
> section is stale relative to §4/§5. Left both numbers in place pending that
> decision rather than guessing which one is authoritative.

---

### 3.3 Founders & Team — 15% (15,000,000 MBC)

**Why 15% and not more?**

MedByClick has two founders who operate the platform end-to-end. Their total compensation model is deliberately split into two independent streams:

**Stream 1 — Token allocation (long-term alignment):** 15% of supply, fully vested over time. This represents the founders' equity stake in the ecosystem's long-term success — not their salary.

**Stream 2 — Treasury compensation (operational income):** Monthly fiat compensation paid from Treasury. This is the founders' actual income for day-to-day operational work. Full structure documented in Section 9.

This separation is the correct architecture for three reasons:
1. **Legally cleaner:** Token allocation is equity; Treasury compensation is salary. Mixing them creates both accounting problems and securities risks.
2. **Exchange-friendly:** Listing teams see 15% founder allocation — not 30%. This passes compliance review without conversation.
3. **Investor-friendly:** Investors see that founders did not take excessive token equity. They trust the ecosystem allocation more.

**Sub-allocation:**

| Role | MBC | % of Team Allocation |
|------|-----|---------------------|
| Founder 1 / CEO | 7,500,000 | 50% |
| Founder 2 / Co-founder | 7,500,000 | 50% |
| **Total** | **15,000,000** | **100%** |

Early hires (engineering, medical, operations) are compensated via Treasury operational budget — not from this token allocation. This keeps token dilution clean and predictable.

**Vesting:** 0% TGE, 12-month cliff, 36-month linear release
- Monthly release after cliff: 208,333 MBC/month per founder
- No TGE release — founders earn nothing if the project fails in year one
- Rationale: 12-month cliff forces founders to demonstrate a working product before accessing any tokens. This is non-negotiable for exchange listing credibility.

**Important constraint:** Neither founder may sell more than 20% of their monthly vested MBC in any calendar month during the first 24 months post-cliff. This self-imposed lock (published on-chain via a secondary vesting contract) signals long-term commitment to all market participants.

---

### 3.4 Strategic Partners — 8% (8,000,000 MBC)

**Why 8%?**
Strategic partners are clinics, hospital networks, medical institutions, and technology partners that integrate with MedByClick. They receive MBC allocations as:
- Incentive for early integration
- Alignment with platform success
- Compensation for referral traffic and data sharing

Typical allocations: 50,000–500,000 MBC per strategic partner, depending on integration depth.

**Vesting:** 0% TGE, 6-month cliff, 24-month linear release
- Partners receive nothing until 6 months post-TGE, ensuring they are invested in platform success before receiving any tokens

**Condition:** Partnership agreements include lock provisions — if a partner terminates the agreement, unvested tokens are returned to Treasury.

---

### 3.5 Public Sale / IDO — 8% (8,000,000 MBC)

**Why 8%?**
Public sale creates broad token distribution (required for decentralization narrative and exchange listing) while limiting supply pressure. 8% = 8,000,000 MBC × $0.05 = $400,000 raised.

This is a realistic fundraising target for a healthcare-focused IDO with no prior token. Overselling the public round at this stage would set unrealistic price expectations.

**Sale Structure:**
- Platform: Pinksale or DxSale (BNB Chain IDO platforms)
- Price: $0.05/MBC
- Hard cap: $400,000
- Minimum buy: $50
- Maximum buy: $5,000 (anti-whale at IDO)
- KYC required: yes (MiCA compliance)
- Geographic restrictions: US, UK, sanctioned countries excluded

**Vesting:** 25% TGE (2,000,000 MBC), 0-month cliff, 9-month linear release
- Monthly release after TGE: 666,667 MBC/month
- TGE release rationale: Retail investors need some liquidity immediately. 25% is the market-accepted balance between TGE dump risk and investor satisfaction.

---

### 3.6 Liquidity Pool — 7% (7,000,000 MBC)

**Why 7%?**
7,000,000 MBC paired with $175,000 USDT creates a total liquidity position of $350,000 at TGE. This represents 65% of initial market cap in liquidity — a very healthy depth ratio.

Industry benchmark: 5–10% for liquidity is standard. Below 5% creates vulnerable pools. Above 10% locks too much capital in liquidity at the expense of other allocations.

**Deployment:**
- Platform: PancakeSwap V3
- Position type: Concentrated liquidity (price range: $0.03–$0.15)
- Lock duration: **24 months minimum** (on-chain verifiable via PinkLock)
- Lock proof: Published in whitepaper and on project website

**Why concentrated liquidity (V3)?**
- 5–10× more capital-efficient than V2 constant product AMM
- Better price stability within the specified range
- Lower slippage for typical trade sizes ($500–$10,000)

---

### 3.7 Private Sale — 7% (7,000,000 MBC)

**Why 7%?**
Private sale funds early development before TGE. 7% = 7,000,000 MBC × $0.02 = $140,000 raised at seed price. This funds:
- Smart contract development and audit (~$60,000)
- Legal structure and MiCA advisory (~$40,000)
- Initial marketing and community building (~$25,000)
- Operating reserve for 3–6 months (~$15,000)

**Investor profile:**
- Maximum 20 private investors
- Minimum ticket: $5,000
- Maximum ticket: $25,000 per investor
- No VCs with >5% ownership (prevents fund-controlled token)
- KYC required

**Why $0.02?**
Private investors take maximum risk (pre-product, pre-audit, pre-listing). 60% discount to public is industry standard for seed rounds. Any tighter discount reduces private round attractiveness; any wider discount over-rewards early investors at public investor expense.

**Vesting:** 10% TGE (700,000 MBC), 3-month cliff, 18-month linear release
- Monthly release after cliff: 350,000 MBC/month (6,300,000 remaining ÷ 18 —
  corrected 2026-07-02; the allocation had previously been divided by the total
  7,000,000 instead of the post-TGE remainder, which over-distributed by 700,000
  MBC versus the stated cap)

---

### 3.8 Reserve — 6% (6,000,000 MBC)

**Why 6%?**
The Reserve exists for scenarios that cannot be predicted:
- Regulatory compliance costs exceeding budget
- Legal defense costs from unexpected regulatory action
- Emergency liquidity support in market crash scenarios
- Bridge security incident recovery
- Critical infrastructure costs (audit re-checks, legal opinions)

6% = 6,000,000 MBC. At TGE price, this is $300,000 — a meaningful emergency fund for a project at this scale.

**Vesting:** 0% TGE, 12-month cliff, 24-month linear release
**Access:** 4-of-5 multisig. Any Reserve withdrawal requires public disclosure with minimum 14-day timelock.

---

### 3.9 Advisors — 4% (4,000,000 MBC)

**Why 4%?**
Advisors provide value in specific domains: blockchain technical, crypto legal, exchange relations, medical industry. 4% is sufficient to attract quality advisors without over-diluting.

Typical advisor allocation: 100,000–500,000 MBC per advisor (2–8 advisors).

**Advisor requirements:**
- Verifiable track record in crypto or healthcare
- Active contribution commitment (minimum monthly check-in)
- No silent advisors — all advisors listed on website with full profiles

**Vesting:** 0% TGE, 6-month cliff, 24-month linear release
- Monthly release after cliff: 166,667 MBC/month

---

## 4. Vesting Summary Table

| Category | Amount | TGE % | TGE MBC | Cliff | Vesting | Monthly (post-cliff) |
|----------|--------|--------|---------|-------|---------|---------------------|
| Ecosystem Treasury | 25,000,000 | 0% | 0 | 6 mo | 48 mo | 520,833 |
| Platform Rewards | 20,000,000 | 5% | 1,000,000 | 3 mo | 36 mo | 527,778* |
| Founders & Team | 15,000,000 | 0% | 0 | 12 mo | 36 mo | 416,667 |
| Strategic Partners | 8,000,000 | 0% | 0 | 6 mo | 24 mo | 333,333 |
| Public Sale | 8,000,000 | 25% | 2,000,000 | 0 mo | 9 mo | 666,667 |
| Liquidity Pool | 7,000,000 | 100% | 7,000,000 | — | Locked 24 mo | N/A |
| Private Sale | 7,000,000 | 10% | 700,000 | 3 mo | 18 mo | 350,000 |
| Reserve | 6,000,000 | 0% | 0 | 12 mo | 24 mo | 250,000 |
| Advisors | 4,000,000 | 0% | 0 | 6 mo | 24 mo | 166,667 |
| **TOTAL** | **100,000,000** | | **10,700,000** | | | |

*Platform Rewards emission is capped and decreasing — maximum is 527,778 but actual is governed by the cap schedule.

---

## 5. Unlock Calendar — Month-by-Month

| Month | Treasury | Rewards | Founders | Partners | Private | Public | Advisors | Reserve | **Monthly Total** | **Cumulative** |
|-------|---------|---------|---------|---------|---------|--------|--------|--------|------------------|---------------|
| 0 (TGE) | 0 | 1,000,000 | 0 | 0 | 700,000 | 2,000,000 | 0 | 0 | **3,700,000** | 3,700,000 |
| 1 | 0 | 0 | 0 | 0 | 0 | 666,667 | 0 | 0 | 666,667 | 4,366,667 |
| 2 | 0 | 0 | 0 | 0 | 0 | 666,667 | 0 | 0 | 666,667 | 5,033,333 |
| 3 | 0 | 527,778 | 0 | 0 | 388,889 | 666,667 | 0 | 0 | **1,583,333** | 6,616,667 |
| 4 | 0 | 527,778 | 0 | 0 | 388,889 | 666,667 | 0 | 0 | 1,583,333 | 8,200,000 |
| 5 | 0 | 527,778 | 0 | 0 | 388,889 | 666,667 | 0 | 0 | 1,583,333 | 9,783,333 |
| 6 | 520,833 | 527,778 | 0 | 333,333 | 388,889 | 666,667 | 166,667 | 0 | **2,604,167** | 12,387,500 |
| 7–9 | 520,833 | ~500,000 | 0 | 333,333 | 388,889 | 666,667 | 166,667 | 0 | ~2,576,389/mo | ~20,100,000 |
| 10 | 520,833 | ~500,000 | 0 | 333,333 | 388,889 | **done** | 166,667 | 0 | ~1,909,722 | ~22,000,000 |
| 12 | 520,833 | ~450,000 | 416,667 | 333,333 | 388,889 | — | 166,667 | 250,000 | **2,526,389** | ~26,500,000 |
| 13–18 | 520,833 | ~450,000 | 416,667 | 333,333 | 388,889 | — | 166,667 | 250,000 | ~2,526,389/mo | ~41,700,000 |
| 19–24 | 520,833 | ~405,000 | 416,667 | 333,333 | — | — | 166,667 | 250,000 | ~2,092,500/mo | ~54,200,000 |
| 25–30 | 520,833 | ~364,000 | 416,667 | — | — | — | — | 250,000 | ~1,551,500/mo | ~63,500,000 |
| 31–36 | 520,833 | ~328,000 | 416,667 | — | — | — | — | 250,000 | ~1,515,500/mo | ~72,500,000 |
| 37–48 | 520,833 | — | — | — | — | — | — | — | 520,833/mo | ~78,750,000 |
| 49+ | — | — | — | — | — | — | — | — | 0 | **100,000,000** |

*Note: Liquidity LP tokens are locked for 24 months and not counted as circulating — they're locked in the pool, not individual wallets.*

> **Flagged 2026-07-02, not yet corrected in this table:** the Private Sale
> column above still uses the pre-correction 388,889/month figure (rather than
> the 350,000/month corrected in §3.7/§4) and stops at Month 18 instead of
> running the full 18 payments through Month 20. This table is illustrative
> (uses "~" throughout and omits an individual Month 11 row), so it has been
> flagged rather than hand-patched cell-by-cell — regenerate it from the
> corrected per-category schedule before this document is used for external
> diligence. See `docs/reports/web3/2026-07-02-tokenomics-audit-review.md`.

---

## 6. Circulating Supply Projection

| Timeframe | Circulating Supply | % of Total | Notes |
|-----------|-------------------|------------|-------|
| TGE (Day 1) | 10,700,000 | 10.7% | Healthy low float |
| Month 6 | ~15,000,000 | 15.0% | Cliffs start unlocking |
| Month 12 | ~26,500,000 | 26.5% | All cliffs cleared |
| Month 18 | ~38,000,000 | 38.0% | Heavy vest period |
| Month 24 | ~54,200,000 | 54.2% | Liquidity lock expires |
| Month 36 | ~72,500,000 | 72.5% | Most allocations complete |
| Month 48 | ~85,000,000 | 85.0% | Treasury final vest |
| Month 60 | 100,000,000 | 100.0% | Fully circulating (minus burns) |

**Important:** These are gross unlock figures. Actual circulating supply will be LOWER due to:
- Burn from payment processing (40% of all MBC payments burned)
- Doctor staking locks (1,000–5,000 MBC per doctor)
- Clinic staking locks (5,000–50,000 MBC per clinic)
- Travel escrow locks (1,000–50,000 MBC per package)

---

## 7. Demand Mechanisms — Quantified

### 7.1 Payment Discount Demand

**Scenario: 200 consultations/month at average $300 value**
- Revenue: $60,000/month
- MBC payment adoption rate assumption: 30% (conservative)
- MBC payment volume: $18,000/month
- At $0.05/MBC: 360,000 MBC transacted/month
- Burn (40%): 144,000 MBC/month
- Treasury inflow (40%): 144,000 MBC/month
- Rewards pool (20%): 72,000 MBC/month

**At Year 2 (scale: 1,000 consultations/month, 40% MBC adoption):**
- MBC burned per month: 720,000 MBC
- Annualized burn: 8,640,000 MBC (8.64% of total supply per year)

This is a deflationary rate comparable to established tokens.

### 7.2 Doctor Staking Demand

| Doctor Tier | Stake Requirement | Doctor Count Y1 | MBC Locked |
|-------------|------------------|-----------------|-----------|
| Verified Basic | 1,000 MBC | 100 doctors | 100,000 MBC |
| Verified Premium | 5,000 MBC | 30 doctors | 150,000 MBC |
| **Total Y1** | | **130 doctors** | **250,000 MBC** |

| Doctor Count Y2 | MBC Locked Y2 |
|----------------|--------------|
| 500 total | 1,200,000 MBC |

### 7.3 Clinic Staking Demand

| Clinic Tier | Stake | Clinics Y1 | MBC Locked |
|------------|-------|-----------|-----------|
| Listed | 5,000 | 20 | 100,000 |
| Featured | 15,000 | 10 | 150,000 |
| Premium Partner | 50,000 | 3 | 150,000 |
| **Total Y1** | | **33 clinics** | **400,000 MBC** |

### 7.4 Aggregate Demand Summary

| Demand Source | Y1 MBC Required | Y2 MBC Required |
|--------------|-----------------|-----------------|
| Payment processing | 2,000,000+ | 8,000,000+ |
| Doctor staking (new + renewal) | 250,000 | 1,200,000 |
| Clinic staking (new + upgrade) | 400,000 | 1,500,000 |
| Priority Passes | 500,000 | 2,000,000 |
| Travel Escrow | 300,000 | 1,500,000 |
| **Total Minimum Demand** | **3,450,000 MBC** | **14,200,000 MBC** |

Against Y1 unlock of ~26,500,000, this demand represents 13% absorption — modest but real. By Y2, demand absorption reaches 53% of Y2 unlocks. This is the trajectory required for price stability.

---

## 8. Supply Reduction Mechanisms

### 8.1 Burn Mechanics

**Payment Burn (primary mechanism)**

When MBC is used for service payment, the Payment Router smart contract automatically:
1. Receives MBC from buyer
2. Burns 40% via transfer to `0x000...dead`
3. Transfers 40% to Treasury multisig
4. Transfers 20% to Doctor/Clinic Rewards Pool multisig

This burn is:
- Automatic (contract-enforced, not manual)
- Proportional to platform volume (scales with growth)
- Permanent (0x000...dead is unrecoverable)
- Transparent (on-chain verifiable)

**Priority Pass Burn (secondary mechanism)**

100% of MBC spent on Priority Passes is burned. There is no Treasury allocation from this flow — pure deflationary event.

**Burn Rate Projections:**

| Month | Platform Consultations | MBC Payment Adoption | Monthly Burn |
|-------|----------------------|---------------------|-------------|
| 1–3 | 50/month | 20% | 12,000 MBC |
| 4–6 | 100/month | 25% | 37,500 MBC |
| 7–12 | 200/month | 30% | 90,000 MBC |
| 13–24 | 500/month | 35% | 262,500 MBC |
| 25–36 | 1,000/month | 40% | 600,000 MBC |

**Cumulative burn by Month 36: ~10,000,000 MBC (10% of total supply)**

### 8.2 Staking Lock

Unlike burns, staked MBC is not destroyed — it is locked in the staking contract and can be withdrawn after the relevant waiting period. However, for price mechanics, locked tokens behave identically to burned tokens: they are removed from tradeable circulation.

**Conservative staking lock projection:**
- Month 12: 1,500,000 MBC locked (doctors + clinics)
- Month 24: 4,000,000 MBC locked
- Month 36: 8,000,000 MBC locked (500+ doctors, 100+ clinics)

### 8.3 Escrow Lock

Medical travel escrow creates temporary but significant supply locks. During peak travel seasons (Q1 and Q3 typically), hundreds of simultaneous escrow contracts may hold MBC awaiting settlement.

Conservative estimate: 500,000–2,000,000 MBC in escrow at any given time by Year 2.

---

## 9. Treasury Strategy

### 9.1 Treasury Composition

The Treasury holds:
- MBC tokens (vested from Ecosystem Treasury allocation)
- MBC received from payment processing (40% of all payment flows)
- Stale/forfeited staking positions
- USD equivalent from private/public sale proceeds

The Treasury does NOT hold:
- Speculative positions in other tokens
- DeFi yield positions (too much smart contract risk for a healthcare treasury)
- Illiquid assets

### 9.2 Treasury Spending Categories

| Category | % of Annual Budget | Y1 USD Equivalent | Y2 USD Equivalent |
|----------|-------------------|-------------------|-------------------|
| **Founder Compensation** | **20%** | **$50,000** | **$96,000** |
| Platform Development | 25% | $62,500 | $100,000 |
| Smart Contract Audits | 15% | $37,500 | $60,000 |
| Legal & Regulatory | 15% | $37,500 | $60,000 |
| Exchange Listings (Tier-3) | 10% | $25,000 | $40,000 |
| Marketing & Community | 10% | $25,000 | $40,000 |
| Liquidity Support | 3% | $7,500 | $12,000 |
| Emergency Reserve | 2% | $5,000 | $8,000 |

*USD equivalents based on private/public sale proceeds of $540,000 total raised.*

### 9.3 Founder Compensation Structure (Treasury Stream)

The two founders receive monthly compensation from Treasury as operational income. This is separate from and independent of their token allocation (Section 3.3).

**Compensation schedule:**

| Phase | Period | Per Founder/Month | Both Founders/Month | Annual Total |
|-------|--------|-------------------|---------------------|-------------|
| Early | Month 1–6 | $2,000 | $4,000 | $24,000 |
| Growth | Month 7–18 | $4,000 | $8,000 | $96,000 |
| Scale | Month 19–36 | $6,000 | $12,000 | $144,000 |
| Mature | Month 37+ | Market rate | TBD by board | TBD |

**Rationale for phased increases:**
- Months 1–6 is pre-listing. Cash is conserved for audit and legal costs.
- Month 7+ coincides with Tier-3 CEX listing and first real MBC-denominated treasury inflows.
- Month 19+ reflects platform reaching MRR $100,000+, at which point founders' market-rate salaries are economically justified.

**Governance requirements for compensation:**
- All founder compensation payments require 2-of-3 multisig approval
- Compensation structure published publicly in quarterly Treasury report
- Any increase above the published schedule requires 3-of-5 multisig + 7-day public timelock
- Founders cannot unilaterally approve their own compensation payments (they are recused from that specific signing)

**Legal structure:**
- Founders maintain formal employment or consulting contracts with the operating company
- Payments are made from the fiat component of Treasury (USD from sale proceeds + platform fiat revenue) — not by selling MBC tokens
- MBC tokens are never sold by the Treasury to fund founder compensation

**Why this works for investors:**
- Investors see 15% founder token allocation — within market norms
- Investors see transparent, published, governance-gated salary structure
- Founders cannot extract value silently: every payment is multisig-approved and publicly reported
- Founders' primary financial incentive remains the long-term token value, not short-term compensation

### 9.3 Treasury Governance Rules

1. **No single-signature transactions** — all treasury movements require 3-of-5 multisig
2. **Timelock on large transactions** — >$50,000 requires 7-day timelock with public announcement
3. **Quarterly reports** — Treasury balance and spending published quarterly
4. **No circular spending** — Treasury cannot buy MBC from the open market for the purpose of supporting price
5. **Liquidation protection** — Treasury MBC tokens are not sold into the open market except for specific approved purposes (liquidity, CEX listings, legal costs)

---

## 10. Liquidity Strategy

### 10.1 Initial Setup (TGE)

| Item | Value |
|------|-------|
| MBC contributed | 3,500,000 MBC |
| USDT contributed | $175,000 |
| Total pool value | ~$350,000 |
| Price range (V3) | $0.03–$0.15 |
| Lock duration | 24 months |
| Lock platform | PinkLock (on-chain verifiable) |

### 10.2 Liquidity Growth Schedule

| Milestone | New Liquidity Added | Source | Cumulative |
|-----------|-------------------|--------|-----------|
| TGE | $350,000 | Private Sale + IDO proceeds | $350,000 |
| CoinGecko Listed (Month 2) | +$50,000 USDT | Treasury | $400,000 |
| MEXC/Gate Listing (Month 6) | +$150,000 | Treasury | $550,000 |
| $1M market cap milestone | +$100,000 | Treasury | $650,000 |
| KuCoin/Bybit Listing (Month 18) | +$250,000 | Treasury | $900,000 |
| Ethereum bridge (Month 24) | ETH pool: $100,000 | Treasury | $1,000,000+ |

### 10.3 Market Making Policy

- No market maker arrangements involving token loans with downside protection (these are disguised dumps)
- Market maker compensated via flat monthly fee from Treasury
- Market maker mandate: maintain 2% spread, provide depth, no wash trading
- Market maker relationship disclosed publicly

---

## 11. Listing Strategy

### 11.1 DEX Phase (Month 0 — TGE)

**Platform:** PancakeSwap V3 on BNB Chain
**Requirements:** Contract deployed + verified, liquidity locked, website live

**Tracking Application (Month 1–2):**
Apply to CoinGecko and CoinMarketCap simultaneously. Timeline: 2–4 weeks for CoinGecko, 4–8 weeks for CoinMarketCap after meeting volume requirements.

### 11.2 Tier-3 CEX Phase (Month 4–8)

**Targets:** MEXC (primary), Gate.io (secondary), Bitget (tertiary)

**Requirements to meet before application:**
- [ ] 3+ months trading history on DEX
- [ ] CoinGecko listing confirmed
- [ ] $50,000+ daily volume (consistent, not manufactured)
- [ ] Completed smart contract audit (CertiK or Hacken)
- [ ] Team KYB completed
- [ ] Whitepaper published
- [ ] Community: 5,000+ Telegram, 3,000+ Twitter

**Budget:** $40,000–$80,000 listing fee (source: Treasury)

### 11.3 Tier-2 CEX Phase (Month 12–18)

**Targets:** KuCoin, Bybit, OKX

**Requirements:**
- [ ] 6+ months on Tier-3 CEX
- [ ] $500,000+ daily cross-venue volume (organic)
- [ ] $5M+ FDV
- [ ] 1,000+ active wallets on-chain
- [ ] Demonstrated utility metrics (active doctor stakes, burn rate)
- [ ] Community: 25,000+ Telegram, 15,000+ Twitter
- [ ] No regulatory incidents
- [ ] Secondary audit completed

### 11.4 Ethereum Expansion (Month 18–24)

**Bridge:** LayerZero (industry-standard cross-chain messaging)
**Cap:** Maximum 10,000,000 MBC bridgeable to Ethereum at any time (enforced in bridge contract)
**DEX:** Uniswap V3 (Ethereum) — separate liquidity position
**Purpose:** Institutional DeFi access, wider token visibility, DeFi integrations

### 11.5 Tier-1 CEX Target (Month 24+)

**Targets:** Binance, OKX main, Coinbase International

**Binance listing requirements (non-official, based on pattern analysis):**
- FDV: $50M+
- Daily volume: $10M+
- User base: 100,000+ registered users on platform
- Revenue: demonstrable
- Regulatory: clean record in all jurisdictions
- Team: fully doxxed with verifiable backgrounds
- Audits: multiple independent audits on file

**Timeline:** This phase is conditional on business and token performance. It cannot be promised in a whitepaper. It is a target, not a commitment.

---

## 12. Revenue Model — Token vs. Business

### 12.1 Company Revenue (Fiat, Token-Independent)

The company earns fiat revenue from medical coordination services. This revenue exists whether MBC price is $0.001 or $10.

| Year | Consultations/Month | MRR | ARR |
|------|--------------------|----|-----|
| Y1 | 100–200 | $40,000–$80,000 | $480,000–$960,000 |
| Y2 | 500–800 | $150,000–$250,000 | $1.8M–$3M |
| Y3 | 1,500–2,500 | $450,000–$750,000 | $5.4M–$9M |

*MRR = Monthly Recurring Revenue (combination of one-time services + subscriptions)*

### 12.2 Token Economy Revenue

The company benefits from the token economy through:

1. **Treasury MBC accumulation** from payment flows (40% of every MBC payment)
2. **Doctor staking deposits** (not revenue, but reduce circulating supply)
3. **Clinic listing fees** (some paid in fiat, some in MBC — both are revenue)

The company does NOT benefit from MBC price appreciation in a way that creates securities concerns. Treasury MBC is held for operational use, not speculation.

### 12.3 Why the Business Doesn't Need the Token to Succeed

MedByClick's fiat model (case reviews, care coordination, subscriptions, medical travel commissions) generates revenue independently of token market performance. This is deliberate:

- If MBC price crashes: company operations continue, platform services continue, business model intact
- If MBC price rises: Treasury value increases, recruitment of doctors/clinics becomes cheaper, exchange listing criteria become easier to meet

The token enhances the business. The business does not depend on the token.

---

## 13. Comparable Project Analysis

| Project | Category | FDV at Launch | Supply | Key Utility | Current Status |
|---------|----------|--------------|--------|-------------|----------------|
| Healtheon (HTH) | Healthcare | ~$8M | 200M | Hospital payments | Tier-3 CEX |
| PatientFi (PTFI) | Healthcare | ~$3M | 500M | Medical financing | DEX only |
| MedToken (MED) | Healthcare | ~$12M | 100M | EHR access | Delisted |
| ClinTex (CTi) | Clinical Trials | ~$6M | 300M | Trial data | Gate.io |

**Key learning from failures:**
- MED (MedToken): Delisted because token utility was never live on the platform. Token and platform were decoupled.
- PTFI: Insufficient liquidity; no burn mechanism; pure speculation.

**Key learning from partial successes:**
- CTi (ClinTex): Survived by maintaining active development, regular burns, and real partnerships with clinical trial organizations.

**MBC differentiation:**
- Real fiat revenue from Day 1 (not dependent on token)
- Burn mechanism tied to actual service revenue
- Conservative launch (FDV $5M vs. inflated launches)
- Utility-first design (not governance-first or speculative)

---

## 14. Risk Analysis

### 14.1 Market Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Token price declines 80%+ | Medium | High | Business survives; Treasury retains operational MBC |
| Low DEX volume → delisting | Medium | High | Treasury liquidity reserve; market maker from Month 6 |
| Competitor launches similar token | Low-Medium | Medium | First-mover in niche; doctor network moat |
| Market-wide crypto crash | High | Medium | Fiat revenue provides runway; low burn rate on Treasury |

### 14.2 Tokenomics Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Reward recipients dump immediately | Medium | Medium | Vesting on referral rewards; loyalty tier benefits for holding |
| Private investors dump at cliff | Medium | Medium | 3-month cliff minimal; 18-month vest dilutes impact |
| Founders sell before platform proven | Low | Very High | 12-month cliff is structural, not policy |
| Rewards pool exhausted prematurely | Low | Medium | Emission cap schedule; Governor can reduce cap |

### 14.3 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Smart contract exploit | Low | Very High | Independent audit; bug bounty; conservative contract design |
| Bridge exploit (Phase 3) | Low-Medium | High | Bridge cap at 10% supply; LayerZero audited infrastructure |
| Oracle manipulation | Low | Medium | TWAP oracle (30-min window); not spot price |
| Liquidity pool drain | Very Low | High | 24-month lock prevents LP withdrawal |

### 14.4 Legal Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| SEC classifies MBC as security | Low-Medium | Very High | No profit-sharing; no yield; utility design; US excluded from sale |
| MiCA reclassification | Low | High | Ongoing MiCA compliance monitoring; legal opinion on file |
| Healthcare regulation changes | Medium | Medium | Platform pivots services; token utility adapts |
| Exchange forced delisting | Low | High | Multi-exchange strategy; no single point of failure |

---

## 15. Final Checks — Investor Due Diligence Checklist

Before approaching any investor, fund, or Tier-2+ exchange, verify:

**Tokenomics:**
- [ ] Hard cap confirmed in smart contract (no mint function)
- [ ] All vesting schedules enforced on-chain (not admin-controlled)
- [ ] Liquidity lock proof published and verifiable
- [ ] Treasury multisig addresses published
- [ ] Timelock contracts deployed and verified

**Legal:**
- [ ] Legal opinion letter from qualified crypto law firm on file
- [ ] MiCA white paper filed with competent authority (if EU)
- [ ] KYC/AML policy for token sale documented and implemented
- [ ] Geographic restrictions enforced at token sale (US, UK blocked)
- [ ] No "investment return" language in any marketing material

**Business:**
- [ ] Platform operational with paying customers (not just beta)
- [ ] Doctor staking module live and active
- [ ] MBC payment module live with real transactions
- [ ] Monthly treasury report published
- [ ] Burn transactions visible on BscScan

**Technical:**
- [ ] Smart contract audit completed by Tier-1 auditor
- [ ] Audit report published publicly
- [ ] All critical/high findings resolved
- [ ] Bug bounty program live
- [ ] Contract verified on BscScan

**Community:**
- [ ] Telegram: 5,000+ members before Tier-3 CEX application
- [ ] Twitter/X: 3,000+ followers before Tier-3 CEX application
- [ ] GitHub: public repository with commit history
- [ ] Team: fully doxxed with verifiable professional profiles

---

*MedByClick Tokenomics Paper v1.0 | June 2026*
*All projections are forward-looking statements and are not guarantees of future performance.*
