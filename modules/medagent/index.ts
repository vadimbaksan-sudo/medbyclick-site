import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medagentModule: ModuleDefinition = {
  id: "medagent",
  name: "MedAgent",
  navLabel: "MedAgent",
  href: "/medagent",
  icon: createImageIcon("/icons/modules/medagent.png"),
  description: "B2B referral network for medical coordinators and agents — pipeline, commissions, performance",
  color: "amber",
};
