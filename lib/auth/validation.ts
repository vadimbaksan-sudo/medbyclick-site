import { z } from "zod";

/**
 * Shared validation schemas for the real login/register forms
 * (app/login, app/register), used both client-side (useActionState error
 * display) and server-side (the actual gate — never trust the client).
 */

export const RegisterFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  // Not a UI afterthought — see lib/db/schema.ts's patientProfiles comment
  // and spec §2.3's citizenship_or_country note (152-FZ proxy field).
  citizenshipOrCountry: z.string().trim().min(1, "Please select your citizenship / country."),
  preferredLanguage: z.enum(["ru", "en", "he"]).default("ru"),
});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

/**
 * Doctor self-registration (app/register/doctor, lib/auth/actions.ts's
 * registerDoctor()) — per
 * docs/reports/product/2026-07-04-doctor-dashboard-spec.md §2. Deliberately
 * only contains the fields a doctor is allowed to self-declare at
 * registration (name, specialty, self-claimed credentials, languages, plus
 * §1.1's editable-fields whitelist). `vettingStatus`/`verified` are NOT
 * parseable keys here at all — they are hardcoded in the Server Action, never
 * derived from form input, so there is no field to smuggle a value through.
 */
export const RegisterDoctorFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  // Required by the doctor_profiles schema (specialty is NOT NULL) — this is
  // the doctor's claimed specialty for Medical Community to verify during
  // vetting, not a self-certified fact. Changing it later requires the
  // request-based flow named in the spec's §1.2/§5, not a self-edit.
  specialty: z.string().trim().min(1, "Specialty is required."),
  title: z.string().trim().optional().default(""),
  credentials: z.string().trim().optional().default(""),
  bio: z.string().trim().optional().default(""),
  // Comma-separated in the form UI, split into an array before persisting.
  languages: z.string().trim().optional().default(""),
  preferredLanguage: z.enum(["ru", "en", "he"]).default("ru"),
});

export type RegisterDoctorFormValues = z.infer<typeof RegisterDoctorFormSchema>;

/**
 * Student self-registration (app/register/student, lib/auth/actions.ts's
 * registerStudent()). Deliberately minimal — a student account has no
 * profile table of its own (see lib/db/schema.ts's course_enrollments
 * comment); the only student-specific data is which courses they've
 * enrolled in, created separately via lib/mededu/actions.ts once they
 * actually enroll, not at registration time.
 */
export const RegisterStudentFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  preferredLanguage: z.enum(["ru", "en", "he"]).default("ru"),
});

export type RegisterStudentFormValues = z.infer<typeof RegisterStudentFormSchema>;

export const LoginFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export interface AuthFormState {
  errors?: Partial<Record<string, string[]>>;
  message?: string;
}
