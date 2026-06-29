# MBC Token Whitepaper

## MedByClick Utility Token (MBC)

**Version:** 1.0
**Date:** June 2025
**Network:** Ethereum (ERC-20) + BNB Chain (BEP-20)

---

## 1. Executive Summary

MBC is the native utility token of the MedByClick telemedicine platform — a curated marketplace connecting patients worldwide with 40+ personally vetted medical specialists for complex and rare cases.

MBC serves as the internal currency for payments, loyalty rewards, governance, and premium access across all 13 platform modules. The token operates on both Ethereum and BNB Chain networks, enabling low-cost transactions while maintaining the security and liquidity of the Ethereum ecosystem.

**Key metrics:**
- **Token name:** MedByClick Token
- **Symbol:** MBC
- **Standard:** ERC-20 (Ethereum) / BEP-20 (BNB Chain)
- **Total supply:** 100,000,000 MBC (fixed, non-mintable)
- **Initial price:** $0.10 USD
- **Anti-whale protection:** Max 1% per transaction, max 3% per wallet, 30-second cooldown

---

## 2. Problem Statement

### 2.1 Current Healthcare Payment Issues

1. **High transaction fees:** International card payments for medical consultations incur 3-5% processing fees, plus currency conversion costs of 2-4%
2. **Payment delays:** Cross-border transfers take 3-7 business days, delaying treatment coordination
3. **No patient loyalty incentives:** Traditional payment methods offer no rewards for platform engagement or repeat visits
4. **Limited access:** Patients in developing countries often lack international payment options
5. **No community governance:** Patients have no voice in platform development priorities

### 2.2 Why Blockchain Solves This

- **Instant settlement:** Crypto payments confirm in seconds (BNB Chain) to minutes (Ethereum)
- **Low fees:** BNB Chain transactions cost $0.05-0.20 vs. $15-50 for international wire transfers
- **Global access:** Anyone with a smartphone and internet can acquire and use MBC
- **Programmable loyalty:** Smart contract automates rewards distribution without intermediaries
- **Transparent governance:** On-chain voting ensures fair and verifiable decision-making

---

## 3. Token Utility

### 3.1 Service Payments (Primary Use Case)

Patients pay for medical services using MBC at a **20% discount** compared to card payments:

| Service | Card Price | MBC Price | Savings |
|---------|-----------|-----------|---------|
| Specialist Consultation | $500 | 4,000 MBC ($400) | $100 |
| Case Review | $200 | 1,600 MBC ($160) | $40 |
| Second Opinion | $350 | 2,800 MBC ($280) | $70 |
| Care Coordination | $150 | 1,200 MBC ($120) | $30 |

The 20% discount is enforced at the smart contract level — the platform accepts MBC at face value while the patient effectively pays less.

### 3.2 Loyalty Rewards

Users earn MBC for platform engagement:

| Action | MBC Earned |
|--------|-----------|
| Complete a consultation | 100 MBC |
| Write a community review | 50 MBC |
| Refer a friend (who books) | 250 MBC |
| Complete profile | 25 MBC |
| Complete a MedEdu course | 75 MBC |

Annual rewards budget: 5,000,000 MBC (5% of supply) from the Platform Rewards allocation.

### 3.3 Membership Tiers

Token holdings unlock premium features:

| Tier | Min. MBC | Benefits |
|------|----------|----------|
| **Bronze** | 0 | 5% discount, community access |
| **Silver** | 500 | 10% discount, priority scheduling, free case summary |
| **Gold** | 2,000 | 15% discount, dedicated coordinator, free 2nd opinion/quarter |
| **Platinum** | 10,000 | 20% discount, 24/7 direct line, annual health review, 1 free consultation/month |

### 3.4 Governance (DAO)

MBC holders vote on:
- New module development priorities
- Fee structure changes
- Ecosystem fund grant allocations
- Partner clinic onboarding decisions

Voting power is proportional to MBC holdings. Minimum 100 MBC to submit proposals, 1,000 MBC to vote.

