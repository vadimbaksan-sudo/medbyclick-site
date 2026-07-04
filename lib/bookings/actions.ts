"use server";

import { getAuthorizedUser } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { createBooking, findDoctorProfileBySlugOrId } from "@/lib/db/queries/bookings";
import { BookingFormSchema, type BookingFormState } from "./validation";

/**
 * Real booking Server Action — replaces app/book/BookForm.tsx's fake
 * `setTimeout` (spec §3.2). Booking is the first place in the app where
 * auth actually gates something: the patient identity comes from the
 * verified session (getAuthorizedUser), never from client-supplied
 * name/email fields, per the Next 16 auth guide's warning to treat Server
 * Actions like public API endpoints.
 */
export async function submitBooking(
  _prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const auth = await getAuthorizedUser(["patient"]);
  if ("error" in auth) {
    return {
      status: "error",
      message:
        auth.error === "unauthenticated"
          ? "Please log in to book a consultation."
          : "Only patient accounts can book consultations.",
    };
  }

  const validated = BookingFormSchema.safeParse({
    doctor: formData.get("doctor"),
    specialty: formData.get("specialty"),
    situation: formData.get("situation"),
    urgency: formData.get("urgency"),
    language: formData.get("language"),
  });

  if (!validated.success) {
    return { status: "error", errors: validated.error.flatten().fieldErrors };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "error",
      message:
        "Booking is not available yet — the database has not been configured " +
        "in this environment. Please contact a coordinator directly.",
    };
  }

  const { doctor, specialty, situation, urgency, language } = validated.data;

  try {
    const doctorProfile = doctor ? await findDoctorProfileBySlugOrId(doctor) : null;

    await createBooking({
      patientId: auth.user.id,
      doctorId: doctorProfile?.id ?? null,
      specialty: specialty || doctorProfile?.specialty || null,
      situationNotes: situation,
      urgency,
      language,
      source: "book-form",
      status: "requested",
    });
  } catch (err) {
    console.error("[bookings/actions] Failed to create booking", err);
    return {
      status: "error",
      message: "Something went wrong while submitting your request. Please try again.",
    };
  }

  return { status: "success" };
}
