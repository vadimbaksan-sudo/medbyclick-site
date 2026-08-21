import type { LucideIcon } from "lucide-react";

export interface ModuleDefinition {
  id: string;
  name: string;
  navLabel: string;
  href?: string;
  icon: LucideIcon;
  description: string;
  color: string;
}
