import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const resumeAnalyses = pgTable("resumeAnalyses", {
  id: uuid("id").defaultRandom().primaryKey(), // Mã phân tích duy nhất (dùng cho link /resume-analysis/[id])
  jobId: text("jobId").references(() => jobs.id, { onDelete: "set null" }), // Nếu chọn job có sẵn trong web (tùy chọn)
  targetJobTitle: text("targetJobTitle").notNull(), // Vị trí ứng tuyển (VD: "Frontend Developer")
  companyName: text("companyName"), // Tên công ty (VD: "Công ty ABC")
  jobDescription: text("jobDescription"), // Nội dung mô tả công việc (JD)

  // Tệp CV đính kèm
  resumeUrl: text("resumeUrl").notNull(), // Đường dẫn xem file CV
  resumeFileName: text("resumeFileName").notNull(), // Tên file gốc

  // Kết quả AI đánh giá
  matchScore: integer("matchScore").default(0), // Điểm tương thích (0 - 100)
  summary: text("summary"), // Lời nhận xét tổng quan
  strengths: jsonb("strengths").$type<string[]>().default([]), // Danh sách các điểm mạnh
  weaknesses: jsonb("weaknesses").$type<string[]>().default([]), // Danh sách điểm còn thiếu
  suggestions: jsonb("suggestions").$type<string[]>().default([]), // Gợi ý cải thiện CV

  createdAt: timestamp("createdAt").defaultNow().notNull(), // Thời gian phân tích
});

export type ResumeAnalysis = typeof resumeAnalyses.$inferSelect;
export type NewResumeAnalysis = typeof resumeAnalyses.$inferInsert;
