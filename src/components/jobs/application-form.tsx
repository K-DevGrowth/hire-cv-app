"use client";

import * as React from "react";
import Link from "next/link";
import { Job } from "@/components/homepage/mock-data";
import { nopDonUngTuyen } from "@/features/jobs/actions/apply.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Send,
  Loader2,
  ShieldCheck,
  ArrowRight,
  FileCheck,
} from "lucide-react";

interface ApplicationFormProps {
  job: Job;
}

export function ApplicationForm({ job }: ApplicationFormProps) {
  // Form state
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [portfolio, setPortfolio] = React.useState("");
  const [coverLetter, setCoverLetter] = React.useState("");
  const [startDate, setStartDate] = React.useState("2 tuần");
  const [salaryExpectation, setSalaryExpectation] = React.useState(job.salary);
  const [agreedTerms, setAgreedTerms] = React.useState(true);

  // File upload state
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = React.useState(false);
  const [aiScore, setAiScore] = React.useState<number | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [applicationId, setApplicationId] = React.useState<string>("");
  const [formError, setFormError] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const validateAndSetFile = (file: File) => {
    setFileError(null);
    setAiScore(null);

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (
      !validTypes.includes(file.type) &&
      !["pdf", "doc", "docx"].includes(fileExtension || "")
    ) {
      setFileError("Vui lòng tải lên tệp định dạng PDF, DOC hoặc DOCX.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("Dung lượng tệp không được vượt quá 10MB.");
      return;
    }

    setUploadedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setAiScore(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAiScan = () => {
    if (!uploadedFile) return;
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiAnalyzing(false);
      setAiScore(92);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError("Vui lòng điền đầy đủ các thông tin bắt buộc (*).");
      return;
    }

    if (!uploadedFile) {
      setFormError("Vui lòng đính kèm tệp CV / Resume của bạn.");
      return;
    }

    if (!agreedTerms) {
      setFormError("Vui lòng đồng ý với điều khoản xử lý hồ sơ ứng viên.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("congViecId", job.id);
      formData.append("hoTen", fullName);
      formData.append("email", email);
      formData.append("soDienThoai", phone);
      formData.append("diaChi", location);
      formData.append("linkLinkedin", linkedin);
      formData.append("linkPortfolio", portfolio);
      formData.append("thuGioiThieu", coverLetter);
      formData.append("ngayCoTheBatDau", startDate);
      formData.append("mucLuongKyVong", salaryExpectation);
      if (aiScore !== null) {
        formData.append("diemAiDanhGia", aiScore.toString());
      }
      formData.append("fileCv", uploadedFile);

      const res = await nopDonUngTuyen(formData);
      if (res.thanhCong && res.maUngTuyen) {
        setApplicationId(res.maUngTuyen);
        setIsSuccess(true);
      } else {
        setFormError(res.thongBao || "Có lỗi xảy ra khi nộp hồ sơ.");
      }
    } catch {
      setFormError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section
        id="apply-form"
        className="rounded-3xl border border-primary/30 bg-card p-8 sm:p-12 shadow-sm text-center animate-in fade-in-0 duration-300"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
          <CheckCircle2 className="size-8" />
        </div>

        <h3 className="mt-6 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Nộp Hồ Sơ Thành Công!
        </h3>

        <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Cảm ơn bạn đã ứng tuyển vào vị trí{" "}
          <strong className="text-foreground font-semibold">{job.title}</strong>
          . Hồ sơ của bạn đã được chuyển đến Đội ngũ Tuyển dụng.
        </p>

        {/* Application ID Card */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 rounded-xl border border-border bg-muted/30 px-6 py-3 text-sm">
          <span className="text-muted-foreground">Mã hồ sơ ứng tuyển:</span>
          <span className="font-mono text-base font-bold text-primary">
            {applicationId}
          </span>
          <span className="hidden sm:inline text-muted-foreground/40">•</span>
          <span className="text-xs text-muted-foreground">
            Phản hồi trước 48 giờ làm việc
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/applications">
            <Button size="lg" className="gap-2 font-semibold">
              <span>Theo dõi hồ sơ của tôi</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/#open-roles">
            <Button variant="outline" size="lg">
              Xem các vị trí khác
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="apply-form"
      className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs"
    >
      <div className="border-b border-border/70 pb-6">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Send className="size-4" />
          <span>Biểu mẫu ứng tuyển</span>
        </div>
        <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Nộp Đơn Ứng Tuyển Cho Vị Trí Này
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thời gian điền đơn chỉ mất khoảng 2 phút. Chúng tôi xem xét mọi hồ sơ
          và cam kết phản hồi trong vòng 48 giờ.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {formError && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="size-5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* 1. Personal Information */}
        <div className="space-y-4">
          <h4 className="font-heading text-base font-semibold text-foreground">
            1. Thông Tin Ứng Viên
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-semibold text-foreground">
                Họ và tên <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="bg-muted/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                Địa chỉ Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nguyenvana@gmail.com"
                className="bg-muted/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold text-foreground">
                Số điện thoại liên hệ <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912 345 678"
                className="bg-muted/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-xs font-semibold text-foreground">
                Thành phố / Quốc gia hiện tại
              </Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ví dụ: TP. Hồ Chí Minh"
                className="bg-muted/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="linkedin" className="text-xs font-semibold text-foreground">
                Link hồ sơ LinkedIn
              </Label>
              <Input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="bg-muted/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="portfolio" className="text-xs font-semibold text-foreground">
                GitHub / Portfolio / Website cá nhân
              </Label>
              <Input
                id="portfolio"
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://github.com/username"
                className="bg-muted/20"
              />
            </div>
          </div>
        </div>

        {/* 2. Upload CV / Resume (Core Feature) */}
        <div className="space-y-4 pt-4 border-t border-border/70">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-heading text-base font-semibold text-foreground">
              2. Đính Kèm CV / Resume <span className="text-destructive">*</span>
            </h4>
            <span className="text-xs text-muted-foreground font-mono">
              Hỗ trợ PDF, DOC, DOCX (tối đa 10MB)
            </span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />

          {!uploadedFile ? (
            /* Drag and Drop Upload Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[0.99]"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/80 text-muted-foreground group-hover:scale-105 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <UploadCloud className="size-7" />
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-primary hover:underline">
                    Nhấn để tải tệp lên
                  </span>{" "}
                  hoặc kéo và thả CV vào đây
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Định dạng khuyến nghị: PDF (chúng tôi giữ nguyên định dạng của bạn)
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 gap-1.5 text-xs pointer-events-none"
              >
                <span>Chọn tệp từ máy tính</span>
              </Button>
            </div>
          ) : (
            /* Uploaded File Preview Card */
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <FileCheck className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm text-foreground truncate">
                      {uploadedFile.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(uploadedFile.size)}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-primary font-medium">
                        <CheckCircle2 className="size-3" />
                        Đã đính kèm thành công
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAiScan}
                    disabled={aiAnalyzing}
                    className="gap-1.5 text-xs text-primary border-primary/30 hover:bg-primary/10"
                  >
                    {aiAnalyzing ? (
                      <>
                        <Loader2 className="size-3 animate-spin" />
                        <span>Đang phân tích...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-3" />
                        <span>Kiểm tra độ khớp bằng AI</span>
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleRemoveFile}
                    className="text-muted-foreground hover:text-destructive"
                    title="Xóa tệp này"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>

              {/* AI Score Feedback pill */}
              {aiScore !== null && (
                <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card text-xs text-foreground animate-in fade-in-0">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <span>
                      Độ tương thích hồ sơ với vị trí:{" "}
                      <strong className="font-semibold text-primary">
                        {aiScore}% (Rất phù hợp)
                      </strong>
                    </span>
                  </div>
                  <span className="text-[0.6875rem] text-muted-foreground hidden sm:inline">
                    Phù hợp với các kỹ năng: {job.tags.slice(0, 3).join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}

          {fileError && (
            <p className="text-xs text-destructive flex items-center gap-1.5">
              <AlertCircle className="size-3.5" />
              <span>{fileError}</span>
            </p>
          )}
        </div>

        {/* 3. Cover Letter & Expectations */}
        <div className="space-y-4 pt-4 border-t border-border/70">
          <h4 className="font-heading text-base font-semibold text-foreground">
            3. Thư Giới Thiệu & Kỳ Vọng
          </h4>

          <div className="space-y-1.5">
            <Label htmlFor="coverLetter" className="text-xs font-semibold text-foreground">
              Thư giới thiệu / Đôi nét về bạn (Tùy chọn)
            </Label>
            <textarea
              id="coverLetter"
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Chia sẻ ngắn gọn lý do bạn quan tâm đến vị trí này, dự án nổi bật bạn từng thực hiện hoặc những giá trị bạn có thể mang lại..."
              className="w-full rounded-md border border-input bg-muted/20 px-3.5 py-2.5 text-sm transition-all outline-none focus-visible:bg-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <Label htmlFor="startDate" className="text-xs font-semibold text-foreground">
                Thời gian sớm nhất có thể nhận việc
              </Label>
              <select
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-muted/20 px-3.5 py-2 text-sm transition-all outline-none focus-visible:bg-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
              >
                <option value="Sẵn sàng ngay">Sẵn sàng nhận việc ngay</option>
                <option value="2 tuần">Sau 2 tuần (bàn giao công việc cũ)</option>
                <option value="1 tháng">Sau 1 tháng (theo luật lao động)</option>
                <option value="Thỏa thuận">Thương lượng linh hoạt</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="salaryExpectation" className="text-xs font-semibold text-foreground">
                Mức thu nhập kỳ vọng
              </Label>
              <Input
                id="salaryExpectation"
                type="text"
                value={salaryExpectation}
                onChange={(e) => setSalaryExpectation(e.target.value)}
                placeholder="Ví dụ: Theo dải lương niêm yết"
                className="bg-muted/20"
              />
            </div>
          </div>
        </div>

        {/* 4. Terms & Security */}
        <div className="pt-4 border-t border-border/70 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="size-4 mt-0.5 rounded border-border text-primary focus:ring-primary/20 accent-primary"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              Tôi xác nhận thông tin cung cấp là chính xác và đồng ý cho
              HireNext lưu trữ, xử lý dữ liệu hồ sơ phục vụ mục đích tuyển dụng
              theo chính sách bảo vệ dữ liệu cá nhân.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>Dữ liệu của bạn được mã hóa an toàn & bảo mật tuyệt đối</span>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 font-semibold gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Đang gửi hồ sơ...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Gửi hồ sơ ứng tuyển</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

