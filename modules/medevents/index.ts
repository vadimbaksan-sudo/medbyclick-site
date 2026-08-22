import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const mdeventsModule: ModuleDefinition = {
  id: "medevents",
  name: "MedEvents",
  navLabel: "MedEvents",
  href: "/medevents",
  icon: createImageIcon("/icons/modules/medevents.png"),
  description: "Medical conferences, webinars, and patient advocacy events",
  color: "orange",
};
