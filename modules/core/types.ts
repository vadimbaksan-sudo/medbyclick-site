export interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor" | "admin";
  createdAt: string;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: string;
}
