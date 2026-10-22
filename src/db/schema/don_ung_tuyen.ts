import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { cong_viec } from "./cong_viec";

export const don_ung_tuyen = pgTable("don_ung_tuyen", {
  id: uuid("id").defaultRandom().primaryKey(),
  cong_viec_id: text("cong_viec_id")
    .notNull()
    .references(() => cong_viec.id, { onDelete: "restrict" }),
  ma_ung_tuyen: text("ma_ung_tuyen").notNull().unique(), // Ví dụ: "HN-2026-8942"
  ho_ten: text("ho_ten").notNull(),
  email: text("email").notNull(),
  so_dien_thoai: text("so_dien_thoai").notNull(),
  dia_chi: text("dia_chi"),
  link_linkedin: text("link_linkedin"),
  link_portfolio: text("link_portfolio"),
  thu_gioi_thieu: text("thu_gioi_thieu"),
  ngay_co_the_bat_dau: text("ngay_co_the_bat_dau").default("2 tuần"),
  muc_luong_ky_vong: text("muc_luong_ky_vong"),

  // Thông tin tệp PDF CV đính kèm
  duong_dan_cv: text("duong_dan_cv").notNull(), // URL tải hoặc đường dẫn lưu trữ
  ten_tep_cv: text("ten_tep_cv").notNull(), // Tên file gốc (VD: NguyenVanA_CV.pdf)
  kich_thuoc_tep_cv: integer("kich_thuoc_tep_cv").notNull(), // Dung lượng (bytes)
  dinh_dang_tep_cv: text("dinh_dang_tep_cv").notNull(), // application/pdf

  diem_ai_danh_gia: integer("diem_ai_danh_gia"), // Điểm số AI tương thích (0-100)
  trang_thai: text("trang_thai").default("moi_nop").notNull(), // moi_nop, da_xem, phong_van, de_nghi, tu_choi
  ghi_chu_noi_bo: text("ghi_chu_noi_bo"),
  ngay_tao: timestamp("ngay_tao").defaultNow().notNull(),
  ngay_cap_nhat: timestamp("ngay_cap_nhat").defaultNow().notNull(),
});

export type DonUngTuyen = typeof don_ung_tuyen.$inferSelect;
export type DonUngTuyenMoi = typeof don_ung_tuyen.$inferInsert;

