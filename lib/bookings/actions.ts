"use server";

import { revalidatePath } from "next/cache";
import { getAuthorizedUser, getCurrentDoctorProfile } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { computeSlaDeadline } from "@/lib/bookings/slaDeadline";
import {
  createBooking,
  findDoctorProfileBySlugOrId,
  confirmBookingForDoctor,
  completeBookingForDoctor,
  declineBookingForDoctor,
  addDoctorNotesToBooking,
} from "@/lib/db/queries/bookings";
import {
  BookingFormSchema,
  BookingActionSchema,
  type BookingFormState,
  type BookingActionState,
} from "./validation";

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
      // Phase B/F (docs/decision-log/0009): caseStage defaults to
      // "submitted" at the DB level; the SLA deadline depends on `urgency`
      // (a per-row value), so it can't be a static column default and is
      // computed here instead.
      slaDeadlineAt: computeSlaDeadline(urgency),
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

/**
 * Doctor-side booking action Server Action (spec §3.2/§3.4) — confirm,
 * complete, decline, or add notes on a booking. Same DAL shape as
 * submitBooking()/updateOwnDoctorProfile(): getAuthorizedUser(["doctor"])
 * first, then getCurrentDoctorProfile() derives the caller's own
 * doctor_profiles.id from the verified session — never from
 * formData/bookingId alone. Each query function
 * (lib/db/queries/bookings.ts) additionally scopes its update by
 * `doctorId = doctorProfile.id`, so a crafted bookingId for someone else's
 * booking simply matches zero rows.
 *
 * No reassignment to a specific other doctor, no cancellation — those stay
 * out of a doctor's authority per spec §3.3.
 */
export async function updateBookingAssignedToSelf(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  const auth = await getAuthorizedUser(["doctor"]);
  if ("error" in auth) {
    return {
      status: "error",
      message:
        auth.error === "unauthenticated"
          ? "Please log in to manage bookings."
          : "Only doctor accounts can manage bookings.",
    };
  }

  const doctorProfile = await getCurrentDoctorProfile();
  if (!doctorProfile) {
    return { status: "error", message: "Your account isn't linked to a doctor profile yet." };
  }

  const validated = BookingActionSchema.safeParse({
    bookingId: formData.get("bookingId"),
    action: formData.get("action"),
    notes: formData.get("notes") || "",
  });

  if (!validated.success) {
    return { status: "error", message: "Invalid request." };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "error",
      message: "Booking actions are not available yet — the database has not been configured.",
    };
  }

  const { bookingId, action, notes } = validated.data;

  try {
    let updated;
    switch (action) {
      case "confirm":
        updated = await confirmBookingForDoctor(bookingId, doctorProfile.id);
        break;
      case "complete":
        updated = await completeBookingForDoctor(bookingId, doctorProfile.id);
        break;
      case "decline":
        updated = await declineBookingForDoctor(bookingId, doctorProfile.id);
        break;
      case "add_notes":
        updated = await addDoctorNotesToBooking(bookingId, doctorProfile.id, notes);
        break;
    }

    if (!updated) {
      return {
        status: "error",
        message:
          "That booking isn't assigned to you, or isn't in a state this action applies to.",
      };
    }
  } catch (err) {
    console.error("[bookings/actions] Failed to update booking", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/doctor-dashboard");
  return { status: "success" };
}
