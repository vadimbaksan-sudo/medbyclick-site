export type TravelerType = "patient" | "physician_trainee";

export type VisaStatus = "not_started" | "documents_requested" | "under_review" | "approved";

export type LogisticsStatus = "on_track" | "at_risk" | "delayed" | "resolved";

export interface LogisticsCase {
  id: string;
  travelerRef: string; // pseudonymized reference, never a real name
  travelerType: TravelerType;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
  visaStatus: VisaStatus;
  travelDate: string;
  status: LogisticsStatus;
  notes: string;
}
