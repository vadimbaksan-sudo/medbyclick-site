CREATE TYPE "public"."travel_direction" AS ENUM('patient_travels', 'doctor_travels');--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "travel_direction" "travel_direction";--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "travel_country" varchar(100);--> statement-breakpoint
ALTER TABLE "doctor_profiles" ADD COLUMN "available_for_mission_travel" boolean DEFAULT false NOT NULL;