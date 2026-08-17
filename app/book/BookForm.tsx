"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Doctor } from "@/modules/medconnect/types";
import { submitBooking } from "@/lib/bookings/actions";
import { avatarGradientClass } from "@/lib/ui/avatarColor";
import { SPECIALTIES } from "@/lib/constants/specialties";
import type { BookingFormState } from "@/lib/bookings/validation";

type CaseType = "new" | "second-opinion" | "treatment-planning";
type Step = 1 | 2 | 3 | 4;

const CASE_TYPES: { id: CaseType; label: string; description: string }[] = [
  {
    id: "new",
    label: "Find the right specialist",
    description: "New or unresolved condition — I need the right expert, not just any expert",
  },
  {
    id: "second-opinion",
    label: "Get a second opinion",
    description: "I have a diagnosis and want it reviewed by an independent expert at a different hospital",
  },
  {
    id: "treatment-planning",
    label: "Decide on treatment",
    description: "I have a diagnosis and need guidance on which treatment path to take",
  },
];

const SPECIALTY_TO_DOCTOR: Record<string, string> = {
  "Oncology": "dr-elena-volkova",
  "Cardiology": "dr-mikhail-stern",
  "Neurology": "dr-rina-goldberg",
  "Gastroenterology": "dr-ariel-ben-david",
  "Endocrinology": "dr-natalya-chernova",
  "Orthopedic Surgery": "dr-yossi-levi",
  "Hematology": "dr-sofia-abramov",
  "Rheumatology": "dr-david-ofer",
  "Pulmonology": "dr-irina-blum",
  "Psychiatry": "dr-amir-cohen",
};

const DOCTOR_HOSPITAL: Record<string, string> = {
  "dr-elena-volkova": "Sheba Medical Center · Tel Hashomer",
  "dr-mikhail-stern": "Hadassah Medical Center · Jerusalem",
  "dr-rina-goldberg": "Tel Aviv University Medical · MS Clinic Chair",
  "dr-ariel-ben-david": "Rabin Medical Center · Petah Tikva",
  "dr-natalya-chernova": "Sourasky Medical Center (Ichilov) · Tel Aviv",
  "dr-yossi-levi": "Assuta Medical Center · Tel Aviv",
  "dr-sofia-abramov": "Rambam Health Care Campus · Haifa",
  "dr-david-ofer": "Hadassah Medical Center · Jerusalem",
  "dr-irina-blum": "Wolfson Medical Center · Holon",
  "dr-amir-cohen": "Soroka University Medical Center · Beer Sheva",
};

const ROUTING_RATIONALE: Record<string, string> = {
  "dr-elena-volkova":
    "Dr. Volkova is the founder's first call for oncology cases outside the standard protocol — rare tumors, treatment-resistant cancers, complex second opinions. She is at Sheba Medical Center, ranked #3 in the world.",
  "dr-mikhail-stern":
    "Dr. Stern trained at the Cleveland Clinic and is Hadassah's senior cardiologist for complex arrhythmia, heart failure, and pre-surgical evaluation. The founder's go-to for cardiology second opinions.",
  "dr-rina-goldberg":
    "Prof. Goldberg chairs the MS Clinic at Tel Aviv University — Israel's foremost expert on treatment-resistant neurological conditions. She has the patience to sit with diagnostic uncertainty most clinicians avoid.",
  "dr-ariel-ben-david":
    "Dr. Ben-David leads gastroenterology at Rabin and has managed IBD cases that failed every available biologic. He speaks fluent Russian and is the founder's call for any complex GI case.",
  "dr-natalya-chernova":
    "Dr. Chernova at Ichilov is one of very few endocrinologists in Israel who conducts full consultations in Russian. The founder sends her patients with metabolic complexity that others have missed.",
  "dr-yossi-levi":
    "Dr. Levi trained at New York's Hospital for Special Surgery — one of the world's top orthopedic programs — before returning to Israel. Known for honest second opinions on whether surgery is actually needed.",
  "dr-sofia-abramov":
    "Prof. Abramov leads hematology at Rambam and has caught rare blood malignancies missed by multiple other hematologists. The founder describes her as methodical in a way most clinicians simply aren't.",
  "dr-david-ofer":
    "Dr. Ofer trained in Paris and has spent two decades at Hadassah in autoimmune disease. He is the founder's referral for any case where joints and labs tell different stories.",
  "dr-irina-blum":
    "Dr. Blum at Wolfson is Israel's specialist for rare interstitial lung disease and one of few with deep experience in Long COVID pulmonary sequelae. Fluent in Russian.",
  "dr-amir-cohen":
    "Prof. Cohen directs the Psychosomatic Medicine Unit at Soroka. The founder sends him cases with major psychological-somatic overlap and patients who have been through multiple failed treatments.",
};

