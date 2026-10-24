CREATE TABLE "jobApplications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"jobId" text NOT NULL,
	"applicationCode" text NOT NULL,
	"fullName" text NOT NULL,
	"email" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"address" text,
	"linkedinUrl" text,
	"portfolioUrl" text,
	"coverLetter" text,
	"availableStartDate" text DEFAULT '2 tuần',
	"expectedSalary" text,
	"resumeUrl" text NOT NULL,
	"resumeFileName" text NOT NULL,
	"resumeFileSize" integer NOT NULL,
	"resumeFileType" text NOT NULL,
	"aiMatchScore" integer,
	"status" text DEFAULT 'moi_nop' NOT NULL,
	"internalNotes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "jobApplications _applicationCode_unique" UNIQUE("applicationCode")
);
--> statement-breakpoint
ALTER TABLE "jobApplications " ADD CONSTRAINT "jobApplications _jobId_jobs_id_fk" FOREIGN KEY ("jobId") REFERENCES "public"."jobs"("id") ON DELETE restrict ON UPDATE no action;