"use client";

import { useState, useRef } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  FileText,
  Loader2,
  RotateCcw,
  ShieldAlert,
  TriangleAlert,
  UploadCloud,
  ChevronRight,
} from "lucide-react";
import type { ResumeAnalysisOutput } from "@/lib/ai/resume-analyzer";
import { cn } from "cn";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SCORE_LABELS = {
  skillsMatch: "Kỹ năng chuyên môn (Hard Skills)",
  experienceFit: "Kinh nghiệm & cấp bậc",
  quantifiableImpact: "Số liệu đo lường kết quả (Impact)",
  atsFormatting: "Định dạng & chuẩn quét ATS",
} as const;

function scoreColor(n: number) {
  if (n >= 75) return "text-Lime-500";
  if (n >= 50) return "text-Amber-400";
  return "text-Red-400";
}

function scoreBg(n: number) {
  if (n >= 75) return "bg-Lime-500";
  if (n >= 50) return "bg-Amber-400";
  return "bg-Red-400";
}

function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded-none bg-Lime-500/20 text-Lime-400 border border-Lime-500/40 px-1.5 py-0.5 font-mono font-bold text-xs"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

const SAMPLE_DATA = {
  targetJobTitle: "Kỹ sư Frontend Cao cấp (Senior Frontend Engineer)",
  companyName: "HireNext Technology",
  jobDescription: `Yêu cầu công việc:
- Tối thiểu 3-5 năm kinh nghiệm phát triển ứng dụng web với React, TypeScript và Next.js (App Router).
- Thành thạo Tailwind CSS, tối ưu hóa Web Performance, Core Web Vitals, SEO và Accessibility.
- Kinh nghiệm quản lý state với Zustand, Redux Toolkit hoặc React Query.
- Nắm vững kiến trúc RESTful API, Server Actions, Server Components và Streaming SSR.
- Kỹ năng giao tiếp tốt, tư duy phản biện, viết unit test (Jest / Vitest) và review code.
- Ưu tiên ứng viên có kinh nghiệm tích hợp AI SDK hoặc các mô hình ngôn ngữ lớn (LLM).`,
};

