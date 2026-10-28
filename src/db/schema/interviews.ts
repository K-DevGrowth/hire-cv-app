import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { jobApplications } from "./jobApplications";
import { user } from "./auth-schema";

export const interviews = pgTable("interviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  applicationId: uuid("application_id")
    .notNull()
    .references(() => jobApplications.id, { onDelete: "cascade" }),
  interviewerId: text("interviewer_id").references(() => user.id, {
    onDelete: "set null",
  }),

  scheduledAt: timestamp("scheduled_at").notNull(),
  format: text("format").default("online").notNull(), // "online" | "offline"
  meetingLink: text("meeting_link"), // Google Meet, Zoom, v.v.
  status: text("status").default("scheduled").notNull(), // "scheduled" | "completed" | "cancelled"

  // Đánh giá phỏng vấn (gộp chung cho danh mục Portfolio gọn gàng)
  score: integer("score"), // Thang điểm 1 - 100
  feedback: text("feedback"), // Nhận xét của người phỏng vấn
  recommendation: text("recommendation"), // "strong_hire" | "hire" | "no_hire"

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Interview = typeof interviews.$inferSelect;
export type NewInterview = typeof interviews.$inferInsert;
