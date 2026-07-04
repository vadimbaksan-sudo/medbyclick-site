# MedTravel Bidirectional Flow Spec — Israel-Only Destination Correction + Travel-Direction Data Model

Owner: **CTO/Product** (`docs/agents/CTO_PRODUCT.md`) · Status: **Spec — ready for Developer handoff**
Date: 2026-07-04
Trigger: Vadim corrected the real-world business model behind `medtravel`/`medconnect` — the actual
patient flow is CIS-to-Israel specifically (not general international medical tourism), and it is
**bidirectional**: Israeli doctors also travel to CIS countries to treat patients on-site, as an
alternative to the patient flying to Israel. Neither currently matches what's built.

**Per this role's Must-Not-Do: this document specifies, it does not implement. Developer builds from
this; nothing here is code.** It also does not resolve the cross-border licensing question flagged in
§3 — that is a Legal & Compliance dependency, named here but not answered here.

---

## 0. Grounding — confirmed current state by direct inspection (2026-07-04)

The 2026-07-02 QA report's characterization is **still accurate for the live page, but the full
picture is more interesting than "one discrepancy"**:

- **`/medtravel`** (`app/medtravel/page.tsx`, reading `modules/medtravel/data.ts`) — the live page,
  linked from nav (`modules/medtravel/index.ts`) — lists **three destinations**: Germany (Munich,
  Ludwig Maximilian University Hospital), Israel (Tel Aviv, Sheba Medical Center), Thailand (Bangkok,
  Bumrungrad International Hospital), each with invented ratings, price tiers, and named-hospital
  claims (e.g. "Top 10 world cancer center," "JCI accredited," "60+ languages spoken"). Each entry's
  `travelTime` field is phrased as "X h from Tel Aviv" — meaning the copy's own internal logic treats
  **Israel as the patient's home base flying elsewhere**, which contradicts the real model (CIS is the
  origin, Israel is the destination) on top of listing countries that aren't the real business at all.
- **`/medical-travel`** (`app/medical-travel/page.tsx`) — orphaned per `next.config.ts`'s permanent
  redirect to `/medtravel` (added by the 2026-07-02 QA fix), so unreachable by any real user — but its
  **content is already correct**: "Treatment in Israel, handled end-to-end," an Israel-only 4-city list
  (Tel Aviv/Sourasky & Assuta, Jerusalem/Hadassah, Petah Tikva/Rabin, Haifa/Rambam), Russian/Hebrew/
  English interpretation, and a stat block reading "15+ countries patients travel from — Primarily CIS
  and Europe." **This is the correct framing, currently being redirected away from in favor of the
  wrong one.** Worth naming plainly: the 2026-07-02 QA fix resolved a duplicate-route problem but, in
  picking which page wins, kept the page with the wrong business model and discarded the one with the
  right one.
- **`modules/medconnect`**'s seed doctors (`lib/db/seed/doctors.seed.ts`, the endorsement-filtered
  first ~10 entries) are Israel-based (Sheba, Hadassah, etc.), Russian/Hebrew/English-speaking —
  already consistent with the CIS-to-Israel direction. No change needed here.
- **`modules/medglobaldb`**'s seed doctors (Germany, India, France, USA, Japan — the same seed file's
  remaining ~5 entries) are a genuinely separate concept: a broader international academic-directory
  view over the same `doctor_profiles` table (per `docs/reports/product/2026-07-04-core-patient-doctor-cabinets-spec.md`
  §2.3/§3.1), not travel destinations. **Do not touch this** — it's correctly out of scope for this
  correction; conflating it with `medtravel`'s destination list would be a mistake in the other
  direction.
- **`lib/db/schema.ts`**: confirmed directly — `bookings` has no travel-direction concept of any kind
  (`status`, `urgency`, `source`, `specialty`, no country/direction field). `doctorProfiles` has
  `country`/`city` columns, but they are populated only for `medglobaldb`-style international academic
  entries (Germany, India, etc.) — describing where a directory listing's institution is, not "this
  doctor's home base" or "this doctor is available to travel." There is no flag anywhere for "willing
  to travel for on-site mission work." This confirms the task brief's suspicion: **the data model has
  no representation of "which party travels" at all.**
