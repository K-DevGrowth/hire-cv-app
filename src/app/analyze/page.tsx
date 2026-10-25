// app/analyze/page.tsx
"use client";

import { useState } from "react";
import { AlertCircle, Loader2, TriangleAlert } from "lucide-react";
import type { ResumeAnalysisOutput } from "@/lib/ai/resume-analyzer";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const SCORE_LABELS = {
  skillsMatch: "Khớp kỹ năng",
  experienceFit: "Phù hợp kinh nghiệm",
  quantifiableImpact: "Số liệu đo lường",
  atsFormatting: "Định dạng ATS",
} as const;

// Indicator là child trực tiếp của Progress nên [&>*] đổi màu được ở mọi version shadcn
function scoreBar(n: number) {
  if (n >= 75) return "[&>*]:bg-green-500";
  if (n >= 50) return "[&>*]:bg-yellow-500";
  return "[&>*]:bg-red-500";
}

function scoreText(n: number) {
  if (n >= 75) return "text-green-600";
  if (n >= 50) return "text-yellow-600";
  return "text-red-600";
}

// Tô nổi bật placeholder [X%] để người dùng biết chỗ cần tự điền
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-yellow-200 px-1 text-foreground">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function AnalyzePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeAnalysisOutput | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Có lỗi xảy ra");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Phân tích CV theo JD</CardTitle>
          <CardDescription>
            Tải CV (PDF) và dán mô tả công việc để xem mức độ phù hợp.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="targetJobTitle">Vị trí ứng tuyển</Label>
                <Input id="targetJobTitle" name="targetJobTitle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Công ty (không bắt buộc)</Label>
                <Input id="companyName" name="companyName" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Mô tả công việc (JD)</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                rows={8}
                minLength={50}
                required
                placeholder="Dán JD vào đây"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv">CV (PDF, tối đa 4MB)</Label>
              <Input
                id="cv"
                name="cv"
                type="file"
                accept="application/pdf"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Đang phân tích (~30s)..." : "Phân tích CV"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && <Result data={result} />}
    </main>
  );
}

function Result({ data }: { data: ResumeAnalysisOutput }) {
  // CV không đọc được: model trả mọi điểm = 0 và mảng rỗng, chỉ hiện cảnh báo
  const unreadable = !!data.warning && data.overallScore === 0;

  return (
    <div className="space-y-6">
      {data.warning && (
        <Alert>
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Lưu ý</AlertTitle>
          <AlertDescription>{data.warning}</AlertDescription>
        </Alert>
      )}

      {!unreadable && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-5">
                <div
                  className={`text-6xl font-bold ${scoreText(data.overallScore)}`}
                >
                  {data.overallScore}
                </div>
                <div>
                  <CardTitle>Điểm phù hợp tổng thể</CardTitle>
                  <CardDescription className="mt-1">
                    {data.summary}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              {(Object.keys(SCORE_LABELS) as (keyof typeof SCORE_LABELS)[]).map(
                (k) => (
                  <div key={k} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>{SCORE_LABELS[k]}</span>
                      <span className="text-muted-foreground">
                        {data.scores[k]}/100
                      </span>
                    </div>
                    <Progress
                      value={data.scores[k]}
                      className={scoreBar(data.scores[k])}
                    />
                  </div>
                ),
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Điểm mạnh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.strengths.map((s, i) => (
                  <div key={i} className="rounded-md border p-3 text-sm">
                    <p className="font-medium">{s.requirement}</p>
                    <p className="mt-1 italic text-muted-foreground">
                      “{s.evidence}”
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-700">Điểm yếu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.weaknesses.map((w, i) => (
                  <div key={i} className="rounded-md border p-3 text-sm">
                    <p className="font-medium">{w.requirement}</p>
                    <p className="mt-1 text-muted-foreground">{w.reason}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Từ khóa còn thiếu</CardTitle>
              <CardDescription>
                Đỏ: CV hoàn toàn không có. Viền: chỉ có từ đồng nghĩa, nên dùng
                đúng từ của JD.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {data.missingKeywords.absent.map((k) => (
                <Badge key={`a-${k}`} variant="destructive">
                  {k}
                </Badge>
              ))}
              {data.missingKeywords.synonymOnly.map((k) => (
                <Badge key={`s-${k}`} variant="outline">
                  {k}
                </Badge>
              ))}
              {data.missingKeywords.absent.length +
                data.missingKeywords.synonymOnly.length ===
                0 && (
                <p className="text-sm text-muted-foreground">
                  Không thiếu từ khóa nào.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gợi ý viết lại</CardTitle>
              <CardDescription>
                Phần tô vàng là số liệu bạn cần tự điền, đừng để nguyên
                placeholder khi nộp CV.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.suggestions.map((s, i) => (
                <div
                  key={i}
                  className="space-y-2 rounded-md border p-3 text-sm"
                >
                  <p className="text-muted-foreground line-through">
                    {s.original}
                  </p>
                  <p className="font-medium text-green-700">
                    <Highlight text={s.suggested} />
                  </p>
                  <p className="text-xs text-muted-foreground">{s.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
