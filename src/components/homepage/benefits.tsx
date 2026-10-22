import * as React from "react";
import { COMPANY_BENEFITS } from "./mock-data";
import {
  DollarSign,
  Globe,
  HeartPulse,
  GraduationCap,
  Laptop,
  Compass,
  Sparkles,
} from "lucide-react";

const ICON_MAP = {
  DollarSign: DollarSign,
  Globe: Globe,
  HeartPulse: HeartPulse,
  GraduationCap: GraduationCap,
  Laptop: Laptop,
  Compass: Compass,
};

export function CompanyBenefits() {
  return (
    <section id="benefits" className="py-16 sm:py-24 bg-background">
      <div className="page-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="size-3.5" />
            <span>Đãi Ngộ & Môi Trường Làm Việc</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
            Được Thiết Kế Cho Hiệu Năng Bền Vững & Hạnh Phúc
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Chúng tôi trang bị mọi điều kiện để bạn cống hiến những sản phẩm
            xuất sắc nhất trong sự nghiệp, được đảm bảo bằng đãi ngộ toàn diện,
            quyền tự chủ và an tâm tâm lý.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_BENEFITS.map((benefit) => {
            const Icon =
              ICON_MAP[benefit.icon as keyof typeof ICON_MAP] || Sparkles;
            return (
              <div
                key={benefit.title}
                className="group flex flex-col p-6 rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-xs"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform duration-200 group-hover:scale-105">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground font-heading">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Culture Quote / Spotlight */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="font-mono text-3xl text-primary font-bold leading-none">
              &ldquo;
            </span>
            <p className="text-base sm:text-lg text-foreground font-medium italic -mt-2 leading-relaxed">
              Ứng tuyển qua hệ thống HireNext là trải nghiệm tuyển dụng mượt mà
              nhất trong 12 năm làm việc trong ngành công nghệ của tôi. Tôi nhận
              được kế hoạch phỏng vấn rõ ràng ngay ngày đầu tiên, các anh chị
              phỏng vấn đã nghiên cứu rất kỹ hồ sơ của tôi, và tôi nhận được lời
              mời làm việc với mức đãi ngộ hấp dẫn chỉ trong vòng 6 ngày.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary font-heading text-sm">
                AL
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  An Lê
                </div>
                <div className="text-xs text-muted-foreground">
                  Kỹ sư Hạ tầng Chuyên gia (Staff Infrastructure Engineer) • Đã gắn bó 8 tháng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