- **`docs/WHITEPAPER.md` §3.3** ("Cross-Border Medical Travel Infrastructure") is direction-agnostic —
  it lists logistics bullets (clinic selection, document coordination, language support, MBC escrow)
  without naming a destination country or direction either way. Not wrong, but silent, and worth
  tightening — see §4 below on why this document doesn't edit it directly.

---

## 1. Destination framing — recommendation: Israel-only, not "Israel + future placeholders"

**Drop Germany and Thailand entirely. Do not keep them as "coming soon" cards.**

Reasoning: a destination card isn't a roadmap note — it's a live consumer-facing claim with a named
hospital, a rating, and specific accreditation claims ("JCI accredited," "Top 10 world cancer center").
Keeping Ludwig Maximilian University Hospital or Bumrungrad International Hospital on the page as
"future" implies due diligence and a working relationship that doesn't exist. If Marina/Vadim want to
signal future expansion intent, that belongs in prose (roadmap, whitepaper narrative, an investor deck)
— not as a structured card with a hospital name and 92–98 rating a patient could reasonably act on.

Concrete change for Developer, next time `modules/medtravel` is touched:

- `modules/medtravel/data.ts`: replace the three-entry `destinations` array with an Israel-only set.
  Reuse `app/medical-travel`'s already-correct 4-city list (Tel Aviv, Jerusalem, Petah Tikva, Haifa)
  rather than inventing new copy — it already exists, is accurate, and is currently unreachable.
  Whether to model this as 4 `TravelDestination` rows (one per city) or collapse to a single "Israel"
  entry with multiple hospital affiliations is a UI-shape call left to Developer; the data must be
  Israel-only either way.
- Fix the `travelTime` framing bug: it should never again read as "from Tel Aviv" — the correct
  origin-destination logic is CIS country → Israel, not Israel → elsewhere.
- `app/medical-travel/page.tsx`: now fully redundant once `/medtravel` carries the correct content —
  recommend deleting the file (and its `next.config.ts` redirect entry) rather than leaving two
  contradictory pages around, one dead-code and one live. Low priority, no user-facing urgency (the
  redirect already makes it unreachable), but a maintenance-confusion risk to close out.

---

## 2. Travel direction — schema/field recommendation

This is additive and additional to §1 — it's the bigger structural change the task flagged as "more
significant than the destination-list fix."

### `bookings` (in `lib/db/schema.ts`)

- Add `travelDirection`, a new nullable pg enum: `pgEnum("travel_direction", ["patient_travels",
  "doctor_travels"])`. **Default/null means "not a cross-border-travel booking"** — this preserves
  every existing row and every non-`medtravel` booking flow (a routine local Israel booking, or a
  regular `medconnect` match) completely unchanged. Only bookings originating from the `medtravel` flow
  populate this field.
- Add `travelCountry`, a nullable `varchar(100)`. Populated only when `travelDirection = 'doctor_travels'`
  — the specific CIS country the doctor is flying to (needed for mission logistics/visa tracking, see
  §3). Not needed for `patient_travels`, since the destination is always Israel at this stage (§1) —
  the patient's origin country is already captured separately on `patientProfiles.citizenshipOrCountry`;
  don't duplicate it here.

### `doctorProfiles` (in `lib/db/schema.ts`)

- Add `availableForMissionTravel`, a boolean, default `false`. This is a **distinct concept from being
  Israel-based** — it answers "is this doctor willing/vetted to travel to a CIS country and perform
  on-site work," not "where is this doctor's home institution." None of the current seed doctors should
  default to `true`; this is a new commitment a doctor opts into, not an inferred property of their
  existing profile.
- Optional, lower-priority, phase-2 refinement (not required for the immediate fix): `missionCountries`
  as a nullable `jsonb` string array, naming which specific CIS countries a doctor is willing to travel
  to, once mission travel becomes a real feature rather than a flag.
