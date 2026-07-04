import { z } from "zod";

export const BookingFormSchema = z.object({
  doctor: z.string().trim().optional().default(""),
  specialty: z.string().trim().optional().default(""),
  situation: z.string().trim().min(1, "Please describe your case."),
  urgency: z.enum(["routine", "semi-urgent", "urgent"]).default("routine"),
  language: z.string().trim().min(1).default("Russian"),
});

export type BookingFormValues = z.infer<typeof BookingFormSchema>;

export interface BookingFormState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<string, string[]>>;
  message?: string;
}
