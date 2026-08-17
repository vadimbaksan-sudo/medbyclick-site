/**
 * SYNTHETIC DEMO DATA ONLY — see lib/db/schema.ts's case_documents /
 * second_opinion_reports / consilium_opinions comment block and
 * docs/decision-log/0009-medconnect-state-machine-build-plan.md Phase
 * C/E/G. None of this is tied to a real patient or a real booking, and no
 * user-facing flow in this build writes real content into those tables —
 * this exists purely so the case-detail UI shells have something plausible
 * to render before Legal & Compliance clears real clinical-content storage
 * (same gate as medical-history.seed.ts).
 */

export interface SyntheticCaseDocument {
  id: string;
  documentType: "dicom_imaging" | "lab_report" | "pathology_report" | "discharge_summary" | "prescription" | "other";
  title: string;
  status: "uploaded" | "missing";
}

export const syntheticCaseDocuments: SyntheticCaseDocument[] = [
  { id: "doc-1", documentType: "lab_report", title: "Complete blood count (CBC)", status: "uploaded" },
  { id: "doc-2", documentType: "pathology_report", title: "Biopsy report — referenced in intake", status: "missing" },
  { id: "doc-3", documentType: "dicom_imaging", title: "MRI series (chest)", status: "uploaded" },
  { id: "doc-4", documentType: "discharge_summary", title: "Prior hospital discharge summary", status: "uploaded" },
];

export interface SyntheticSecondOpinionReport {
  doctorName: string;
  diagnosisConcurrence: "concurs" | "diverges" | "partial";
  diagnosisNotes: string;
  alternativeTreatments: string;
  riskAssessment: string;
  recommendedNextSteps: string;
  signedAt: string;
}

export const syntheticSecondOpinionReport: SyntheticSecondOpinionReport = {
  doctorName: "Dr. Elena Volkova",
  diagnosisConcurrence: "partial",
  diagnosisNotes:
    "Example: concurs with the primary diagnosis but recommends an additional staging scan before finalizing treatment planning.",
  alternativeTreatments:
    "Example: neoadjuvant chemotherapy prior to surgery, as an alternative to immediate resection.",
  riskAssessment: "Example: moderate surgical risk given prior cardiac history — cardiology clearance recommended first.",
  recommendedNextSteps: "Example: repeat imaging in 4 weeks, cardiology consult, reconvene to finalize treatment path.",
  signedAt: "2026-08-10T14:30:00Z",
};

export interface SyntheticConsiliumOpinion {
  doctorName: string;
  role: "lead" | "participant";
  opinionText: string;
  concurs: boolean;
}

export const syntheticConsiliumOpinions: SyntheticConsiliumOpinion[] = [
  {
    doctorName: "Dr. Elena Volkova",
    role: "lead",
    opinionText: "Example: recommend surgical resection following neoadjuvant therapy.",
    concurs: true,
  },
  {
    doctorName: "Dr. Mikhail Stern",
    role: "participant",
    opinionText: "Example: agree with resection but flag cardiac risk — recommend clearance first.",
    concurs: true,
  },
  {
    doctorName: "Dr. Rina Goldberg",
    role: "participant",
    opinionText: "Example: dissenting view — would prioritize a second staging scan before committing to a surgical plan.",
    concurs: false,
  },
];
