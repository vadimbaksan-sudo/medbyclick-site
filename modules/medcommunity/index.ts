import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medcommunityModule: ModuleDefinition = {
  id: "medcommunity",
  name: "MedCommunity",
  navLabel: "MedCommunity",
  href: "/medcommunity",
  icon: createImageIcon("/icons/modules/medcommunity.png"),
  description: "Patient forums, peer support, and shared experiences",
  color: "pink",
};
