export interface SupportMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
