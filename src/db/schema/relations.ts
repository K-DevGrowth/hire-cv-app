import { relations } from "drizzle-orm";
import { users } from "./users";
import { jobs } from "./jobs";
import { jobApplications } from "./jobApplications";
import { interviews } from "./interviews";
import { resumeAnalyses } from "./resumeAnalyses";

export const usersRelations = relations(users, ({ many }) => ({
  interviews: many(interviews),
}));

export const jobsRelations = relations(jobs, ({ many }) => ({
  applications: many(jobApplications),
  resumeAnalyses: many(resumeAnalyses),
}));

export const jobApplicationsRelations = relations(
  jobApplications,
  ({ one, many }) => ({
    job: one(jobs, {
      fields: [jobApplications.jobId],
      references: [jobs.id],
    }),
    interviews: many(interviews),
  }),
);

export const interviewsRelations = relations(interviews, ({ one }) => ({
  application: one(jobApplications, {
    fields: [interviews.applicationId],
    references: [jobApplications.id],
  }),
  interviewer: one(users, {
    fields: [interviews.interviewerId],
    references: [users.id],
  }),
}));

export const resumeAnalysesRelations = relations(resumeAnalyses, ({ one }) => ({
  job: one(jobs, {
    fields: [resumeAnalyses.jobId],
    references: [jobs.id],
  }),
}));
