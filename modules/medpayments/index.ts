import type { ModuleDefinition } from "../types";
import { CreditCard } from "lucide-react";

export const medpaymentsModule: ModuleDefinition = {
  id: "medpayments",
  name: "MedPayments",
  navLabel: "MedPayments",
  href: "/medpayments",
  icon: CreditCard,
  description: "Secure Stripe-powered payments and subscription management",
  color: "green",
};
