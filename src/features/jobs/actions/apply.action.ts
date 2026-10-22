"use server";

import { db } from "@/db";
import { don_ung_tuyen } from "@/db/schema";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export interface KetQuaNopDon {
  thanhCong: boolean;
  thongBao: string;
  maUngTuyen?: string;
  duongDanCv?: string;
}

/**
 * Server Action xử lý nộp hồ sơ ứng tuyển kèm tải lên tệp PDF CV
 */
export async function nopDonUngTuyen(
  formData: FormData
): Promise<KetQuaNopDon> {
  try {
    const congViecId = formData.get("congViecId") as string;
    const hoTen = formData.get("hoTen") as string;
    const email = formData.get("email") as string;
    const soDienThoai = formData.get("soDienThoai") as string;
    const diaChi = (formData.get("diaChi") as string) || "";
    const linkLinkedin = (formData.get("linkLinkedin") as string) || "";
    const linkPortfolio = (formData.get("linkPortfolio") as string) || "";
    const thuGioiThieu = (formData.get("thuGioiThieu") as string) || "";
    const ngayCoTheBatDau =
      (formData.get("ngayCoTheBatDau") as string) || "2 tuần";
    const mucLuongKyVong = (formData.get("mucLuongKyVong") as string) || "";
    const diemAiDanhGiaStr = formData.get("diemAiDanhGia") as string | null;
    const diemAiDanhGia = diemAiDanhGiaStr
      ? parseInt(diemAiDanhGiaStr, 10)
      : null;

    const fileCv = formData.get("fileCv") as File | null;

    // Kiểm tra dữ liệu hợp lệ
    if (!congViecId || !hoTen?.trim() || !email?.trim() || !soDienThoai?.trim()) {
      return {
        thanhCong: false,
        thongBao: "Vui lòng điền đầy đủ các thông tin bắt buộc (*).",
      };
    }

    if (!fileCv || !(fileCv instanceof File) || fileCv.size === 0) {
      return {
        thanhCong: false,
        thongBao: "Vui lòng đính kèm tệp CV / Resume của bạn.",
      };
    }

    // Kiểm tra kích thước tệp (tối đa 10MB)
    if (fileCv.size > 10 * 1024 * 1024) {
      return {
        thanhCong: false,
        thongBao: "Dung lượng tệp CV không được vượt quá 10MB.",
      };
    }

    // Lưu tệp PDF CV vào thư mục lưu trữ cục bộ (/public/uploads/cvs/)
    const uploadDir = path.join(process.cwd(), "public", "uploads", "cvs");
    await mkdir(uploadDir, { recursive: true });

    // Tạo tên tệp độc nhất an toàn
    const randomSuffix = crypto.randomBytes(6).toString("hex");
    const sanitizedOriginalName = fileCv.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const safeFileName = `cv_${Date.now()}_${randomSuffix}_${sanitizedOriginalName}`;
    const filePath = path.join(uploadDir, safeFileName);

    const arrayBuffer = await fileCv.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/cvs/${safeFileName}`;

    // Tạo mã ứng tuyển thân thiện
    const maUngTuyen = `HN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Chèn dữ liệu vào bảng PostgreSQL: don_ung_tuyen
    await db.insert(don_ung_tuyen).values({
      cong_viec_id: congViecId,
      ma_ung_tuyen: maUngTuyen,
      ho_ten: hoTen.trim(),
      email: email.trim().toLowerCase(),
      so_dien_thoai: soDienThoai.trim(),
      dia_chi: diaChi.trim(),
      link_linkedin: linkLinkedin.trim(),
      link_portfolio: linkPortfolio.trim(),
      thu_gioi_thieu: thuGioiThieu.trim(),
      ngay_co_the_bat_dau: ngayCoTheBatDau,
      muc_luong_ky_vong: mucLuongKyVong.trim(),
      duong_dan_cv: publicUrl,
      ten_tep_cv: fileCv.name,
      kich_thuoc_tep_cv: fileCv.size,
      dinh_dang_tep_cv: fileCv.type || "application/pdf",
      diem_ai_danh_gia: diemAiDanhGia,
      trang_thai: "moi_nop",
    });

    return {
      thanhCong: true,
      thongBao: "Nộp hồ sơ thành công!",
      maUngTuyen,
      duongDanCv: publicUrl,
    };
  } catch (error) {
    console.error("Lỗi khi xử lý nộp đơn ứng tuyển:", error);
    return {
      thanhCong: false,
      thongBao:
        "Có lỗi xảy ra trong quá trình nộp hồ sơ. Vui lòng thử lại sau.",
    };
  }
}

