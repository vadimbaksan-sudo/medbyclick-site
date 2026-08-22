import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medtravelModule: ModuleDefinition = {
  id: "medtravel",
  name: "MedTravel",
  navLabel: "MedTravel",
  href: "/medtravel",
  icon: createImageIcon("/icons/modules/medtravel.png"),
  description: "Curated medical tourism packages and international care coordination",
  color: "emerald",
};
