export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  subspecialties: string[];
  languages: string[];
  credentials: string;
  endorsement: string;
  bio: string;
  casesHandled: number;
  responseTime: string;
  avatar?: string;
}
