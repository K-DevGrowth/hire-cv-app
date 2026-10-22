import { relations } from "drizzle-orm";
import { cong_viec } from "./cong_viec";
import { don_ung_tuyen } from "./don_ung_tuyen";

export const congViecRelations = relations(cong_viec, ({ many }) => ({
  danh_sach_ung_tuyen: many(don_ung_tuyen),
}));

export const donUngTuyenRelations = relations(don_ung_tuyen, ({ one }) => ({
  cong_viec: one(cong_viec, {
    fields: [don_ung_tuyen.cong_viec_id],
    references: [cong_viec.id],
  }),
}));

