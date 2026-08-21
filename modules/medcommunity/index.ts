import type { ModuleDefinition } from "../types";
import { MessageCircle } from "lucide-react";

export const medcommunityModule: ModuleDefinition = {
  id: "medcommunity",
  name: "MedCommunity",
  navLabel: "MedCommunity",
  href: "/medcommunity",
  icon: MessageCircle,
  description: "Patient forums, peer support, and shared experiences",
  color: "pink",
};
