export interface MedEvent {
  id: string;
  title: string;
  type: "conference" | "webinar" | "workshop" | "summit";
  date: string;
  location: string;
  description: string;
  speakers: string[];
  topics: string[];
  registrationOpen: boolean;
  price: string;
}
