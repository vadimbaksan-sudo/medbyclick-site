import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medsupportModule: ModuleDefinition = {
  id: "medsupport",
  name: "MedSupport",
  navLabel: "MedSupport",
  href: "/medsupport",
  icon: createImageIcon("/icons/modules/medsupport.png"),
  description: "Round-the-clock patient support chat and urgent case handling",
  color: "red",
};
