import type { ModuleDefinition } from "../types";
import { Coins } from "lucide-react";

export const medtokenModule: ModuleDefinition = {
  id: "medtoken",
  name: "MedToken",
  navLabel: "MedToken",
  href: "/medtoken",
  icon: Coins,
  description: "Token-based loyalty program and rewards for platform engagement",
  color: "yellow",
};
