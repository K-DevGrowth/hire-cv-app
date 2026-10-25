import { analyzeResumeWithAi } from "@/lib/ai/resume-analyzer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_SIZE = 3 * 1024 * 1024; // 3MB

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("cv");
  const targetJobTitle = String(formData.get("targetJobTitle") ?? "").trim();
  const companyName =
    String(formData.get("companyName") ?? "").trim() || undefined;
  const jobDescription = String(formData.get("jobDescription") ?? "").trim();

  if (!(file instanceof File) || file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Vui lòng tải lên file PDF" },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File quá lớn (tối đa 4MB)" },
      { status: 400 },
    );
  }
  if (!targetJobTitle || jobDescription.length < 50) {
    return NextResponse.json(
      { error: "Thiếu vị trí hoặc JD quá ngắn" },
      { status: 400 },
    );
  }

  try {
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    const result = await analyzeResumeWithAi({
      pdfBuffer,
      targetJobTitle,
      companyName,
      jobDescription,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Không phân tích được CV, thử lại sau" },
      { status: 500 },
    );
  }
}
