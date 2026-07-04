/**
 * Drizzle ORM schema — the real database backing auth, doctor profiles,
 * bookings, payments, and medical history.
 *
 * Vendor: Supabase Postgres (queried via Drizzle, per
 * docs/reports/product/2026-07-04-core-patient-doctor-cabinets-spec.md §1.4/§2.2).
 *
 * Identity model: Supabase Auth owns `auth.users` (email/password, hashing,
 * verification, password reset — all vendor-managed). This schema's `users`
 * table is a *public-schema* profile row keyed by the same UUID as the
 * Supabase Auth user (`auth.users.id`). We never store or hash passwords
 * ourselves — see lib/auth/actions.ts for the sign-up/sign-in flow.
 *
 * No live Supabase project exists in this environment. This file defines the
 * schema Drizzle Kit uses to generate SQL migrations (see drizzle/ and
 * drizzle.config.ts) — apply those migrations against a real Supabase
 * Postgres instance once DATABASE_URL is supplied.
 */

import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  boolean,
  integer,
  numeric,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const userRoleEnum = pgEnum("user_role", ["patient", "doctor", "admin"]);

export const localeEnum = pgEnum("locale", ["ru", "en", "he"]);

export const vettingStatusEnum = pgEnum("vetting_status", [
  "pending",
  "approved",
  "rejected",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "requested",
  "confirmed",
  "completed",
  "cancelled",
]);

export const bookingUrgencyEnum = pgEnum("booking_urgency", [
  "routine",
  "semi-urgent",
  "urgent",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "crypto",
  "mbc",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);

export const paymentProviderEnum = pgEnum("payment_provider", ["stripe"]);

export const medicalEntryTypeEnum = pgEnum("medical_entry_type", [
  "visit_note",
  "lab_result",
  "prescription",
  "diagnosis",
]);

// ---------------------------------------------------------------------------
// users — public-schema profile row, 1:1 with Supabase auth.users by id.
// ---------------------------------------------------------------------------

export const users = pgTable("users", {
  // Same UUID as auth.users.id (Supabase-managed). Not a Drizzle-generated
  // default because the row is always created right after
  // supabase.auth.signUp() succeeds, using that call's returned user id.
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  role: userRoleEnum("role").notNull().default("patient"),
  locale: localeEnum("locale").notNull().default("ru"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ([
  uniqueIndex("users_email_unique_idx").on(table.email),
]));

export const usersRelations = relations(users, ({ one, many }) => ({
  patientProfile: one(patientProfiles, {
    fields: [users.id],
    references: [patientProfiles.userId],
  }),
  doctorProfile: one(doctorProfiles, {
    fields: [users.id],
    references: [doctorProfiles.userId],
  }),
  bookingsAsPatient: many(bookings),
  payments: many(payments),
  medicalHistoryEntries: many(medicalHistoryEntries),
}));

// ---------------------------------------------------------------------------
// patient_profiles — 1:1 with users where role = 'patient'.
// ---------------------------------------------------------------------------

export const patientProfiles = pgTable("patient_profiles", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  dateOfBirth: timestamp("date_of_birth", { mode: "date" }),
  phone: varchar("phone", { length: 40 }),
  preferredLanguage: varchar("preferred_language", { length: 40 }),
  // Not decorative — see docs/reports/legal/2026-07-04-medai-llm-data-handling-review.md
  // §1. 152-FZ's localization duty attaches to Russian *citizenship*, not
  // Russian-language UI usage, so this is captured separately from locale/
  // preferredLanguage even though no policy consumes it yet.
  citizenshipOrCountry: varchar("citizenship_or_country", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const patientProfilesRelations = relations(patientProfiles, ({ one }) => ({
  user: one(users, {
    fields: [patientProfiles.userId],
    references: [users.id],
  }),
}));

// ---------------------------------------------------------------------------
// doctor_profiles — the single source of truth resolving medconnect.Doctor
// and medglobaldb.GlobalDoctor into one table (spec §2.3/§3.1).
//
// `userId` is nullable: seed/placeholder doctors (the existing 10 medconnect
// + 5 medglobaldb entries) don't have a real login account yet. It's
// populated once a doctor is actually onboarded (Medical Community vetting
// workflow + real registration — out of scope for this pass, see
// docs/agents/DEVELOPER.md task scope). `bookings.doctor_id` references
// this table's own `id`, not `userId`, precisely so a booking can target a
// not-yet-onboarded seed doctor.
// ---------------------------------------------------------------------------

export const doctorProfiles = pgTable("doctor_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  // Stable, human-readable identifier for URLs (e.g. /doctors/dr-elena-volkova)
  // that survives a re-seed. Carried over from the pre-DB
  // modules/medconnect + modules/medglobaldb mock ids (spec §3.1's
  // migration note) so existing doctor profile links keep working.
  slug: varchar("slug", { length: 120 }),

  name: varchar("name", { length: 200 }).notNull(),
  title: varchar("title", { length: 100 }),
  specialty: varchar("specialty", { length: 150 }).notNull(),
  subspecialties: jsonb("subspecialties").$type<string[]>().notNull().default([]),
  languages: jsonb("languages").$type<string[]>().notNull().default([]),
  credentials: text("credentials"),
  bio: text("bio"),
  endorsement: text("endorsement"),
  avatarUrl: text("avatar_url"),

  // medconnect-style local-network fields
  casesHandledOverride: integer("cases_handled_override"),
  responseTime: varchar("response_time", { length: 80 }),

  // medglobaldb-style international-directory fields
  institution: varchar("institution", { length: 250 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  hIndex: integer("h_index"),
  publications: integer("publications"),

  verified: boolean("verified").notNull().default(false),
  vettingStatus: vettingStatusEnum("vetting_status").notNull().default("pending"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ([
  index("doctor_profiles_vetting_status_idx").on(table.vettingStatus),
  index("doctor_profiles_specialty_idx").on(table.specialty),
  uniqueIndex("doctor_profiles_slug_unique_idx").on(table.slug),
]));

export const doctorProfilesRelations = relations(doctorProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [doctorProfiles.userId],
    references: [users.id],
  }),
  bookings: many(bookings),
}));

// ---------------------------------------------------------------------------
// bookings — replaces app/book/BookForm.tsx's fake setTimeout.
// ---------------------------------------------------------------------------

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  patientId: uuid("patient_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id").references(() => doctorProfiles.id, { onDelete: "set null" }),

  status: bookingStatusEnum("status").notNull().default("requested"),
  requestedAt: timestamp("requested_at", { withTimezone: true }).notNull().defaultNow(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),

  specialty: varchar("specialty", { length: 150 }),
  situationNotes: text("situation_notes").notNull(),
  urgency: bookingUrgencyEnum("urgency").notNull().default("routine"),
  language: varchar("language", { length: 40 }),
  // Which plan/flow created it, e.g. "book-form", "medai-intake".
  source: varchar("source", { length: 80 }).notNull().default("book-form"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ([
  index("bookings_patient_id_idx").on(table.patientId),
  index("bookings_doctor_id_idx").on(table.doctorId),
  index("bookings_status_idx").on(table.status),
]));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  patient: one(users, {
    fields: [bookings.patientId],
    references: [users.id],
  }),
  doctor: one(doctorProfiles, {
    fields: [bookings.doctorId],
    references: [doctorProfiles.id],
  }),
  payments: many(payments),
}));

// ---------------------------------------------------------------------------
// payments — persisted receipt table for Stripe (and, later, other
// providers) payment history.
// ---------------------------------------------------------------------------

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  bookingId: uuid("booking_id").references(() => bookings.id, { onDelete: "set null" }),

  planId: varchar("plan_id", { length: 80 }).notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("USD"),
  paymentMethod: paymentMethodEnum("payment_method").notNull().default("card"),
  status: paymentStatusEnum("status").notNull().default("pending"),
  provider: paymentProviderEnum("provider").notNull().default("stripe"),
  providerPaymentIntentId: varchar("provider_payment_intent_id", { length: 200 }),
  receiptUrl: text("receipt_url"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ([
  index("payments_user_id_idx").on(table.userId),
  uniqueIndex("payments_provider_intent_unique_idx").on(table.providerPaymentIntentId),
]));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
}));