- Recommend gating `availableForMissionTravel = true` behind a review step analogous to
  `vettingStatus`, not a self-service doctor-dashboard toggle — see the doctor-dashboard spec's existing
  pattern of "some fields are doctor-editable, some are admin/Medical-Community-only." Given §3's
  regulatory exposure, this flag is squarely in the "not doctor-editable" category.

### `modules/medtravel`'s own concept

The current `TravelDestination` type models one thing: "a place a patient can fly to." That's still the
right shape for the Israel-only patient-travels flow in §1. It is **not** the right shape for the
doctor-travels-to-CIS direction — that isn't "a destination card," it's "which of our doctors offer
mission travel, and to which countries," which is a property of `doctorProfiles`
(`availableForMissionTravel` / `missionCountries`), not a new static array in
`modules/medtravel/data.ts`. Recommend a distinct type (e.g. `MissionAvailability`) surfaced from a
`doctorProfiles` query once this becomes real, rather than extending `TravelDestination` to awkwardly
cover both directions. This is bigger than the immediate content fix and should be scoped as its own
Phase 3 kickoff spec item once the dependencies in §3 clear — not bundled into the destination-list fix,
which can and should ship on its own.

---

## 3. Downstream flags — not resolved here, dependencies for other roles

- **Cross-border medical-practice licensing for the doctor-travels-to-CIS direction — flagged as
  likely the larger and less-precedented regulatory question, needing its own Legal & Compliance
  review, not assumed covered by anything reviewed so far.** The patient-travels-to-Israel direction
  raises "is MedByClick acting as an unlicensed medical referral/coordination intermediary" — a
  question about the platform's own role. The doctor-travels-to-CIS direction raises a different and
  probably bigger one: **does an Israeli-licensed physician have any legal standing to perform
  procedures/surgery on Russian (or other CIS) soil at all**, independent of what MedByClick's platform
  does — foreign-physician licensing/registration in the destination country, whether Israeli malpractice
  insurance is valid extraterritorially, controlled-substance and medical-equipment import rules for a
  mission trip, and potential unauthorized-practice-of-medicine exposure in the destination
  jurisdiction. This is a distinct regulatory category (foreign professional licensing + potential host-
  country criminal liability) from anything reviewed for the reverse direction, and should get its own
  Legal & Compliance review before `availableForMissionTravel` becomes anything more than a schema flag.
- **Operational complexity of doctor mission trips** — visas, medical equipment logistics, local
  facility/OR partnerships, malpractice/liability insurance coverage abroad, and scheduling a mission
  trip against a doctor's existing Israel-based practice — is real work this spec does not attempt to
  resolve. Flagging for **Medical Community** input: do any of the currently-endorsed doctors actually
  do this today as part of Marina's existing informal network (the task brief suggests this predates
  the software), and if so, on what informal terms — that's the ground truth this schema should end up
  modeling, not an invented process.
- This spec unblocks the type/schema shape only. It does not greenlight building doctor-travels-to-CIS
  as a live bookable feature — that stays gated on the two consults above, consistent with
  `docs/ROADMAP.md` Phase 3's existing Legal & Compliance consult requirement for `medtravel` logistics
  generally.

---

## 4. WHITEPAPER.md §3.3 — recommendation, not a direct edit

Per `docs/TEAM_STRUCTURE.md`'s ownership table, `docs/WHITEPAPER.md` is owned by Web3 & Token Strategy
(token/tech sections) + Medical Advisory (medical sections) with joint sign-off on publication — §3.3
("Cross-Border Medical Travel Infrastructure") is business-model/product content that isn't cleanly
either, so per this task's own instruction this document is **not editing WHITEPAPER.md directly**;
the correction is recorded here for whichever role owns the next whitepaper revision pass:

> Current §3.3 text is destination/direction-agnostic (a logistics bullet list with no country or
> direction named). Recommend it explicitly state: (1) the current, real service is CIS-to-Israel
> patient travel — clinic/hospital selection within Israel, document coordination, on-the-ground
> Russian/Hebrew/English language support, MBC escrow for payment protection; (2) a second,
> bidirectional mode exists in the underlying business today (Israeli doctors traveling to CIS
> countries for on-site missions) but is **not yet a platform feature** — pending the Legal &
> Compliance and Medical Community dependencies in §3 above — and should be described, if at all, as a
> future direction rather than a current capability.

