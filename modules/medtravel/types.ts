// modules/medtravel's data model is split by travel direction (spec:
// docs/reports/product/2026-07-04-medtravel-bidirectional-flow-spec.md,
// including its same-day addendum) rather than one shape covering both:
//
// - `TravelDestination` — patient travels to Israel. A real destination card
//   with a named hospital, because the underlying partnership is real and
//   documented (spec §1).
// - `MissionDestination` — an Israeli doctor travels to a CIS country. The
//   partnership country is confirmed real (addendum A.1: Moscow, Moldova),
//   but the specific partner hospital's name has not been supplied yet, so
//   this type is deliberately shaped to force a placeholder marker
//   (`isPlaceholder`) rather than let a real-looking hospital name and
//   rating be invented the way the old Germany/Thailand cards were.

export interface HospitalAffiliation {
  city: string;
  hospital: string;
  specialties: string[];
}

export interface TravelDestination {
  id: string;
  country: string;
  tagline: string;
  // Framing: always time TO this destination FROM the patient's origin —
  // never the reverse. See spec §1's "travelTime framing bug" note.
  travelTime: string;
  description: string;
  hospitals: HospitalAffiliation[];
  languages: string[];
  highlights: string[];
}

export interface MissionDestination {
  id: string;
  country: string;
  // Deliberately not named `hospital` — the field name itself signals this
  // isn't a confirmed institution name yet. Real value pending Vadim/Marina
  // (spec addendum A.2). Never fill this with a guessed real hospital name.
  partnerHospital: string;
  // Always true today. Exists so the UI and any future data consumer can
  // detect + label placeholder entries without string-matching copy.
  isPlaceholder: true;
  description: string;
}
