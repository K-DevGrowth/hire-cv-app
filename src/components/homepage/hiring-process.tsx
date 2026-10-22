import * as React from "react";
import { HIRING_STEPS } from "./mock-data";
import {
  Compass,
  CheckCircle2,
  Clock,
  Scale,
} from "lucide-react";

export function HiringProcess() {
  return (
    <section
      id="hiring-process"
      className="py-16 sm:py-24 border-t border-border/80 bg-muted/20"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Compass className="size-3.5" />
            <span>Trải nghiệm Ứng viên</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
            Lộ Trình Tuyển Dụng 5 Bước Rõ Ràng
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Phỏng vấn là cơ hội để hai bên tìm hiểu sự phù hợp, không phải bài
            kiểm tra cân não. Dưới đây là lộ trình chi tiết từng giai đoạn, thời
            lượng dự kiến và các tiêu chí đánh giá.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4">
          {HIRING_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col p-5 rounded-xl border border-border bg-card shadow-2xs hover:border-primary/40 transition-colors"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="font-mono text-2xl font-bold text-primary">
                  {step.step}
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
                  <Clock className="size-3" />
                  {step.duration.split("•")[0]}
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="mt-4 text-base font-semibold text-foreground font-heading">
                {step.title}
              </h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex-1">
                {step.description}
              </p>

              {/* Step Progress Arrow for desktop */}
              {idx < HIRING_STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 size-6 rounded-full bg-card border border-border text-center text-muted-foreground shadow-2xs"
                  aria-hidden="true"
                >
                  <span className="text-xs leading-5">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Our Candidate Bill of Rights / Hiring Pledge */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground font-heading">
            <Scale className="size-4 text-primary" />
            <span>Cam Kết Của Chúng Tôi Với Mọi Ứng Viên</span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium text-foreground">
                  Không Câu Đố Mẹo Lý Thuyết
                </strong>
                <span className="text-muted-foreground">
                  Chúng tôi tập trung vào giải quyết các bài toán kỹ thuật thực
                  tế bạn sẽ làm trong công việc.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium text-foreground">
                  Phản Hồi Nhận Xét Rõ Ràng
                </strong>
                <span className="text-muted-foreground">
                  Mọi ứng viên hoàn thành phỏng vấn đều nhận được thư nhận xét
                  chi tiết và chân thành trong 48 giờ.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium text-foreground">
                  Thu Nhập Minh Bạch 100%
                </strong>
                <span className="text-muted-foreground">
                  Không bao giờ khai thác lịch sử lương cũ. Mức đãi ngộ được ấn
                  định công bằng theo khung năng lực chuẩn.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium text-foreground">
                  Lịch Phỏng Vấn Linh Hoạt
                </strong>
                <span className="text-muted-foreground">
                  Sẵn sàng điều chỉnh múi giờ, hỗ trợ chia nhỏ các vòng phỏng vấn
                  để không ảnh hưởng công việc hiện tại.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
