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

export interface TokenomicsItem {
  label: string;
  percentage: number;
  description: string;
  color: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  period: string;
  items: string[];
  completed: boolean;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  network: string;
  standard: string;
  totalSupply: number;
  priceUsd: number;
  tokenomics: TokenomicsItem[];
  roadmap: RoadmapPhase[];
  useCases: UseCase[];
}

export interface VestingRow {
  category: string;
  amount: number;
  tgePercent: number;
  cliff: string;
  vest: string;
}

export interface FounderCompRow {
  phase: string;
  perFounder: string;
  total: string;
  note: string;
}

export interface BurnMechanic {
  source: string;
  burnPercent: number;
  notes: string;
}
