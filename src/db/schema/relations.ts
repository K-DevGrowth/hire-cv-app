import { relations } from "drizzle-orm";
import { jobs } from "./jobs";
import { jobApplications } from "./jobApplications";
import { resumeAnalyses } from "./resumeAnalyses";

export const jobRelations = relations(jobs, ({ many }) => ({
  applications: many(jobApplications),
  resumeAnalyses: many(resumeAnalyses),
}));

export const jobAplicationRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobs, {
    fields: [jobApplications.jobId],
    references: [jobs.id],
  }),
}));

export const resumeAnalysesRelations = relations(resumeAnalyses, ({ one }) => ({
  job: one(jobs, {
    fields: [resumeAnalyses.jobId],
    references: [jobs.id],
  }),
}));
