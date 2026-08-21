import type { ModuleDefinition } from "../types";
import { HeartHandshake } from "lucide-react";

export const medgiveModule: ModuleDefinition = {
  id: "medgive",
  name: "MedGive",
  navLabel: "MedGive",
  href: "/medgive",
  icon: HeartHandshake,
  description: "Individually-verified medical crowdfunding and charitable patient support",
  color: "amber",
};
