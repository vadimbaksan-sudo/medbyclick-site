import type { ModuleDefinition } from "../types";
import { Calendar } from "lucide-react";

export const mdeventsModule: ModuleDefinition = {
  id: "medevents",
  name: "MedEvents",
  navLabel: "MedEvents",
  href: "/medevents",
  icon: Calendar,
  description: "Medical conferences, webinars, and patient advocacy events",
  color: "orange",
};
