export const moduleConfig = {
  core:           true,
  medconnect:     true,
  medai:          true,
  medtravel:      true,
  mededu:         true,
  medpayments:    true,
  medcommunity:   true,
  medevents:      true,
  medsupport:     true,
  medglobaldb:    true,
  medtrials:      true,
  medpharmaccess: true,
  medtoken:       true,
} as const satisfies Record<string, boolean>;

export type ModuleId = keyof typeof moduleConfig;
