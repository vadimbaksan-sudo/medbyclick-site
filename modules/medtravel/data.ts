import type { TravelDestination, MissionDestination } from "./types";

// ---------------------------------------------------------------------------
// Patient-travels-to-Israel direction.
//
// Per docs/reports/product/2026-07-04-medtravel-bidirectional-flow-spec.md
// §1: the real business is CIS-to-Israel patient travel, not general
// international medical tourism. Israel is the only real destination for
// this direction — the previous Germany/Thailand cards were invented
// (fake hospital names, ratings, and accreditation claims) and have been
// removed rather than kept as "coming soon" placeholders.
//
// Content below is reused from the now-redundant app/medical-travel/page.tsx,
// which already had the correct Israel-only framing (real hospitals:
// Sourasky, Hadassah, Rabin, Rambam) — not reinvented here.
// ---------------------------------------------------------------------------

export const destinations: TravelDestination[] = [
  {
    id: "israel",
    country: "Israel",
    tagline: "Treatment in Israel, handled end-to-end",
    // Framing fix (spec §1): this must read as time TO Israel FROM the
    // patient's CIS origin — never "from Tel Aviv outward." The patient is
    // the one traveling in this direction, not the doctor.
    travelTime: "Typically 3-5h flight from most CIS countries",
    description:
      "We coordinate every aspect of your medical journey to Israel — from the first specialist consultation to your flight home. You focus on your health; we handle the logistics.",
    hospitals: [
      {
        city: "Tel Aviv",
        hospital: "Sourasky (Ichilov) & Assuta",
        specialties: ["Oncology", "Cardiology", "Orthopedics"],
      },
      {
        city: "Jerusalem",
        hospital: "Hadassah Ein Kerem & Mt Scopus",
        specialties: ["Neurology", "Rare diseases", "Hematology"],
      },
      {
        city: "Petah Tikva",
        hospital: "Rabin Medical Center (Beilinson)",
        specialties: ["Gastroenterology", "Transplant", "Pediatrics"],
      },
      {
        city: "Haifa",
        hospital: "Rambam Health Care Campus",
        specialties: ["Trauma", "Oncology", "Cardiac surgery"],
      },
    ],
    languages: ["Russian", "Hebrew", "English"],
    highlights: [
      "40+ years of clinical relationships — founder's personal network",
      "Medical record translation & preparation",
      "24/7 coordination line throughout the trip",
    ],
  },
];

// ---------------------------------------------------------------------------
// Doctor-travels-to-CIS direction.
//
// Per the spec's same-day addendum (A.1/A.2): MedByClick has real, confirmed
// hospital partnerships in Moscow (Russia) and Moldova, where a visiting
// Israeli doctor operates under the host hospital's own licensing framework.
// This is NOT hypothetical and these are NOT the Germany/Thailand pattern —
// the partnership country is real.
//
// TODO(vadim/marina): the specific partner hospital name, city-level detail,
// and specialties for each country have not been supplied yet. Per Vadim's
// explicit instruction (2026-07-04), do not invent a specific hospital name
// or rating to fill the gap the way the old Germany/Thailand cards did.
// `partnerHospital` below is a deliberately obvious placeholder — replace it
// with the real name once it's confirmed, and only then.
// ---------------------------------------------------------------------------

export const missionDestinations: MissionDestination[] = [
  {
    id: "russia-moscow",
    country: "Russia — Moscow",
    partnerHospital: "Partner Hospital — Moscow (name pending)",
    isPlaceholder: true,
    description:
      "Confirmed hospital partnership in Moscow. A visiting Israeli doctor treats patients on-site under the host hospital's own licensing framework. Partner hospital name and specialty details are pending and will be published once confirmed.",
  },
  {
    id: "moldova",
    country: "Moldova",
    partnerHospital: "Partner Hospital — Moldova (name pending)",
    isPlaceholder: true,
    description:
      "Confirmed hospital partnership in Moldova. A visiting Israeli doctor treats patients on-site under the host hospital's own licensing framework. Partner hospital name and specialty details are pending and will be published once confirmed.",
  },
];
