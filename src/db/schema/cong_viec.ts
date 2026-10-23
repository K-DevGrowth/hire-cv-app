import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const cong_viec = pgTable("cong_viec", {
  id: text("id").primaryKey(), // Mã định danh ngắn thân thiện cho URL (ví dụ: "eng-1", "ai-1")
  tieu_de: text("tieu_de").notNull(),
  phong_ban: text("phong_ban").notNull(), // Kỹ thuật, Sản phẩm & Thiết kế, Dữ liệu & AI, Nhân sự & Tuyển dụng, Tăng trưởng & Vận hành
  dia_diem: text("dia_diem").notNull(), // TP. Hồ Chí Minh, Singapore,...
  hinh_thuc_lam_viec: text("hinh_thuc_lam_viec").notNull(), // Từ xa, Kết hợp, Tại văn phòng
  loai_hop_dong: text("loai_hop_dong").notNull().default("Toàn thời gian"),
  cap_bac: text("cap_bac").notNull(), // Mid, Senior, Lead, Staff
  muc_luong: text("muc_luong").notNull(), // ví dụ: "3.500$ - 5.000$ / tháng"
  noi_dung_tom_tat: text("noi_dung_tom_tat").notNull(),
  mo_ta_chi_tiet: text("mo_ta_chi_tiet"),
  trach_nhiem: jsonb("trach_nhiem").$type<string[]>().default([]),
  yeu_cau: jsonb("yeu_cau").$type<string[]>().default([]),
  diem_cong: jsonb("diem_cong").$type<string[]>().default([]),
  dai_ngo: jsonb("dai_ngo").$type<string[]>().default([]),
  ky_nang: jsonb("ky_nang").$type<string[]>().default([]), // tags: ["React 19", "Next.js", "TypeScript"]
  nguoi_phu_trach_ten: text("nguoi_phu_trach_ten"),
  nguoi_phu_trach_chuc_danh: text("nguoi_phu_trach_chuc_danh"),
  nguoi_phu_trach_avatar: text("nguoi_phu_trach_avatar"),
  nguoi_phu_trach_email: text("nguoi_phu_trach_email"),
  uu_tien_tuyen_dung: boolean("uu_tien_tuyen_dung").default(false).notNull(),
  trang_thai: text("trang_thai").default("dang_tuyen").notNull(), // dang_tuyen, da_dong, tam_dung
  ngay_tao: timestamp("ngay_tao").defaultNow().notNull(),
  ngay_cap_nhat: timestamp("ngay_cap_nhat").defaultNow().notNull(),
});

export type CongViec = typeof cong_viec.$inferSelect;
export type CongViecMoi = typeof cong_viec.$inferInsert;
