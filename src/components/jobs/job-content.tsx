import * as React from "react";
import { Job, HIRING_STEPS } from "@/components/homepage/mock-data";
import {
  CheckCircle2,
  Sparkles,
  Target,
  Compass,
  Gift,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface JobContentProps {
  job: Job;
}

export function JobContent({ job }: JobContentProps) {
  const defaultResponsibilities = [
    "Thiết kế và triển khai các tính năng cốt lõi đáp ứng yêu cầu cao về hiệu năng, độ tin cậy và khả năng mở rộng.",
    "Hợp tác chặt chẽ cùng các thành viên trong nhóm Kỹ thuật, Sản phẩm và Thiết kế để định hình trải nghiệm người dùng.",
    "Tối ưu hóa các quy trình kỹ thuật hiện tại, giảm thiểu nợ kỹ thuật (technical debt) và nâng cao chuẩn mực code review.",
    "Tham gia vào việc giải quyết các sự cố phát sinh trong môi trường production và đảm bảo tính liên tục của hệ thống.",
    "Chủ động chia sẻ kiến thức, hướng dẫn các kỹ sư trẻ và đóng góp vào văn hóa kỹ thuật cởi mở của HireNext."
  ];

  const defaultRequirements = [
    `Có kinh nghiệm thực tế tương đương với cấp bậc ${job.experience} trong lĩnh vực chuyên môn liên quan.`,
    "Khả năng lập luận vững vàng, tư duy phản biện tốt và phương pháp tiếp cận vấn đề có cấu trúc.",
    "Kỹ năng tự chủ cao, biết sắp xếp mức độ ưu tiên công việc trong môi trường phát triển nhanh.",
    "Giao tiếp rõ ràng bằng lời nói và văn bản; có tinh thần đồng đội và thái độ tích cực.",
    "Luôn đặt chất lượng sản phẩm và trải nghiệm người dùng cuối lên hàng đầu."
  ];

  const defaultNiceToHave = [
    "Kinh nghiệm làm việc với các hệ thống phân tán, xử lý dữ liệu lớn hoặc mô hình SaaS đa khách hàng.",
    "Hiểu biết về quy trình kiểm thử tự động, tích hợp liên tục (CI/CD) và triển khai đám mây.",
    "Đã từng tham gia xây dựng hoặc đóng góp vào các dự án công nghệ mã nguồn mở."
  ];

  const defaultBenefits = [
    `Thu nhập cạnh tranh: ${job.salary} kèm gói thưởng hiệu suất hàng năm.`,
    "Gói quyền chọn cổ phần (Equity / Stock Options) cho nhân sự gắn bó lâu dài.",
    "Bảo hiểm sức khỏe cao cấp toàn diện (nội trú, ngoại trú, nha khoa) từ ngày đầu làm việc.",
    "Ngân sách 2.500$/năm cho việc nâng cao kiến thức, sách vở, hội thảo chuyên ngành.",
    "Cấp mới trang thiết bị làm việc công nghệ cao (MacBook Pro M-Series hoặc máy trạm Linux).",
    "Chế độ làm việc linh hoạt kết hợp từ xa và 18 ngày phép năm nguyên lương."
  ];

  const responsibilities = job.responsibilities || defaultResponsibilities;
  const requirements = job.requirements || defaultRequirements;
  const niceToHave = job.niceToHave || defaultNiceToHave;
  const benefits = job.benefitsList || defaultBenefits;

  return (
    <div className="space-y-12 text-foreground">
      {/* 1. About the Role */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Target className="size-4" />
          <span>Tổng quan vị trí & Sứ mệnh</span>
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Về Vị Trí Này Tại HireNext
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {job.aboutRole ||
            job.summary +
              " Đây là cơ hội tuyệt vời để bạn trực tiếp tạo dựng tác động lớn lên sản phẩm được hàng ngàn doanh nghiệp và hàng triệu ứng viên tin cậy."}
        </p>
      </section>

      {/* 2. Key Responsibilities */}
      <section className="space-y-4">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>Trách Nhiệm Chính Của Bạn</span>
        </h3>
        <ul className="space-y-3 pt-1">
          {responsibilities.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Qualifications & Requirements */}
      <section className="space-y-4">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>Yêu Cầu Năng Lực & Kinh Nghiệm</span>
        </h3>
        <ul className="space-y-3 pt-1">
          {requirements.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Nice to Have */}
      {niceToHave.length > 0 && (
        <section className="space-y-4">
          <h3 className="font-heading text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>Điểm Cộng Nổi Bật (Không Bắt Buộc)</span>
          </h3>
          <ul className="space-y-3 pt-1">
            {niceToHave.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                <Sparkles className="size-5 text-primary/80 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Compensation & Benefits */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Gift className="size-4" />
          <span>Chính sách đãi ngộ</span>
        </div>
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Quyền Lợi & Đãi Ngộ Cho Vị Trí Này
        </h3>
        <ul className="space-y-3 pt-1">
          {benefits.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Interview Roadmap for this Role */}
      <section className="space-y-4 pt-4 border-t border-border/70">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Compass className="size-4" />
          <span>Lộ trình ứng tuyển</span>
        </div>
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Các Vòng Phỏng Vấn Dự Kiến
        </h3>
        <p className="text-sm text-muted-foreground">
          Chúng tôi cam kết tôn trọng thời gian của bạn và phản hồi kết quả sau mỗi vòng trong vòng 48 giờ.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {HIRING_STEPS.slice(0, 4).map((step) => (
            <div
              key={step.step}
              className="p-4 rounded-xl border border-border bg-card/80 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary">
                  Vòng {step.step}
                </span>
                <span className="text-[0.6875rem] font-medium text-muted-foreground">
                  {step.duration}
                </span>
              </div>
              <div className="font-semibold text-sm text-foreground">
                {step.title}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

