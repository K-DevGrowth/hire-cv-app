import { Metadata } from "next";
import Link from "next/link";
import {
  layChiTietCongViec,
  layDanhSachCongViec,
} from "@/features/jobs/actions/jobs.service";
import { HomepageHeader } from "@/components/homepage/header";
import { HomepageFooter } from "@/components/homepage/footer";
import { JobHeader } from "@/components/jobs/job-header";
import { JobContent } from "@/components/jobs/job-content";
import { JobSidebar } from "@/components/jobs/job-sidebar";
import { ApplicationForm } from "@/components/jobs/application-form";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const jobs = await layDanhSachCongViec();
  return jobs.map((job) => ({
    jobId: job.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jobId: string }>;
}): Promise<Metadata> {
  const { jobId } = await params;
  const job = await layChiTietCongViec(jobId);

  if (!job) {
    return {
      title: "Chi tiết vị trí tuyển dụng — HireNext ATS",
      description:
        "Xem chi tiết vị trí tuyển dụng và nộp hồ sơ ứng tuyển trực tuyến tại HireNext.",
    };
  }

  return {
    title: `${job.title} — Tuyển dụng HireNext`,
    description: `${job.title} tại khối ${job.department}. Địa điểm: ${job.location}. Mức đãi ngộ: ${job.salary}. Phản hồi hồ sơ trong vòng 48h.`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = await layChiTietCongViec(jobId);

  // If job is not found in database
  if (!job) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <HomepageHeader />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="page-container-narrow text-center space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Briefcase className="size-7" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Vị trí tuyển dụng không tồn tại
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vị trí tuyển dụng có mã &ldquo;{jobId}&rdquo; có thể đã đủ số lượng
              ứng viên hoặc tạm thời đóng nhận hồ sơ.
            </p>
            <div className="pt-2">
              <Link href="/#open-roles">
                <Button className="gap-2">
                  <ArrowLeft className="size-4" />
                  <span>Xem tất cả vị trí đang mở</span>
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <HomepageFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <HomepageHeader />

      <main className="flex-1">
        {/* Top Hero Banner for Job */}
        <JobHeader job={job} />

        {/* 2-Column Content Layout (Greenhouse style) */}
        <div className="page-container py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Content & Application Form */}
            <div className="lg:col-span-8 space-y-14">
              <JobContent job={job} />
              <ApplicationForm job={job} />
            </div>

            {/* Sticky Sidebar on Desktop */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <JobSidebar job={job} />
            </aside>
          </div>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}
