"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CloudUpload, FileText, X, Loader2 } from "lucide-react";
import { cn } from "cn";
import type { ResumeAnalysisOutput } from "@/lib/ai/shema";

export default function ResumeAnalysisPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<ResumeAnalysisOutput | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.endsWith(".pdf")
    ) {
      setError("Vui lòng tải lên file định dạng PDF (.pdf)");
      return;
    }
    if (selectedFile.size > 4 * 1024 * 1024) {
      setError("Dung lượng file vượt quá giới hạn 4MB");
      return;
    }
    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!jobTitle.trim()) {
      setError("Vui lòng nhập vị trí ứng tuyển");
      return;
    }

    if (jobDescription.trim().length < 50) {
      setError("Mô tả công việc (JD) cần tối thiểu 50 ký tự");
      return;
    }

    if (!file) {
      setError("Vui lòng tải lên CV định dạng PDF");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);
      formData.append("targetJobTitle", jobTitle.trim());
      if (company.trim()) {
        formData.append("companyName", company.trim());
      }
      formData.append("jobDescription", jobDescription.trim());

      const res = await fetch("/api/resume-analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Có lỗi xảy ra khi phân tích CV");
      }

      setAnalysisResult(data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi phân tích CV";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    jobTitle.trim().length > 0 &&
    jobDescription.trim().length >= 50 &&
    file !== null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10">
      <div className="space-y-1 text-center">
        <h1>Phân tích CV bằng AI</h1>
        <p className="text-sm text-muted-foreground">
          Đối chiếu CV với mô tả công việc, nhận điểm ATS và gợi ý chỉnh sửa
        </p>
      </div>

      <Card className="p-6 sm:p-8 bg-card border border-border shadow-sm rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
              {error}
            </div>
          )}

          {/* Vị trí ứng tuyển & Công ty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium">
                Vị trí ứng tuyển *
              </Label>
              <Input
                id="jobTitle"
                type="text"
                placeholder="Senior Frontend Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Công ty
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="HireNext Tech"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          {/* Mô tả công việc (JD) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="jobDescription" className="text-sm font-medium">
                Mô tả công việc (JD) *
              </Label>
              <span className="text-xs text-muted-foreground">
                {jobDescription.length}/50
              </span>
            </div>
            <Textarea
              id="jobDescription"
              placeholder="Dán nội dung JD vào đây..."
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="resize-y"
              required
            />
          </div>

          {/* CV (PDF, tối đa 4MB) */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              CV (PDF, tối đa 4MB) *
            </Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors cursor-pointer",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/40",
                file && "bg-muted/20 border-border",
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) handleFileSelect(selected);
                }}
              />

              {file ? (
                <div className="flex items-center gap-3">
                  <FileText className="size-8 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="ml-2 rounded-full p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <>
                  <CloudUpload className="size-8 text-muted-foreground stroke-1 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nhấp để chọn tệp CV
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-11 text-sm font-medium rounded-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Đang phân tích...
              </>
            ) : (
              "Bắt đầu phân tích"
            )}
          </Button>
        </form>
      </Card>

      {/* Hiển thị kết quả phân tích nếu có */}
      {analysisResult && (
        <Card className="p-6 sm:p-8 space-y-6 bg-card border border-border shadow-sm rounded-2xl">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-bold">Kết quả phân tích CV</h2>
              <p className="text-sm text-muted-foreground">
                Điểm phù hợp tổng thể với vị trí {jobTitle}
              </p>
            </div>
            {analysisResult.overallScore !== undefined && (
              <div className="flex flex-col items-center justify-center rounded-xl bg-primary/10 px-4 py-2">
                <span className="text-2xl font-bold text-primary">
                  {analysisResult.overallScore}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                  Điểm ATS
                </span>
              </div>
            )}
          </div>

          {analysisResult.summary && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">
                Tổng quan
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {analysisResult.summary}
              </p>
            </div>
          )}

          {analysisResult.strengths && analysisResult.strengths.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Điểm mạnh
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                {analysisResult.strengths.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.requirement}</strong>
                    <span> — {item.evidence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysisResult.weaknesses &&
            analysisResult.weaknesses.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  Điểm cần cải thiện
                </h3>
                <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                  {analysisResult.weaknesses.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.requirement}</strong>
                      <span> — {item.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <div>
            <h4>Từ khóa thiếu hoàn toàn</h4>
            <ul>
              {analysisResult.missingKeywords.absent.map((kw, i) => (
                <li key={i}>{kw}</li>
              ))}
            </ul>
            <h4>Chỉ có từ đồng nghĩa</h4>
            <ul>
              {analysisResult.missingKeywords.synonymOnly.map((kw, i) => (
                <li key={i}>{kw}</li>
              ))}
            </ul>
          </div>

          {analysisResult.suggestions.map((s, i) => (
            <li key={i}>
              <p>
                <em>Gốc:</em> {s.original}
              </p>
              <p>
                <em>Đề xuất:</em> {s.suggested}
              </p>
              <p>
                <em>Lý do:</em> {s.note}
              </p>
            </li>
          ))}
        </Card>
      )}
    </div>
  );
}
