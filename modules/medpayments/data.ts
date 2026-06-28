import type { PricingPlan, PaymentMethod } from "./types";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit / Debit Card",
    type: "card",
    icon: "💳",
    description: "Visa, Mastercard, American Express. Processed securely via Stripe.",
    networks: ["Visa", "Mastercard", "Amex"],
  },
  {
    id: "usdt",
    name: "USDT (Tether)",
    type: "crypto",
    icon: "₮",
    description: "Pay with USDT stablecoin. ERC-20 (Ethereum) or TRC-20 (Tron) networks supported.",
    networks: ["ERC-20 (Ethereum)", "TRC-20 (Tron)"],
  },
  {
    id: "medtoken",
    name: "MBC Token",
    type: "token",
    icon: "🪙",
    description: "Pay with MedByClick utility tokens (ERC-20). Get up to 20% discount on all services.",
    networks: ["ERC-20 (Ethereum)"],
    discount: 20,
  },
];

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

export const cryptoAddresses = {
  usdt_erc20: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  usdt_trc20: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9",
  mbc_erc20: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
};
