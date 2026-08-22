import type { ComponentType } from "react";

export interface ModuleDefinition {
  id: string;
  name: string;
  navLabel: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  color: string;
}
