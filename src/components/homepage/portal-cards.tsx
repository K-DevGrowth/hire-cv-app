import Link from "next/link";
import { ATS_PORTALS } from "./mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users2,
  Building2,
  Calendar,
  ArrowRight,
  Check,
  Layers,
} from "lucide-react";

const ICON_MAP = {
  Users2: Users2,
  Building2: Building2,
  Calendar: Calendar,
};

export function PortalCards() {
  return (
    <section className="py-16 sm:py-24 border-t border-border/80 bg-muted/20">
      <div className="page-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Layers className="size-3.5" />
            <span>Nền Tảng ATS Đồng Bộ</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
            Trải Nghiệm Chuyên Biệt Cho Từng Vai Trò
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Từ ứng viên theo dõi hồ sơ ứng tuyển, chuyên viên nhân sự điều phối
            phễu tuyển dụng, cho đến các chuyên gia kỹ thuật chấm điểm phỏng vấn.
          </p>
        </div>

        {/* 3 Persona Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ATS_PORTALS.map((portal) => {
            const Icon =
              ICON_MAP[portal.icon as keyof typeof ICON_MAP] || Users2;
            return (
              <div
                key={portal.title}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-xs transition-all duration-200 hover:border-primary/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {portal.badge}
                    </Badge>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-foreground font-heading">
                    {portal.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                    {portal.description}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-border/60 pt-4">
                    {portal.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-xs text-foreground/80"
                      >
                        <Check className="size-3.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link href={portal.href} className="w-full">
                    <Button
                      variant={
                        portal.badge === "Dành cho Ứng viên"
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-between group font-medium"
                    >
                      <span>{portal.cta}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
