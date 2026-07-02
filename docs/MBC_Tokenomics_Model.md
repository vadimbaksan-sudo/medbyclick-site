# MBC Tokenomics Model

## Version 3.0 — Early-Stage Launch Economics

**Date:** June 2025
**Companion Document:** MBC Whitepaper v3.0

---

## Table of Contents

1. [Launch Parameters](#1-launch-parameters)
2. [Token Distribution](#2-token-distribution)
3. [Circulating Supply Schedule](#3-circulating-supply-schedule)
4. [Initial DEX Listing — PancakeSwap](#4-initial-dex-listing--pancakeswap)
5. [Burn Mechanics](#5-burn-mechanics)
6. [Rewards Economy](#6-rewards-economy)
7. [Payment Flow Economics](#7-payment-flow-economics)
8. [Anti-Whale Parameters](#8-anti-whale-parameters)
9. [Liquidity Growth Plan](#9-liquidity-growth-plan)
10. [Token Velocity Model](#10-token-velocity-model)
11. [Treasury Economics](#11-treasury-economics)
12. [Unit Economics](#12-unit-economics)
13. [Supply Control Mechanisms](#13-supply-control-mechanisms)
14. [Launch Checklist](#14-launch-checklist)
15. [Key Performance Indicators](#15-key-performance-indicators)
16. [Scenario Analysis](#16-scenario-analysis)
17. [Risk Matrix](#17-risk-matrix)

---

## 1. Launch Parameters

```
Token:               MedByClick Token (MBC)
Total Supply:        100,000,000 MBC (fixed, non-mintable)
Launch Network:      BNB Chain (BEP-20)
Launch DEX:          PancakeSwap v2
Launch Pair:         MBC/USDT
Initial Pool:        500,000 MBC + 5,000 USDT
Starting Price:      $0.01 USD per MBC
Circulating at TGE:  1,500,000 MBC (1.5% of supply)
Circulating Cap:     $15,000 (at launch price)
FDV:                 $1,000,000 (at launch price)
```

---

## 2. Token Distribution

### 2.1 Allocation Table

| Allocation | % | MBC | Purpose | Lock / Release |
|-----------|---|-----|---------|---------------|
| Platform Rewards | 30% | 30,000,000 | User loyalty, specialist bonuses | Activity-based, 5+ year runway |
| Ecosystem Development | 25% | 25,000,000 | Partnerships, integrations, grants | 6-month lock, then milestone-gated (max 2M/quarter) |
| Team & Advisors | 15% | 15,000,000 | Team compensation | 12-month cliff + 36-month linear vesting |
| DEX Liquidity | 5% | 5,000,000 | PancakeSwap pool | LP tokens locked 12 months |
| Community Airdrop | 10% | 10,000,000 | Verified platform user distribution | Over 6 months, usage-based |
| Operational Reserve | 10% | 10,000,000 | Emergency fund | 12-month lock, 2-of-3 multisig |
| Future Liquidity | 5% | 5,000,000 | Ethereum pool (Phase 3) | Locked until Phase 3 |

### 2.2 Changes from v2

| v2 | v3 | Reason |
|----|----|----|
| Initial Liquidity: 10% (10M MBC) | DEX Liquidity: 5% (5M) + Future Liquidity: 5% (5M) | v2 had 10M allocated but only 500K in pool — 9.5M unaccounted. v3 splits into current DEX (5%) and future Ethereum (5%) with clear purpose for each. |
| Community Sale: 10% | Community Airdrop: 10% | "Sale" implies a securities transaction. "Airdrop" tied to platform usage avoids security token classification. |
| Discount: 15% | Discount: 5% (+ up to 10% promotional from Ecosystem Fund) | v2's 15% discount exceeded platform's 3-5% processor fee savings — math didn't add up. v3's 5% base is self-sustaining from processor fee savings. |

---

## 3. Circulating Supply Schedule

### 3.1 Monthly Breakdown (Year 1)

| Month | New Release | Source | Cumulative Circulating | % of Supply |
|-------|-----------|--------|----------------------|-------------|
| 0 (Launch) | 1,500,000 | Pool (500K) + Airdrop batch 1 (1M) | 1,500,000 | 1.5% |
| 1 | 2,200,000 | Airdrop (2M) + Rewards (~200K) | 3,700,000 | 3.7% |
| 2 | 2,200,000 | Airdrop (2M) + Rewards (~200K) | 5,900,000 | 5.9% |
| 3 | 2,200,000 | Airdrop (2M) + Rewards (~200K) | 8,100,000 | 8.1% |
| 4 | 500,000 | Airdrop (300K) + Rewards (~200K) | 8,600,000 | 8.6% |
| 5 | 500,000 | Airdrop (300K) + Rewards (~200K) | 9,100,000 | 9.1% |
| 6 | 500,000 | Airdrop (300K) + Rewards (~200K) | 9,600,000 | 9.6% |
| 7-12 | ~200,000/mo | Rewards only | ~10,800,000 | 10.8% |

*Note: Ecosystem Fund releases begin at Month 7 (after 6-month lock) but are milestone-gated and not guaranteed.*

### 3.2 Annual Summary

| Period | Circulating | % of Supply | Key Unlocks |
|--------|-----------|-------------|-------------|
| Launch | 1,500,000 | 1.5% | Pool + first airdrop batch |
| End of Month 6 | ~9,600,000 | 9.6% | Airdrop complete, ecosystem unlocks begin |
| End of Year 1 | ~14,000,000 | 14% | Rewards active, ecosystem grants starting |
| End of Year 2 | ~35,000,000 | 35% | Team vesting begins (Month 13), ecosystem active |
| End of Year 3 | ~55,000,000 | 55% | Team partially vested, future liquidity released |
| End of Year 4 | ~80,000,000 | 80% | Team fully vested (Month 48) |
| End of Year 5 | ~100,000,000 | 100% | All allocations released |

### 3.3 Key Design Decisions

- **Low TGE float (1.5%):** Minimizes initial sell pressure. Most comparable projects launch with 5-15% float.
- **No investor unlock:** No VC/presale tokens mean no "Month 6 cliff dump" risk.
- **Team cliff at Month 12:** Team cannot sell any tokens for the entire first year. Skin in the game.
- **Ecosystem is milestone-gated:** Prevents arbitrary large releases. Each requires documented purpose and board approval.

---

## 4. Initial DEX Listing — PancakeSwap

### 4.1 AMM Mathematics

PancakeSwap v2 uses constant product AMM: `x × y = k`

```
Pool Setup:
  MBC deposited:  500,000
  USDT deposited: 5,000
  k = 500,000 × 5,000 = 2,500,000,000
  Price = USDT / MBC = 5,000 / 500,000 = $0.01/MBC
```

### 4.2 Price Impact Analysis

For a buy of `Δy` USDT:
```
MBC received = MBC_pool - (k / (USDT_pool + Δy))
New price = (USDT_pool + Δy) / (MBC_pool - MBC_received)
```

| Trade (USDT) | MBC Received | Avg Price Paid | New Pool Price | Slippage |
|-------------|-------------|---------------|---------------|----------|
| $10 | 995 | $0.01005 | $0.01002 | 0.2% |
| $25 | 2,475 | $0.01010 | $0.01005 | 0.5% |
| $50 | 4,901 | $0.01020 | $0.01010 | 1.0% |
| $100 | 9,615 | $0.01040 | $0.01020 | 2.0% |
| $250 | 23,077 | $0.01083 | $0.01052 | 5.3% |
| $500 | 43,478 | $0.01150 | $0.01105 | 10.5% |
| $1,000 | 76,923 | $0.01300 | $0.01250 | 25.0% |

### 4.3 Liquidity Depth Assessment

With $5K USDT in pool:
- **Suitable for:** Individual patient payments ($10-100), small trading
- **Not suitable for:** Large OTC trades, institutional purchases
- **Improvement plan:** See Section 9 (Liquidity Growth Plan)

### 4.4 Why $5,000 — Detailed Justification

1. **Capital efficiency:** $5K is ~10% of a reasonable startup's crypto budget. Does not drain operational funds.
2. **Price discovery:** Allows organic price movement. Thick liquidity would artificially suppress volatility and hide true market interest.
3. **Signal honesty:** A $50K pool from a pre-revenue project signals either overfunding or misleading maturity. $5K is proportionate.
4. **LP lock economics:** LP tokens will be locked for 12 months. Locking $5K is a manageable commitment; locking $50K is not prudent for a startup.
5. **Growth path:** Each milestone triggers a liquidity addition (Section 9). Pool grows with project, not ahead of it.

---

## 5. Burn Mechanics

### 5.1 Mechanism

- **Trigger:** Each MBC platform payment processed by MedByClick
- **Burn rate:** 2% of MBC payment amount
- **Execution:** Platform payment service calls `burn()` on the 2% portion
- **Destination:** Tokens sent to `0x000000000000000000000000000000000000dEaD` (verifiable on BscScan)
- **Irreversibility:** Burned tokens are permanently removed from circulation

### 5.2 Implementation Detail

The MBC smart contract includes `ERC20Burnable` from OpenZeppelin, providing:
```
burn(uint256 amount)        — holder burns their own tokens
burnFrom(address, uint256)  — burn from approved address
```

The platform's payment processing service:
1. Receives MBC from patient
2. Calculates 2% burn amount
3. Calls `burn(burnAmount)` from platform wallet
4. Remaining 98% is either held or swapped to USDT for specialist settlement

**Trust assumption:** Burns are executed by the platform, not automatically by the contract. This means users trust MedByClick to execute burns consistently. Accountability is maintained through:
- Monthly published burn reports with transaction hashes
- Total burned visible on BscScan (dead address balance)
- Community can verify burn transactions independently

### 5.3 Projected Burns (Conservative)

| Period | Est. Platform MBC Volume | Burned (2%) | Cumulative | Supply Effect |
|--------|-------------------------|-------------|------------|---------------|
| Year 1 | 500,000 MBC | 10,000 | 10,000 | -0.01% |
| Year 2 | 3,000,000 MBC | 60,000 | 70,000 | -0.07% |
| Year 3 | 10,000,000 MBC | 200,000 | 270,000 | -0.27% |
| Year 5 | 30,000,000 MBC | 600,000 | 1,070,000 | -1.07% |

**Assessment:** At early stage, burns are negligible as a supply-reduction mechanism. The burn serves primarily as a long-term structural commitment and a transparency signal. Material supply impact requires $1M+ annual MBC volume.

---

## 6. Rewards Economy

### 6.1 Reward Rates

| Action | MBC | USD Value (at $0.01) | Frequency |
|--------|-----|---------------------|-----------|
| Paid consultation completed | 50 | $0.50 | Per consultation |
| Verified review written | 25 | $0.25 | Per review |
| Successful referral | 100 | $1.00 | Per referred patient |
| Profile completion | 10 | $0.10 | One-time |
| MedEdu course completed | 30 | $0.30 | Per course |
| Specialist: monthly rating bonus | 200 | $2.00 | Monthly (4.5+ rating) |
| Specialist: content published | 50 | $0.50 | Per article |
| Specialist: peer case review | 100 | $1.00 | Per review |

### 6.2 Annual Budget from Rewards Allocation

| Year | Budget (MBC) | Est. Active Users | MBC/User | Budget Utilized |
|------|-------------|-------------------|----------|-----------------|
| 1 | 2,000,000 | 200 | 340 avg | 68,000 (3.4%) |
| 2 | 3,000,000 | 1,000 | 340 avg | 340,000 (11.3%) |
| 3 | 4,000,000 | 3,000 | 340 avg | 1,020,000 (25.5%) |
| 4 | 5,000,000 | 8,000 | 340 avg | 2,720,000 (54.4%) |
| 5 | 6,000,000 | 15,000 | 340 avg | 5,100,000 (85%) |

**Observation:** At projected growth rates, the 30M reward pool lasts well beyond 5 years. If growth exceeds projections, reward rates can be adjusted downward while maintaining meaningful incentives.

### 6.3 Reward Rate Adjustment Policy

- Rewards are denominated in MBC, not USD. If MBC price increases, the USD value of rewards increases automatically.
- If MBC price exceeds $0.10 (10x from launch), reward rates should be reviewed and potentially halved to extend the allocation runway.
- Rate changes require 30-day advance notice to the community.

---

## 7. Payment Flow Economics

### 7.1 Transaction Breakdown (Example: $500 Consultation)

**Patient pays with credit card (standard):**
```
Patient pays:         $500.00
Stripe fee (3.4%):   -$17.00
Platform receives:    $483.00
Specialist receives:  $483.00 × (1 - platform_fee%)
```

**Patient pays with MBC (5% discount):**
```
Patient pays:         $475.00 equivalent in MBC (47,500 MBC at $0.01)
Burn (2%):           -950 MBC burned (permanently destroyed)
Platform receives:    46,550 MBC
Swap to USDT:         ~$465.50 (after DEX slippage ~0.2%)
Specialist receives:  $465.50 × (1 - platform_fee%)
Processing cost:      $0.10 (BNB Chain gas)
```

**Platform economics comparison:**
```
Card payment:  Platform nets $483.00 (after Stripe fee)
MBC payment:   Platform nets $465.50 (after burn + swap)
Difference:    -$17.50 per MBC transaction (-3.6%)
```

**Assessment:** At $0.01/MBC, the platform subsidizes MBC payments by ~3.6% per transaction versus card payments. This subsidy comes from foregoing card processor revenue. At scale, this subsidy is offset by higher user retention, lower chargeback risk, and ecosystem fund appreciation.

### 7.2 Break-Even Analysis

MBC payments become revenue-neutral vs. card payments when:
```
Card processor fee (3.4%) = MBC discount (5%) - burn cost (2%)
3.4% ≈ 5% - 2% = 3%
```
Near break-even. The 0.4% gap is the effective marketing cost of MBC adoption — far cheaper than typical customer acquisition costs.

---

## 8. Anti-Whale Parameters

### 8.1 Current Settings

| Parameter | Value | At Launch Pool Size | Practical Impact |
|-----------|-------|-------------------|-----------------|
| Max transaction | 1,000,000 MBC (1% supply) | Pool has 500K MBC | Limit exceeds pool depth — effective limit is pool size |
| Max wallet | 3,000,000 MBC (3% supply) | 3M MBC = $30,000 | Prevents single wallet from accumulating >$30K |
| Cooldown | 30 seconds | N/A | Prevents bot spam |

### 8.2 Launch-Phase Reality

At launch, the anti-whale max transaction (1M MBC) exceeds the pool depth (500K MBC). This means:
- The pool itself limits maximum trade size, not the anti-whale
- The anti-whale becomes binding only after liquidity grows past $10K+ USDT side
- The cooldown (30s) is the most immediately useful protection against bots

### 8.3 Adjustment Timeline

| Trigger | Adjustment | Rationale |
|---------|-----------|-----------|
| Pool reaches $25K USDT | Consider reducing max tx to 0.5% | Pool depth now supports meaningful trades; tighter limits protect against manipulation |
| Pool reaches $50K USDT | Max wallet can increase to 5% | Sufficient depth that 5% holdings don't dominate |
| CoinGecko listing | Review all parameters | Market dynamics change with aggregator visibility |
| 500+ holders | Evaluate limit removal | Distribution may be broad enough to not need limits |
| CEX listing | Exempt CEX hot wallet addresses | CEX wallets need higher limits for order book operations |

---

## 9. Liquidity Growth Plan

### 9.1 Milestone-Based Additions

| # | Milestone | USDT Addition | MBC Addition | New Pool Depth | Source |
|---|-----------|-------------|-------------|---------------|--------|
| 1 | Launch | $5,000 | 500,000 | $10,000 total | Founder capital |
| 2 | 100 holders | $2,500 | At market price | ~$15,000 | Platform revenue |
| 3 | CoinGecko listing | $5,000 | At market price | ~$25,000 | Ecosystem Fund |
| 4 | $10K MBC platform payments | $5,000 | At market price | ~$35,000 | Platform revenue |
| 5 | CMC listing | $5,000 | At market price | ~$45,000 | Ecosystem Fund |
| 6 | 500 holders | $5,000 | At market price | ~$55,000 | Ecosystem Fund |
| 7 | Ethereum launch (Phase 3) | $10,000 | From Future Liquidity | Separate pool | Future Liquidity alloc |

### 9.2 Liquidity Policy

- All liquidity additions are announced 48 hours in advance
- LP tokens for each addition are locked for 12 months
- No liquidity is withdrawn unless the full 12-month lock expires AND multisig approves
- Liquidity is NEVER funded by selling team tokens
- Each addition is documented with transaction hash and published

---

## 10. Token Velocity Model

### 10.1 Velocity Definition

Token velocity = total transaction volume / average token holdings. High velocity means tokens change hands quickly (low holding incentive). Low velocity means tokens are held (strong holding incentive).

### 10.2 MBC Velocity Sinks

| Sink | Mechanism | MBC Locked | Active From |
|------|-----------|-----------|-------------|
| **Tier requirements** | Users hold 500-10K MBC for premium features | Variable per user | Launch |
| **Subscription** | 500 MBC/month for MedByClick Pro | 500/user/month | Phase 3 |
| **Specialist holdings** | Specialists hold MBC earned through bonuses | Variable | Phase 2 |
| **Governance** | Need MBC to vote (100+) and propose (500+) | 100-500/voter | Phase 3 |
| **LP lockup** | Team LP tokens locked | 5,000,000 | Launch |
| **Team vesting** | Team tokens locked 12-48 months | 15,000,000 | Launch |
| **Reserve lock** | Emergency fund locked 12 months | 10,000,000 | Launch |

### 10.3 Year 1 Velocity Estimate

```
Circulating supply (avg Year 1): ~8,000,000 MBC
Annual MBC transaction volume: ~1,500,000 MBC (payments + rewards + trades)
Velocity = 1,500,000 / 8,000,000 = 0.19

For comparison:
  ETH velocity: ~3-5
  Most utility tokens: ~5-20
  MBC Year 1 estimate: ~0.2 (low velocity due to locked supply)
```

**Caveat:** Low Year 1 velocity is largely structural (most supply is locked). As locks expire and circulating supply grows, velocity will increase. The key question is whether utility sinks (tiers, subscriptions, governance) grow fast enough to absorb new circulating tokens. This depends on platform adoption.

---

## 11. Treasury Economics

### 11.1 Treasury Composition at Launch

| Wallet | Asset | Amount | Lock Status |
|--------|-------|--------|-------------|
| DEX Pool | MBC + USDT | 500K MBC + $5K USDT | LP locked 12mo |
| Ecosystem Fund | MBC | 25,000,000 MBC | Locked 6 months |
| Team & Advisors | MBC | 15,000,000 MBC | Cliff 12mo |
| Rewards Pool | MBC | 30,000,000 MBC | Distributed as earned |
| Operational Reserve | MBC | 10,000,000 MBC | Locked 12 months |
| Future Liquidity | MBC | 5,000,000 MBC | Locked until Phase 3 |
| Community Airdrop | MBC | 10,000,000 MBC | 6-month distribution |
| Remaining DEX Liquidity | MBC | 4,500,000 MBC | For phased pool growth |
| Operations Wallet | USDT/BNB | Variable | Day-to-day platform costs |

### 11.2 Spending Authority

| Budget | Controller | Limit | Reporting |
|--------|-----------|-------|-----------|
| Ecosystem Fund | 2-of-3 multisig | 2M MBC/quarter max | Quarterly public report |
| Operational Reserve | 2-of-3 multisig | 1M MBC/quarter max | Each use disclosed within 48h |
| Rewards Pool | Automated + multisig | Per annual budget (Section 6.2) | Monthly distribution report |
| Future Liquidity | 2-of-3 multisig | Released at Phase 3 | Announced 14 days in advance |

### 11.3 Concentration Risk

Team and team-influenced wallets control:
```
Team & Advisors:       15,000,000 MBC (15%) — vested
Ecosystem Fund:        25,000,000 MBC (25%) — milestone-gated
Operational Reserve:   10,000,000 MBC (10%) — locked + multisig

Total team-influenced: 50,000,000 MBC (50% of supply)
```

**Mitigation:**
- All team tokens are vested (12-month cliff)
- Ecosystem spending requires documented milestones
- Reserve requires multisig + public disclosure
- Monthly wallet balance reporting
- External advisory signer on multisig provides independent oversight
- Team token sales require 7-day advance notice

---

## 12. Unit Economics

### 12.1 Per-Patient MBC Economics (Year 1)

```
Average patient journey:
  3 consultations/year × $500 = $1,500 total spending

If patient pays with MBC (5% discount):
  Patient spends: $1,425 in MBC (142,500 MBC at $0.01)
  Patient saves: $75/year
  Platform receives: 142,500 MBC
  Burned: 2,850 MBC (2%)
  Net to platform: 139,650 MBC → ~$1,396.50 USDT after DEX swap

MBC rewards earned by patient:
  3 consultations × 50 MBC = 150 MBC
  2 reviews × 25 MBC = 50 MBC
  1 referral × 100 MBC = 100 MBC
  Profile completion = 10 MBC
  Total: 310 MBC earned ($3.10 at launch price)

Patient's MBC cost/benefit:
  Savings from discount: $75.00
  Rewards earned: $3.10
  Total benefit: $78.10/year
  Cost of learning crypto: Non-trivial (barrier to adoption)
```

### 12.2 Token Demand per Active User

```
Per active user per year:
  MBC purchased for payments: ~142,500 MBC
  MBC earned through rewards: ~310 MBC
  MBC needed for Silver tier: 500 MBC (one-time)
  
  Net annual demand per user: ~142,500 MBC purchased
  Net annual supply per user: ~310 MBC distributed as rewards
```

### 12.3 Break-Even User Count for Pool Depth

```
For $5K pool to be adequate (< 5% slippage on avg transaction):
  Average MBC payment: $200 equivalent (20,000 MBC)
  $200 in $5K pool = ~4% slippage
  Acceptable for early stage

For $50K pool target (< 1% slippage on avg transaction):
  Need to reach: Milestone 5-6 in Liquidity Growth Plan
  Estimated timeline: 6-12 months post-launch
```

---

## 13. Supply Control Mechanisms

### 13.1 Complete Supply Control Overview

| Mechanism | Type | Effect | Active From | Controllable |
|-----------|------|--------|-------------|-------------|
| Fixed supply (100M) | Structural | No inflation possible | Genesis | No (permanent) |
| Burn (2% per payment) | Deflationary | Reduces total supply | Launch | Rate adjustable by multisig |
| Team vesting | Lock | 15M locked 12-48 months | Launch | No (smart contract enforced) |
| Ecosystem lock | Lock | 25M locked 6+ months | Launch | Release requires multisig |
| Reserve lock | Lock | 10M locked 12+ months | Launch | Release requires multisig |
| LP lock | Lock | LP tokens locked 12 months | Launch | No (Team.Finance enforced) |
| Future liquidity lock | Lock | 5M locked until Phase 3 | Launch | Release requires multisig |
| Anti-whale (max tx) | Circulation limit | Max 1% per transaction | Launch | Adjustable by multisig |
| Anti-whale (max wallet) | Concentration limit | Max 3% per wallet | Launch | Adjustable by multisig |
| Anti-whale (cooldown) | Velocity limit | 30s between transactions | Launch | Adjustable by multisig |
| Tier holding | Demand sink | Users hold for features | Launch | Tier thresholds adjustable |
| Subscription | Demand sink | Monthly MBC burn/spend | Phase 3 | Rate adjustable |

### 13.2 What the Team CANNOT Do

- **Cannot mint new tokens:** No mint function exists in the contract
- **Cannot unlock team tokens early:** Vesting is time-locked
- **Cannot withdraw locked LP:** Team.Finance enforces lock period
- **Cannot spend reserve without disclosure:** Multisig + 48h public notice required

### 13.3 What the Team CAN Do (Transparency)

- **Pause/unpause transfers:** Emergency use (requires multisig)
- **Adjust anti-whale limits:** Can increase, decrease, or remove (requires multisig + notice)
- **Add exempt addresses:** For partners, DEXes (requires multisig)
- **Release ecosystem funds:** After 6-month lock, with milestone documentation
- **Adjust reward rates:** With 30-day advance notice

---

## 14. Launch Checklist

### Pre-Launch (Complete Before Deploy)

- [x] Smart contract development (Solidity 0.8.20, OpenZeppelin v5.1)
- [x] Anti-whale protection (maxTx, maxWallet, cooldown)
- [x] Testnet deployment and functional verification (Ethereum Sepolia)
- [ ] BNB Chain testnet deployment
- [ ] Internal security review (reentrancy, access control, overflow)
- [ ] Gnosis Safe multisig creation (2-of-3)
- [ ] Hardware wallets for all signers
- [ ] Whitepaper v3 published on website
- [ ] Tokenomics v3 published on website
- [ ] Community channels created (Telegram, Discord, Twitter)
- [ ] $5,000 USDT prepared for liquidity

### Launch Day

- [ ] Deploy MBC on BNB Chain mainnet
- [ ] Verify contract source code on BscScan
- [ ] Transfer ownership to Gnosis Safe multisig
- [ ] Create PancakeSwap pool (500,000 MBC + $5,000 USDT)
- [ ] Lock LP tokens (12 months, Team.Finance)
- [ ] Publish contract address on website and social channels
- [ ] Announcement on all channels

### Post-Launch (Week 1-4)

- [ ] Apply CoinGecko listing (contract + pair info)
- [ ] Apply CoinMarketCap listing (supply API endpoint)
- [ ] Enable MBC payment option on MedByClick platform
- [ ] Begin community airdrop (first batch: 1,000,000 MBC)
- [ ] Set up monitoring (Tenderly or equivalent)
- [ ] First weekly community update

### Post-Launch (Month 2-3)

- [ ] Security audit engagement
- [ ] Bug bounty program launch
- [ ] First MBC payments on platform
- [ ] First burn report published
- [ ] Reward distribution begins
- [ ] Liquidity assessment vs. milestones

---

## 15. Key Performance Indicators

### 15.1 Operational KPIs

| KPI | Month 1 | Month 3 | Month 6 | Year 1 |
|-----|---------|---------|---------|--------|
| Unique MBC holders | 50 | 200 | 500 | 2,000 |
| Daily on-chain transactions | 5 | 20 | 50 | 150 |
| Platform MBC payment volume | $500 | $5,000 | $15,000 | $50,000 |
| Pool liquidity (USDT side) | $5,000 | $7,500 | $15,000 | $50,000 |
| MBC burned (cumulative) | 200 | 2,000 | 6,000 | 20,000 |
| Active rewards recipients | 10 | 50 | 150 | 500 |
| Specialists in MBC program | 2 | 5 | 10 | 20 |

### 15.2 Health Metrics (Red Flags to Monitor)

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Top 10 wallet concentration | <30% circulating | 30-50% | >50% |
| Daily unique buyers vs. sellers | >0.5 ratio | 0.3-0.5 | <0.3 |
| 24h trading volume vs. liquidity | <20% of pool | 20-50% | >50% |
| Time between burns | <30 days | 30-60 days | >60 days |
| Rewards distributed vs. budget | <80% of annual | 80-100% | >100% |

---

## 16. Scenario Analysis

### 16.1 Conservative Scenario (Slow Adoption)

```
Assumptions:
  Year 1 active users: 100
  Year 1 MBC payment volume: $20,000
  No CoinGecko listing in Year 1
  Pool stays at ~$10K

Outcome:
  Circulating: ~12M MBC
  Burned: ~4,000 MBC
  Holder count: ~500
  Status: Token exists but limited utility. Pivot or double down on platform growth.
```

### 16.2 Base Scenario (Steady Growth)

```
Assumptions:
  Year 1 active users: 500
  Year 1 MBC payment volume: $50,000
  CoinGecko listed by Month 4
  Pool grows to $50K

Outcome:
  Circulating: ~14M MBC
  Burned: ~20,000 MBC
  Holder count: ~2,000
  Status: Healthy early-stage token with real utility. Ready for Phase 3.
```

### 16.3 Optimistic Scenario (Strong Adoption)

```
Assumptions:
  Year 1 active users: 2,000
  Year 1 MBC payment volume: $200,000
  CoinGecko + CMC listed
  Pool grows to $100K+

Outcome:
  Circulating: ~14M MBC (same — supply schedule is fixed)
  Burned: ~80,000 MBC
  Holder count: ~5,000+
  Status: Strong demand against limited supply. Phase 3 acceleration warranted.
```

**Note:** These scenarios describe operational outcomes, not price predictions. Token price is a function of market dynamics and cannot be reliably predicted.

---

## 17. Risk Matrix

| # | Risk | Probability | Impact | Severity | Mitigation |
|---|------|------------|--------|----------|------------|
| 1 | Low platform adoption | Medium | High | **Critical** | Focus on platform product-market fit. MBC is supplementary, not prerequisite. |
| 2 | Smart contract vulnerability | Low | Critical | **Critical** | OpenZeppelin base, security audit, bug bounty, incident response plan |
| 3 | Regulatory reclassification | Low | High | **High** | No investment language, legal opinion, MiCA-compliant whitepaper |
| 4 | Key person dependency | Medium | High | **High** | Multisig with external signer, documentation, advisory board |
| 5 | Thin liquidity / high slippage | High | Medium | **High** | Milestone-based growth plan, clear communication about early-stage |
| 6 | Token concentration (team 50%) | Medium | Medium | **Medium** | Vesting, milestone-gating, monthly disclosure, independent oversight |
| 7 | Bridge hack (Phase 3) | Low | High | **Medium** | Deferred to Phase 3, use established bridge protocol, audit |
| 8 | DEX dependency (PancakeSwap) | Low | Medium | **Medium** | Multi-DEX planned, Uniswap in Phase 3 |
| 9 | User friction (crypto learning curve) | High | Medium | **Medium** | Fiat-to-MBC onramp (Phase 3), simplified wallet integration |
| 10 | Competitor token launch | Low | Low | **Low** | Focus on operational platform with real specialists, not just token |

---

## Appendix: Changes from v2 to v3

| Section | Change | Reason |
|---------|--------|--------|
| Discount | 15% → 5% base (+ up to 10% promo) | v2 discount exceeded processor savings — math didn't work |
| Distribution | Liquidity split: 10% → 5% DEX + 5% Future | v2 had 10M allocated but only 500K used — gap unexplained |
| Distribution | "Community Sale" → "Community Airdrop" | "Sale" creates security token risk |
| Burns | Added implementation detail (off-chain trigger) | v2 implied automatic burns but contract doesn't have them |
| Anti-whale | Added launch-phase reality check | v2 limits exceed pool depth — acknowledged |
| Payment flow | NEW section: full settlement flow | v2 didn't explain how MBC reaches specialists |
| Token velocity | NEW section: velocity analysis | v2 didn't address velocity problem |
| Unit economics | NEW section: per-patient math | v2 had no cost/benefit analysis |
| Supply control | NEW section: comprehensive view | v2 scattered supply info across sections |
| Scenarios | Removed price predictions | v2 had $0.50-$5.00 projections — inappropriate for utility token |
| Scenarios | Added operational scenarios | Focus on adoption metrics, not price |
| Risk matrix | Expanded from 5 to 10 risks | v2 risk section was superficial |

---

*This document reflects the pre-launch stage of MedByClick and MBC token. All projections are estimates based on assumptions about platform growth. Actual results will depend on platform adoption, market conditions, and the regulatory environment. MBC is a utility token with no guaranteed value. Users should acquire MBC only for platform utility, not as an investment.*
