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
