# MBC Token Whitepaper

## MedByClick Utility Token

**Version:** 3.0
**Date:** June 2025
**Status:** Pre-launch
**Issuing Entity:** MedByClick Ltd. (Israel)
**Contact:** compliance@medbyclick.com

---

## Table of Contents

1. [Plain-Language Summary](#1-plain-language-summary)
2. [Platform Overview](#2-platform-overview)
3. [Problem Statement](#3-problem-statement)
4. [Token Overview](#4-token-overview)
5. [Token Utility](#5-token-utility)
6. [Payment Settlement Flow](#6-payment-settlement-flow)
7. [Token Economics](#7-token-economics)
8. [Vesting Schedule](#8-vesting-schedule)
9. [Token Lifecycle](#9-token-lifecycle)
10. [Token Velocity Analysis](#10-token-velocity-analysis)
11. [Governance](#11-governance)
12. [Treasury Management](#12-treasury-management)
13. [Technical Architecture](#13-technical-architecture)
14. [Security and Audit Plan](#14-security-and-audit-plan)
15. [Multisig Policy](#15-multisig-policy)
16. [Bridge Strategy](#16-bridge-strategy)
17. [Market Analysis](#17-market-analysis)
18. [Roadmap](#18-roadmap)
19. [Listing Strategy](#19-listing-strategy)
20. [Regulatory Compliance](#20-regulatory-compliance)
21. [Risk Factors](#21-risk-factors)
22. [Team](#22-team)
23. [Conclusion](#23-conclusion)
24. [Legal Disclaimers](#24-legal-disclaimers)

---

## 1. Plain-Language Summary

MBC is a digital token used on the MedByClick telemedicine platform. Patients can use MBC to pay for medical consultations at a discount, earn MBC through platform activity, and access premium features. MBC operates on the BNB Chain blockchain, which allows fast and inexpensive transactions.

MBC does not represent ownership in MedByClick, does not pay dividends, and has no guaranteed value. Its price may go up, down, or to zero. Users should only acquire MBC to use MedByClick platform services.

---

## 2. Platform Overview

MedByClick is a curated telemedicine marketplace specializing in complex and rare medical cases. The platform connects patients worldwide with 40+ personally vetted medical specialists across multiple countries and specializations.

**Current platform capabilities (13 modules):**
- Specialist discovery and booking
- Video consultations
- Case review and second opinions
- Care coordination across providers
- Medical record management
- Patient education (MedEdu)
- Payment processing
- Loyalty and rewards program
- Community features

**Platform metrics (as of June 2025):**
- 40+ vetted specialists
- 13 functional modules
- 21 web pages deployed
- Pre-revenue stage

---

## 3. Problem Statement

### 3.1 Pain Points in Cross-Border Telemedicine Payments

| Problem | Impact | Current Solutions | Limitation |
|---------|--------|------------------|------------|
| High cross-border fees | 3-7% per transaction in processing + FX costs | International cards, PayPal | Fees eat into patient budgets |
| Payment delays | 3-7 day settlement for bank transfers | Wire transfers, SWIFT | Delays care coordination |
| No loyalty mechanism | Zero incentive for repeat engagement | Generic loyalty apps | Not integrated with payments |
| Access barriers | Patients in emerging markets lack international payment options | Local payment methods | Fragmented, inconsistent |
| No patient voice | Users cannot influence platform development | Feedback forms | Non-binding, low engagement |

### 3.2 Why a Platform-Specific Token

A platform-specific utility token solves these problems in ways that generic cryptocurrencies (USDT, USDC) and traditional payment methods cannot:

1. **Discount mechanism:** Platform can offer MBC payment discounts because it avoids card processor fees (3-5%) and can subsidize adoption from the Ecosystem Fund
2. **Programmable loyalty:** Reward distribution is automated via smart contract rules, not manual processes
3. **Tiered access:** Token holdings unlock platform features directly, creating a native access control layer
4. **Two-sided incentives:** Both patients and specialists are incentivized within the same token economy
5. **Transparent governance:** On-chain voting provides verifiable, auditable decision-making

**What MBC does NOT aim to replace:** MBC is not a general-purpose currency or a stablecoin. It is designed exclusively for use within the MedByClick ecosystem. Patients who prefer traditional payments can always pay with credit cards or bank transfers at standard prices.

---

## 4. Token Overview

| Parameter | Value |
|-----------|-------|
| Name | MedByClick Token |
| Symbol | MBC |
| Standard | BEP-20 (BNB Chain) / ERC-20 (Ethereum, future) |
| Total Supply | 100,000,000 MBC |
| Mintable | No — supply is permanently fixed at contract deployment |
| Decimals | 18 |
| Launch Network | BNB Chain |
| Launch DEX | PancakeSwap v2 |
| Initial Listing Price | $0.01 USD |
| Smart Contract | OpenZeppelin v5.1 (ERC20 + ERC20Burnable + Ownable) |
| Compiler | Solidity 0.8.20, optimizer enabled (200 runs) |
| Anti-Whale | Max 1% per tx, max 3% per wallet, 30s cooldown |

---

## 5. Token Utility

MBC utility is designed to create organic demand through platform usage. Each mechanism below describes a concrete reason for users to acquire, hold, or spend MBC within the MedByClick ecosystem.

### 5.1 Service Payment Discount

Patients who pay with MBC receive a **5% discount** on platform services.

| Service | Standard Price | MBC Price | Savings |
|---------|---------------|-----------|---------|
| Specialist Consultation | $500 | $475 | $25 |
| Case Review | $200 | $190 | $10 |
| Second Opinion | $350 | $332.50 | $17.50 |
| Care Coordination | $150 | $142.50 | $7.50 |

**How the discount is funded:** The platform saves 3-5% on card processing fees when patients pay in MBC (no Stripe/PayPal fees). This saving is passed directly to the patient as a 5% discount. No additional subsidy is required — the discount is economically self-sustaining.

In the early growth phase, the platform may offer a temporary enhanced discount of up to 10% for first-time MBC payments, subsidized from the Ecosystem Fund. This promotional rate will be clearly communicated as time-limited.

### 5.2 Membership Tiers

Active MBC balance unlocks premium platform features:

| Tier | MBC Required | Features Unlocked |
|------|-------------|-------------------|
| **Standard** | 0 | Base platform access, standard scheduling |
| **Silver** | 500 MBC | Priority scheduling (24h vs. 72h), encrypted document vault |
| **Gold** | 2,000 MBC | Dedicated care coordinator, extended consultations (+15 min), direct specialist messaging |
| **Platinum** | 10,000 MBC | 24/7 direct line, annual comprehensive health review, AI case summaries in native language |

Tier status is determined by the user's current MBC wallet balance. Tiers provide access to platform features — they are not a reward for holding tokens.

### 5.3 Loyalty Rewards

Users earn MBC through verifiable platform activity:

| Action | MBC Earned | Verification |
|--------|-----------|-------------|
| Complete a paid consultation | 50 MBC | Payment confirmed on-chain or via processor |
| Write a verified review | 25 MBC | Review passes moderation |
| Refer a patient who completes booking | 100 MBC | Referred patient's first payment confirmed |
| Complete patient profile | 10 MBC | One-time, all fields verified |
| Complete a MedEdu course | 30 MBC | Course completion certificate issued |

Annual rewards budget: 2,000,000 MBC (Year 1), sourced from the Platform Rewards allocation. Budget adjusts annually based on platform activity and remaining allocation.

### 5.4 Specialist Incentive Program

Specialists earn MBC for platform contributions:

| Action | MBC Earned | Purpose |
|--------|-----------|---------|
| Maintaining 4.5+ patient rating | 200 MBC/month | Reward quality care |
| Publishing educational content | 50 MBC/article | Build knowledge base |
| Complex case peer review | 100 MBC/review | Encourage collaboration |
| Accepting MBC payments | 5% bonus on MBC amount | Increase MBC utility |

Specialists may hold MBC for tier benefits or convert to USDT/fiat via the DEX.

### 5.5 Data Contribution Rewards

Patients who opt-in to anonymized health data sharing for medical research earn MBC:

| Action | MBC Earned | Privacy |
|--------|-----------|---------|
| Anonymous health survey | 20 MBC | Fully anonymized, no PII |
| Clinical trial matching (opt-in) | 50 MBC | Patient consent required |
| Treatment outcome feedback | 30 MBC | Aggregated statistics only |

All data handling is GDPR and HIPAA compliant. Participation is strictly voluntary and revocable.

### 5.6 Subscription Access (Planned — Phase 3)

MedByClick Pro monthly subscription payable in MBC:

- **Cost:** 500 MBC/month
- **Includes:** Unlimited specialist messaging, priority booking, monthly case review, educational content library
- **Purpose:** Creates recurring monthly MBC demand independent of individual transactions

### 5.7 B2B Settlement (Planned — Phase 4)

Partner clinics settle inter-clinic referral fees in MBC:

- Referring clinic receives MBC for successful referrals
- Receiving clinic pays referral fee in MBC
- Creates institutional demand for MBC beyond retail patients

---

## 6. Payment Settlement Flow

This section describes how MBC payments flow through the system from patient to specialist.

```
Patient Journey:
  1. Patient selects "Pay with MBC" at checkout
  2. Platform displays MBC amount (based on current DEX price + 60-second price lock)
  3. Patient approves transfer from their wallet
  4. Smart contract transfers MBC to platform payment wallet

Platform Processing:
  5. Platform receives MBC
  6. 2% is sent to burn address (0x000...dead) — permanent supply reduction
  7. Remaining 98% is converted to USDT via PancakeSwap (or held if specialist opts for MBC)

Specialist Settlement:
  8a. Default: Specialist receives USDT equivalent (minus platform fee) via bank transfer or stablecoin
  8b. Opt-in: Specialist receives MBC directly (with 5% bonus) to their wallet

Price Oracle:
  - MBC/USDT price is sourced from PancakeSwap pool at time of checkout
  - 60-second price lock protects patient from slippage during payment
  - If price moves >5% during lock period, patient is asked to reconfirm
```

**Trust assumption:** The platform operates the payment processing service. Patients trust MedByClick to execute the conversion and settle with specialists. This is equivalent to the trust placed in any payment processor (Stripe, PayPal). Full transaction records are available on-chain for audit.

---

## 7. Token Economics

### 7.1 Supply Distribution

**Total Supply: 100,000,000 MBC (fixed, non-mintable)**

| Allocation | % | MBC | Purpose | Release |
|-----------|---|-----|---------|---------|
| Platform Rewards | 30% | 30,000,000 | User loyalty, specialist bonuses | Activity-based over 5+ years |
| Ecosystem Development | 25% | 25,000,000 | Partnerships, integrations, grants | 6-month lock, then milestone-based |
| Team & Advisors | 15% | 15,000,000 | Team compensation | 12-month cliff + 36-month linear |
| DEX Liquidity | 5% | 5,000,000 | PancakeSwap pool seeding | LP tokens locked 12 months |
| Community Airdrop | 10% | 10,000,000 | Platform user distribution | Usage-based over 6 months |
| Operational Reserve | 10% | 10,000,000 | Emergency fund, future needs | 12-month lock, multisig |
| Future Liquidity | 5% | 5,000,000 | Ethereum/additional pools | Locked until Phase 3 |

### 7.2 Distribution Rationale

- **30% rewards** — largest single allocation ensures 5+ years of user incentive runway. Rewards are the primary token distribution mechanism, emphasizing utility over speculation.
- **25% ecosystem** — funds real integrations with clinics, insurance partners, and health systems. Milestone-gated: each release requires board approval documenting the specific partnership or integration funded.
- **15% team** — industry standard. Long vesting (12-month cliff + 36-month linear) aligns team incentives with project longevity. Team cannot access any tokens for the first 12 months.
- **5% DEX liquidity** — 500,000 MBC used at launch for PancakeSwap pool, remainder added in phases as pool depth grows. All LP tokens locked for 12 months.
- **10% community airdrop** — distributed to verified platform users (requires completed profile + at least one platform interaction). NOT a token sale. No payment required.
- **10% reserve** — emergency fund. 12-month lock, requires 2-of-3 multisig approval. Spending requires public disclosure of purpose.
- **5% future liquidity** — reserved for Ethereum Uniswap pool (Phase 3) and potential additional trading pairs.

### 7.3 Initial DEX Listing

**Platform:** PancakeSwap v2 (BNB Chain)
**Pair:** MBC/USDT

```
Initial Pool Composition:
  500,000 MBC + 5,000 USDT
  Starting Price: $0.01/MBC
  Constant Product (k): 2,500,000,000

Price Impact at Various Trade Sizes:
  $50 buy   → +1.0% price impact (acceptable)
  $100 buy  → +2.0% price impact (acceptable)
  $500 buy  → +10.5% price impact (high, expected at this stage)
  $1,000 buy → +25% price impact (very high, natural for early-stage)
```

**Why $5,000 initial liquidity:**
MedByClick is a pre-revenue startup. Depositing $5,000 is an honest representation of the project's current stage. Larger initial liquidity from a pre-revenue project would overstate maturity and overcommit limited capital. Liquidity grows as the platform generates revenue (see Section 7.5).

### 7.4 Burn Mechanism

2% of MBC received by the platform as payment is burned:

- Burns are executed by the platform payment service after each MBC payment
- Burn transaction is sent to `0x000000000000000000000000000000000000dEaD`
- Each burn is verifiable on-chain via BscScan
- Platform publishes monthly burn reports

**Conservative burn projections:**

| Period | Est. MBC Payments | Burned (2%) | Cumulative Burned |
|--------|------------------|-------------|-------------------|
| Year 1 | 500,000 MBC | 10,000 MBC | 10,000 |
| Year 2 | 3,000,000 MBC | 60,000 MBC | 70,000 |
| Year 3 | 10,000,000 MBC | 200,000 MBC | 270,000 |

At early stage, burn quantities are modest. The mechanism becomes meaningful at scale and serves primarily as a long-term supply control instrument.

**Implementation note:** The deployed MBCToken contract uses `ERC20Burnable` which provides the `burn()` function. The platform's payment processing service calls `burn()` on the 2% portion after each payment. This is an off-chain trigger with an on-chain execution, meaning the platform must be trusted to execute burns consistently. Monthly burn reports provide accountability.

### 7.5 Liquidity Growth Plan

Liquidity additions are tied to verifiable milestones:

| Milestone | Liquidity Action | Source of Funds |
|-----------|-----------------|----------------|
| Launch | 500K MBC + $5K USDT | Founder capital |
| 100 token holders | +$2,500 USDT side | Platform revenue |
| CoinGecko listing | +$5,000 USDT side | Ecosystem Fund |
| $10K in MBC platform payments | +$5,000 USDT side | Platform revenue |
| CoinMarketCap listing | +$5,000 USDT side | Ecosystem Fund |
| Phase 3 Ethereum launch | Seed Uniswap pool | Future Liquidity allocation |

**Policy:** Liquidity additions never come from team token sales. Each addition is announced in advance and documented on-chain.

---

## 8. Vesting Schedule

### Detailed Release Timeline

**Team & Advisors (15,000,000 MBC):**
```
Months 0-12:   0 MBC released (cliff period)
Month 13:      416,667 MBC released (first monthly unlock)
Months 14-48:  416,667 MBC/month (linear release)
Month 48:      Fully vested (15,000,000 MBC total)
```

**Ecosystem Development (25,000,000 MBC):**
```
Months 0-6:    0 MBC released (lock period)
Month 7+:      Released per milestone approval by multisig
               Each release requires documented purpose
               Maximum 2,000,000 MBC per quarter
               Unused allocation remains locked
```

**Community Airdrop (10,000,000 MBC):**
```
Month 1:       2,000,000 MBC (first distribution to verified users)
Month 2:       2,000,000 MBC
Month 3:       2,000,000 MBC
Months 4-6:    4,000,000 MBC (remaining, activity-based)
```

**DEX Liquidity (5,000,000 MBC):**
```
Launch:        500,000 MBC deposited to PancakeSwap pool
               LP tokens locked for 12 months via Team.Finance
Months 2-12:   Additional MBC added to pool as liquidity grows
               LP tokens for each addition locked for 12 months
```

**Future Liquidity (5,000,000 MBC):**
```
Months 0-12:   Fully locked
Phase 3:       Released for Ethereum Uniswap pool seeding
               LP tokens locked for 12 months
```

**Operational Reserve (10,000,000 MBC):**
```
Months 0-12:   Fully locked
Month 13+:     Accessible only via 2-of-3 multisig
               Each withdrawal requires public disclosure
               Maximum 1,000,000 MBC per quarter
```

**Platform Rewards (30,000,000 MBC):**
```
Year 1:        Budget 2,000,000 MBC (distributed as earned)
Year 2:        Budget 3,000,000 MBC
Year 3:        Budget 4,000,000 MBC
Year 4:        Budget 5,000,000 MBC
Year 5+:       Remaining (~16,000,000 MBC), adjusted annually
```

---

## 9. Token Lifecycle

The complete lifecycle of an MBC token from creation to destruction:

```
CREATION (one-time event)
  Contract deployment → 100,000,000 MBC minted to owner wallet
  No further minting is possible (no mint function exists)
        │
        ▼
DISTRIBUTION (ongoing)
  Owner wallet → Allocation wallets (per Section 7.1)
  │
  ├─→ Rewards Wallet → distributed to users for platform activity
  ├─→ Ecosystem Wallet → released for partnerships per milestone
  ├─→ Team Wallets → released per vesting schedule (cliff + linear)
  ├─→ DEX Pool → deposited as liquidity (LP tokens locked)
  ├─→ Community → airdropped to verified platform users
  └─→ Reserve Wallet → held for emergencies (multisig locked)
        │
        ▼
CIRCULATION
  Users acquire MBC via:
  ├─→ Earning rewards (platform activity)
  ├─→ Buying on PancakeSwap (MBC/USDT pair)
  ├─→ Receiving community airdrop
  └─→ Receiving from another user (peer transfer)
        │
        ▼
UTILITY (token is used)
  ├─→ Payment: Patient pays for consultation in MBC
  │     └─→ 2% burned, 98% to platform → converted to USDT → specialist
  ├─→ Tier access: User holds MBC for Silver/Gold/Platinum features
  ├─→ Governance: User votes on platform proposals (future)
  ├─→ Subscription: User pays monthly MedByClick Pro in MBC (future)
  └─→ Sell: User sells MBC on DEX for USDT
        │
        ▼
DESTRUCTION (permanent)
  2% of every MBC payment → burn address (0x...dead)
  Voluntary burn: any holder can call burn() on their tokens
  Result: total supply decreases irreversibly over time
```

---

## 10. Token Velocity Analysis

### The Problem

Token velocity measures how quickly tokens change hands. High velocity (buy → use immediately → sell) suppresses token value because there is no sustained demand to hold. This is a well-documented challenge for utility tokens.

### How MBC Manages Velocity

**Velocity sinks (mechanisms that encourage holding over immediate selling):**

| Mechanism | Holding Incentive | Est. MBC Held |
|-----------|-------------------|---------------|
| Tier requirements | Must maintain 500-10,000 MBC balance for features | 500-10,000 per active user |
| Subscription (Phase 3) | Monthly MBC payment for Pro membership | 500/month recurring |
| Specialist staking (Phase 4) | Specialists stake as reputation bond | 1,000-5,000 per specialist |
| Governance participation | Need MBC to vote and propose | 100-500 per voter |

**Projected holding vs. velocity (Year 1):**
```
Scenario: 200 active users, 20 specialists

Tier holdings:
  50 Silver (500 MBC each)     = 25,000 MBC held
  20 Gold (2,000 MBC each)     = 40,000 MBC held
  5 Platinum (10,000 MBC each) = 50,000 MBC held
  Total tier holdings:           115,000 MBC

Specialist holdings:
  20 specialists × 500 MBC avg = 10,000 MBC held

Estimated long-term held: ~125,000 MBC (~0.6% of circulating Year 1)
```

**Honest assessment:** In the first year, velocity sinks are modest. Most tokens will circulate rapidly. As the user base grows and subscription/staking features launch (Phase 3-4), the proportion of held tokens should increase. MBC's primary value driver in Year 1 is payment utility, not holding incentives.

---

## 11. Governance

### 11.1 Governance Model

MBC governance transitions through three stages:

| Stage | Period | Decision Type | Mechanism |
|-------|--------|--------------|-----------|
| **Centralized** | Launch – Month 12 | All decisions | Founder + multisig |
| **Advisory** | Month 13 – Phase 3 | Feature priorities, ecosystem grants | On-chain voting (advisory, non-binding) |
| **DAO** | Phase 4+ | Treasury, fee structure, partnerships | On-chain voting (binding, quorum-based) |

### 11.2 Voting Mechanics (Advisory Phase)

- **Voting power:** 1 MBC = 1 vote
- **Proposal threshold:** 500 MBC minimum to submit a proposal
- **Voting threshold:** 100 MBC minimum to vote
- **Voting period:** 7 days from proposal submission
- **Quorum:** 5% of circulating supply must vote for result to be valid
- **Proposal lifecycle:**
  1. Proposal submitted on governance portal
  2. 48-hour discussion period
  3. 7-day voting period
  4. If quorum met: result published, team considers implementation
  5. Team response within 14 days (accept, modify, or explain rejection)

### 11.3 Governance Scope

| In Scope (DAO can vote on) | Out of Scope (team decision) |
|---------------------------|------------------------------|
| New module development priorities | Smart contract changes (security-critical) |
| Ecosystem Fund grant proposals | Regulatory compliance decisions |
| Community event planning | Team hiring and compensation |
| Feature request prioritization | Legal entity structure |
| Partnership recommendations | Token listing decisions |

### 11.4 Transition to Binding DAO

Requirements before governance becomes binding:
- Minimum 1,000 unique MBC holders
- At least 3 successful advisory votes completed
- Governance smart contract audited
- Legal review of DAO structure completed

---

## 12. Treasury Management

### 12.1 Treasury Structure

| Wallet | Contents | Control | Purpose |
|--------|----------|---------|---------|
| Operations Wallet | USDT, BNB (gas) | 2-of-3 multisig | Day-to-day platform costs |
| Ecosystem Fund | 25,000,000 MBC | 2-of-3 multisig | Partnerships, integrations |
| Operational Reserve | 10,000,000 MBC | 2-of-3 multisig | Emergency fund |
| Rewards Wallet | 30,000,000 MBC | Automated + multisig | User rewards distribution |
| LP Tokens | PancakeSwap LP | Locked (Team.Finance) | DEX liquidity |

### 12.2 Spending Policy

**Ecosystem Fund:**
- Maximum 2,000,000 MBC per quarter
- Each expenditure requires documented milestone and board approval
- Spending reports published quarterly
- Unused MBC remains locked

**Operational Reserve:**
- Maximum 1,000,000 MBC per quarter
- Only for emergencies (security incident, critical bug fix, regulatory cost)
- Each withdrawal requires public disclosure within 48 hours
- If emergency reserves are used, a report is published explaining the circumstances

### 12.3 Treasury Reporting

- Monthly: On-chain wallet balances published (verifiable via BscScan)
- Quarterly: Detailed spending report (ecosystem fund, reserve, rewards distributed)
- Annually: Full treasury audit and allocation review

### 12.4 Conflict of Interest Policy

- No team member may personally benefit from ecosystem fund expenditures
- Team token sales require 7-day advance notice published to the community
- Team members disclose all MBC holdings and transactions monthly

---

## 13. Technical Architecture

### 13.1 Smart Contract

```
Contract:    MBCToken.sol
Base:        OpenZeppelin v5.1 (ERC20 + ERC20Burnable + Ownable)
Solidity:    ^0.8.20
Optimizer:   Enabled, 200 runs

Functions:
  Core ERC-20:      transfer, approve, transferFrom, balanceOf
  Burn:             burn(amount), burnFrom(account, amount)
  Pause:            pause(), unpause() [onlyOwner]
  Anti-Whale:       setLimits(maxTx, maxWallet, cooldown) [onlyOwner]
                    setExempt(address, bool) [onlyOwner]
                    removeLimits() [onlyOwner]
  Override:         _update() — enforces anti-whale checks + pause

State Variables:
  maxTxAmount:      1,000,000 MBC (1% of supply)
  maxWalletAmount:  3,000,000 MBC (3% of supply)
  txCooldown:       30 seconds
  limitsEnabled:    true (default)
  isExempt:         mapping(address => bool)
  lastTxTime:       mapping(address => uint256)
```

### 13.2 Network Architecture

**Phase 1 — BNB Chain (Launch):**
- Chain ID: 56 (mainnet), 97 (testnet)
- Consensus: Proof of Staked Authority (PoSA)
- Block time: ~3 seconds
- Finality: ~15 seconds (5 confirmations)
- Gas cost: $0.05-0.20 per transaction
- DEX: PancakeSwap v2 (AMM, constant product)
- Block explorer: BscScan (bscscan.com)

**Phase 3 — Ethereum (Expansion):**
- Chain ID: 1 (mainnet)
- Consensus: Proof of Stake (post-Merge)
- Block time: ~12 seconds
- Finality: ~12 minutes (2 epochs)
- Gas cost: $5-50 per transaction (variable)
- DEX: Uniswap v3
- Block explorer: Etherscan (etherscan.io)

**Why BNB Chain for launch:**
- Gas costs are 100-500x lower than Ethereum — critical for $10-500 medical payment use cases
- 3-second block times provide near-instant UX for patients
- PancakeSwap has broader retail accessibility in emerging markets (key MedByClick demographic)
- Same Solidity contract deploys identically on both networks
- Ethereum expansion is justified only when transaction volume warrants higher gas costs

### 13.3 Deployed Contracts

| Network | Address | Status |
|---------|---------|--------|
| Ethereum Sepolia (testnet) | `0xaF95f1fe5f40Af4298cd9e116b3Eb479374c7D10` | Deployed, verified |
| BNB Chain Testnet | Pending | Awaiting tBNB |
| BNB Chain Mainnet | Pending | Phase 1 launch |
| Ethereum Mainnet | Pending | Phase 3 |

---

## 14. Security and Audit Plan

### 14.1 Current Security Posture

| Measure | Status | Details |
|---------|--------|---------|
| OpenZeppelin base contracts | Implemented | Battle-tested ERC-20, Burnable, Ownable |
| Anti-whale protection | Implemented | Max tx 1%, max wallet 3%, cooldown 30s |
| No mint function | Confirmed | Supply permanently fixed at 100M |
| Testnet deployment | Completed | Ethereum Sepolia, functional verification passed |
| Source code publication | Planned | Contract will be verified on BscScan at launch |

### 14.2 Pre-Launch Security Checklist

| Task | Timeline | Status |
|------|----------|--------|
| Internal code review | Before launch | In progress |
| Community security review (open source) | Before launch | Planned |
| Reentrancy analysis | Before launch | Planned |
| Integer overflow check | N/A | Solidity 0.8+ has built-in overflow protection |
| Access control review | Before launch | Planned |
| Gas optimization review | Before launch | Planned |

### 14.3 Post-Launch Security Plan

| Task | Timeline | Estimated Cost |
|------|----------|---------------|
| Professional security audit (Hacken or equivalent) | Within 3 months of launch | $5,000-15,000 |
| Bug bounty program | Launch + 1 month | $1,000-5,000 reward pool |
| Monitoring and alerting (Tenderly or equivalent) | Launch day | $200/month |
| Incident response plan documentation | Before launch | Internal |

### 14.4 Bug Bounty Program

| Severity | Reward | Example |
|----------|--------|---------|
| Critical (fund loss) | Up to $5,000 | Unauthorized mint, drain, bypass anti-whale |
| High (contract malfunction) | Up to $2,000 | Bypass pause, incorrect burn |
| Medium (unexpected behavior) | Up to $500 | Gas optimization issue, edge case |
| Low (informational) | Public acknowledgment | Code style, documentation |

### 14.5 Incident Response

In case of a security incident:
1. **Immediate:** Pause contract (owner calls `pause()`)
2. **Within 1 hour:** Public disclosure to community via all channels
3. **Within 24 hours:** Root cause analysis published
4. **Within 72 hours:** Fix deployed or remediation plan published
5. **Post-incident:** Full report published, process review conducted

---

## 15. Multisig Policy

### 15.1 Multisig Structure

**Type:** Gnosis Safe (Safe{Wallet})
**Threshold:** 2-of-3 signers required for any transaction

### 15.2 Signer Roles

| Signer | Role | Responsibilities |
|--------|------|-----------------|
| Signer 1 | Founder/CEO | Operational decisions, emergency response |
| Signer 2 | Technical Lead | Contract deployments, technical operations |
| Signer 3 | External Advisor | Independent oversight, conflict resolution |

### 15.3 Key Custody

- Each signer uses a separate hardware wallet (Ledger or Trezor)
- Seed phrases stored in separate physical locations
- No single person has access to more than one signer key
- Backup recovery procedure documented and tested

### 15.4 Multisig-Controlled Operations

| Operation | Signers Required | Notice Period |
|-----------|-----------------|---------------|
| Contract pause/unpause | 2-of-3 | Immediate (emergency) |
| Adjust anti-whale limits | 2-of-3 | 48 hours public notice |
| Remove anti-whale limits | 2-of-3 | 7 days public notice |
| Ecosystem Fund withdrawal | 2-of-3 | 7 days public notice |
| Reserve Fund withdrawal | 2-of-3 | 7 days + public disclosure |
| Add exempt address | 2-of-3 | 48 hours public notice |
| Contract ownership transfer | 3-of-3 | 14 days public notice |

---

## 16. Bridge Strategy

### 16.1 Cross-Chain Approach

**Phase 3 — BNB Chain ↔ Ethereum Bridge:**

MBC will be bridgeable between BNB Chain and Ethereum using a lock-and-mint model:

```
BNB Chain → Ethereum:
  1. User locks MBC in bridge contract on BNB Chain
  2. Bridge relayer verifies lock transaction
  3. Equivalent MBC is minted on Ethereum bridge contract
  4. Total supply across both chains = 100,000,000 MBC (invariant)

Ethereum → BNB Chain:
  1. User burns bridged MBC on Ethereum
  2. Bridge relayer verifies burn
  3. Locked MBC is released on BNB Chain
```

### 16.2 Bridge Security Considerations

| Risk | Mitigation |
|------|------------|
| Bridge contract hack | Use established bridge protocol (LayerZero, Wormhole, or Multichain) |
| Relayer failure | Decentralized relayer network, not single operator |
| Supply inconsistency | On-chain supply verification: BNB locked + ETH minted = constant |
| Transaction delay | Clear UX showing bridge status and expected confirmation time |

### 16.3 Bridge Timeline

Bridge deployment is deferred to Phase 3 (Q1-Q2 2026) to:
- Allow BNB Chain ecosystem to mature first
- Reduce surface area for attacks during early stage
- Ensure sufficient liquidity exists on both chains before enabling transfers
- Permit time for bridge protocol audit

---

## 17. Market Analysis

### 17.1 Telemedicine Market

| Metric | Value | Source |
|--------|-------|-------|
| Global telemedicine market (2024) | $115 billion | Grand View Research |
| Projected CAGR (2025-2030) | 17.2% | Fortune Business Insights |
| Cross-border telemedicine segment | ~$12 billion | Estimated |
| Patients seeking second opinions abroad | 15-20 million/year | WHO estimate |

### 17.2 MedByClick Addressable Market

| Level | Market | Size |
|-------|--------|------|
| TAM (Total Addressable) | Global cross-border telemedicine | $12B |
| SAM (Serviceable Addressable) | Complex/rare case consultations (English, Russian, Hebrew) | $500M |
| SOM (Serviceable Obtainable) | Realistic Year 1-3 capture | $500K-$5M |

### 17.3 Competitive Landscape — Health Tokens

| Token | Network | Market Cap | Differentiator | MBC Advantage |
|-------|---------|-----------|----------------|---------------|
| Solve.Care (SOLVE) | Ethereum | ~$50M | Care coordination | MBC: specialist-first, curated marketplace |
| MediBloc (MED) | Own chain | ~$30M | Medical records | MBC: active telemedicine platform, not records |
| Dentacoin (DCN) | Ethereum | ~$5M | Dental care | MBC: broader specialty coverage |
| MyClinic (MYC) | BSC | ~$2M | Clinic management | MBC: patient-facing, not clinic-facing |

**MedByClick differentiation:**
- Operating telemedicine platform with real specialists (40+ vetted)
- Focus on complex/rare cases (high-value consultations)
- Dual-chain from inception (BNB Chain + Ethereum)
- Token utility integrated with live platform services

---

## 18. Roadmap

### Phase 1: Launch (Q3 2025)
- Deploy MBC on BNB Chain mainnet
- Seed PancakeSwap pool (500,000 MBC + $5,000 USDT)
- Lock LP tokens for 12 months (Team.Finance)
- Transfer contract ownership to Gnosis Safe multisig
- Verify contract source code on BscScan
- Publish whitepaper v3 and tokenomics on website
- Apply for CoinGecko listing
- Apply for CoinMarketCap listing
- Enable MBC payment option on MedByClick platform

### Phase 2: First Users (Q4 2025)
- First real MBC payments for consultations
- Activate loyalty rewards distribution
- Onboard first 100 MBC-paying patients
- Onboard first 10 specialists into MBC incentive program
- Community launch: Telegram group, Discord server
- First monthly burn report published
- Begin community airdrop distribution
- Security audit engagement (Hacken or equivalent)
- Bug bounty program launch

### Phase 3: Growth (Q1-Q2 2026)
- Deploy MBC on Ethereum mainnet
- Seed Uniswap v3 liquidity pool (from Future Liquidity allocation)
- Deploy cross-chain bridge (BNB Chain ↔ Ethereum)
- MedByClick Pro subscription launch (500 MBC/month)
- Governance module v1 (advisory voting)
- Partner clinic MBC acceptance (5+ clinics)
- Mobile wallet integration (MetaMask, Trust Wallet deep links)
- Fiat-to-MBC onramp integration (MoonPay or Transak)

### Phase 4: Ecosystem (Q3-Q4 2026)
- DAO governance (binding votes, quorum-based)
- B2B settlement in MBC (inter-clinic referral fees)
- 20+ partner clinic integrations
- Specialist reputation staking pilot
- Tier-3 CEX listing applications (MEXC, Gate.io)
- API access credits (developers pay MBC for MedByClick API)
- Layer-2 evaluation for further gas reduction

---

## 19. Listing Strategy

### 19.1 Aggregator Listings

| Platform | Requirements | Timeline | Status |
|----------|-------------|----------|--------|
| CoinGecko | Verified contract, active trading pair, project info | Phase 1 (launch + 2 weeks) | Planned |
| CoinMarketCap | Same as CoinGecko + self-reported supply API | Phase 1 (launch + 4 weeks) | Planned |
| DexTools | Auto-listed when PancakeSwap pool created | Phase 1 (launch day) | Automatic |
| DexScreener | Auto-listed when PancakeSwap pool created | Phase 1 (launch day) | Automatic |

### 19.2 DEX Listings

| DEX | Network | Timeline | Pool |
|-----|---------|----------|------|
| PancakeSwap v2 | BNB Chain | Phase 1 | MBC/USDT |
| Uniswap v3 | Ethereum | Phase 3 | MBC/USDT, MBC/ETH |

### 19.3 CEX Listing Path

CEX listings require traction, community, and volume. Realistic timeline:

| Exchange Tier | Examples | Requirements | Target |
|--------------|---------|-------------|--------|
| Tier 3 | MEXC, BitMart, LBank | $50K daily volume, audit, community | Phase 4 (Q3-Q4 2026) |
| Tier 2 | Gate.io, KuCoin | $200K+ daily volume, 5K+ holders | 2027+ |
| Tier 1 | Binance, Coinbase | $1M+ daily volume, 50K+ holders | Not planned (requires significant scale) |

**CEX listing is NOT a launch priority.** DEX liquidity and organic platform usage come first. CEX listings are a growth-stage milestone, not a launch-stage goal.

---

## 20. Regulatory Compliance

### 20.1 Token Classification

MBC is classified as a **utility token** under all applicable frameworks:

**EU MiCA (Markets in Crypto-Assets Regulation, Title II):**

| MiCA Requirement (Article 6) | MBC Compliance |
|------------------------------|----------------|
| Identity of the offeror/issuer | MedByClick Ltd., registered in Israel |
| Description of the project | Telemedicine platform for complex medical cases |
| Indication of whether crypto-asset is a utility token | Yes — provides access to MedByClick platform services |
| Rights and obligations attached | Access to platform features, governance participation, no ownership rights |
| Underlying technology description | BNB Chain (PoSA), Solidity 0.8.20, OpenZeppelin ERC-20 |
| Risks | See Section 21 (Risk Factors) |
| Environmental impact | BNB Chain PoSA: low energy consumption (~0.001% of PoW) |
| Complaint handling procedure | compliance@medbyclick.com, 14-day response SLA |

**Howey Test (US Securities Law):**

| Howey Element | MBC Assessment |
|--------------|---------------|
| Investment of money | Community airdrop requires no payment. DEX purchase is voluntary. |
| Common enterprise | MBC utility is tied to platform services, not pooled investment |
| Expectation of profit | MBC is marketed exclusively for platform utility, not profit |
| From efforts of others | Platform development creates utility, but token value is not promised |
| **Conclusion** | MBC does NOT satisfy all four Howey elements. Not a security. |

**Israeli ISA (Israel Securities Authority):**
- MBC is a utility token providing platform access
- Not offered as an investment product
- No guaranteed returns communicated
- Legal opinion to be obtained before public distribution in Israel

### 20.2 KYC/AML Requirements

| Activity | KYC Required | Method |
|----------|-------------|--------|
| Platform registration | Yes (email, identity) | Standard registration |
| MBC payment on platform | No (token transfer) | Wallet-to-platform |
| Community airdrop | Yes (verified profile) | Platform identity check |
| Large MBC acquisition (>$10K equivalent) | Recommended | Enhanced due diligence |

### 20.3 Jurisdictional Restrictions

MBC is NOT offered to residents of:
- United States (pending regulatory clarity)
- Countries under international sanctions

MedByClick will engage local legal counsel before expanding MBC distribution to new jurisdictions.

### 20.4 Complaint Procedure

Any MBC holder may submit a complaint regarding the token, platform, or related services:

1. Submit complaint to compliance@medbyclick.com
2. Acknowledgment within 48 hours
3. Investigation within 14 business days
4. Written response with resolution or escalation path
5. If unresolved: contact the relevant national competent authority

---

## 21. Risk Factors

Any prospective MBC holder should carefully consider the following risks:

### 21.1 Project Risks

| Risk | Severity | Description | Mitigation |
|------|----------|-------------|------------|
| **Key person risk** | Critical | Project relies primarily on one founder. Incapacitation could halt development. | Multisig with external signer. Knowledge documentation. Advisory board planned. |
| **Platform adoption** | High | MBC utility depends on MedByClick growth. Low adoption = low demand. | Focus on platform-market fit. MBC is supplementary to fiat payments, not a prerequisite. |
| **Revenue dependency** | High | Platform is pre-revenue. Token utility is designed for a platform that has not yet proven commercial viability. | Conservative initial liquidity. Token launch tied to platform launch. |
| **Team concentration** | Medium | Team holds 15% + influences 25% ecosystem = 40% of supply. | Vesting (12mo cliff + 36mo linear). Ecosystem spending requires milestone approval. Monthly disclosure. |

### 21.2 Technical Risks

| Risk | Severity | Description | Mitigation |
|------|----------|-------------|------------|
| **Smart contract vulnerability** | High | Despite OpenZeppelin base, custom anti-whale logic could contain bugs. | Testnet deployment completed. Security audit planned. Bug bounty program. |
| **Bridge risk** | High | Cross-chain bridges are frequent hack targets ($2B+ stolen from bridges in 2022-2024). | Bridge deferred to Phase 3. Will use established protocol (LayerZero/Wormhole). |
| **Network risk** | Medium | BNB Chain could experience outages, attacks, or lose ecosystem relevance. | Ethereum deployment in Phase 3 provides chain redundancy. |
| **Oracle risk** | Medium | MBC/USDT price for payment is sourced from DEX pool. Thin liquidity makes price manipulable. | 60-second price lock. Slippage warnings. Gradual liquidity growth. |

### 21.3 Market Risks

| Risk | Severity | Description | Mitigation |
|------|----------|-------------|------------|
| **Liquidity risk** | High | $5K initial pool means high price impact on trades >$100. | Milestone-based liquidity growth. Clear communication about early-stage depth. |
| **Volatility** | High | MBC price will be volatile, especially in early stage. Patients may lose value between acquisition and use. | Recommend patients buy MBC at time of payment. 60-second price lock. |
| **Competition** | Medium | Other health tokens exist (Solve.Care, MediBloc). New entrants possible. | Focus on operational platform with real users, not just token. |
| **Impermanent loss** | Medium | LP providers face IL risk in a volatile pool. | LP tokens are locked by team, not community-provided. |

### 21.4 Regulatory Risks

| Risk | Severity | Description | Mitigation |
|------|----------|-------------|------------|
| **Reclassification** | High | Regulators may reclassify MBC as a security, payment token, or other regulated instrument. | No investment language. No profit promises. Legal opinion before each jurisdiction. |
| **MiCA compliance** | Medium | EU regulations may impose additional requirements not yet anticipated. | Whitepaper designed to MiCA standards. Legal counsel engaged. |
| **Tax implications** | Medium | MBC transactions may trigger capital gains or income tax in various jurisdictions. | Users are advised to consult their own tax advisors. Platform does not provide tax advice. |
| **Sanctions screening** | Low | A sanctioned individual could acquire MBC on DEX without platform knowledge. | Platform KYC for all MBC-related features. Cannot control DEX access. |

### 21.5 Operational Risks

| Risk | Severity | Description | Mitigation |
|------|----------|-------------|------------|
| **DEX dependency** | Medium | MBC relies on PancakeSwap for trading. PancakeSwap outage = no trading. | Multiple DEX listings planned. Uniswap in Phase 3. |
| **Lock service risk** | Low | Team.Finance (LP lock provider) could be compromised. | Use established lock provider. Monitor for alternatives. |
| **Wallet security** | Low | Team or multisig wallet compromise. | Hardware wallets only. 2-of-3 multisig. Separate storage. |

---

## 22. Team

### Core Team

**Vadim Baksman — Founder & CEO**
- Built MedByClick from personal experience navigating complex medical cases across multiple countries
- Personally vetted and onboarded 40+ medical specialists across 10+ specializations
- Responsible for product vision, specialist curation, and business development
- Location: Israel

### Advisory (Planned)

MedByClick is actively seeking advisors in:
- **Crypto/DeFi:** Tokenomics review, exchange relations, market making
- **Healthcare compliance:** HIPAA, GDPR, medical licensing
- **Legal:** Utility token classification, MiCA compliance, multi-jurisdiction

Advisory positions will be compensated from the Team & Advisors allocation (vested).

### Development

Technical development is conducted using AI-assisted engineering tools with human oversight. All smart contract code is based on audited OpenZeppelin libraries with custom anti-whale extensions.

---

## 23. Conclusion

MBC is a utility token designed to serve the MedByClick telemedicine ecosystem. Its value proposition is straightforward: patients save money, specialists earn bonuses, and the platform increases engagement.

The launch strategy is deliberately conservative:
- $5,000 initial liquidity reflects the project's pre-revenue stage
- BNB Chain reduces barrier to entry for patients
- No investor allocation eliminates presale-dump dynamics
- Team tokens are fully locked for 12 months

MBC's long-term success depends entirely on MedByClick's ability to attract patients and specialists to its platform. The token amplifies platform utility — it does not substitute for it.

---

## 24. Legal Disclaimers

### General Disclaimer

This whitepaper is for informational purposes only and does not constitute an offer to sell, a solicitation of an offer to buy, or a recommendation of any token, investment, or financial product. MBC tokens are utility tokens providing access to MedByClick platform services.

### No Investment Advice

Nothing in this whitepaper constitutes financial, investment, legal, or tax advice. Prospective participants should consult their own professional advisors.

### No Guarantee of Value

MBC tokens have no intrinsic or guaranteed value. The price of MBC may fluctuate significantly and may decline to zero. MedByClick does not guarantee any token buyback, price floor, or return on any amount used to acquire MBC.

### Forward-Looking Statements

This whitepaper contains forward-looking statements regarding the development of the MedByClick platform and MBC token ecosystem. These statements are based on current expectations and are subject to risks and uncertainties. Actual results may differ materially from those described.

### Regulatory Uncertainty

The regulatory landscape for crypto-assets is evolving. MBC's legal classification, permissible distribution methods, and compliance obligations may change based on future regulatory developments in any jurisdiction.

### Limitation of Liability

To the maximum extent permitted by applicable law, MedByClick Ltd. and its affiliates shall not be liable for any loss arising from the acquisition, holding, sale, or use of MBC tokens.

---

**Document Control:**
- Version: 3.0
- Published: June 2025
- Approved by: Vadim Baksman, Founder & CEO
- Next review: September 2025 (quarterly review cycle)

**Contact:**
- Platform: https://medbyclick.com
- Compliance: compliance@medbyclick.com
- GitHub: https://github.com/vadimbaksan-sudo/medbyclick-site
