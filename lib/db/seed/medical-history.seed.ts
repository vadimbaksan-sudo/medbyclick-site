/**
 * SYNTHETIC DEMO DATA ONLY — see lib/db/schema.ts's medicalHistoryEntries
 * comment and spec §5.2. This is not tied to any real patient and is never
 * written to the database by any user-facing flow in this build; it exists
 * purely so the patient dashboard's medical history shell (app/dashboard)
 * has something plausible to render before Legal & Compliance clears real
 * data storage.
 */

export interface SyntheticMedicalHistoryEntry {
  id: string;
  entryType: "visit_note" | "lab_result" | "prescription" | "diagnosis";
  title: string;
  summary: string;
  recordedAt: string;
}

export const syntheticMedicalHistory: SyntheticMedicalHistoryEntry[] = [
  {
    id: "demo-1",
    entryType: "visit_note",
    title: "Initial consultation — Cardiology",
    summary: "Example visit note: routine cardiology consultation, no acute findings.",
    recordedAt: "2026-04-02",
  },
  {
    id: "demo-2",
    entryType: "lab_result",
    title: "Complete blood count (CBC)",
    summary: "Example lab result: all values within reference range.",
    recordedAt: "2026-04-10",
  },
  {
    id: "demo-3",
    entryType: "prescription",
    title: "Example prescription — Atorvastatin 10mg",
    summary: "Example prescription record: once daily, 90-day supply.",
    recordedAt: "2026-04-12",
  },
  {
    id: "demo-4",
    entryType: "diagnosis",
    title: "Example diagnosis note",
    summary: "Example diagnosis entry for illustration — not a real clinical record.",
    recordedAt: "2026-05-01",
  },
];
