export interface SymptomInput {
  symptoms: string;
  duration: string;
  severity: "mild" | "moderate" | "severe";
  age: number;
}

export interface DiagnosticResult {
  possibleConditions: { name: string; likelihood: "high" | "medium" | "low"; description: string }[];
  recommendedSpecialty: string;
  urgency: "routine" | "soon" | "urgent";
  disclaimer: string;
}
