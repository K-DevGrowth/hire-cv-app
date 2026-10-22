import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { SAMPLE_JOBS } from "../components/homepage/mock-data";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Đang nạp dữ liệu việc làm vào PostgreSQL...");

  for (const job of SAMPLE_JOBS) {
    await db
      .insert(schema.cong_viec)
      .values({
        id: job.id,
        tieu_de: job.title,
        phong_ban: job.department,
        dia_diem: job.location,
        hinh_thuc_lam_viec: job.workplace,
        loai_hop_dong: job.type,
        cap_bac: job.experience,
        muc_luong: job.salary,
        noi_dung_tom_tat: job.summary,
        mo_ta_chi_tiet: job.aboutRole || job.summary,
        trach_nhiem: job.responsibilities || [],
        yeu_cau: job.requirements || [],
        diem_cong: job.niceToHave || [],
        dai_ngo: job.benefitsList || [],
        ky_nang: job.tags,
        nguoi_phu_trach_ten: job.hiringManager?.name || "Vũ Mai Phương",
        nguoi_phu_trach_chuc_danh:
          job.hiringManager?.role || "Trưởng nhóm Tuyển dụng Công nghệ",
        nguoi_phu_trach_avatar: job.hiringManager?.avatarText || "MP",
        nguoi_phu_trach_email: job.hiringManager?.email || "careers@hirenext.vn",
        uu_tien_tuyen_dung: Boolean(job.featured),
        trang_thai: "dang_tuyen",
      })
      .onConflictDoUpdate({
        target: schema.cong_viec.id,
        set: {
          tieu_de: job.title,
          phong_ban: job.department,
          dia_diem: job.location,
          hinh_thuc_lam_viec: job.workplace,
          loai_hop_dong: job.type,
          cap_bac: job.experience,
          muc_luong: job.salary,
          noi_dung_tom_tat: job.summary,
          mo_ta_chi_tiet: job.aboutRole || job.summary,
          trach_nhiem: job.responsibilities || [],
          yeu_cau: job.requirements || [],
          diem_cong: job.niceToHave || [],
          dai_ngo: job.benefitsList || [],
          ky_nang: job.tags,
          nguoi_phu_trach_ten: job.hiringManager?.name || "Vũ Mai Phương",
          nguoi_phu_trach_chuc_danh:
            job.hiringManager?.role || "Trưởng nhóm Tuyển dụng Công nghệ",
          nguoi_phu_trach_avatar: job.hiringManager?.avatarText || "MP",
          nguoi_phu_trach_email:
            job.hiringManager?.email || "careers@hirenext.vn",
          uu_tien_tuyen_dung: Boolean(job.featured),
          trang_thai: "dang_tuyen",
        },
      });
  }

  console.log(`✅ Đã nạp thành công ${SAMPLE_JOBS.length} vị trí việc làm vào bảng cong_viec!`);
}

seed().catch((err) => {
  console.error("❌ Nạp dữ liệu thất bại:", err);
  process.exit(1);
});

