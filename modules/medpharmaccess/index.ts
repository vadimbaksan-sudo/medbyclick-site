import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medpharmaccessModule: ModuleDefinition = {
  id: "medpharmaccess",
  name: "MedPharmaAccess",
  navLabel: "MedPharmaAccess",
  href: "/medpharmaccess",
  icon: createImageIcon("/icons/modules/medpharmaccess.png"),
  description: "Cross-border medication access, rare drug sourcing, and prescription support",
  color: "indigo",
};
