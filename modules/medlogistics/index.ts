import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medlogisticsModule: ModuleDefinition = {
  id: "medlogistics",
  name: "MedLogistics",
  navLabel: "MedLogistics",
  href: "/medlogistics",
  icon: createImageIcon("/icons/modules/medlogistics.png"),
  description: "Visa, travel, and on-ground coordination for patients and physician trainees",
  color: "amber",
};