export default function ResumeAnalysisPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeAnalysisOutput | null>(null);

  const [targetJobTitle, setTargetJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const fillSampleData = () => {
    setTargetJobTitle(SAMPLE_DATA.targetJobTitle);
    setCompanyName(SAMPLE_DATA.companyName);
    setJobDescription(SAMPLE_DATA.jobDescription);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Vui lòng chọn tệp định dạng PDF (.pdf)");
        setSelectedFile(null);
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        setError("Dung lượng vượt quá 4MB. Vui lòng chọn tệp nhỏ hơn.");
        setSelectedFile(null);
        return;
      }
      setError(null);
      setSelectedFile(file);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!targetJobTitle.trim()) {
      setError("Vui lòng nhập vị trí ứng tuyển mục tiêu");
      return;
    }
    if (!selectedFile) {
      setError("Vui lòng tải lên tệp CV dạng PDF");
      return;
    }
    if (jobDescription.trim().length < 50) {
      setError("Bản mô tả công việc (JD) cần chứa ít nhất 50 ký tự");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("cv", selectedFile);
    formData.append("targetJobTitle", targetJobTitle.trim());
    if (companyName.trim()) {
      formData.append("companyName", companyName.trim());
    }
    formData.append("jobDescription", jobDescription.trim());

    try {
      const res = await fetch("/api/resume-analysis", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error ?? "Đã xảy ra lỗi trong quá trình phân tích",
        );
      }
      setResult(data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  }

  const isFormValid =
    targetJobTitle.trim().length >= 2 &&
    jobDescription.trim().length >= 50 &&
    selectedFile !== null;

  return (
    <div className="relative min-h-screen bg-Navy-950 text-Neutral-100 font-mono selection:bg-Lime-500 selection:text-Neutral-950 pb-20">
      {/* Khung họa tiết sci-fi nền tinh tế */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <svg
          className="absolute right-0 top-0 h-full w-1/3 text-Neutral-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 400 800"
        >
          <path
            d="M 350 0 L 350 200 L 400 300 L 400 500 L 350 600 L 350 800"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        {/* TIÊU ĐỀ TRANG TINH GIẢN */}
        <div className="mb-8 text-center space-y-2">
          <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-Neutral-50 tracking-wider uppercase">
            <span className="text-Lime-500 mr-2">//</span>
            PHÂN TÍCH CV // ATS
          </h1>
          <p className="text-xs text-Neutral-400 max-w-md mx-auto">
            Nhập JD và tải CV để AI kiểm tra từ khóa, tính điểm ATS và gợi ý
            chỉnh sửa cụ thể.
          </p>
        </div>

        {/* TERMINAL CARD NHẬP LIỆU BẰNG SHADCN CARD VARIANT CYBER */}
        <Card variant="cyber" className="p-6 sm:p-8">
          {/* Thanh tiêu đề card & Nút nạp dữ liệu mẫu */}
          <div className="flex items-center justify-between border-b border-Neutral-800/80 pb-4 mb-6 text-xs tracking-wider">
            <span className="text-Neutral-300 font-bold uppercase">HỒ SƠ</span>
            <Button
              type="button"
              variant="neon-outline"
              size="sm"
              onClick={fillSampleData}
              disabled={loading}
            >
              + Dán JD mẫu thử nhanh
            </Button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* VỊ TRÍ & CÔNG TY */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* 1. VỊ TRÍ ỨNG TUYỂN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="targetJobTitle"
                  className="text-xs text-Neutral-300 uppercase flex items-center gap-1.5"
                >
                  <span className="text-Lime-500 font-bold">&gt;</span>
                  Vị trí ứng tuyển <span className="text-Red-400">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="targetJobTitle"
                    name="targetJobTitle"
                    type="text"
                    value={targetJobTitle}
                    onChange={(e) => setTargetJobTitle(e.target.value)}
                    placeholder="Ví dụ: Senior Frontend Engineer..."
                    disabled={loading}
                    required
                    className="pr-10"
                  />
                  {targetJobTitle.trim().length >= 2 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-Lime-500">
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              </div>

              {/* 2. CÔNG TY (TÙY CHỌN) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="companyName"
                    className="text-Neutral-300 uppercase flex items-center gap-1.5"
                  >
                    <span className="text-Lime-500 font-bold">&gt;</span>
                    Công ty
                  </label>
                  <span className="text-[10px] text-Neutral-500 uppercase tracking-wider">
                    Tùy chọn
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ví dụ: HireNext Tech, Google, VNG..."
                    disabled={loading}
                    className="pr-10"
                  />
                  {companyName.trim().length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-Lime-500">
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. MÔ TẢ CÔNG VIỆC (JD) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="jobDescription"
                  className="text-Neutral-300 uppercase flex items-center gap-1.5"
                >
                  <span className="text-Lime-500 font-bold">&gt;</span>
                  Mô tả công việc (JD) <span className="text-Red-400">*</span>
                </label>
                <span
                  className={cn(
                    "text-[11px]",
                    jobDescription.trim().length >= 50
                      ? "text-Lime-500"
                      : "text-Neutral-500",
                  )}
                >
                  {jobDescription.trim().length}/50 ký tự tối thiểu
                </span>
              </div>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Dán toàn bộ phần yêu cầu, kỹ năng và trách nhiệm của công việc vào đây..."
                disabled={loading}
                required
                minLength={50}
                className="resize-y"
              />
            </div>

            {/* 4. TỆP CV PDF */}
            <div className="space-y-1.5">
              <label
                htmlFor="cv"
                className="text-xs text-Neutral-300 uppercase flex items-center gap-1.5"
              >
                <span className="text-Lime-500 font-bold">&gt;</span>
                Tệp CV định dạng PDF <span className="text-Red-400">*</span>
              </label>

              <input
                ref={fileInputRef}
                id="cv"
                name="cv"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
              />

              {selectedFile ? (
                /* Đã chọn tệp */
                <div className="border border-Lime-500/50 bg-Lime-500/5 p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="h-5 w-5 text-Lime-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-Neutral-100 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-[11px] text-Neutral-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="neon-outline"
                    size="xs"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    disabled={loading}
                  >
                    Đổi tệp
                  </Button>
                </div>
              ) : (
                /* Chưa chọn tệp */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-Neutral-700 bg-Navy-950/60 hover:border-Lime-500/70 p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all text-center group"
                >
                  <UploadCloud className="h-6 w-6 text-Neutral-400 group-hover:text-Lime-400 transition-colors" />
                  <p className="text-xs text-Neutral-200 group-hover:text-Lime-400 transition-colors">
                    Nhấp để tải lên hoặc kéo thả tệp CV (.pdf)
                  </p>
                  <p className="text-[11px] text-Neutral-500">Tối đa 4MB</p>
                </div>
              )}
            </div>

            {/* LƯU Ý BẢO MẬT & THÔNG TIN CÁ NHÂN */}
            <div className="flex items-start gap-2.5 text-[11px] font-mono text-Neutral-400 bg-Neutral-900/60 border border-Neutral-800 p-2.5">
              <ShieldAlert className="h-4 w-4 text-Amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="text-Neutral-200 font-bold uppercase">
                  Lưu ý bảo mật:
                </span>{" "}
                Vui lòng che bớt hoặc không đính kèm thông tin cá nhân nhạy cảm
                (như số CCCD, họ tên, email, địa chỉ...). Hệ thống chỉ cần dữ
                liệu kỹ năng và kinh nghiệm để phân tích.
              </p>
            </div>

            {/* NÚT PHÂN TÍCH */}
            <div className="pt-1">
              <Button
                type="submit"
                variant={isFormValid && !loading ? "neon" : "outline"}
                size="xl"
                disabled={loading || !isFormValid}
                className={cn(
                  "w-full",
                  !isFormValid &&
                    "bg-Neutral-800 text-Neutral-500 border-none cursor-not-allowed hover:bg-Neutral-800 hover:text-Neutral-500",
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-Lime-500" />
                    <span>ĐANG PHÂN TÍCH (~30-60S)...</span>
                  </>
                ) : (
                  <>
                    <span>BẮT ĐẦU PHÂN TÍCH CV</span>
                    <ChevronRight className="h-4 w-4 stroke-[3]" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* THÔNG BÁO LỖI */}
        {error && (
          <div className="mt-6 border border-Red-400/80 bg-Red-500/10 p-3.5 text-Red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="text-Neutral-200">{error}</span>
          </div>
        )}

        {/* TRẠNG THÁI CHỜ PHÂN TÍCH */}
        {loading && (
          <Card variant="cyber" className="mt-8 p-6 text-center space-y-3">
            <Loader2 className="h-6 w-6 animate-spin text-Lime-500 mx-auto" />
            <p className="text-sm font-bold text-Neutral-100">
              AI đang đọc CV và đối chiếu với mô tả công việc...
            </p>
            <p className="text-xs text-Neutral-400 max-w-md mx-auto">
              Hệ thống đang quét từ khóa, đánh giá số liệu đo lường và tính điểm
              phù hợp ATS.
            </p>
          </Card>
        )}

        {/* KẾT QUẢ PHÂN TÍCH */}
        <div ref={resultRef} className="mt-12">
          {result && (
            <CleanResultView
              data={result}
              targetJobTitle={targetJobTitle}
              companyName={companyName}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   GIAO DIỆN KẾT QUẢ GỌN GÀNG, TRỰC DIỆN
========================================================================= */
function CleanResultView({
  data,
  targetJobTitle,
  companyName,
  onReset,
}: {
  data: ResumeAnalysisOutput;
  targetJobTitle: string;
  companyName?: string;
  onReset: () => void;
}) {
  const unreadable = Boolean(data.warning) && data.overallScore === 0;

  return (
    <div className="space-y-6">
      {/* Tiêu đề kết quả */}
      <div className="flex items-center justify-between border-b border-Neutral-800 pb-3">
        <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-lg text-Neutral-100 uppercase">
          KẾT QUẢ: {targetJobTitle}
          {companyName ? ` • ${companyName}` : ""}
        </h2>
        <Button
          type="button"
          variant="neon-outline"
          size="sm"
          onClick={onReset}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1" />
          <span>Xóa kết quả</span>
        </Button>
      </div>

      {data.warning && (
        <div className="border border-Amber-400/60 bg-Amber-400/10 p-3.5 text-xs text-Amber-300 flex items-start gap-2.5">
          <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5 text-Amber-400" />
          <p>{data.warning}</p>
        </div>
      )}

      {!unreadable && (
        <>
          {/* 1. THẺ ĐIỂM TỔNG QUAN */}
          <Card variant="cyber" className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="text-center sm:text-left shrink-0">
                <div
                  className={cn(
                    "font-[family-name:var(--font-orbitron)] font-black text-6xl tracking-tight",
                    scoreColor(data.overallScore),
                  )}
                >
                  {data.overallScore}
                  <span className="text-xl font-normal text-Neutral-500 font-mono">
                    /100
                  </span>
                </div>
                <div className="text-xs text-Neutral-400 mt-1 uppercase font-bold">
                  Điểm ATS Tổng thể
                </div>
              </div>

              <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-Neutral-800 pt-3 sm:pt-0 sm:pl-5 flex-1">
                <span className="text-xs text-Lime-500 font-bold uppercase">
                  &gt; Nhận xét từ AI:
                </span>
                <p className="text-xs text-Neutral-200 leading-relaxed">
                  {data.summary}
                </p>
              </div>
            </div>

            {/* 4 Tiêu chí con */}
            <div className="grid gap-3 sm:grid-cols-2 pt-4 border-t border-Neutral-800/80">
              {(Object.keys(SCORE_LABELS) as (keyof typeof SCORE_LABELS)[]).map(
                (k) => (
                  <div
                    key={k}
                    className="border border-Neutral-800/80 bg-Navy-950 p-3 space-y-1.5"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-Neutral-300 font-medium">
                        {SCORE_LABELS[k]}
                      </span>
                      <span
                        className={cn("font-bold", scoreColor(data.scores[k]))}
                      >
                        {data.scores[k]}/100
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-Neutral-800 overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
                          scoreBg(data.scores[k]),
                        )}
                        style={{ width: `${data.scores[k]}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </Card>

          {/* 2. ĐIỂM MẠNH & CẦN KHẮC PHỤC */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Điểm mạnh */}
            <div className="border border-Lime-500/30 bg-[#0d131d] p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-Lime-400 font-bold text-xs uppercase border-b border-Neutral-800 pb-2.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Điểm mạnh nổi bật ({data.strengths.length})</span>
              </div>
              <div className="space-y-2.5">
                {data.strengths.length === 0 ? (
                  <p className="text-xs text-Neutral-500 italic">
                    Chưa ghi nhận điểm mạnh nổi bật nào.
                  </p>
                ) : (
                  data.strengths.map((s, i) => (
                    <div
                      key={i}
                      className="border border-Lime-500/20 bg-Lime-500/[0.03] p-3 space-y-1 text-xs"
                    >
                      <p className="font-bold text-Neutral-100">
                        {s.requirement}
                      </p>
                      <p className="text-[11px] text-Neutral-400 italic">
                        Bằng chứng: &ldquo;{s.evidence}&rdquo;
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Điểm cần khắc phục */}
            <div className="border border-Red-400/30 bg-[#0d131d] p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-Red-400 font-bold text-xs uppercase border-b border-Neutral-800 pb-2.5">
                <AlertCircle className="h-4 w-4" />
                <span>Cần cải thiện ({data.weaknesses.length})</span>
              </div>
              <div className="space-y-2.5">
                {data.weaknesses.length === 0 ? (
                  <p className="text-xs text-Neutral-500 italic">
                    Không có điểm yếu nghiêm trọng nào.
                  </p>
                ) : (
                  data.weaknesses.map((w, i) => (
                    <div
                      key={i}
                      className="border border-Red-400/20 bg-Red-400/[0.03] p-3 space-y-1 text-xs"
                    >
                      <p className="font-bold text-Neutral-100">
                        {w.requirement}
                      </p>
                      <p className="text-[11px] text-Red-300">{w.reason}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 3. TỪ KHÓA CÒN THIẾU */}
          <div className="border border-Neutral-800 bg-[#0d131d] p-5 space-y-4">
            <div className="border-b border-Neutral-800 pb-2">
              <span className="text-xs font-bold text-Neutral-200 uppercase">
                &gt; Từ khóa còn thiếu so với JD
              </span>
            </div>

            {data.missingKeywords.absent.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-Red-400 uppercase">
                  Thiếu hoàn toàn trong CV:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.missingKeywords.absent.map((k) => (
                    <Badge key={`a-${k}`} variant="neon-destructive">
                      + {k}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {data.missingKeywords.synonymOnly.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-Amber-400 uppercase">
                  Nên đổi sang đúng thuật ngữ trong JD:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.missingKeywords.synonymOnly.map((k) => (
                    <Badge key={`s-${k}`} variant="neon-warning">
                      ~ {k}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {data.missingKeywords.absent.length +
              data.missingKeywords.synonymOnly.length ===
              0 && (
              <p className="text-xs text-Lime-400 font-bold">
                ✓ CV đã bao phủ đầy đủ các từ khóa trọng tâm của JD.
              </p>
            )}
          </div>

          {/* 4. GỢI Ý VIẾT LẠI THEO CHUẨN GOOGLE XYZ */}
          <div className="border border-Neutral-800 bg-[#0d131d] p-5 space-y-4">
            <div className="border-b border-Neutral-800 pb-2 space-y-0.5">
              <span className="text-xs font-bold text-Neutral-200 uppercase">
                &gt; Gợi ý viết lại theo chuẩn Google XYZ
              </span>
              <p className="text-[11px] text-Neutral-500">
                Công thức: &quot;Đạt được [X], đo lường bằng [Y], qua giải pháp
                [Z]&quot;.
              </p>
            </div>

            <div className="space-y-3">
              {data.suggestions.length === 0 ? (
                <p className="text-xs text-Neutral-500 italic">
                  Không có gợi ý viết lại nào.
                </p>
              ) : (
                data.suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="border border-Neutral-800 bg-Navy-950 p-3.5 space-y-2 text-xs"
                  >
                    <div>
                      <span className="text-[10px] text-Neutral-500 uppercase font-bold block">
                        Câu gốc:
                      </span>
                      <p className="text-Neutral-400 line-through">
                        {s.original}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-Lime-500 uppercase font-bold block">
                        Gợi ý tối ưu:
                      </span>
                      <p className="text-Neutral-100 leading-relaxed">
                        <Highlight text={s.suggested} />
                      </p>
                    </div>

                    <p className="text-[11px] text-Neutral-400 pt-1.5 border-t border-Neutral-800/80">
                      <strong className="text-Neutral-300">Lý do:</strong>{" "}
                      {s.note}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
