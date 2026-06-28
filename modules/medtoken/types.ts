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
