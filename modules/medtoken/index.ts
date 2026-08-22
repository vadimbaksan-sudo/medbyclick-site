import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medtokenModule: ModuleDefinition = {
  id: "medtoken",
  name: "MedToken",
  navLabel: "MedToken",
  href: "/medtoken",
  icon: createImageIcon("/icons/modules/medtoken.png"),
  description: "Token-based loyalty program and rewards for platform engagement",
  color: "yellow",
};
