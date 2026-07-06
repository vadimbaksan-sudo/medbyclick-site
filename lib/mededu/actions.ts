"use server";

import { revalidatePath } from "next/cache";
import { getAuthorizedUser } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { createEnrollment, updateEnrollmentProgress } from "@/lib/db/queries/course-enrollments";
import { courses } from "@/modules/mededu/data";
import { EnrollFormSchema, CourseProgressFormSchema, type CourseActionState } from "./validation";

/**
 * Enroll the current user in a course. Open to any authenticated role
 * (patient or student) — see lib/db/schema.ts's course_enrollments comment
 * for why this isn't role-gated to "student" only.
 */
export async function enrollInCourse(
  _prevState: CourseActionState,
  formData: FormData
): Promise<CourseActionState> {
  const auth = await getAuthorizedUser();
  if ("error" in auth) {
    return { status: "error", message: "Please log in to enroll in a course." };
  }

  const validated = EnrollFormSchema.safeParse({ courseId: formData.get("courseId") });
  if (!validated.success) {
    return { status: "error", message: "Invalid request." };
  }

  const { courseId } = validated.data;
  if (!courses.some((c) => c.id === courseId)) {
    return { status: "error", message: "That course doesn't exist." };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "error",
      message: "Enrollment is not available yet — the database has not been configured.",
    };
  }

  try {
    await createEnrollment(auth.user.id, courseId);
  } catch (err) {
    console.error("[mededu/actions] Failed to enroll", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/mededu");
  revalidatePath("/student-dashboard");
  return { status: "success" };
}

/**
 * Update progress on a course the caller is already enrolled in. `start`
 * moves enrolled -> in_progress (50%); `complete` moves to completed (100%).
 * No lesson-level granularity yet since modules/mededu's Course type has no
 * lesson sub-structure — kept honestly simple rather than faking a
 * lesson-by-lesson tracker that doesn't exist.
 */
export async function updateCourseProgress(
  _prevState: CourseActionState,
  formData: FormData
): Promise<CourseActionState> {
  const auth = await getAuthorizedUser();
  if ("error" in auth) {
    return { status: "error", message: "Please log in to update course progress." };
  }

  const validated = CourseProgressFormSchema.safeParse({
    courseId: formData.get("courseId"),
    action: formData.get("action"),
  });
  if (!validated.success) {
    return { status: "error", message: "Invalid request." };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "error",
      message: "Progress tracking is not available yet — the database has not been configured.",
    };
  }

  const { courseId, action } = validated.data;

  try {
    const updated = await updateEnrollmentProgress(
      auth.user.id,
      courseId,
      action === "complete" ? "completed" : "in_progress"
    );
    if (!updated) {
      return { status: "error", message: "You aren't enrolled in that course yet." };
    }
  } catch (err) {
    console.error("[mededu/actions] Failed to update progress", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/mededu");
  revalidatePath("/student-dashboard");
  return { status: "success" };
}
