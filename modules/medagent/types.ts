export type AgentTier = "bronze" | "silver" | "gold";

export type PipelineStage =
  | "inquiry"
  | "qualification"
  | "quote_sent"
  | "quote_accepted"
  | "treatment_in_progress"
  | "treatment_complete";

export interface ReferralCase {
  id: string;
  agentName: string;
  agentTier: AgentTier;
  patientRef: string; // pseudonymized reference, never a real name
  condition: string;
  destinationInstitution: string;
  stage: PipelineStage;
  estimatedValue: number;
  currency: string;
  commissionRate: number; // fraction, e.g. 0.08
  lastUpdated: string;
}
