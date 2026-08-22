import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medconnectModule: ModuleDefinition = {
  id: "medconnect",
  name: "MedConnect",
  navLabel: "MedConnect",
  href: "/medconnect",
  icon: createImageIcon("/icons/modules/medconnect.png"),
  description: "Personally vetted doctors, appointments, and consultations",
  color: "blue",
};
