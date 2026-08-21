import type { ModuleDefinition } from "../types";
import { Microscope } from "lucide-react";

export const medtrialsModule: ModuleDefinition = {
  id: "medtrials",
  name: "MedTrials",
  navLabel: "MedTrials",
  href: "/medtrials",
  icon: Microscope,
  description: "Access to clinical research studies and experimental treatment matching",
  color: "teal",
};
