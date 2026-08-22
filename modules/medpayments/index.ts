import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medpaymentsModule: ModuleDefinition = {
  id: "medpayments",
  name: "MedPayments",
  navLabel: "MedPayments",
  href: "/medpayments",
  icon: createImageIcon("/icons/modules/medpayments.png"),
  description: "Secure Stripe-powered payments and subscription management",
  color: "green",
};
