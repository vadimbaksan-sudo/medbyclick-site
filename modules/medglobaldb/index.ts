import type { ModuleDefinition } from "../types";
import { createImageIcon } from "@/components/icons/createImageIcon";

export const medglobaldbModule: ModuleDefinition = {
  id: "medglobaldb",
  name: "MedGlobalDB",
  navLabel: "MedGlobalDB",
  href: "/medglobaldb",
  icon: createImageIcon("/icons/modules/medglobaldb.png"),
  description: "Searchable global database of verified specialist physicians",
  color: "cyan",
};
