import type { PricingPlan, PaymentMethod } from "./types";

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

export const paymentMethods: PaymentMethod[] = [
  {
    id: "stripe",
    name: "Credit / Debit Card",
    type: "card",
    description: "Visa, Mastercard, American Express — processed securely by Stripe.",
    icon: "💳",
    details: [
      "PCI DSS Level 1 certified",
      "3D Secure authentication",
      "Instant processing",
    ],
  },
  {
    id: "usdt-erc20",
    name: "USDT (ERC-20)",
    type: "crypto",
    description: "Tether USD stablecoin on the Ethereum network.",
    network: "Ethereum",
    icon: "₮",
    details: [
      "ERC-20 standard on Ethereum",
      "~1–3 min confirmation",
      "Gas fees apply",
    ],
  },
  {
    id: "usdt-trc20",
    name: "USDT (TRC-20)",
    type: "crypto",
    description: "Tether USD stablecoin on the TRON network. Minimal fees.",
    network: "TRON",
    icon: "₮",
    details: [
      "TRC-20 standard on TRON",
      "~3 second block time",
      "Near-zero fees",
    ],
  },
  {
    id: "mbc",
    name: "MBC Token",
    type: "token",
    description: "MedByClick utility token on Ethereum. Pay with MBC and receive 20% off.",
    network: "Ethereum",
    discount: 20,
    icon: "🪙",
    details: [
      "ERC-20 on Ethereum",
      "20% discount applied at checkout",
      "Tokens burned on redemption",
    ],
  },
];
