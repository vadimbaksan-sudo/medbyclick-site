import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medaiModule: ModuleDefinition = {
  id: "medai",
  name: "MedAI",
  navLabel: "MedAI",
  href: "/medai",
  icon: createImageIcon("/icons/modules/medai.png"),
  description: "AI-assisted symptom intake and specialist routing, reviewed by a coordinator",
  color: "violet",
};
