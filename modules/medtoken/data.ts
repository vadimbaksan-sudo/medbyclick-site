import type { TokenTier, Reward } from "./types";

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
