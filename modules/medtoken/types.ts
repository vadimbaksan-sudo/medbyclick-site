export interface TokenTier {
  id: string;
  name: string;
  minTokens: number;
  color: string;
  perks: string[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  standard: string;
  network: string;
  contractAddress: string;
  totalSupply: string;
  decimals: number;
  priceUsd: number;
  useCase: string;
}

export interface TokenDistribution {
  category: string;
  percentage: number;
  description: string;
}

export interface RoadmapItem {
  phase: string;
  title: string;
  items: string[];
  status: "completed" | "active" | "upcoming";
}
