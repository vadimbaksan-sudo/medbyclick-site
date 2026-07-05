"use server";

import { revalidatePath } from "next/cache";
import { getAuthorizedUser, getCurrentDoctorProfile } from "@/lib/auth/dal";
import { isDatabaseConfigured } from "@/lib/db/client";
import { updateOwnDoctorProfileRow } from "@/lib/db/queries/doctors";
import { UpdateDoctorProfileSchema, type DoctorProfileFormState } from "./validation";

/**
 * Doctor profile self-edit Server Action — spec §1.3's recommended pattern,
 * implemented exactly as described:
 *
 * 1. getAuthorizedUser(["doctor"]) — never trusts a client-supplied
 *    doctor/profile id.
 * 2. getCurrentDoctorProfile() confirms a doctor_profiles row is actually
 *    linked before allowing an edit at all.
 * 3. UpdateDoctorProfileSchema (lib/doctor-profile/validation.ts) only
 *    contains the §1.1 whitelist — vettingStatus/verified/specialty/
 *    institution/country/city/hIndex/publications/casesHandledOverride/
 *    slug/endorsement/availableForMissionTravel are not parseable keys.
 * 4. The Drizzle update (updateOwnDoctorProfileRow) is scoped by
 *    `eq(doctorProfiles.userId, session.userId)`, not by an id read from the
 *    request.
 */
export async function updateOwnDoctorProfile(
  _prevState: DoctorProfileFormState,
  formData: FormData
): Promise<DoctorProfileFormState> {
  const auth = await getAuthorizedUser(["doctor"]);
  if ("error" in auth) {
    return {
      status: "error",
      message:
        auth.error === "unauthenticated"
          ? "Please log in to edit your profile."
          : "Only doctor accounts can edit a doctor profile.",
    };
  }

  const doctorProfile = await getCurrentDoctorProfile();
  if (!doctorProfile) {
    return {
      status: "error",
      message: "Your account isn't linked to a doctor profile yet.",
    };
  }

  const validated = UpdateDoctorProfileSchema.safeParse({
    bio: formData.get("bio") || "",
    credentials: formData.get("credentials") || "",
    languages: formData.get("languages") || "",
    subspecialties: formData.get("subspecialties") || "",
    responseTime: formData.get("responseTime") || "",
    avatarUrl: formData.get("avatarUrl") || "",
    title: formData.get("title") || "",
  });

  if (!validated.success) {
    return { status: "error", errors: validated.error.flatten().fieldErrors };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "error",
      message:
        "Profile editing is not available yet — the database has not been configured " +
        "in this environment.",
    };
  }

  const { bio, credentials, languages, subspecialties, responseTime, avatarUrl, title } =
    validated.data;

  try {
    // Scoped by session userId (auth.user.id), never by doctorProfile.id
    // read from the request — the belt-and-suspenders check per spec §1.3.
    const updated = await updateOwnDoctorProfileRow(auth.user.id, {
      bio: bio || null,
      credentials: credentials || null,
      languages: languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
      subspecialties: subspecialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      responseTime: responseTime || null,
      avatarUrl: avatarUrl || null,
      title: title || null,
    });

    if (!updated) {
      return { status: "error", message: "Could not find your doctor profile to update." };
    }
  } catch (err) {
    console.error("[doctor-profile/actions] Failed to update doctor profile", err);
    return {
      status: "error",
      message: "Something went wrong while saving your profile. Please try again.",
    };
  }

  revalidatePath("/doctor-dashboard");
  return { status: "success", message: "Profile updated." };
}
