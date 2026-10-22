"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Layers,
  Sparkles,
  Users2,
  Building2,
  Calendar,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export function HomepageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setPortalsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-md transition-all">
      <div className="page-container flex h-16 items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Layers className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground flex items-center gap-1.5">
              HireNext
              <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
            </span>
            <span className="text-[0.6875rem] font-medium tracking-wide uppercase text-muted-foreground">
              Hệ thống Tuyển dụng & ATS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
          <a
            href="#open-roles"
            className="transition-colors hover:text-foreground hover:text-primary"
          >
            Vị trí tuyển dụng
          </a>
          <a
            href="#departments"
            className="transition-colors hover:text-foreground hover:text-primary"
          >
            Phòng ban
          </a>
          <a
            href="#hiring-process"
            className="transition-colors hover:text-foreground hover:text-primary"
          >
            Quy trình tuyển dụng
          </a>
          <a
            href="#benefits"
            className="transition-colors hover:text-foreground hover:text-primary"
          >
            Chính sách đãi ngộ
          </a>

          {/* Portals Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
              className="flex items-center gap-1 transition-colors hover:text-foreground hover:text-primary focus:outline-none"
            >
              <span>Không gian làm việc</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${
                  portalsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {portalsDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-76 rounded-xl border border-border bg-card p-2 shadow-lg ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95">
                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phân hệ ATS Trực tuyến
                </div>
                <Link
                  href="/jobs"
                  onClick={() => setPortalsDropdownOpen(false)}
                  className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/80"
                >
                  <div className="rounded-md bg-accent p-1.5 text-accent-foreground mt-0.5">
                    <Users2 className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Cổng thông tin Ứng viên
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ứng tuyển, xem việc làm & theo dõi hồ sơ
                    </p>
                  </div>
                </Link>
                <Link
                  href="/hr/dashboard"
                  onClick={() => setPortalsDropdownOpen(false)}
                  className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/80"
                >
                  <div className="rounded-md bg-accent p-1.5 text-accent-foreground mt-0.5">
                    <Building2 className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Trung tâm Nhà tuyển dụng (HR)
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bảng Kanban, lọc ứng viên & chấm điểm
                    </p>
                  </div>
                </Link>
                <Link
                  href="/interviewer/schedule"
                  onClick={() => setPortalsDropdownOpen(false)}
                  className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/80"
                >
                  <div className="rounded-md bg-accent p-1.5 text-accent-foreground mt-0.5">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Bàn làm việc Người phỏng vấn
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Lịch phỏng vấn & biểu mẫu đánh giá
                    </p>
                  </div>
                </Link>
                <div className="my-1 border-t border-border" />
                <Link
                  href="/resume-analysis"
                  onClick={() => setPortalsDropdownOpen(false)}
                  className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  <Sparkles className="size-3.5" />
                  <span>Trợ lý AI phân tích & tối ưu CV</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-medium">
              Đăng nhập
            </Button>
          </Link>
          <a href="#open-roles">
            <Button size="sm" className="gap-1.5 shadow-sm font-medium">
              <span>Xem vị trí mở</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở danh mục điều hướng"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-background px-4 py-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            <a
              href="#open-roles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Vị trí tuyển dụng
            </a>
            <a
              href="#departments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Phòng ban
            </a>
            <a
              href="#hiring-process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Quy trình tuyển dụng
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Chính sách đãi ngộ
            </a>

            <div className="my-1 border-t border-border pt-2">
              <span className="px-2 text-xs font-semibold uppercase text-muted-foreground">
                Không gian làm việc
              </span>
              <div className="mt-2 grid grid-cols-1 gap-1">
                <Link
                  href="/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                >
                  <Users2 className="size-4 text-primary" />
                  <span>Cổng thông tin Ứng viên</span>
                </Link>
                <Link
                  href="/hr/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                >
                  <Building2 className="size-4 text-primary" />
                  <span>Bàn làm việc Nhà tuyển dụng</span>
                </Link>
                <Link
                  href="/interviewer/schedule"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                >
                  <Calendar className="size-4 text-primary" />
                  <span>Không gian Người phỏng vấn</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  Đăng nhập
                </Button>
              </Link>
              <a href="#open-roles" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center">
                  Khám phá các vị trí tuyển dụng
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
