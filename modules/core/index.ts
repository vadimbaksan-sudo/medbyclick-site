import type { ModuleDefinition } from "../types";
import { Settings } from "lucide-react";

export const coreModule: ModuleDefinition = {
  id: "core",
  name: "Core",
  navLabel: "Core",
  icon: Settings,
  description: "Authentication, users, and database infrastructure",
  color: "slate",
};