const initialState: BookingFormState = { status: "idle" };

export default function BookForm({ patientEmail, doctors }: { patientEmail: string; doctors: Doctor[] }) {
  const searchParams = useSearchParams();
  const preselectedDoctorId = searchParams.get("doctor") ?? "";

  const [step, setStep] = useState<Step>(preselectedDoctorId ? 3 : 1);
  const [caseType, setCaseType] = useState<CaseType | null>(null);
  const [specialty, setSpecialty] = useState("");
  const [situation, setSituation] = useState("");
  const [urgency, setUrgency] = useState<"routine" | "semi-urgent" | "urgent">("routine");
  const [language, setLanguage] = useState("Russian");

  const [state, action, pending] = useActionState(submitBooking, initialState);

  const matchedDoctorId = preselectedDoctorId || SPECIALTY_TO_DOCTOR[specialty] || "";
  const matchedDoctor = doctors.find((d) => d.id === matchedDoctorId) ?? null;
  const matchedHospital = matchedDoctorId ? DOCTOR_HOSPITAL[matchedDoctorId] : "";
  const matchedRationale = matchedDoctorId ? ROUTING_RATIONALE[matchedDoctorId] : "";

  const progressPct = ((step - 1) / 3) * 100;

  if (state.status === "success") {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Request received</h2>
          <p className="text-stone-500 mb-3 leading-relaxed text-sm">
            Our coordinator will review your case and confirm the appointment — usually within 24 hours.
          </p>
          {matchedDoctor && (
            <p className="text-stone-500 text-sm mb-2">
              Routing to: <strong className="text-stone-700">{matchedDoctor.name}</strong>
            </p>
          )}
          <p className="text-stone-400 text-xs mb-8">Confirmation sent to {patientEmail}</p>
          <Link href="/dashboard/" className="text-sm font-medium text-stone-700 hover:text-stone-900 underline">
            Go to your dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
          <span>Step {step} of 4</span>
          <span>{["Type", "Specialty", "Your case", "Review & submit"][step - 1]}</span>
        </div>
        <div className="h-0.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step 1 — Case type */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">What kind of help do you need?</h2>
          <p className="text-stone-500 text-sm mb-8 leading-relaxed">
            This helps us route your case to the right specialist and ask you the right questions.
          </p>
          <div className="space-y-3">
            {CASE_TYPES.map((ct) => (
              <button
                key={ct.id}
                type="button"
                onClick={() => { setCaseType(ct.id); setStep(2); }}
                className="w-full text-left p-5 border border-stone-200 rounded-lg hover:border-amber-400 hover:bg-amber-50/60 transition-all group"
              >
                <p className="font-semibold text-stone-900 group-hover:text-amber-800 transition-colors mb-1 text-sm">
                  {ct.label}
                </p>
                <p className="text-sm text-stone-500 leading-relaxed">{ct.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Specialty */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Which specialty do you need?</h2>
          <p className="text-stone-500 text-sm mb-8 leading-relaxed">
            We will use this to identify the best-matched specialist across our network. If unsure, select
            &ldquo;Other / Not sure&rdquo; — we will figure it out from your description.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setSpecialty(s); setStep(3); }}
                className={`p-3.5 border rounded-lg text-left transition-all text-sm font-medium leading-tight ${
                  specialty === s
                    ? "border-amber-500 bg-amber-50 text-amber-800"
                    : "border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3 — Situation */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Tell us about your case</h2>
          <p className="text-stone-500 text-sm mb-8 leading-relaxed">
            No medical records required at this stage. Describe what is happening — the more detail you share,
            the more precisely we can route your case.
          </p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Your situation <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={6}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder={
                  caseType === "second-opinion"
                    ? "What diagnosis did you receive? Which hospital gave it? What do you want a second expert to review or confirm?"
                    : caseType === "treatment-planning"
                    ? "What is your diagnosis? What treatment options were proposed? What are you trying to decide between?"
                    : "What is happening? What symptoms or test results prompted this? What have you already tried or been told?"
                }
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-3">Urgency</label>
                <div className="space-y-2">
                  {([
                    ["routine", "Routine — within 1–2 weeks"],
                    ["semi-urgent", "This week — a few days"],
                    ["urgent", "Urgent — as soon as possible"],
                  ] as const).map(([val, label]) => (
                    <label
                      key={val}
                      className="flex items-center gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer hover:border-stone-300 transition-colors"
                    >
                      <input
                        type="radio"
                        name="urgency-display"
                        value={val}
                        checked={urgency === val}
                        onChange={() => setUrgency(val)}
                        className="accent-amber-500"
                      />
                      <span className="text-sm text-stone-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-3">Consultation language</label>
                <div className="space-y-2">
                  {["Russian", "Hebrew", "English"].map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer hover:border-stone-300 transition-colors"
                    >
                      <input
                        type="radio"
                        name="language-display"
                        value={lang}
                        checked={language === lang}
                        onChange={() => setLanguage(lang)}
                        className="accent-amber-500"
                      />
                      <span className="text-sm text-stone-700">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {!preselectedDoctorId ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                disabled={!situation.trim()}
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-700 disabled:opacity-40 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                See your match →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 — Match preview + actual form */}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Your preliminary match</h2>
          <p className="text-stone-500 text-sm mb-6 leading-relaxed">
            Based on your case, we are routing you to this specialist. Our coordinator will review and confirm
            within 24 hours.
          </p>

          {matchedDoctor ? (
            <div className="border border-amber-300 bg-amber-50/60 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-full bg-linear-to-br ${avatarGradientClass(matchedDoctor.id)} flex items-center justify-center text-white font-bold text-xl shrink-0`}
                >
                  {matchedDoctor.name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900 text-lg leading-tight">{matchedDoctor.name}</p>
                  <p className="text-sm text-stone-500 mt-0.5">{matchedDoctor.title} · {matchedDoctor.specialty}</p>
                  <p className="text-xs text-amber-700 font-medium mt-1">{matchedHospital}</p>
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
                Why we&apos;re routing you here
              </p>
              <p className="text-sm text-stone-700 leading-relaxed">{matchedRationale}</p>

              <div className="mt-4 pt-4 border-t border-amber-200 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                <span>Responds {matchedDoctor.responseTime.toLowerCase()}</span>
                <span>{matchedDoctor.casesHandled} cases via MedByClick</span>
                <span className="text-amber-700 font-medium">Founder-verified</span>
              </div>
            </div>
          ) : (
            <div className="border border-stone-200 rounded-lg p-6 mb-6 bg-stone-50">
              <p className="text-sm font-semibold text-stone-900 mb-2">Coordinator-matched</p>
              <p className="text-sm text-stone-500 leading-relaxed">
                Our coordinator will review your case and route it to the best available specialist — usually
                within 24 hours.
              </p>
            </div>
          )}

          {/* Summary */}
          <div className="bg-stone-50 rounded-lg p-4 mb-5 text-sm text-stone-600 space-y-1.5">
            <div className="flex gap-2">
              <span className="text-stone-400 w-24 shrink-0">Request type</span>
              <span className="text-stone-800 font-medium">
                {CASE_TYPES.find((c) => c.id === caseType)?.label ?? "Specialist consultation"}
              </span>
            </div>
            {specialty && (
              <div className="flex gap-2">
                <span className="text-stone-400 w-24 shrink-0">Specialty</span>
                <span className="text-stone-800">{specialty}</span>
              </div>
            )}
            <div className="flex gap-2">
              <span className="text-stone-400 w-24 shrink-0">Urgency</span>
              <span className="text-stone-800">{urgency}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-stone-400 w-24 shrink-0">Language</span>
              <span className="text-stone-800">{language}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-stone-400 w-24 shrink-0">Account</span>
              <span className="text-stone-800">{patientEmail}</span>
            </div>
          </div>

          {/* Hidden form */}
          <form action={action} className="space-y-4">
            <input type="hidden" name="specialty" value={specialty} />
            <input type="hidden" name="doctor" value={matchedDoctorId} />
            <input type="hidden" name="urgency" value={urgency} />
            <input type="hidden" name="language" value={language} />
            <input
              type="hidden"
              name="situation"
              value={caseType ? `[${caseType}] ${situation}` : situation}
            />

            {state.status === "error" && state.message && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{state.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-700 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              {pending ? "Submitting…" : "Confirm and submit"}
            </button>

            <p className="text-xs text-stone-400 text-center leading-relaxed">
              Your information is confidential. We do not share patient details with third parties.
            </p>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
            >
              ← Edit my case description
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
