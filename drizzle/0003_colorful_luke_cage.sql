CREATE TYPE "public"."course_enrollment_status" AS ENUM('enrolled', 'in_progress', 'completed');--> statement-breakpoint
ALTER TYPE "public"."user_role" ADD VALUE 'student' BEFORE 'admin';--> statement-breakpoint
CREATE TABLE "course_enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" varchar(120) NOT NULL,
	"status" "course_enrollment_status" DEFAULT 'enrolled' NOT NULL,
	"progress_percent" integer DEFAULT 0 NOT NULL,
	"enrolled_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "course_enrollments_user_id_idx" ON "course_enrollments" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "course_enrollments_user_course_unique_idx" ON "course_enrollments" USING btree ("user_id","course_id");