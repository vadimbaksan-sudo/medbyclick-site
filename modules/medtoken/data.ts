import type { TokenTier, Reward, TokenInfo } from "./types";

export const tiers: TokenTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    minTokens: 0,
    color: "amber-700",
    perks: ["5% discount on consultations", "Community access", "Basic case tracking"],
  },
  {
    id: "silver",
    name: "Silver",
    minTokens: 500,
    color: "slate-400",
    perks: ["10% discount on services", "Priority scheduling", "Free case summary"],
  },
  {
    id: "gold",
    name: "Gold",
    minTokens: 2000,
    color: "amber-400",
    perks: ["15% discount on services", "Dedicated coordinator", "Free 2nd opinion per quarter"],
  },
  {
    id: "platinum",
    name: "Platinum",
    minTokens: 10000,
    color: "violet-400",
    perks: ["20% discount on services", "24/7 direct line", "Annual health review", "1 free consultation/month"],
  },
];

export const rewards: Reward[] = [
  {
    id: "r1",
    title: "Free Case Review",
    description: "A full review of your case by our coordination team",
    cost: 200,
    category: "Services",
  },
  {
    id: "r2",
    title: "Priority Pass",
    description: "12-hour coordinator response SLA for your next case",
    cost: 100,
    category: "Services",
  },
  {
    id: "r3",
    title: "Medical Record Organization",
    description: "Professional organization of your full medical history",
    cost: 500,
    category: "Services",
  },
  {
    id: "r4",
    title: "Premium Course Bundle",
    description: "Access to all MedEdu premium courses for 3 months",
    cost: 150,
    category: "Education",
  },
];

export const earnActions = [
  { action: "Referred patient completes Case Review", tokens: 50 },
  { action: "Referred patient completes Care Coordination", tokens: 150 },
  { action: "Doctor joins and gets verified", tokens: 500 },
  { action: "Write a verified community review", tokens: 30 },
  { action: "Complete a MedEdu course", tokens: 75 },
  { action: "Complete your patient profile", tokens: 25 },
];

