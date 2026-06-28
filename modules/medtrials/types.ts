export interface ClinicalTrial {
  id: string;
  title: string;
  phase: "I" | "II" | "III" | "IV";
  status: "recruiting" | "active" | "completed" | "pending";
  condition: string;
  intervention: string;
  sponsor: string;
  location: string;
  eligibility: string[];
  description: string;
  estimatedCompletion: string;
}