---

## 5. ROADMAP.md

Updated in place (`docs/ROADMAP.md` Phase 3 `medtravel` row) to reference this spec and name the
cross-border doctor-licensing consult as a distinct, additional item alongside the existing Legal &
Compliance consult for patient-side travel logistics.

---

## Addendum — 2026-07-04 (same day): Correction — Moscow and Moldova Are Real Doctor-Travels Destinations

**Trigger:** Vadim, relayed via the Coordinator, corrected §1 and §3 above before Developer builds
from either. Appended rather than silently rewritten, per the same practice other roles' reports have
used this session (e.g. the correction addendum in
`docs/reports/audit/2026-07-03-business-token-viability-audit.md`) — what changed and why should stay
visible, not disappear into the original text.

### A.1 The correction

§1's recommendation to drop Germany and Thailand stands — those were invented, with no real
partnership behind the named hospitals. But §1's framing of "Israel is the only real destination" was
**incomplete, not wrong**: it was correct for the patient-travels direction and silent on the
doctor-travels direction, because at the time of writing this document had not yet confirmed any real
doctor-travels destination existed. It now has: **MedByClick has real hospital partnerships in Moscow
(Russia) and Moldova**, where the visiting Israeli doctor operates under the host hospital's own
licensing framework. The exact legal mechanism isn't documented anywhere yet (see A.3), but the
practical arrangement itself is confirmed real, not hypothetical.

Corrected picture:

- **Patient-travels-to-Israel**: single real destination (Israel) — §1 unchanged.
- **Doctor-travels-to-CIS**: real destinations are **Moscow and Moldova** (specific partner hospitals),
  not a generic country list and not the invented Germany/Thailand pattern.

### A.2 What this changes for §2's schema/UI recommendation

§2's schema shape holds: `bookings.travelDirection`/`travelCountry` and
`doctorProfiles.availableForMissionTravel` are still the right fields, and `travelCountry` now has two
concrete real values to populate (`Russia`, `Moldova`) instead of being speculative. §2's point that
the doctor-travels direction needs "which of our doctors offer mission travel, to which
countries/partner hospitals" — not a `TravelDestination`-style card — also stands, and is now sharper:
that surface should model **specific partner hospitals in Moscow and Moldova**, the same way §1's
Israel list names Sourasky/Hadassah/Rabin/Rambam by name, not a repeat of the Germany/Thailand pattern
of an invented hospital name and a made-up rating.

**Input needed before real launch copy, flagged the same way any other real-data dependency would
be:** this document does not have the actual partner hospital names, cities, specialties, or contact/
relationship details for the Moscow and Moldova partnerships. Developer should build the schema and UI
to *support* real partner-hospital entries for the doctor-travels direction now, but the fields
themselves should stay empty/unpublished until Vadim/Marina supply the real partner data — do not
invent placeholder hospital names for Moscow/Moldova the way Germany/Thailand's cards currently do.
That would repeat exactly the mistake §1 is correcting, just relocated to a different pair of
countries.

### A.3 Softened Legal & Compliance flag

§3's framing — "does an Israeli-licensed physician have any legal standing to perform procedures on
CIS soil at all" — is answered in practice: yes, via the host hospital's own licensing framework in
each existing partnership. **This is no longer an open legal-risk question blocking the feature; it is
a documentation task.** Revised flag for Legal & Compliance: document how the existing Moscow and
Moldova hospital-partnership licensing arrangements actually work (what the host hospital's licensing
covers, whether it's a formal credentialing/locum arrangement or something else, whether malpractice
liability sits with the host hospital or the visiting doctor, any per-partnership variation between
Moscow and Moldova) — lower urgency than the original flag, informational rather than a blocker on
building the schema support in §2. The operational-complexity flag (visas, equipment, scheduling) and
the Medical Community input request (which doctors already do this, on what terms) from §3 both stand
unchanged — this correction narrows the legal question specifically, not the rest of §3.
