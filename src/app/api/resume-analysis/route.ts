import { analyzeResumeWithAi } from "@/lib/ai/resume-analyzer";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("cv");
    const targetJobTitle = String(formData.get("targetJobTitle") ?? "").trim();
    const companyName =
      String(formData.get("companyName") ?? "").trim() || undefined;
    const jobDescription = String(formData.get("jobDescription") ?? "").trim();

    if (!(file instanceof File) || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Vui lòng tải lên tệp định dạng PDF (.pdf)" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File quá lớn. Vui lòng tải file PDF tối đa 4MB." },
        { status: 400 },
      );
    }

    if (!targetJobTitle) {
      return NextResponse.json(
        { error: "Vui lòng nhập vị trí ứng tuyển" },
        { status: 400 },
      );
    }

    if (jobDescription.length < 50) {
      return NextResponse.json(
        {
          error:
            "Mô tả công việc (JD) quá ngắn (tối thiểu 50 ký tự) để AI có thể phân tích chính xác",
        },
        { status: 400 },
      );
    }

    const hasApiKey = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

    if (!hasApiKey) {
      return NextResponse.json(
        {
          error:
            "Chưa cấu hình API Key. Vui lòng thêm GOOGLE_GENERATIVE_AI_API_KEY hoặc GEMINI_API_KEY vào .env.local",
        },
        { status: 500 },
      );
    }

    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    const result = await analyzeResumeWithAi({
      pdfBuffer,
      targetJobTitle,
      companyName,
      jobDescription,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Lỗi phân tích CV:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Không phân tích được CV, vui lòng thử lại sau";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
