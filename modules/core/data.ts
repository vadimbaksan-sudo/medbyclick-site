import type { User } from "./types";

export const mockUsers: User[] = [
  { id: "u1", email: "admin@medbyclick.com", name: "Admin", role: "admin", createdAt: "2024-01-01" },
  { id: "u2", email: "patient@example.com", name: "Anna K.", role: "patient", createdAt: "2024-03-15" },
];
