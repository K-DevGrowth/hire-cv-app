import { relations } from "drizzle-orm";
import { jobs } from "./jobs";
import { jobApplications } from "./jobApplications";

export const jobRelations = relations(jobs, ({ many }) => ({
  applications: many(jobApplications),
}));

export const jobAplicationRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobs, {
    fields: [jobApplications.jobId],
    references: [jobs.id],
  }),
}));
