import type { TokenTier, Reward, TokenInfo } from "./types";

export const tiers: TokenTier[] = [
  { id: "bronze", name: "Bronze", minTokens: 0, color: "amber-700", perks: ["5% discount on consultations", "Community access"] },
  { id: "silver", name: "Silver", minTokens: 500, color: "slate-400", perks: ["10% discount", "Priority scheduling", "Free case summary"] },
  { id: "gold", name: "Gold", minTokens: 2000, color: "amber-400", perks: ["15% discount", "Dedicated coordinator", "Free 2nd opinion per quarter"] },
  { id: "platinum", name: "Platinum", minTokens: 10000, color: "violet-400", perks: ["20% discount", "24/7 direct line", "Annual health review", "1 free consultation/month"] },
];

export const rewards: Reward[] = [
  { id: "r1", title: "Free Case Review", description: "A full review of your case by our coordination team", cost: 200, category: "Services" },
  { id: "r2", title: "Specialist Introduction Call", description: "15-minute intro call with a specialist before booking", cost: 350, category: "Services" },
  { id: "r3", title: "Medical Record Organization", description: "Professional organization of your full medical history", cost: 500, category: "Services" },
  { id: "r4", title: "Premium Course Bundle", description: "Access to all MedEdu premium courses for 3 months", cost: 150, category: "Education" },
];

export const earnActions = [
  { action: "Complete a consultation", tokens: 100 },
  { action: "Write a community review", tokens: 50 },
  { action: "Refer a friend", tokens: 250 },
  { action: "Complete profile", tokens: 25 },
  { action: "Take a MedEdu course", tokens: 75 },
];

export const tokenInfo: TokenInfo = {
  name: "MedByClick Token",
  symbol: "MBC",
  network: "Ethereum",
  standard: "ERC-20",
  totalSupply: 100_000_000,
  priceUsd: 0.10,
  tokenomics: [
    { label: "Platform Rewards", percentage: 35, description: "Distributed to users as loyalty rewards for platform activity", color: "bg-amber-400" },
    { label: "Ecosystem Fund", percentage: 25, description: "Reserved for partnerships, integrations, and ecosystem growth", color: "bg-amber-600" },
    { label: "Team & Advisors", percentage: 15, description: "Vested over 3 years with 12-month cliff", color: "bg-slate-500" },
    { label: "Public Sale", percentage: 15, description: "Available through public token sale events", color: "bg-slate-400" },
    { label: "Liquidity Reserve", percentage: 10, description: "DEX liquidity pools and market stability", color: "bg-slate-300" },
  ],
  roadmap: [
    {
      phase: 1,
      title: "Foundation",
      period: "Q1–Q2 2025",
      completed: true,
      items: [
        "ERC-20 smart contract deployment on Ethereum mainnet",
        "Token audit by CertiK",
        "MedToken loyalty program launch",
        "Wallet integration in MedByClick app",
      ],
    },
    {
      phase: 2,
      title: "Expansion",
      period: "Q3–Q4 2025",
      completed: true,
      items: [
        "MBC payment acceptance across all modules",
        "20% discount mechanism live",
        "CEX listing on two exchanges",
        "Staking v1 with platform-fee yield",
      ],
    },
    {
      phase: 3,
      title: "Ecosystem",
      period: "Q1–Q2 2026",
      completed: false,
      items: [
        "DAO governance module for token holders",
        "Cross-chain bridge to BNB Chain",
        "MBC-denominated insurance pools",
        "Partner clinic MBC acceptance network",
      ],
    },
    {
      phase: 4,
      title: "Global Scale",
      period: "Q3–Q4 2026",
      completed: false,
      items: [
        "Layer-2 deployment for near-zero gas fees",
        "NFT health credentials for MBC holders",
        "Decentralized medical record storage incentives",
        "50+ healthcare partner integrations",
      ],
    },
  ],
  useCases: [
    { id: "payments", title: "Service Payments", description: "Pay for consultations, case reviews, and care coordination with a 20% discount vs. card payments.", icon: "💳" },
    { id: "rewards", title: "Loyalty Rewards", description: "Earn MBC tokens for every platform interaction — consultations, reviews, referrals, and completed courses.", icon: "🎁" },
    { id: "governance", title: "DAO Governance", description: "Vote on platform feature priorities, fee structures, and ecosystem fund allocations.", icon: "🗳️" },
    { id: "staking", title: "Staking Yield", description: "Stake MBC to earn a share of platform service fees, distributed weekly.", icon: "📈" },
    { id: "access", title: "Premium Access", description: "Unlock exclusive specialists, early access to new modules, and priority scheduling queues.", icon: "🔑" },
    { id: "insurance", title: "Insurance Pools", description: "Contribute MBC to decentralized medical expense pools for community-backed coverage.", icon: "🛡️" },
  ],
};
