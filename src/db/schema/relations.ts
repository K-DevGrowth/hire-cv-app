import { relations } from "drizzle-orm";
import { account, session, user } from "./auth-schema";
import { jobs } from "./jobs";
import { jobApplications } from "./jobApplications";
import { interviews } from "./interviews";
import { resumeAnalyses } from "./resumeAnalyses";

export const usersRelations = relations(user, ({ many }) => ({
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
  interviewer: one(user, {
    fields: [interviews.interviewerId],
    references: [user.id],
  }),
}));

export const resumeAnalysesRelations = relations(resumeAnalyses, ({ one }) => ({
  job: one(jobs, {
    fields: [resumeAnalyses.jobId],
    references: [jobs.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
