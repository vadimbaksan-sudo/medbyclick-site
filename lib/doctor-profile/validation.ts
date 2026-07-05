import { z } from "zod";

/**
 * Doctor profile self-edit whitelist (spec §1.1/§1.3). This schema's keys
 * are the ONLY fields a doctor can ever set through updateOwnDoctorProfile()
 * — `vettingStatus`, `verified`, `specialty`, `institution`, `country`,
 * `city`, `hIndex`, `publications`, `casesHandledOverride`, `slug`,
 * `endorsement`, and `availableForMissionTravel` must never appear as
 * parseable keys here, not merely be stripped after parsing. A field that
 * doesn't exist in this schema can't be smuggled in via a crafted request.
 */
export const UpdateDoctorProfileSchema = z.object({
  bio: z.string().trim().optional().default(""),
  credentials: z.string().trim().optional().default(""),
  // Comma-separated in the form UI, split into arrays before persisting.
  languages: z.string().trim().optional().default(""),
  subspecialties: z.string().trim().optional().default(""),
  responseTime: z.string().trim().optional().default(""),
  avatarUrl: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((v) => v === "" || z.string().url().safeParse(v).success, {
      message: "Enter a valid URL, or leave this blank.",
    }),
  title: z.string().trim().optional().default(""),
});

export type UpdateDoctorProfileValues = z.infer<typeof UpdateDoctorProfileSchema>;

export interface DoctorProfileFormState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<string, string[]>>;
  message?: string;
}
