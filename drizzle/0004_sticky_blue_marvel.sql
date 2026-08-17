CREATE TYPE "public"."case_document_type" AS ENUM('dicom_imaging', 'lab_report', 'pathology_report', 'discharge_summary', 'prescription', 'other');--> statement-breakpoint
CREATE TYPE "public"."case_stage" AS ENUM('submitted', 'documents_requested', 'under_review', 'matched', 'consultation_scheduled', 'report_issued', 'closed', 'transferred', 'escalated', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."consilium_role" AS ENUM('lead', 'participant');--> statement-breakpoint
CREATE TYPE "public"."diagnosis_concurrence" AS ENUM('concurs', 'diverges', 'partial');--> statement-breakpoint
CREATE TYPE "public"."transfer_target_module" AS ENUM('medtravel', 'medtrials', 'medpharmaccess');--> statement-breakpoint
CREATE TABLE "case_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"uploaded_by_user_id" uuid,
	"document_type" "case_document_type" NOT NULL,
	"title" varchar(250) NOT NULL,
	"file_ref" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_synthetic" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consilium_opinions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"role" "consilium_role" DEFAULT 'participant' NOT NULL,
	"opinion_text" text,
	"concurs" boolean,
	"signed_at" timestamp with time zone,
	"signature_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_synthetic" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "second_opinion_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"diagnosis_concurrence" "diagnosis_concurrence",
	"diagnosis_notes" text,
	"alternative_treatments" text,
	"risk_assessment" text,
	"recommended_next_steps" text,
	"signed_at" timestamp with time zone,
	"signature_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_synthetic" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "case_stage" "case_stage" DEFAULT 'submitted' NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "sla_deadline_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "escalated_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "transferred_to_module" "transfer_target_module";--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "transferred_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "case_documents" ADD CONSTRAINT "case_documents_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_documents" ADD CONSTRAINT "case_documents_uploaded_by_user_id_users_id_fk" FOREIGN KEY ("uploaded_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consilium_opinions" ADD CONSTRAINT "consilium_opinions_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consilium_opinions" ADD CONSTRAINT "consilium_opinions_doctor_id_doctor_profiles_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctor_profiles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "second_opinion_reports" ADD CONSTRAINT "second_opinion_reports_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "second_opinion_reports" ADD CONSTRAINT "second_opinion_reports_doctor_id_doctor_profiles_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctor_profiles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "case_documents_booking_id_idx" ON "case_documents" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "consilium_opinions_booking_id_idx" ON "consilium_opinions" USING btree ("booking_id");--> statement-breakpoint
CREATE UNIQUE INDEX "consilium_opinions_booking_doctor_unique_idx" ON "consilium_opinions" USING btree ("booking_id","doctor_id");--> statement-breakpoint
CREATE UNIQUE INDEX "second_opinion_reports_booking_id_unique_idx" ON "second_opinion_reports" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "bookings_case_stage_idx" ON "bookings" USING btree ("case_stage");