### 3.5 Staking

MBC holders can stake tokens to earn a share of platform service fees:
- **Staking period:** 30/90/180 days (longer = higher yield)
- **Yield source:** 5% of all platform transaction fees
- **Distribution:** Weekly, proportional to stake
- **Estimated APY:** 8-15% (depends on platform volume)

Staking also serves as a price stability mechanism — locked tokens reduce circulating supply.

### 3.6 Premium Access

MBC unlocks exclusive features:
- Priority access to top-rated specialists
- Early access to new platform modules
- Premium MedEdu courses
- Exclusive community events and webinars
- NFT health credentials (Phase 4)

---

## 4. Tokenomics

### 4.1 Supply Distribution

**Total Supply: 100,000,000 MBC (fixed, non-mintable)**

| Allocation | % | MBC Amount | Vesting |
|-----------|---|-----------|---------|
| **Platform Rewards** | 35% | 35,000,000 | Released over 5 years (7M/year) |
| **Ecosystem Fund** | 25% | 25,000,000 | Controlled by DAO after Phase 3 |
| **Team & Advisors** | 15% | 15,000,000 | 3-year vesting, 12-month cliff |
| **Public Sale** | 15% | 15,000,000 | 30% at TGE, 70% over 6 months |
| **Liquidity Reserve** | 10% | 10,000,000 | Locked in DEX pools |

### 4.2 Token Release Schedule

```
Year 1:  Public Sale (15M) + Rewards (7M) + Liquidity (10M) = 32M circulating
Year 2:  + Rewards (7M) + Team unlock starts (5M) = 44M circulating
Year 3:  + Rewards (7M) + Team (5M) + Ecosystem (5M) = 61M circulating
Year 4:  + Rewards (7M) + Team (5M) + Ecosystem (10M) = 83M circulating
Year 5:  + Rewards (7M) + Ecosystem (10M) = 100M fully circulating
```

### 4.3 Price Stability Mechanisms

1. **Burn mechanism:** 2% of MBC used for payments is burned, permanently reducing supply
2. **Staking lockup:** Users lock MBC for yield, reducing circulating supply
3. **Anti-whale limits:** Max 1% per transaction, 3% per wallet — prevents dumps
4. **Cooldown:** 30-second delay between transactions — stops bot manipulation
5. **Vesting schedules:** Team and ecosystem tokens release gradually over 3-5 years

### 4.4 Revenue Model for Token Holders

```
Platform Revenue (consultations, courses, etc.)
        |
        v
   5% → Staking rewards (distributed to MBC stakers)
   2% → Buy-back & burn (platform buys MBC on DEX and burns)
   3% → Ecosystem Fund (DAO-controlled)
  90% → Platform operations
```

---

## 5. Technical Architecture

### 5.1 Smart Contract

```
Contract: MBCToken.sol
Standard: ERC-20 (OpenZeppelin v5.1)
Solidity: ^0.8.20
Features:
  - Fixed supply (100M, minted at deploy)
  - Burnable (ERC20Burnable)
  - Pausable (owner can freeze transfers in emergency)
  - Anti-whale (maxTx 1%, maxWallet 3%, cooldown 30s)
  - Owner exempt from limits
  - Adjustable limits (setLimits, removeLimits)
```

### 5.2 Dual-Chain Deployment

**Ethereum (ERC-20):**
- Primary chain for large transactions and DeFi
- Uniswap v3 liquidity pool (MBC/USDT, MBC/ETH)
- Gas: $5-50 per transaction

**BNB Chain (BEP-20):**
- Secondary chain for daily payments and micro-transactions
- PancakeSwap liquidity pool (MBC/USDT, MBC/BNB)
- Gas: $0.05-0.20 per transaction

**Bridge:**
- Cross-chain bridge allows transferring MBC between Ethereum and BNB Chain
- Total supply remains constant across both chains
- Bridge contract locks tokens on source chain, mints equivalent on destination

### 5.3 Security

