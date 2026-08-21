import type { ModuleDefinition } from "../types";
import { Stethoscope } from "lucide-react";

export const medconnectModule: ModuleDefinition = {
  id: "medconnect",
  name: "MedConnect",
  navLabel: "MedConnect",
  href: "/medconnect",
  icon: Stethoscope,
  description: "Personally vetted doctors, appointments, and consultations",
  color: "blue",
};
