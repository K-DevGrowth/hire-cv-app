import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const jobApplications = pgTable("jobApplications ", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: text("jobId")
    .notNull()
    .references(() => jobs.id, { onDelete: "restrict" }),
  applicationCode: text("applicationCode").notNull().unique(), // Ví dụ: "HN-2026-8942"
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phoneNumber").notNull(),
  address: text("address"),
  linkedinUrl: text("linkedinUrl"),
  portfolioUrl: text("portfolioUrl"),
  coverLetter: text("coverLetter"),
  availableStartDate: text("availableStartDate").default("2 tuần"),
  expectedSalary: text("expectedSalary"),

  // Thông tin tệp CV đính kèm
  resumeUrl: text("resumeUrl").notNull(), // URL tải hoặc đường dẫn lưu trữ
  resumeFileName: text("resumeFileName").notNull(), // Tên file gốc (VD: NguyenVanA_CV.pdf)
  resumeFileSize: integer("resumeFileSize").notNull(), // Kích thước (bytes)
  resumeFileType: text("resumeFileType").notNull(), // application/pdf

  aiMatchScore: integer("aiMatchScore"), // Điểm số tương thích 0 - 100
  status: text("status").default("moi_nop").notNull(), // moi_nop, da_xem, phong_van, offer, tu_choi
  internalNotes: text("internalNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Application = typeof jobApplications.$inferSelect;
export type NewApplication = typeof jobApplications.$inferInsert;
