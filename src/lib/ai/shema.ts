import { z } from "zod";

export interface AnalyzeResumeInput {
  pdfBuffer: Buffer;
  targetJobTitle: string;
  companyName?: string;
  jobDescription: string;
}

const score = z.number().int().min(0).max(100);

export const resumeAnalysisSchema = z.object({
  warning: z
    .string()
    .nullable()
    .describe(
      "Chỉ điền khi JD quá sơ sài, PDF không đọc được hoặc không phải CV. Nếu bình thường thì null.",
    ),
  summary: z
    .string()
    .describe("Nhận xét 2-3 câu về mức độ khớp của CV với đúng bản JD này"),
  strengths: z
    .array(
      z.object({
        requirement: z.string().describe("Yêu cầu trong JD mà CV đáp ứng tốt"),
        evidence: z
          .string()
          .describe("Trích dẫn ngắn (dưới 15 từ) từ CV làm bằng chứng"),
      }),
    )
    .describe("Tối đa 5 mục"),
  weaknesses: z
    .array(
      z.object({
        requirement: z
          .string()
          .describe("Yêu cầu trong JD mà CV chưa đáp ứng hoặc mờ nhạt"),
        reason: z
          .string()
          .describe(
            "Vì sao chưa đạt; ghi 'không tìm thấy trong CV' nếu thiếu hẳn",
          ),
      }),
    )
    .describe("Tối đa 5 mục, ưu tiên yêu cầu bắt buộc"),
  overallScore: score.describe("Điểm phù hợp tổng thể CV với JD, 0-100"),
  scores: z.object({
    skillsMatch: score.describe(
      "Khớp kỹ năng/công cụ trong JD (chấp nhận công nghệ tương đương). 0 = không khớp, 50 = khớp khoảng một nửa yêu cầu bắt buộc, 100 = khớp toàn bộ.",
    ),
    experienceFit: score.describe(
      "Khớp số năm, cấp bậc, vai trò, dự án so với JD. 0 = lệch hoàn toàn, 50 = đạt một nửa, 100 = đạt hoặc vượt toàn bộ.",
    ),
    quantifiableImpact: score.describe(
      "Kinh nghiệm liên quan JD có số liệu đo lường hay không. 0 = không có số liệu nào, 50 = khoảng một nửa mục có số liệu, 100 = hầu hết mục đều có.",
    ),
    atsFormatting: score.describe(
      "Ước lượng bố cục rõ ràng, có mục chuẩn, dễ trích xuất text. 0 = rất khó đọc, 100 = rất rõ ràng.",
    ),
  }),
  missingKeywords: z.object({
    absent: z
      .array(z.string())
      .describe("Từ khóa có trong JD, CV hoàn toàn không có ý đó"),
    synonymOnly: z
      .array(z.string())
      .describe(
        "Từ khóa trong JD mà CV chỉ có từ đồng nghĩa; nên dùng đúng từ của JD",
      ),
  }),
  suggestions: z
    .array(
      z.object({
        original: z.string().describe("Câu/bullet gốc trong CV"),
        suggested: z
          .string()
          .describe(
            "Bản viết lại theo Google XYZ. Số liệu không có trong CV phải để placeholder như [X%]",
          ),
        note: z.string().describe("Lý do sửa, gắn với yêu cầu nào trong JD"),
      }),
    )
    .describe("Tối đa 5 gợi ý"),
});

export const WEIGHTS = {
  skillsMatch: 0.4,
  experienceFit: 0.3,
  quantifiableImpact: 0.15,
  atsFormatting: 0.15,
} as const;

export type ResumeAnalysisOutput = z.infer<typeof resumeAnalysisSchema>;
