import type { LogisticsCase } from "./types";

// Placeholder/preview data only — no real travelers, no real bookings.
// See app/medlogistics/page.tsx disclaimer.
export const logisticsCases: LogisticsCase[] = [
  {
    id: "log-1",
    travelerRef: "Case #4471",
    travelerType: "patient",
    originCountry: "Russia",
    destinationCity: "Tel Aviv",
    destinationCountry: "Israel",
    visaStatus: "approved",
    travelDate: "2026-08-22",
    status: "on_track",
    notes: "Wheelchair assistance flagged for outbound flight.",
  },
  {
    id: "log-2",
    travelerRef: "Case #4488",
    travelerType: "patient",
    originCountry: "Moldova",
    destinationCity: "Tel Aviv",
    destinationCountry: "Israel",
    visaStatus: "under_review",
    travelDate: "2026-09-03",
    status: "on_track",
    notes: "Awaiting embassy processing, within normal SLA window.",
  },
  {
    id: "log-3",
    travelerRef: "Case #4502",
    travelerType: "patient",
    originCountry: "Ukraine",
    destinationCity: "Tel Aviv",
    destinationCountry: "Israel",
    visaStatus: "documents_requested",
    travelDate: "2026-09-10",
    status: "at_risk",
    notes: "Missing invitation letter from treating clinic — follow-up sent.",
  },
  {
    id: "log-4",
    travelerRef: "Fellowship #112",
    travelerType: "physician_trainee",
    originCountry: "Moldova",
    destinationCity: "Tel Aviv",
    destinationCountry: "Israel",
    visaStatus: "approved",
    travelDate: "2026-10-01",
    status: "on_track",
    notes: "3-month cardiology observership — institutional housing confirmed.",
  },
];
