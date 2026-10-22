import { db } from "@/db";
import { cong_viec, CongViec } from "@/db/schema";
import { Job } from "@/components/homepage/mock-data";
import { eq, ne, and, desc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

export { nopDonUngTuyen, type KetQuaNopDon } from "./apply.action";

/**
 * Hàm chuyển đổi đối tượng CongViec (PostgreSQL snake_case) sang định dạng hiển thị UI (Job)
 */
export function mapCongViecToJob(cv: CongViec): Job {
  return {
    id: cv.id,
    title: cv.tieu_de,
    department: cv.phong_ban as Job["department"],
    location: cv.dia_diem,
    workplace: cv.hinh_thuc_lam_viec as Job["workplace"],
    type: cv.loai_hop_dong as Job["type"],
    experience: cv.cap_bac as Job["experience"],
    salary: cv.muc_luong,
    postedAt: "Đang mở tuyển",
    featured: cv.uu_tien_tuyen_dung,
    summary: cv.noi_dung_tom_tat,
    tags: cv.ky_nang || [],
    aboutRole: cv.mo_ta_chi_tiet || undefined,
    responsibilities: cv.trach_nhiem || [],
    requirements: cv.yeu_cau || [],
    niceToHave: cv.diem_cong || [],
    benefitsList: cv.dai_ngo || [],
    hiringManager: cv.nguoi_phu_trach_ten
      ? {
          name: cv.nguoi_phu_trach_ten,
          role: cv.nguoi_phu_trach_chuc_danh || "Trưởng nhóm Tuyển dụng",
          avatarText: cv.nguoi_phu_trach_avatar || "HR",
          email: cv.nguoi_phu_trach_email || "careers@hirenext.vn",
        }
      : undefined,
  };
}

/**
 * Lấy toàn bộ danh sách việc làm đang mở tuyển dụng từ cơ sở dữ liệu PostgreSQL
 */
export async function layDanhSachCongViec(): Promise<Job[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");

  try {
    const records = await db
      .select()
      .from(cong_viec)
      .where(eq(cong_viec.trang_thai, "dang_tuyen"))
      .orderBy(desc(cong_viec.uu_tien_tuyen_dung), desc(cong_viec.ngay_tao));

    return records.map(mapCongViecToJob);
  } catch (error) {
    console.error("Lỗi khi truy vấn danh sách việc làm:", error);
    return [];
  }
}

/**
 * Lấy thông tin chi tiết một vị trí việc làm theo ID từ PostgreSQL
 */
export async function layChiTietCongViec(id: string): Promise<Job | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`job-${id}`);

  try {
    const records = await db
      .select()
      .from(cong_viec)
      .where(eq(cong_viec.id, id))
      .limit(1);

    if (!records || records.length === 0) {
      return null;
    }

    return mapCongViecToJob(records[0]);
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết việc làm ID ${id}:`, error);
    return null;
  }
}

/**
 * Lấy các vị trí việc làm tương tự trong cùng khối phòng ban từ PostgreSQL
 */
export async function layCongViecLienQuan(
  hienTaiId: string,
  phongBan: string,
  gioiHan = 3
): Promise<Job[]> {
  "use cache";
  cacheLife("hours");

  try {
    const records = await db
      .select()
      .from(cong_viec)
      .where(
        and(
          ne(cong_viec.id, hienTaiId),
          eq(cong_viec.phong_ban, phongBan),
          eq(cong_viec.trang_thai, "dang_tuyen")
        )
      )
      .limit(gioiHan);

    return records.map(mapCongViecToJob);
  } catch (error) {
    console.error("Lỗi khi lấy vị trí liên quan:", error);
    return [];
  }
}

