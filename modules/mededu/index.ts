import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const mededuModule: ModuleDefinition = {
  id: "mededu",
  name: "MedEdu",
  navLabel: "MedEdu",
  href: "/mededu",
  icon: createImageIcon("/icons/modules/mededu.png"),
  description: "CME courses, patient education, and medical knowledge base",
  color: "amber",
};
