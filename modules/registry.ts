import { moduleConfig } from "./config";
import type { ModuleDefinition } from "./types";
import { coreModule } from "./core";
import { medconnectModule } from "./medconnect";
import { medaiModule } from "./medai";
import { medtravelModule } from "./medtravel";
import { mededuModule } from "./mededu";
import { medpaymentsModule } from "./medpayments";
import { medcommunityModule } from "./medcommunity";
import { mdeventsModule } from "./medevents";
import { medsupportModule } from "./medsupport";
import { medglobaldbModule } from "./medglobaldb";
import { medtrialsModule } from "./medtrials";
import { medpharmaccessModule } from "./medpharmaccess";
import { medtokenModule } from "./medtoken";
import { medgiveModule } from "./medgive";

const ALL_MODULES: ModuleDefinition[] = [
  coreModule,
  medconnectModule,
  medaiModule,
  medtravelModule,
  mededuModule,
  medpaymentsModule,
  medcommunityModule,
  mdeventsModule,
  medsupportModule,
  medglobaldbModule,
  medtrialsModule,
  medpharmaccessModule,
  medtokenModule,
  medgiveModule,
];

export function getEnabledModules(): ModuleDefinition[] {
  return ALL_MODULES.filter((m) => moduleConfig[m.id as keyof typeof moduleConfig]);
}

export function getNavModules(): ModuleDefinition[] {
  return getEnabledModules().filter((m) => m.href !== undefined);
}