- **OpenZeppelin:** Industry-standard audited contracts
- **Anti-whale:** Built-in transaction and wallet limits
- **Multisig:** Contract ownership transferred to Gnosis Safe (2-of-3)
- **Liquidity lock:** LP tokens locked for 12 months via Team.Finance
- **No mint function:** Supply is fixed at deploy — impossible to inflate
- **Audit:** Planned CertiK audit before mainnet launch

### 5.4 Contract Addresses

| Network | Address | Status |
|---------|---------|--------|
| Ethereum Sepolia (testnet) | `0xaF95f1fe5f40Af4298cd9e116b3Eb479374c7D10` | Deployed |
| Ethereum Mainnet | TBD | Pending |
| BNB Chain Testnet | TBD | Pending |
| BNB Chain Mainnet | TBD | Pending |

---

## 6. Roadmap

### Phase 1: Foundation (Q1-Q2 2025) - COMPLETED
- ERC-20 smart contract development and testing
- Anti-whale protection implementation
- Sepolia testnet deployment and verification
- MedToken loyalty program UI on MedByClick platform
- Wallet integration planning

### Phase 2: Launch (Q3-Q4 2025)
- Security audit (CertiK or equivalent)
- Ethereum mainnet deployment
- BNB Chain deployment
- Uniswap + PancakeSwap liquidity pools
- MBC payment acceptance across all 13 modules
- 20% discount mechanism activation
- Cross-chain bridge deployment

### Phase 3: Ecosystem (Q1-Q2 2026)
- DAO governance module launch
- Staking v1 with platform-fee yield
- DEX listing expansion
- Partner clinic MBC acceptance network (10+ clinics)
- MBC-denominated insurance pools pilot
- Mobile wallet app

### Phase 4: Global Scale (Q3-Q4 2026)
- Layer-2 deployment (Arbitrum/Optimism) for near-zero gas fees
- NFT health credentials for MBC holders
- Decentralized medical record storage incentives
- 50+ healthcare partner integrations
- CEX listing applications (Binance, KuCoin, Gate.io)
- Cross-border payment corridors

---

## 7. Legal Considerations

### 7.1 Token Classification

MBC is a **utility token** — it provides access to services on the MedByClick platform. It is NOT:
- A security or investment contract
- A share or equity in MedByClick
- A stablecoin or payment token with guaranteed value

### 7.2 Regulatory Compliance

- **EU (MiCA):** MBC qualifies as a utility token under Markets in Crypto-Assets regulation
- **Israel:** Compliant with ISA guidance on utility tokens
- **USA:** Not offered to US persons in public sale (regulatory safe harbor)

### 7.3 KYC/AML

- Public sale participants undergo KYC verification
- Platform MBC transactions are linked to verified user accounts
- Suspicious activity monitoring integrated with platform compliance

---

## 8. Team

- **Vadim Baksman** — Founder & CEO, MedByClick. Personally vetted 40+ medical specialists. Vision: accessible telemedicine for complex cases worldwide.
- Technical development: AI-assisted development team
- Medical advisory: Network of 40+ vetted specialists

---

## 9. Conclusion

MBC creates a virtuous cycle for the MedByClick ecosystem:

1. **Patients** get discounts, loyalty rewards, and governance voice
2. **Specialists** receive faster payments with lower fees
3. **Platform** increases user retention and engagement
4. **Token holders** benefit from platform growth through staking yields and burn mechanics

The dual-chain approach (Ethereum + BNB Chain) ensures MBC is accessible to users worldwide regardless of transaction size — from a $10 course to a $5,000 complex case consultation.

---

## 10. Disclaimer

This whitepaper is for informational purposes only. MBC tokens are utility tokens providing access to MedByClick platform services. They do not represent equity, ownership, or any form of investment. Token value may fluctuate. Past performance does not indicate future results. Users should conduct their own research before acquiring MBC tokens.

---

**Contact:**
- Website: https://medbyclick.com
- Email: info@medbyclick.com
- GitHub: https://github.com/vadimbaksan-sudo/medbyclick-site
