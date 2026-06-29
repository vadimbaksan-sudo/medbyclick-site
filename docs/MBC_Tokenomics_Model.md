# MBC Tokenomics Model

## Early-Stage Launch Economics

**Version:** 2.0
**Date:** June 2025

---

## 1. Launch Parameters

```
Total Supply:        100,000,000 MBC (fixed, non-mintable)
Launch Network:      BNB Chain (BEP-20)
Launch DEX:          PancakeSwap v2
Launch Price:        $0.01 USD per MBC
Initial Liquidity:   500,000 MBC + $5,000 USDT
Fully Diluted Cap:   $1,000,000 (at launch price)
```

---

## 2. Initial Liquidity Calculation

### PancakeSwap AMM Pool Setup

PancakeSwap uses the constant product formula: `x * y = k`

```
Target price:     $0.01/MBC
USDT to deposit:  $5,000

Calculation:
  price = USDT_amount / MBC_amount
  $0.01 = $5,000 / MBC_amount
  MBC_amount = $5,000 / $0.01 = 500,000 MBC

Pool composition:
  500,000 MBC + 5,000 USDT
  k = 500,000 × 5,000 = 2,500,000,000
```

### Price Impact at Various Buy Sizes

| Buy Amount (USDT) | MBC Received | New Price After | Price Impact |
|-------------------|-------------|-----------------|--------------|
| $10 | 995 MBC | $0.01002 | +0.2% |
| $50 | 4,950 MBC | $0.01010 | +1.0% |
| $100 | 9,804 MBC | $0.01020 | +2.0% |
| $500 | 47,619 MBC | $0.01105 | +10.5% |
| $1,000 | 83,333 MBC | $0.01250 | +25.0% |
| $2,500 | 166,667 MBC | $0.01800 | +80.0% |

### Why $5,000 Liquidity

- **Appropriate for stage:** MedByClick is a pre-revenue startup. Committing $5K is realistic and responsible.
- **Reasonable price stability:** A $100 purchase moves price ~2% — acceptable for early trading.
- **Honest signal:** Large initial liquidity from a pre-revenue project would be misleading about project maturity.
- **Growth path:** As platform generates revenue, additional liquidity can be added from operations.
- **LP locked:** LP tokens will be locked for 12 months, proving commitment without overcommitting capital.

---

## 3. Token Distribution

### Allocation Breakdown

| Allocation | MBC | % | At Launch Price | Release |
|-----------|-----|---|----------------|---------|
| Platform Rewards | 30,000,000 | 30% | $300,000 | Activity-based over 5+ years |
| Ecosystem Development | 25,000,000 | 25% | $250,000 | Locked 6 mo, then as needed |
| Team & Advisors | 15,000,000 | 15% | $150,000 | 12-mo cliff + 36-mo vesting |
| Initial Liquidity | 10,000,000 | 10% | $100,000 | In DEX pools, LP locked 12 mo |
| Community Distribution | 10,000,000 | 10% | $100,000 | Over first 3 months |
| Reserve | 10,000,000 | 10% | $100,000 | Locked 12 mo, multisig |

### Circulating Supply at Launch

```
Day 1 circulating:
  Liquidity pool:          500,000 MBC (from Initial Liquidity)
  Community (first batch):  1,000,000 MBC
                           ─────────────
  Total:                   1,500,000 MBC (1.5% of supply)
  Circulating cap:         $15,000

Month 1:   ~4,000,000 MBC circulating (4%)
Month 3:   ~12,000,000 MBC circulating (12%)
Month 6:   ~16,000,000 MBC circulating (16%)
Year 1:    ~22,000,000 MBC circulating (22%)
Year 2:    ~40,000,000 MBC circulating (40%)
Year 3:    ~60,000,000 MBC circulating (60%)
Year 5:    ~100,000,000 MBC fully circulating
```

### Why This Distribution Works for a Utility Token

1. **No large TGE unlock** — only 1.5% at launch prevents immediate sell pressure
2. **Rewards are the largest allocation** — the biggest portion goes to actual platform users, not early investors
3. **Team has long vesting** — 12-month cliff means team earns nothing for the first year unless they build
4. **Reserve is locked** — cannot be dumped; requires multisig approval after 12 months
5. **No "investor" allocation** — there is no VC/presale/private sale bucket, reinforcing utility-first positioning

---

## 4. Burn Mechanics

### Transaction Burn
- **2% of MBC used for platform payments is burned**
- Tokens sent to `0x000...dead` address (verifiable on-chain)
- Permanently reduces total supply

### Burn Projections (Conservative)

Based on platform payment volume growing organically:

| Period | Platform MBC Payments | Burned (2%) | Cumulative Burned | Supply Reduction |
|--------|----------------------|-------------|-------------------|-----------------|
| Year 1 | 1,000,000 MBC | 20,000 MBC | 20,000 | 0.02% |
| Year 2 | 5,000,000 MBC | 100,000 MBC | 120,000 | 0.12% |
| Year 3 | 15,000,000 MBC | 300,000 MBC | 420,000 | 0.42% |

Burn rate is intentionally modest at early stages. Impact becomes meaningful as platform scales.

---

## 5. Rewards Distribution Model

### Annual Rewards Budget

