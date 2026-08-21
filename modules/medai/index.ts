import type { ModuleDefinition } from "../types";
import { Bot } from "lucide-react";

export const medaiModule: ModuleDefinition = {
  id: "medai",
  name: "MedAI",
  navLabel: "MedAI",
  href: "/medai",
  icon: Bot,
  description: "AI-assisted symptom intake and specialist routing, reviewed by a coordinator",
  color: "violet",
};
