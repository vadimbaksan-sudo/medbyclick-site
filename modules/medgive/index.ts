import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medgiveModule: ModuleDefinition = {
  id: "medgive",
  name: "MedGive",
  navLabel: "MedGive",
  href: "/medgive",
  icon: createImageIcon("/icons/modules/medgive.png"),
  description: "Individually-verified medical crowdfunding and charitable patient support",
  color: "amber",
};
