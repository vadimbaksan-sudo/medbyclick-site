export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: "one-time" | "monthly" | "annual";
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "crypto" | "token";
  icon: string;
  description: string;
  networks?: string[];
  discount?: number;
}
