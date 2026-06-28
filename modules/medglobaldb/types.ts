export interface GlobalDoctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  institution: string;
  country: string;
  city: string;
  languages: string[];
  hIndex: number;
  publications: number;
  verified: boolean;
}
