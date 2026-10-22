import * as React from "react";
import Link from "next/link";
import { Layers } from "lucide-react";

export function HomepageFooter() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="page-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layers className="size-4" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                HireNext
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Hệ thống Quản lý Tuyển dụng (ATS) & Kết nối Cơ hội Nghề nghiệp thế
              hệ mới. Kết nối các đội ngũ công nghệ hàng đầu với những kỹ sư,
              nhà thiết kế và chuyên gia xuất sắc.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hệ thống ATS & phễu tuyển dụng đang hoạt động bình thường</span>
            </div>
          </div>

          {/* Careers Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground font-heading">
              Cơ hội nghề nghiệp
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#open-roles"
                  className="hover:text-primary transition-colors"
                >
                  Tất cả vị trí mở
                </a>
              </li>
              <li>
                <a
                  href="#departments"
                  className="hover:text-primary transition-colors"
                >
                  Khối Kỹ thuật & Công nghệ
                </a>
              </li>
              <li>
                <a
                  href="#departments"
                  className="hover:text-primary transition-colors"
                >
                  Khối Sản phẩm & Thiết kế
                </a>
              </li>
              <li>
                <a
                  href="#departments"
                  className="hover:text-primary transition-colors"
                >
                  Khối Dữ liệu & AI
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="hover:text-primary transition-colors"
                >
                  Chính sách đãi ngộ & Phúc lợi
                </a>
              </li>
            </ul>
          </div>

          {/* Portals Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground font-heading">
              Phân hệ ATS
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-primary transition-colors"
                >
                  Cổng thông tin Ứng viên
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="hover:text-primary transition-colors"
                >
                  Hồ sơ ứng tuyển của tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-analysis"
                  className="hover:text-primary transition-colors"
                >
                  Công cụ AI Đánh giá CV
                </Link>
              </li>
              <li>
                <Link
                  href="/hr/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  Bảng điều khiển Nhà tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/hr/pipeline"
                  className="hover:text-primary transition-colors"
                >
                  Quy trình Tuyển dụng (Kanban)
                </Link>
              </li>
              <li>
                <Link
                  href="/interviewer/schedule"
                  className="hover:text-primary transition-colors"
                >
                  Lịch phỏng vấn & Chấm điểm
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Equal Opportunity */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground font-heading">
              Cơ hội Bình đẳng
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Chúng tôi là nhà tuyển dụng bình đẳng. Chúng tôi tôn trọng sự đa
              dạng và cam kết xây dựng một môi trường hòa nhập, minh bạch cho tất
              cả các ứng viên và đồng nghiệp không phân biệt giới tính, tuổi tác
              hay hoàn cảnh cá nhân.
            </p>
            <div className="pt-1">
              <Link
                href="/login"
                className="text-xs font-medium text-primary hover:underline"
              >
                Đăng nhập vào hệ thống →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 HireNext ATS. Bản quyền đã được bảo hộ.</p>
          <div className="flex items-center gap-6">
            <Link href="/jobs" className="hover:text-foreground">
              Điều khoản ứng viên
            </Link>
            <Link href="/jobs" className="hover:text-foreground">
              Chính sách bảo mật
            </Link>
            <Link href="/jobs" className="hover:text-foreground">
              Tiêu chuẩn an toàn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
