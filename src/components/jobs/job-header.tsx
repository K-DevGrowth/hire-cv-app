"use client";

import * as React from "react";
import Link from "next/link";
import { Job } from "@/components/homepage/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Share2,
  Bookmark,
  Check,
  ChevronLeft,
  Sparkles,
  ArrowDown,
} from "lucide-react";

interface JobHeaderProps {
  job: Job;
}

export function JobHeader({ job }: JobHeaderProps) {
  const [copied, setCopied] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToApply = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("apply-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="border-b border-border/70 bg-card/60 backdrop-blur-xs py-8 sm:py-12">
      <div className="page-container">
        {/* Breadcrumb & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
          <Link
            href="/#open-roles"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary group"
          >
            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Xem tất cả vị trí tuyển dụng</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>Mã vị trí:</span>
            <span className="font-semibold text-foreground uppercase">
              {job.id}
            </span>
          </div>
        </div>

        {/* Title & Badge Row */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-medium text-xs">
              {job.department}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium">
              {job.workplace}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium">
              {job.type}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium">
              Cấp bậc: {job.experience}
            </Badge>
            {job.featured && (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="size-3" />
                Ưu tiên tuyển dụng
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
            {job.title}
          </h1>

          {/* Key Attributes Strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary shrink-0" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-primary shrink-0" />
              <span className="font-semibold text-foreground">
                {job.salary}
              </span>
              <span className="text-xs text-muted-foreground">
                (Minh bạch 100%)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary shrink-0" />
              <span>Phản hồi trong vòng 48h</span>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              Đăng {job.postedAt.toLowerCase()}
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-border/60">
          <Button
            size="lg"
            onClick={scrollToApply}
            className="gap-2 shadow-sm font-semibold px-6"
          >
            <span>Nộp hồ sơ ứng tuyển</span>
            <ArrowDown className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleCopyLink}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="size-4 text-primary" />
                <span>Đã sao chép liên kết</span>
              </>
            ) : (
              <>
                <Share2 className="size-4 text-muted-foreground" />
                <span>Chia sẻ vị trí</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => setBookmarked(!bookmarked)}
            className={`gap-2 ${bookmarked ? "text-primary" : "text-muted-foreground"}`}
          >
            <Bookmark
              className={`size-4 ${bookmarked ? "fill-primary text-primary" : ""}`}
            />
            <span>{bookmarked ? "Đã lưu tin" : "Lưu tin"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

