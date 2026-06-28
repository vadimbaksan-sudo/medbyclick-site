import type { TokenTier, Reward, TokenInfo, TokenDistribution, RoadmapItem } from "./types";

export const tokenInfo: TokenInfo = {
  name: "MedByClick Token",
  symbol: "MBC",
  standard: "ERC-20",
  network: "Ethereum Mainnet",
  contractAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  totalSupply: "100,000,000 MBC",
  decimals: 18,
  priceUsd: 0.10,
  useCase: "Platform utility token for payments, discounts, loyalty rewards, and governance",
};

export const tokenDistribution: TokenDistribution[] = [
  { category: "Platform Rewards", percentage: 30, description: "Loyalty program, referrals, engagement rewards" },
  { category: "Team & Advisors", percentage: 15, description: "4-year vesting, 1-year cliff" },
  { category: "Development Fund", percentage: 20, description: "Platform development and infrastructure" },
  { category: "Public Sale", percentage: 20, description: "Available for purchase on supported exchanges" },
  { category: "Reserve", percentage: 10, description: "Emergency fund and future partnerships" },
  { category: "Liquidity", percentage: 5, description: "DEX liquidity pools (Uniswap)" },
];

export const tokenRoadmap: RoadmapItem[] = [
  {
    phase: "Phase 1",
    title: "Foundation",
    items: ["Smart contract development & audit", "ERC-20 deployment on Ethereum", "Internal platform integration", "Loyalty program launch"],
    status: "completed",
  },
  {
    phase: "Phase 2",
    title: "Growth",
    items: ["MBC payment integration on MedByClick", "20% discount for MBC payments", "Referral program with MBC rewards", "Partnership with 10+ clinics"],
    status: "active",
  },
  {
    phase: "Phase 3",
    title: "Expansion",
    items: ["DEX listing (Uniswap)", "Cross-chain bridge (Polygon, BSC)", "Staking rewards for token holders", "Governance voting for platform features"],
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "Ecosystem",
    items: ["CEX listings", "Partner clinic token acceptance", "Medical data marketplace (anonymized)", "Cross-platform utility (MedTravel, MedEdu)"],
    status: "upcoming",
  },
];

export const tokenUseCases = [
  { title: "Service Payments", description: "Pay for consultations, case reviews, and care coordination with up to 20% discount", icon: "💳" },
  { title: "Loyalty Rewards", description: "Earn MBC for consultations, referrals, reviews, and platform engagement", icon: "⭐" },
  { title: "Staking", description: "Stake MBC to earn passive rewards and unlock premium platform features", icon: "📈" },
  { title: "Governance", description: "Vote on platform features, new specialist additions, and community proposals", icon: "🗳️" },
  { title: "Partner Discounts", description: "Use MBC at partner clinics, pharmacies, and medical tourism providers", icon: "🏥" },
  { title: "Data Marketplace", description: "Share anonymized health insights and earn MBC from research institutions", icon: "🔬" },
];

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
