import type { ModuleDefinition } from "../types";
import { Compass } from "lucide-react";

export const medagentModule: ModuleDefinition = {
  id: "medagent",
  name: "MedAgent",
  navLabel: "MedAgent",
  href: "/medagent",
  icon: Compass,
  description: "B2B referral network for medical coordinators and agents — pipeline, commissions, performance",
  color: "amber",
};
