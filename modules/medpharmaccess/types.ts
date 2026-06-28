export interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  indication: string;
  availability: "available" | "limited" | "import-only" | "compassionate";
  countries: string[];
  description: string;
  requiresPrescription: boolean;
}