From the 30,000,000 MBC rewards allocation:

| Year | Budget | Rationale |
|------|--------|-----------|
| 1 | 2,000,000 MBC | Bootstrap — incentivize first 500 users |
| 2 | 3,000,000 MBC | Growth — reward expanding user base |
| 3 | 4,000,000 MBC | Scale — larger user base, more activity |
| 4 | 5,000,000 MBC | Maturity |
| 5+ | Remaining | Adjusted based on platform needs |

### Rewards Per User (Year 1 Estimates)

Assuming 200 active users in Year 1:

```
Average user actions per year:
  3 consultations × 50 MBC    = 150 MBC
  2 reviews × 25 MBC          = 50 MBC
  1 referral × 100 MBC        = 100 MBC
  Profile completion           = 10 MBC
  1 course × 30 MBC           = 30 MBC
                                ────────
  Average per user:            340 MBC/year ($3.40 at launch price)

200 users × 340 MBC = 68,000 MBC used from rewards budget
```

This leaves substantial runway in the rewards allocation.

---

## 6. Anti-Whale Protection

### Smart Contract Parameters

| Parameter | Value | Why |
|-----------|-------|-----|
| Max transaction | 1,000,000 MBC (1%) | With $5K pool, a 1M MBC sell would crash price ~67%. Limit prevents this. |
| Max wallet | 3,000,000 MBC (3%) | Prevents any single address from controlling >3% of supply |
| Cooldown | 30 seconds | Prevents rapid-fire bot trading that exploits thin liquidity |

### Exempt Addresses
- Contract owner (multisig) — for operational distribution
- PancakeSwap pool address — for DEX operations
- Verified partner wallets — added as needed via `setExempt()`

### Adjustment Policy
- Limits stay in place until at least $50K liquidity depth
- Max wallet increases to 5% after CoinGecko/CMC listing
- Limits can be fully removed once top 20 wallets hold <40% of circulating supply

---

## 7. Liquidity Growth Plan

Liquidity increases should follow real milestones, not arbitrary targets:

| Milestone | Action | Pool Target |
|-----------|--------|-------------|
| Launch | Seed pool: 500K MBC + $5K USDT | $10K total liquidity |
| 100 token holders | Add $2,500 USDT + equivalent MBC | $15K total |
| CoinGecko listing | Add $5,000 USDT + equivalent MBC | $25K total |
| First $10K in MBC platform payments | Add $5,000 from platform revenue | $35K total |
| CoinMarketCap listing | Evaluate adding more from ecosystem fund | $50K+ total |
| Ethereum expansion | Seed Uniswap pool from ecosystem fund | Separate pool |

Each liquidity addition uses either:
- Platform revenue (organic)
- Ecosystem Development allocation (planned)

Never from selling team tokens or raising prices artificially.

---

## 8. Launch Checklist

### Pre-Launch
- [x] Smart contract development (Solidity, OpenZeppelin)
- [x] Anti-whale protection implementation
- [x] Testnet deployment (Ethereum Sepolia)
- [ ] BNB Chain testnet deployment
- [ ] Security review (internal + community)
- [ ] Contract ownership transfer to multisig (Gnosis Safe)

### Launch Day
- [ ] Deploy MBC on BNB Chain mainnet
- [ ] Create PancakeSwap pool (500,000 MBC + $5,000 USDT)
- [ ] Lock LP tokens (12 months, Team.Finance)
- [ ] Publish contract address on website
- [ ] Announce on platform and social channels

### Post-Launch (Week 1-4)
- [ ] Apply for CoinGecko listing
- [ ] Apply for CoinMarketCap listing
- [ ] Enable MBC payment option on MedByClick platform
- [ ] Begin loyalty rewards distribution
- [ ] Monitor pool health and trading activity

### Growth (Month 2-6)
- [ ] First 100 MBC-paying patients
- [ ] First burn event
- [ ] Community Telegram/Discord launch
- [ ] Additional liquidity from platform revenue
- [ ] Partner clinic onboarding (MBC acceptance)

---

## 9. Key Metrics to Track

| Metric | Month 1 | Month 6 | Year 1 |
|--------|---------|---------|--------|
| Unique MBC holders | 50 | 500 | 2,000 |
| Daily transactions | 5 | 50 | 200 |
| Pool liquidity (USDT side) | $5,000 | $15,000 | $50,000 |
| MBC burned (cumulative) | 500 | 5,000 | 20,000 |
| Platform payments in MBC | $500 | $10,000 | $50,000 |
| CoinGecko listed | No | Yes | Yes |
| CoinMarketCap listed | No | Applying | Yes |

---

## 10. Risk Factors

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low platform adoption | Low MBC demand | Focus on platform product-market fit first |
| Thin liquidity | High price volatility | Gradual liquidity growth tied to milestones |
| Regulatory changes | May need to adjust token model | Legal review, utility-only positioning |
| Smart contract bug | Loss of funds | OpenZeppelin base, planned security review |
| Team selling | Price pressure | 12-month cliff + 36-month vesting |

---

*This model reflects the current pre-launch stage of MedByClick. All projections are estimates based on assumptions about platform growth. Actual results will depend on platform adoption, market conditions, and regulatory environment. MBC is a utility token with no guaranteed value.*
