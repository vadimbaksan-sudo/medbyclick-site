import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medtrialsModule: ModuleDefinition = {
  id: "medtrials",
  name: "MedTrials",
  navLabel: "MedTrials",
  href: "/medtrials",
  icon: createImageIcon("/icons/modules/medtrials.png"),
  description: "Access to clinical research studies and experimental treatment matching",
  color: "teal",
};
