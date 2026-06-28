import type { PricingPlan } from "./types";

export const plans: PricingPlan[] = [
  {
    id: "basic",
    name: "Case Review",
    price: 150,
    currency: "USD",
    period: "one-time",
    description: "A single case review and specialist match — ideal for a second opinion.",
    features: [
      "Full case review by our coordinator",
      "Match to 1 specialist",
      "Written summary of recommendations",
      "Response within 24–48 hours",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    id: "professional",
    name: "Care Coordination",
    price: 490,
    currency: "USD",
    period: "one-time",
    description: "End-to-end coordination for complex cases requiring multiple specialists.",
    features: [
      "Everything in Case Review",
      "Matches to up to 3 specialists",
      "Appointment scheduling",
      "Translation support",
      "Follow-up coordination for 30 days",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Ongoing Access",
    price: 290,
    currency: "USD",
    period: "monthly",
    description: "Unlimited consultations and priority routing for chronic or ongoing conditions.",
    features: [
      "Everything in Care Coordination",
      "Unlimited specialist matches",
      "Priority 12-hour response",
      "Dedicated case manager",
      "Medical record management",
    ],
    highlighted: false,
    cta: "Subscribe",
  },
];
