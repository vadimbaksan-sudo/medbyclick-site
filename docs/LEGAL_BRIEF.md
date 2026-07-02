# MedByClick (MBC Token) — Legal Foundation Brief
**Prepared for: Crypto Law Firm Engagement**
**Version: 1.1 — July 2026** *(v1.1 adds Part 0: Engagement Readiness — see revision note below)*
**Confidential — Attorney-Client Privilege Intended**

> **Revision note (v1.1):** The technical/commercial content of this brief (Parts 1–10) is substantively complete and has not been changed. What was missing was not more legal analysis — it was the operational scaffolding to actually send this brief to a firm and sign an engagement letter. Part 0 below is new and identifies those gaps. Maintained by Legal & Compliance; entity, firm-selection, and funding decisions remain Joint per `docs/governance/DECISION_MATRIX.md`.

---

## Purpose of This Document

This brief is prepared by the MedByClick founding team for transmission to outside legal counsel. It describes the MBC token model in precise technical and commercial terms and sets out the specific legal questions that must be answered before any token sale, public offering, or exchange listing proceeds.

We are seeking:
1. A formal **Legal Opinion Letter** on token classification under MiCA, the EU Prospectus Regulation, and applicable national law
2. Guidance on **optimal legal entity structure** for token issuance
3. A **SAFT or Token Warrant template** for the private sale round
4. A **MiCA White Paper compliance review** before filing with the national competent authority

---

## Part 0: Engagement Readiness — What's Missing to Actually Engage Counsel