export const tokenInfo: TokenInfo = {
  name: "MedByClick Token",
  symbol: "MBC",
  network: "BNB Chain",
  standard: "BEP-20",
  totalSupply: 100_000_000,
  priceUsd: 0.05,
  tokenomics: [
    {
      label: "Ecosystem Treasury",
      percentage: 25,
      description: "Platform development, ecosystem grants, operational reserve. 6-month cliff, 48-month linear vest.",
      color: "bg-amber-500",
    },
    {
      label: "Platform Rewards",
      percentage: 20,
      description: "Referral bonuses, doctor rewards, content creator incentives. Decreasing emission over 36 months.",
      color: "bg-amber-400",
    },
    {
      label: "Founders & Team",
      percentage: 15,
      description: "Two co-founders, equal split. 12-month cliff, 36-month vest. Operational salaries paid separately from Treasury.",
      color: "bg-slate-600",
    },
    {
      label: "Strategic Partners",
      percentage: 8,
      description: "Clinic integrations, hospital network partnerships. 6-month cliff, 24-month vest.",
      color: "bg-teal-500",
    },
    {
      label: "Public Sale / IDO",
      percentage: 8,
      description: "Public token sale at $0.05. 25% at TGE, 9-month linear vest.",
      color: "bg-slate-400",
    },
    {
      label: "Liquidity Pool",
      percentage: 7,
      description: "PancakeSwap V3 liquidity. 100% at TGE, LP tokens locked 24 months on-chain.",
      color: "bg-green-500",
    },
    {
      label: "Private Sale",
      percentage: 7,
      description: "Seed investors at $0.02. 10% at TGE, 3-month cliff, 18-month vest.",
      color: "bg-slate-500",
    },
    {
      label: "Reserve",
      percentage: 6,
      description: "Regulatory compliance, legal contingency, emergency buffer. 12-month cliff, governance-gated release.",
      color: "bg-rose-400",
    },
    {
      label: "Advisors",
      percentage: 4,
      description: "Blockchain, legal, medical, and exchange advisors. 6-month cliff, 24-month vest.",
      color: "bg-violet-400",
    },
  ],
  roadmap: [
    {
      phase: 1,
      title: "Foundation",
      period: "Q3–Q4 2026",
      completed: false,
      items: [
        "Platform MVP live with first paying patients",
        "Clinical coordinator hired",
        "BEP-20 smart contract deployed on BNB Chain",
        "Security audit by Hacken or CertiK",
        "Legal structure and MiCA advisory complete",
      ],
    },
    {
      phase: 2,
      title: "Token Launch",
      period: "Q4 2026",
      completed: false,
      items: [
        "PancakeSwap V3 liquidity live and locked 24 months",
        "CoinGecko and CoinMarketCap listings",
        "MBC payment discount (15%) active on platform",
        "Doctor staking module live (first 20 doctors)",
        "Referral rewards program active",
      ],
    },
    {
      phase: 3,
      title: "Growth",
      period: "Q1–Q2 2027",
      completed: false,
      items: [
        "MEXC / Gate.io listing (Tier-3 CEX)",
        "100+ verified doctors staked",
        "Medical Travel escrow module live",
        "Clinic featured placement staking",
        "Platform MRR $100,000+",
      ],
    },
    {
      phase: 4,
      title: "Ecosystem",
      period: "Q3 2027+",
      completed: false,
      items: [
        "KuCoin or Bybit listing (Tier-2 CEX)",
        "Ethereum bridge via LayerZero",
        "Advisory governance module (non-binding product votes)",
        "500+ verified doctors globally",
        "50+ partner clinics across 10 countries",
      ],
    },
  ],
  useCases: [
    {
      id: "payments",
      title: "Payment Discount",
      description: "Pay for any MedByClick service with MBC and receive a 15% discount versus card payment. 40% of each MBC payment is permanently burned.",
      icon: "💳",
    },
    {
      id: "doctor-staking",
      title: "Doctor Verification Stake",
      description: "Licensed physicians stake 1,000–5,000 MBC to maintain verified status on the platform. Stake is refundable — not a fee. Creates real accountability.",
      icon: "🩺",
    },
    {
      id: "clinic-placement",
      title: "Clinic Featured Placement",
      description: "Partner clinics stake MBC tiers (5K–50K) for featured placement and referral priority in MedGlobalDB. Every clinic upgrade is a guaranteed buy.",
      icon: "🏥",
    },
    {
      id: "priority",
      title: "Priority Access Passes",
      description: "Spend 100 MBC for a Priority Pass — 12-hour coordinator response SLA instead of 24–48 hours. 100% of Priority Pass MBC is burned.",
      icon: "⚡",
    },
    {
      id: "referral",
      title: "Referral Rewards",
      description: "Earn MBC when a patient you referred completes a paid service (50–150 MBC) or when a doctor you referred gets verified (500 MBC).",
      icon: "🎁",
    },
    {
      id: "escrow",
      title: "Medical Travel Escrow",
      description: "MBC serves as escrow currency for international medical packages. Funds release to clinics on patient confirmation — protecting both sides.",
      icon: "🛡️",
    },
  ],
};

export const vestingSchedule = [
  { category: "Ecosystem Treasury", amount: 25_000_000, tgePercent: 0, cliff: "6 months", vest: "48 months" },
  { category: "Platform Rewards", amount: 20_000_000, tgePercent: 5, cliff: "3 months", vest: "36 months" },
  { category: "Founders & Team", amount: 15_000_000, tgePercent: 0, cliff: "12 months", vest: "36 months" },
  { category: "Strategic Partners", amount: 8_000_000, tgePercent: 0, cliff: "6 months", vest: "24 months" },
  { category: "Public Sale / IDO", amount: 8_000_000, tgePercent: 25, cliff: "—", vest: "9 months" },
  { category: "Liquidity Pool", amount: 7_000_000, tgePercent: 100, cliff: "—", vest: "Locked 24 mo" },
  { category: "Private Sale", amount: 7_000_000, tgePercent: 10, cliff: "3 months", vest: "18 months" },
  { category: "Reserve", amount: 6_000_000, tgePercent: 0, cliff: "12 months", vest: "24 months" },
  { category: "Advisors", amount: 4_000_000, tgePercent: 0, cliff: "6 months", vest: "24 months" },
];

export const founderCompensation = [
  { phase: "Month 1–6", perFounder: "$2,000/mo", total: "$4,000/mo", note: "Pre-listing phase" },
  { phase: "Month 7–18", perFounder: "$4,000/mo", total: "$8,000/mo", note: "Post Tier-3 CEX listing" },
  { phase: "Month 19–36", perFounder: "$6,000/mo", total: "$12,000/mo", note: "Platform MRR $100K+" },
  { phase: "Month 37+", perFounder: "Market rate", total: "Board decision", note: "Mature stage" },
];

export const burnMechanics = [
  { source: "Service payment in MBC", burnPercent: 40, notes: "40% burned · 40% Treasury · 20% Doctor rewards" },
  { source: "Priority Access Pass", burnPercent: 100, notes: "100% burned — pure deflationary event" },
];
