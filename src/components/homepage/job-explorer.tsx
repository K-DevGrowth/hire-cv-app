"use client";

import * as React from "react";
import Link from "next/link";
import { Job, SAMPLE_JOBS, DEPARTMENTS } from "./mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Sparkles,
  ArrowRight,
  X,
  Check,
  ChevronRight,
} from "lucide-react";

interface JobExplorerProps {
  initialJobs?: Job[];
}

export function JobExplorer({ initialJobs }: JobExplorerProps) {
  const jobsList = initialJobs && initialJobs.length > 0 ? initialJobs : SAMPLE_JOBS;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDept, setSelectedDept] = React.useState<string>("Tất cả");
  const [selectedWorkplace, setSelectedWorkplace] = React.useState<string>("Tất cả");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Compute department counts
  const deptCounts = React.useMemo(() => {
    const counts: Record<string, number> = { "Tất cả": jobsList.length };
    jobsList.forEach((job) => {
      counts[job.department] = (counts[job.department] || 0) + 1;
    });
    return counts;
  }, [jobsList]);

  // Filter jobs based on search & filters
  const filteredJobs = React.useMemo(() => {
    return jobsList.filter((job) => {
      // Dept match
      if (selectedDept !== "Tất cả" && job.department !== selectedDept) {
        return false;
      }
      // Workplace match
      if (selectedWorkplace !== "Tất cả" && job.workplace !== selectedWorkplace) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesSummary = job.summary.toLowerCase().includes(query);
        const matchesLocation = job.location.toLowerCase().includes(query);
        const matchesTags = job.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        const matchesDept = job.department.toLowerCase().includes(query);
        return (
          matchesTitle ||
          matchesSummary ||
          matchesLocation ||
          matchesTags ||
          matchesDept
        );
      }
      return true;
    });
  }, [searchQuery, selectedDept, selectedWorkplace]);

  // Group filtered jobs by Department (Greenhouse pattern)
  const groupedJobs = React.useMemo(() => {
    const groups: { department: string; jobs: Job[] }[] = [];
    const deptsInOrder = DEPARTMENTS.filter((d) => d !== "Tất cả");

    deptsInOrder.forEach((dept) => {
      const jobsInDept = filteredJobs.filter((j) => j.department === dept);
      if (jobsInDept.length > 0) {
        groups.push({ department: dept, jobs: jobsInDept });
      }
    });

    return groups;
  }, [filteredJobs]);

  const handleCopyLink = (jobId: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/jobs/${jobId}`;
      navigator.clipboard.writeText(url);
      setCopiedId(jobId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDept("Tất cả");
    setSelectedWorkplace("Tất cả");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedDept !== "Tất cả" ||
    selectedWorkplace !== "Tất cả";

  return (
    <section id="open-roles" className="py-16 sm:py-24 bg-background">
      <div className="page-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 border-b border-border/80">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Briefcase className="size-3.5" />
              <span>Cơ hội Nghề nghiệp</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading">
              Các Vị Trí Đang Tuyển Dụng
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-xl">
              Khám phá công việc phù hợp với năng lực và mục tiêu của bạn. Chế độ
              đãi ngộ minh bạch, thời gian linh hoạt và văn hóa trao quyền.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-sm text-muted-foreground">
              Đang hiển thị{" "}
              <strong className="text-foreground font-semibold">
                {filteredJobs.length}
              </strong>{" "}
              trên {jobsList.length} vị trí
            </span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="size-3 mr-1" />
                Đặt lại
              </Button>
            )}
          </div>
        </div>

        {/* Filter Toolbar (Greenhouse style filter bar) */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo chức danh, công nghệ (ví dụ: Next.js, Python), hoặc địa điểm..."
                className="pl-10 pr-9 h-11 bg-card border-border/80 focus-visible:ring-primary/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Xóa tìm kiếm"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Workplace Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg border border-border bg-card self-start sm:self-auto">
              {(["Tất cả", "Từ xa", "Kết hợp"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedWorkplace(mode)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    selectedWorkplace === mode
                      ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {mode === "Tất cả" ? "Tất cả hình thức" : mode}
                </button>
              ))}
            </div>
          </div>

          {/* Department Pills Scrollable */}
          <div
            id="departments"
            className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none"
          >
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDept === dept;
              const count = deptCounts[dept] || 0;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-foreground text-background shadow-xs font-semibold"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                  }`}
                >
                  <span>{dept}</span>
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.2 text-[0.6875rem] font-mono ${
                      isSelected
                        ? "bg-background/20 text-background"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Listings Container: Greenhouse-style department groups */}
        <div className="mt-10 space-y-12">
          {groupedJobs.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center rounded-xl border border-dashed border-border bg-muted/20">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                Không tìm thấy vị trí tuyển dụng phù hợp
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-sm mx-auto">
                Không có công việc nào khớp với &ldquo;
                {searchQuery || selectedDept || selectedWorkplace}&rdquo;. Hãy
                thử điều chỉnh từ khóa hoặc bộ lọc tìm kiếm.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={handleResetFilters}>
                  Xóa tất cả bộ lọc
                </Button>
                <Link href="/jobs">
                  <Button size="sm">Đến Cổng ứng viên</Button>
                </Link>
              </div>
            </div>
          ) : (
            groupedJobs.map((group) => (
              <div key={group.department} className="department-group">
                {/* Department Header (Greenhouse .department-title) */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/70">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
                      {group.department}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-xs font-mono font-normal"
                    >
                      {group.jobs.length} vị trí
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    Cơ hội phát triển bình đẳng cho mọi nhân tài
                  </span>
                </div>

                {/* Job Cards in Department */}
                <div className="grid grid-cols-1 gap-3.5">
                  {group.jobs.map((job) => (
                    <div
                      key={job.id}
                      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-sm"
                    >
                      {/* Left Side: Role Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary flex items-center gap-1.5"
                          >
                            <span>{job.title}</span>
                            <ArrowRight className="size-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                          </Link>

                          {job.featured && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-primary">
                              <Sparkles className="size-3" />
                              Ưu tiên tuyển dụng
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-3xl leading-relaxed">
                          {job.summary}
                        </p>

                        {/* Metadata Pills: Location, Workplace, Level, Salary */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-muted-foreground/80" />
                            <span>{job.location}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-border" />
                            <span className="font-medium text-foreground/80">
                              {job.workplace}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-border" />
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[0.6875rem] font-medium text-foreground/70">
                              Cấp bậc: {job.experience}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-primary font-semibold">
                            <DollarSign className="size-3.5 -mr-0.5" />
                            <span>{job.salary}</span>
                          </div>
                        </div>

                        {/* Tech Tag Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-muted/60 px-2 py-0.5 text-[0.6875rem] font-mono text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Apply / Details Actions */}
                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-border/60">
                        <span className="text-xs text-muted-foreground font-mono">
                          {job.postedAt}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyLink(job.id)}
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs"
                            title="Sao chép liên kết công việc"
                          >
                            {copiedId === job.id ? (
                              <Check className="size-4 text-primary" />
                            ) : (
                              <span className="text-xs font-medium">Chia sẻ</span>
                            )}
                          </button>

                          <Link href={`/jobs/${job.id}`}>
                            <Button size="sm" className="gap-1.5 font-medium">
                              <span>Ứng tuyển</span>
                              <ChevronRight className="size-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Banner for unsolicited applications */}
        <div className="mt-16 p-8 rounded-2xl border border-border bg-card/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-semibold text-foreground font-heading">
              Chưa tìm thấy vị trí phù hợp với chuyên môn của bạn?
            </h4>
            <p className="text-sm text-muted-foreground max-w-lg">
              Chúng tôi luôn chào đón những kỹ sư, nhà thiết kế và chuyên gia
              tài năng. Hãy tham gia mạng lưới nhân tài hoặc kiểm tra độ tương thích
              CV để đội ngũ tuyển dụng liên hệ khi có cơ hội mới.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/jobs">
              <Button variant="outline" size="sm">
                Tham gia Mạng lưới Nhân tài
              </Button>
            </Link>
            <Link href="/resume-analysis">
              <Button size="sm" className="gap-1.5">
                <Sparkles className="size-3.5" />
                <span>Kiểm tra độ khớp CV (AI)</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
