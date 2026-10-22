"use client";

import * as React from "react";
import Link from "next/link";
import { Job, getRelatedJobs } from "@/components/homepage/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Mail,
  ShieldCheck,
  ChevronRight,
  ArrowDown,
  Sparkles,
} from "lucide-react";

interface JobSidebarProps {
  job: Job;
}

export function JobSidebar({ job }: JobSidebarProps) {
  const relatedJobs = React.useMemo(() => {
    return getRelatedJobs(job.id, job.department, 3);
  }, [job.id, job.department]);

  const scrollToApply = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("apply-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const manager = job.hiringManager || {
    name: "Vũ Mai Phương",
    role: "Trưởng phòng Thu hút Nhân tài (Talent Partner)",
    avatarText: "MP",
    email: "careers@hirenext.vn",
  };

  return (
    <div className="space-y-6">
      {/* 1. Job Summary Quick Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
        <h3 className="font-heading text-lg font-bold text-foreground pb-3 border-b border-border/70">
          Thông Tin Vị Trí Tuyển Dụng
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex items-start justify-between gap-2">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <DollarSign className="size-3.5 text-primary" />
              Mức lương:
            </span>
            <span className="font-semibold text-foreground text-right text-xs sm:text-sm">
              {job.salary}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <MapPin className="size-3.5 text-primary" />
              Địa điểm:
            </span>
            <span className="font-medium text-foreground text-right text-xs sm:text-sm">
              {job.location}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Briefcase className="size-3.5 text-primary" />
              Hình thức:
            </span>
            <span className="font-medium text-foreground text-right text-xs sm:text-sm">
              {job.workplace} • {job.type}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Clock className="size-3.5 text-primary" />
              Phản hồi:
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400 text-right text-xs">
              Trong vòng 48 giờ
            </span>
          </div>
        </div>

        <Button onClick={scrollToApply} className="w-full gap-2 font-semibold">
          <span>Nộp hồ sơ ngay</span>
          <ArrowDown className="size-4" />
        </Button>
      </div>

      {/* 2. Hiring Lead Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Người Phụ Trách Vị Trí Này
        </div>

        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center font-heading text-sm ring-2 ring-primary/20">
            {manager.avatarText}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-sm text-foreground truncate">
              {manager.name}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {manager.role}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/60">
          Có câu hỏi về quy trình hoặc mô tả công việc? Đội ngũ tuyển dụng luôn
          sẵn lòng hỗ trợ bạn qua email:{" "}
          <a
            href={`mailto:${manager.email}`}
            className="text-primary hover:underline font-medium"
          >
            {manager.email}
          </a>
        </p>
      </div>

      {/* 3. Candidate Pledge Card */}
      <div className="rounded-2xl border border-border bg-muted/30 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
          <ShieldCheck className="size-4 text-primary" />
          <span>Cam Kết Tuyển Dụng</span>
        </div>

        <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Không bao giờ bỏ rơi hồ sơ — nhận xét gửi trong 48h.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Không hỏi lịch sử lương cũ — trả đúng khung năng lực.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Không câu đố mẹo — đánh giá bằng bài toán thực tế.</span>
          </li>
        </ul>
      </div>

      {/* 4. Related Jobs in same department */}
      {relatedJobs.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading text-sm font-bold text-foreground">
              Vị Trí Cùng Khối {job.department}
            </h4>
          </div>

          <div className="space-y-3">
            {relatedJobs.map((rJob) => (
              <Link
                key={rJob.id}
                href={`/jobs/${rJob.id}`}
                className="group block p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-card transition-all"
              >
                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  <span className="truncate">{rJob.title}</span>
                  <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="mt-1 flex items-center justify-between text-[0.6875rem] text-muted-foreground">
                  <span>{rJob.location}</span>
                  <span className="font-semibold text-primary">
                    {rJob.salary.split("/")[0]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

