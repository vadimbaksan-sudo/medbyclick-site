import { z } from "zod";

export const EnrollFormSchema = z.object({
  courseId: z.string().trim().min(1, "Missing course id."),
});

export const CourseProgressFormSchema = z.object({
  courseId: z.string().trim().min(1, "Missing course id."),
  action: z.enum(["start", "complete"]),
});

export interface CourseActionState {
  status: "idle" | "success" | "error";
  message?: string;
}
