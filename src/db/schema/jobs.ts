import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey(), // Short friendly identifier for URL (e.g., "eng-1", "ai-1")
  title: text("title").notNull(),
  department: text("department").notNull(), // Kỹ thuật, Sản phẩm & Thiết kế, Dữ liệu & AI, Nhân sự & Tuyển dụng, Tăng trưởng & Vận hành
  location: text("location").notNull(), // TP. Hồ Chí Minh, Singapore,...
  workplace: text("workplace").notNull(), // Từ xa, Kết hợp, Tại văn phòng
  type: text("type").notNull().default("Toàn thời gian"), // Toàn thời gian, Hợp đồng
  experience: text("experience").notNull(), // Mid, Senior, Lead, Staff
  salary: text("salary").notNull(), // e.g.: "3.500$ - 5.000$ / tháng"
  summary: text("summary").notNull(),
  description: text("description"),
  responsibilities: jsonb("responsibilities").$type<string[]>().default([]),
  requirements: jsonb("requirements").$type<string[]>().default([]),
  niceToHave: jsonb("nice_to_have").$type<string[]>().default([]),
  benefits: jsonb("benefits").$type<string[]>().default([]),
  tags: jsonb("tags").$type<string[]>().default([]), // tags: ["React 19", "Next.js", "TypeScript"]
  recruiterName: text("recruiter_name"),
  recruiterTitle: text("recruiter_title"),
  recruiterAvatar: text("recruiter_avatar"),
  recruiterEmail: text("recruiter_email"),
  featured: boolean("featured").default(false).notNull(),
  status: text("status").default("open").notNull(), // open, closed, draft
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
