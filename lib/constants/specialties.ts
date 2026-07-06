// Single source of truth for the specialty list shown in the booking form
// filter and doctor self-registration — keeping these in one place avoids
// the two forms drifting apart (free text vs. filter options that no
// longer match).
export const SPECIALTIES = [
  "Oncology",
  "Cardiology",
  "Neurology",
  "Gastroenterology",
  "Endocrinology",
  "Orthopedic Surgery",
  "Hematology",
  "Rheumatology",
  "Pulmonology",
  "Psychiatry",
  "Other / Not sure",
] as const;
