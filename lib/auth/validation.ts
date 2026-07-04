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

export const LoginFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export interface AuthFormState {
  errors?: Partial<Record<string, string[]>>;
  message?: string;
}
