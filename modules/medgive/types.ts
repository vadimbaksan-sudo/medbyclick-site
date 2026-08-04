export interface GivingCampaign {
  id: string;
  patientDisplayName: string; // respects patient de-identification choice — may be a first name/initial only
  condition: string;
  clinicName: string;
  treatmentSummary: string;
  currency: string;
  fundingGoal: number;
  amountRaised: number;
  daysRemaining: number;
  urgency: "routine" | "time-sensitive" | "urgent";
  verified: boolean;
  deidentified: boolean;
  story: string;
}
