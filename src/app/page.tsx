import { Metadata } from "next";
import { HomepageHeader } from "@/components/homepage/header";
import { HomepageHero } from "@/components/homepage/hero";
import { JobExplorer } from "@/components/homepage/job-explorer";
import { HiringProcess } from "@/components/homepage/hiring-process";
import { CompanyBenefits } from "@/components/homepage/benefits";
import { PortalCards } from "@/components/homepage/portal-cards";
import { HomepageFooter } from "@/components/homepage/footer";
import { layDanhSachCongViec } from "@/features/jobs/actions/jobs.service";

export const metadata: Metadata = {
  title: "HireNext — Cổng Tuyển Dụng & Nền Tảng Nhân Tài Công Nghệ",
  description:
    "Khám phá các vị trí tuyển dụng hàng đầu trong các lĩnh vực Kỹ thuật, Sản phẩm và AI với dải lương minh bạch, cam kết phản hồi trong 48 giờ và quy trình tuyển dụng ưu tiên trải nghiệm ứng viên.",
};

export default async function HomePage() {
  const danhSachCongViec = await layDanhSachCongViec();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <HomepageHeader />
      <main className="flex-1">
        <HomepageHero />
        <JobExplorer initialJobs={danhSachCongViec} />
        <HiringProcess />
        <CompanyBenefits />
        <PortalCards />
      </main>
      <HomepageFooter />
    </div>
  );
}