// ---------------------------------------------------------------------------
// medical_history_entries — SCHEMA + UI SHELL ONLY, SYNTHETIC DATA ONLY.
//
// Per spec §5.2: Legal & Compliance consult (retention policy, data
// residency, jurisdiction handling) is a hard dependency before any real
// patient-entered or doctor-entered data is stored here. No application
// code in this build writes real patient data into this table — see
// lib/db/seed/medical-history.seed.ts and the dashboard UI shell, which are
// synthetic/demo data only.
// ---------------------------------------------------------------------------

export const medicalHistoryEntries = pgTable("medical_history_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  patientId: uuid("patient_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id").references(() => doctorProfiles.id, { onDelete: "set null" }),

  entryType: medicalEntryTypeEnum("entry_type").notNull(),
  title: varchar("title", { length: 250 }).notNull(),
  bodyOrStructuredPayload: jsonb("body_or_structured_payload").$type<Record<string, unknown> | string>(),
  attachmentRef: text("attachment_ref"),

  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

  // Hard synthetic-data-only gate, enforced in application code (see
  // lib/db/queries/medical-history.ts) — not just documentation. Real rows
  // must never set this to false until Legal & Compliance clears §5.2.
  isSynthetic: boolean("is_synthetic").notNull().default(true),
}, (table) => ([
  index("medical_history_entries_patient_id_idx").on(table.patientId),
]));

export const medicalHistoryEntriesRelations = relations(medicalHistoryEntries, ({ one }) => ({
  patient: one(users, {
    fields: [medicalHistoryEntries.patientId],
    references: [users.id],
  }),
  doctor: one(doctorProfiles, {
    fields: [medicalHistoryEntries.doctorId],
    references: [doctorProfiles.id],
  }),
}));

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type DbUser = typeof users.$inferSelect;
export type NewDbUser = typeof users.$inferInsert;

export type DbPatientProfile = typeof patientProfiles.$inferSelect;
export type NewDbPatientProfile = typeof patientProfiles.$inferInsert;

export type DbDoctorProfile = typeof doctorProfiles.$inferSelect;
export type NewDbDoctorProfile = typeof doctorProfiles.$inferInsert;

export type DbBooking = typeof bookings.$inferSelect;
export type NewDbBooking = typeof bookings.$inferInsert;

export type DbPayment = typeof payments.$inferSelect;
export type NewDbPayment = typeof payments.$inferInsert;

export type DbMedicalHistoryEntry = typeof medicalHistoryEntries.$inferSelect;
export type NewDbMedicalHistoryEntry = typeof medicalHistoryEntries.$inferInsert;