This section separates two different kinds of "incomplete": open legal *questions*
(fine — that's what counsel is for, see Parts 2–8) versus missing *prerequisites*
that block sending this brief and signing an engagement letter at all. As of this
revision, no firm has been contacted and no NDA has gone out. The gap is entirely
in the second category.

### 0.1 Blocking gaps

| # | Gap | Why it blocks engagement | Owner / decision type |
|---|-----|---------------------------|------------------------|
| 1 | No firm selected from the candidate list (Part "Recommended Law Firms") | Can't send a brief or sign a retainer without a counterparty | **Joint** — retainer = financial liability for the company (Decision Matrix catch-all) |
| 2 | No NDA template exists | Part "Appendix B" documents (whitepaper, tokenomics, audit, founder ID) are gated on NDA execution, but no NDA has been drafted | Legal & Compliance to draft; Joint to approve terms if it includes founder personal-liability clauses |
| 3 | No engagement signatory designated | No legal entity exists yet (Part 1), so the engagement letter must be signed by the founders personally or as an unincorporated joint venture — counsel will ask "who signs and who pays" before opening a file | **Joint** |
| 4 | No retainer funding source decided | No entity, no treasury, no token sale proceeds yet — retainer can only be funded from founders' personal funds pre-incorporation | **Joint** — budget allocation is explicitly Joint per Decision Matrix |
| 5 | Founder identity fields still placeholders (Part 1: "[jurisdiction — to be specified]") | Firms run a conflict check before agreeing to represent; most will ask for this before or immediately after first contact, NDA or not | Founders to supply directly — not something Legal & Compliance can source or invent |
| 6 | No outreach has actually happened | Items 1–5 are prerequisites *to* outreach; even once resolved, someone has to send the email and start the conflict-check/quote process | Whichever founder owns first contact — action item, not a finding |

### 0.2 What is NOT blocking

For clarity, since this brief already reads as "ready to send" in Parts 1–10:
jurisdiction being undecided (Part 6), the token classification being unresolved
(Part 5), and the budget for legal fees being unknown (Part 10) are **not**
blockers — those are precisely the open questions this brief asks counsel to help
resolve. Do not wait on those before initiating contact.

### 0.3 Outreach tracker

Not yet populated — no firm has been contacted. To be filled in as outreach
proceeds (this table is the source of truth for engagement status; update in
place rather than duplicating in `docs/reports/legal/`):

| Firm | Contacted | NDA sent/executed | Conflict check | Fee quote | Status |
|------|-----------|--------------------|-----------------|-----------|--------|
| Fieldfisher | — | — | — | — | Not started |
| DLx Law | — | — | — | — | Not started |
| MME Legal | — | — | — | — | Not started |
| Hogan Lovells | — | — | — | — | Not started |
| Sygna Partners | — | — | — | — | Not started |

### 0.4 Recommended sequencing

1. **Joint decision** (gaps #1, #3, #4 above): pick 1–3 firms from the candidate
   list to approach in parallel, designate who signs/pays, agree how a
   pre-incorporation retainer is funded and split.
2. Legal & Compliance drafts a mutual NDA (gap #2) once firm(s) are picked — many
   firms provide their own NDA/engagement-letter paper, so this may be moot
   depending on firm norms; confirm on first contact.
3. Founder-identifying information (gap #5) is supplied directly by founders to
   counsel post-NDA, not routed through this document.
4. First contact goes out (gap #6); this document (Parts 1–10) is what gets
   attached once an NDA is in place.

---

## Part 1: Company and Team

**Project name:** MedByClick
**Token ticker:** MBC
**Platform:** BNB Chain (BEP-20 standard, OpenZeppelin 5.x, Solidity 0.8.20)
**Total supply:** 100,000,000 MBC (hard cap, no mint function)

**Founding team:**
- Two co-founders (names, nationalities, and KYC documents to be provided upon NDA execution)
- Both founders are citizens of [jurisdiction — to be specified]
- No prior token issuances, no prior regulatory enforcement actions

**Current legal status:**
- No legal entity exists yet for the token project
- The platform operates informally at this stage
- No token has been issued or sold to date

**Intended jurisdiction for entity registration:**
- Candidates under consideration: British Virgin Islands (BVI), Cayman Islands, UAE (ADGM or DIFC), Singapore
- We seek counsel's recommendation based on MiCA passporting, investor base, and banking access

---

## Part 2: Token Model Description

### 2.1 What MBC Is

MBC is designed as a **utility token** that grants access to discounts and features within the MedByClick healthcare coordination platform. It is not designed to represent equity, profit participation, or any claim against the company.

**Platform services it unlocks:**
- 15% discount on paid healthcare coordination services when paying in MBC instead of fiat
- Priority Access Passes: spend 100 MBC to receive 12-hour coordinator response SLA (vs. standard 24–48h)
- Doctor Verification Stake: licensed physicians stake 1,000–5,000 MBC to maintain verified status (refundable, not a fee)
- Clinic Featured Placement: partner clinics stake 5,000–50,000 MBC tiers for algorithmic prominence in the platform directory
- Referral Rewards: users earn MBC when referred patients complete paid services
- Medical Travel Escrow: MBC used as intermediate escrow currency for international medical packages

### 2.2 What MBC Is Not

- MBC does not confer voting rights in the company
- MBC does not represent a share, bond, or any financial instrument issued by the company
- MBC holders receive no dividends, profit distributions, or revenue shares
- MBC does not entitle holders to any claim on company assets in liquidation
- There is no guaranteed secondary market or buyback obligation

### 2.3 Burn Mechanics — Key Legal Sensitivity

**This is the section most likely to affect token classification. Please review carefully.**

On every platform service payment made in MBC:
- 40% of MBC received is permanently burned (destroyed)
- 40% is transferred to the Ecosystem Treasury (multisig wallet)
- 20% is distributed to verified doctors who provided the service

On Priority Access Pass purchases:
- 100% of MBC spent is permanently burned

**Question for counsel:** Does the burn mechanic (reducing supply) combined with the 20% doctor distribution create an indirect economic benefit that could be construed as a profit-sharing mechanism under MiCA Article 3(1)(9), the German Kapitalanlagegesetzbuch, or French AMF guidance? Specifically: does the deflationary effect of burns constitute an "expectation of profit" under the Howey Test prong 4?

### 2.4 "Staking" Terminology — Legal Risk Flag

**Internal note already acted upon:** We deliberately removed the term "staking yield" from all public materials. Doctors and clinics "stake" MBC as a refundable deposit (skin-in-the-game accountability mechanism), not to earn yield. There is no APY, no reward pool distributed to MBC stakers as a class.

**Question for counsel:** Is the use of the word "stake" in our doctor verification model still problematic under MiCA or SEC guidance even without yield? What terminology is legally safer?

---

## Part 3: Tokenomics Summary

| Category | % | MBC Amount | TGE Unlock | Cliff | Vesting |
|----------|---|-----------|------------|-------|---------|
| Ecosystem Treasury | 25% | 25,000,000 | 0% | 6 months | 48 months linear |
| Platform Rewards | 20% | 20,000,000 | 5% | 3 months | 36 months |
| Founders & Team | 15% | 15,000,000 | 0% | 12 months | 36 months |
| Strategic Partners | 8% | 8,000,000 | 0% | 6 months | 24 months |
| Public Sale / IDO | 8% | 8,000,000 | 25% | — | 9 months |
| Liquidity Pool | 7% | 7,000,000 | 100% | — | Locked 24 months |
| Private Sale | 7% | 7,000,000 | 10% | 3 months | 18 months |
| Reserve | 6% | 6,000,000 | 0% | 12 months | 24 months governance-gated |
| Advisors | 4% | 4,000,000 | 0% | 6 months | 24 months |
| **Total** | **100%** | **100,000,000** | | | |

**TGE price:** $0.05 per MBC
**TGE FDV:** $5,000,000
**TGE market cap (circulating supply × $0.05):** ~$462,500

### Founder Compensation Structure

Founders receive compensation through two separate streams to eliminate financial pressure to dump tokens:

**Stream 1 — Token Allocation (long-term equity):**
- 15% total, split equally between two founders (7.5% each)
- 12-month cliff, 36-month linear vest
- Enforced on-chain via vesting contract, not admin-controlled

**Stream 2 — Treasury Salary (operational income):**
- Month 1–6: $2,000/month per founder
- Month 7–18: $4,000/month per founder
- Month 19–36: $6,000/month per founder
- Month 37+: market rate, board decision
- Paid in USD stablecoin from Treasury
- Requires 2-of-5 multisig approval; founders recused from own payment votes
- No MBC is sold to fund salaries

**Question for counsel:** Does the Treasury salary arrangement — funded by MBC token proceeds from the public/private sale — create any characterisation risk for the token sale under securities law (i.e., proceeds used to pay founders = investment contract)?

---

## Part 4: Token Sale Structure

### 4.1 Private Sale

- Allocation: 7% (7,000,000 MBC)
- Target raise: ~$140,000 (at $0.02/MBC, 30% discount to IDO price)
- Target investors: 5–15 accredited investors, angels, or strategic partners
- Intended instrument: SAFT (Simple Agreement for Future Tokens) or Token Warrant
- Geographic exclusions intended: United States, China (to be confirmed by counsel)
- KYC/AML: all investors must pass KYC before token delivery

**Questions for counsel:**
1. Which instrument is more appropriate for our stage and jurisdiction: SAFT, Token Warrant, or Simple Token Purchase Agreement?
2. What minimum investor qualification requirements apply (accredited investor test, sophisticated investor, HNWI)?
3. Must we register with FCA, AMF, BaFin, or other authority before signing with EU-based investors?
4. Can we accept investments before legal entity formation if we use escrow?

### 4.2 Public Sale / IDO

- Allocation: 8% (8,000,000 MBC)
- Target raise: ~$400,000 (at $0.05/MBC)
- Platform: Pinksale or DxSale (BNB Chain IDO launchpad)
- Geographic exclusions: United States, OFAC-sanctioned jurisdictions
- KYC: platform-enforced (Pinksale requires KYC for projects)

**Questions for counsel:**
1. Does selling tokens to EU retail investors via a public IDO trigger MiCA White Paper notification obligation? If yes, what is the timeline and competent authority?
2. Is the "utility token" exemption under MiCA Article 4(2)(a) available to us, given that the token can currently be traded on DEX?
3. Does the IDO format (smart contract-based, permissionless once launched) affect our ability to enforce geographic exclusions?

---

## Part 5: MiCA Classification Analysis

### Our Self-Assessment

We believe MBC is classifiable as a **utility token** under MiCA Article 3(1)(9):

> "crypto-asset that is intended to provide digital access to a good or service, available on DLT, and is only accepted by the issuer of that asset"

**Factors supporting utility token classification:**
- MBC provides access to discounts on specific platform services
- No profit distribution, no interest payments, no revenue sharing
- No buyback or redemption obligation
- No claim on issuer's assets
- Token supply is deflationary (burn mechanics), not inflated by issuer
- Total supply is fixed at issuance (no mint function)

**Factors that could complicate classification:**
- MBC will be tradeable on PancakeSwap V3 immediately after TGE → secondary market = potential "investment" characterisation
- 20% of service payments distributed to doctors could be characterised as yield if doctors are also MBC holders
- Burn mechanics could be characterised as creating "expectation of value increase" for holders
- Referral rewards paid in MBC could be construed as marketing securities

**Question for counsel:**
1. Does secondary market tradability at TGE negate the utility token exemption under MiCA?
2. Is MBC more accurately classified as an e-money token (EMT) or asset-referenced token (ART) due to its use in payments?
3. What does "only accepted by the issuer" mean in practice — does PancakeSwap trading violate this?
4. Which EU member state's competent authority should we notify, and in what timeline before IDO?

### Howey Test Self-Assessment (for US exposure analysis)

| Prong | Requirement | MBC Assessment | Risk Level |
|-------|-------------|----------------|------------|
| 1 | Investment of money | Yes — buyers pay fiat for MBC | Present |
| 2 | Common enterprise | Arguably yes — platform success affects MBC value | Present |
| 3 | Expectation of profits | Burns may create price appreciation expectation | Moderate |
| 4 | From efforts of others | Platform value depends on team | Present |

**Assessment:** MBC likely fails the Howey Test for US purposes, meaning it could be classified as a security by the SEC. We intend to exclude US persons from all sales and marketing. However, secondary market trading is not controllable.

**Questions for counsel:**
1. Is a US legal opinion letter required for private sale investors who are non-US but may invest through US-connected entities?
2. What contractual representations are required in the SAFT to establish US person exclusion?
3. Does listing on a US-accessible DEX (PancakeSwap is accessible from US) create SEC jurisdiction risk?

---

## Part 6: Legal Entity Structure

### Requirements

The issuing entity must be able to:
- Hold and disburse tokens from the Treasury wallet (via Gnosis Safe)
- Sign audit engagement letters with Hacken or CertiK
- Sign agreements with exchanges (MEXC, Gate.io, Binance in future)
- Receive fiat proceeds from private and public sale
- Issue legal agreements to private sale investors
- Maintain bank accounts in multiple currencies
- File MiCA notification with a national competent authority
- Not create personal tax liability for founders in Israel or [second jurisdiction — to be specified]

### Candidate Jurisdictions

**British Virgin Islands (BVI)**
- Fast incorporation: 5–10 business days
- No capital gains tax on token sales
- Widely recognised by exchanges
- Limited MiCA passporting (non-EU)
- Banking: difficult to open accounts, most banks refuse crypto companies

**Cayman Islands**
- Standard for crypto funds and DAOs
- No direct taxes
- Foundation Company structure available (useful for decentralisation narrative)
- Banking: same difficulties as BVI

**UAE — ADGM (Abu Dhabi)**
- ADGM has clear crypto regulatory framework (FSRA)
- VASP licensing available
- Banking: Emirates NBD, Mashreq accepting crypto companies
- Israeli founders: may have passport complications depending on UAE-Israel normalisation status
- Cost: AED 15,000–30,000/year

**UAE — DIFC (Dubai)**
- Similar to ADGM, DFSA framework
- Dubai Virtual Assets Regulatory Authority (VARA) license available
- Cost: USD 10,000–25,000/year

**Singapore**
- MAS Payment Services Act — crypto companies need DPT (Digital Payment Token) service license
- Strong banking relationships
- Cost: SGD 15,000–30,000/year + licensing

**Recommendation request:** Given two Israeli founders, EU investor base (assumed), BNB Chain deployment, and target CEX listings (MEXC, Gate.io, eventual Binance), which jurisdiction provides:
1. Cleanest path to MiCA passporting or compliance
2. Most accessible banking
3. Lowest founder personal tax exposure
4. Fastest time-to-incorporation

---

## Part 7: Treasury and Multisig Structure

### Proposed Structure

- **Treasury wallet:** Gnosis Safe 3-of-5 multisig
- **Signers:** 2 founders + 3 independent signers (advisor / lawyer / board member)
- **Network:** BNB Chain
- **All Treasury movements:** require 3-of-5 signatures
- **Founder salary payments:** require 2-of-5 excluding founders (founders recused from own payments)
- **Emergency reserve:** requires governance vote + 4-of-5 multisig

**Question for counsel:**
1. Should the Gnosis Safe be owned by the legal entity or by individuals? What are the implications for liability, tax, and regulatory classification?
2. Does operating a multisig treasury constitute a "collective investment scheme" in any jurisdiction we're considering?
3. If the legal entity is a BVI BC (Business Company), how does it legally "hold" blockchain assets?

---

## Part 8: Smart Contract Legal Requirements

Before the smart contract is deployed for production:

**Critical pre-deployment legal requirements:**
1. Legal entity must be registered (contract should be deployed by entity-controlled wallet, not personal EOA)
2. Gnosis Safe must be set up and tested on testnet
3. Legal opinion must be received on token classification (may require contract modifications)
4. Vesting contracts must be reviewed by counsel for enforceability
5. Source code must be verified on BscScan (public verification required)

**Known technical issues requiring remediation (from our internal bytecode audit):**
- C-01: Pause function controlled by single owner EOA — must be transferred to Gnosis Safe before deployment or removed
- H-01: `setExcluded()` function has no event emission — silent privilege escalation risk
- H-02: `setLimits()` function can be called post-deployment to restrict sellers — must be called once at deployment and then removed or time-locked

**Question for counsel:**
1. Does a pause function in the token contract — even if controlled by a multisig — create a "centralised control" argument that affects token classification?
2. Does MiCA or any EU regulation require specific smart contract governance features (immutability, timelocks)?

---

## Part 9: Deliverables We Need From Counsel

### Priority 1 (required before private sale)
- [ ] **Jurisdiction recommendation** with written rationale
- [ ] **Legal entity incorporation** (or engagement of local agent)
- [ ] **SAFT or Token Purchase Agreement template** — jurisdiction-appropriate, with US person exclusions, KYC/AML representations
- [ ] **Preliminary legal opinion** on MBC token classification (utility vs. security vs. e-money token) — minimum 3 pages

### Priority 2 (required before IDO / public sale)
- [ ] **Full Legal Opinion Letter** on MiCA classification, Howey Test analysis, and applicable national law — minimum 10 pages, signed and on letterhead, suitable for exchange due diligence
- [ ] **MiCA White Paper compliance review** — confirm our existing whitepaper satisfies MiCA Annex I requirements, or identify gaps
- [ ] **Geographic restriction strategy** — what countries to exclude and how to enforce legally
- [ ] **Exchange listing legal checklist** — what MEXC / Gate.io / Binance specifically require from a legal standpoint

### Priority 3 (before Tier-2 CEX listing)
- [ ] **Ongoing compliance counsel** engagement for MiCA notification filing
- [ ] **AML/KYC policy** review
- [ ] **Privacy Policy and Terms of Service** for token sale — GDPR-compliant

---

## Part 10: Budget Estimate Request

Please provide a fee estimate for the following:
1. Initial consultation and jurisdiction recommendation
2. Legal entity incorporation (all-in: agent, filing, registered office year 1)
3. SAFT/Token Purchase Agreement template
4. Preliminary legal opinion (written)
5. Full Legal Opinion Letter
6. MiCA White Paper review
7. Ongoing retainer (monthly, post-TGE)

---

## Recommended Law Firms (for reference)

We are currently evaluating:
- **Fieldfisher** (UK/EU, crypto-focused, MiCA specialists)
- **DLx Law** (US/international token law)
- **MME Legal** (Switzerland, crypto-native, DAO experience)
- **Hogan Lovells** (global, MiCA regulatory practice)
- **Sygna Partners** (BVI/Cayman, crypto structuring)

We welcome your firm's perspective on whether any of these represent a conflict.

---

## Appendix A: Key Dates and Constraints

| Milestone | Target Date | Dependency |
|-----------|-------------|------------|
| Legal entity incorporated | August 2026 | Jurisdiction decision |
| SAFT template ready | August 2026 | Entity + legal opinion |
| Private sale closes | September 2026 | SAFT + entity + KYC |
| Smart contract deployed (BNB mainnet) | September 2026 | Entity + legal clearance |
| Hacken/CertiK audit complete | October 2026 | Deployed source code |
| IDO / public sale | November 2026 | Audit report + MiCA review |
| PancakeSwap V3 liquidity launch | November 2026 | IDO complete |
| CoinGecko / CMC listing | November 2026 | Live trading |
| MEXC / Gate.io listing application | Q1 2027 | Audit + traction + legal opinion |

---

## Appendix B: Documents Available for Review

Upon execution of NDA, we can provide:
- Full Whitepaper (docs/WHITEPAPER.md)
- Full Tokenomics Paper (docs/TOKENOMICS.md)
- Smart Contract Bytecode Audit (docs/CONTRACT_AUDIT.md)
- Platform service pricing and description
- Founding team CVs and identification documents

---

*This document is prepared for attorney-client communication and is intended to be privileged and confidential. It does not constitute legal advice.*
