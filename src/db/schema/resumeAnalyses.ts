import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const resumeAnalyses = pgTable("resumeAnalyses", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: text("job_id").references(() => jobs.id, { onDelete: "set null" }), // Tùy chọn nếu đối chiếu với tin tuyển dụng có sẵn
  targetJobTitle: text("target_job_title").notNull(), // Vị trí ứng tuyển (VD: "Frontend Developer")
  companyName: text("company_name"), // Tên công ty mục tiêu
  jobDescription: text("job_description"), // Nội dung mô tả công việc (JD)

  // Thông tin tệp CV đính kèm
  resumeUrl: text("resume_url").notNull(),
  resumeFileName: text("resume_file_name").notNull(),

  // Kết quả phân tích từ AI
  matchScore: integer("match_score").default(0), // Điểm tương thích từ 0 - 100
  summary: text("summary"), // Tóm tắt đánh giá
  strengths: jsonb("strengths").$type<string[]>().default([]), // Danh sách điểm mạnh
  weaknesses: jsonb("weaknesses").$type<string[]>().default([]), // Điểm còn thiếu / cần cải thiện
  suggestions: jsonb("suggestions").$type<string[]>().default([]), // Gợi ý chỉnh sửa CV

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ResumeAnalysis = typeof resumeAnalyses.$inferSelect;
export type NewResumeAnalysis = typeof resumeAnalyses.$inferInsert;
