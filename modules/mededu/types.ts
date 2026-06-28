export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  enrolled: number;
  rating: number;
  language: string[];
}
