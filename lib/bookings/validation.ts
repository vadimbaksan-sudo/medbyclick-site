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

/**
 * Doctor-side booking actions (spec §3.2/§3.4) — confirm/complete/decline/
 * add-notes on a booking already assigned to the caller's own doctor
 * profile. `bookingId` identifies which booking; the doctor's own profile
 * id is never part of this schema because it must always come from the
 * server-verified session (getCurrentDoctorProfile()), never from form
 * input.
 */
export const BookingActionSchema = z.object({
  bookingId: z.string().uuid("Invalid booking id."),
  action: z.enum(["confirm", "complete", "decline", "add_notes"]),
  notes: z.string().trim().optional().default(""),
});

export type BookingActionValues = z.infer<typeof BookingActionSchema>;

export interface BookingActionState {
  status: "idle" | "success" | "error";
  message?: string;
}
