import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  DollarSign,
  HeartHandshake,
  Users,
} from "lucide-react";

export function HomepageHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-background to-muted/20 py-16 sm:py-24">
      {/* Subtle background ambient blur */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="page-container text-center">
        {/* Greenhouse-inspired status badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary shadow-xs transition-colors hover:bg-primary/10">
          <span className="flex size-2 rounded-full bg-primary animate-ping" />
          <span>Đợt Tuyển Dụng Trọng Điểm</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-foreground/80 font-normal">
            10 vị trí đang mở tại các khối Kỹ thuật, Sản phẩm & AI
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-6 font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.18]">
          Nơi những nhân tài tạo nên các dấu ấn{" "}
          <span className="text-primary underline decoration-primary/30 decoration-wavy decoration-2 underline-offset-6">
            mang tính định nghĩa
          </span>
          .
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Chào mừng bạn đến với cổng tuyển dụng HireNext. Chúng tôi cam kết dải
          lương minh bạch 100%, phản hồi hồ sơ trong vòng 48 giờ và xây dựng quy
          trình tuyển dụng dựa trên sự tôn trọng thời gian của bạn.
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#open-roles">
            <Button size="lg" className="gap-2 shadow-sm text-base px-6 h-11">
              <span>Xem các vị trí mở</span>
              <ArrowRight className="size-4" />
            </Button>
          </a>
          <Link href="/jobs">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-base px-6 h-11 border-border/80"
            >
              <Users className="size-4 text-muted-foreground" />
              <span>Cổng thông tin Ứng viên</span>
            </Button>
          </Link>
          <Link href="/resume-analysis">
            <Button
              variant="ghost"
              size="lg"
              className="gap-2 text-base px-4 h-11 text-primary hover:bg-primary/10"
            >
              <Sparkles className="size-4" />
              <span>Thử nghiệm AI Phân tích CV</span>
            </Button>
          </Link>
        </div>

        {/* ATS Credibility Metrics Grid */}
        <div className="mt-14 pt-10 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-lg bg-card/60 border border-border/40 shadow-2xs">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
              <Clock className="size-3.5" />
              <span>Cam kết tốc độ</span>
            </div>
            <div className="mt-1 font-heading text-2xl font-bold text-foreground">
              &lt; 48 giờ
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Thời gian phản hồi vòng đầu tối đa
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-card/60 border border-border/40 shadow-2xs">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
              <DollarSign className="size-3.5" />
              <span>Đãi ngộ</span>
            </div>
            <div className="mt-1 font-heading text-2xl font-bold text-foreground">
              100% Minh bạch
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Công khai dải lương trên từng vị trí
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-card/60 border border-border/40 shadow-2xs">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="size-3.5" />
              <span>Tôn trọng ứng viên</span>
            </div>
            <div className="mt-1 font-heading text-2xl font-bold text-foreground">
              0% Bỏ rơi hồ sơ
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Gửi nhận xét phản hồi cho mọi ứng viên
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-card/60 border border-border/40 shadow-2xs">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
              <HeartHandshake className="size-3.5" />
              <span>Trải nghiệm</span>
            </div>
            <div className="mt-1 font-heading text-2xl font-bold text-foreground">
              4.9 / 5.0
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Điểm số đánh giá từ ứng viên
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
