import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import {
  AnalyzeResumeInput,
  ResumeAnalysisOutput,
  resumeAnalysisSchema,
  WEIGHTS,
} from "./shema";
import { buildJobPostingUserText, SYSTEM_PROMPT } from "./prompts";

export async function resumeAnalyzer({
  pdfBuffer,
  targetJobTitle,
  companyName,
  jobDescription,
}: AnalyzeResumeInput): Promise<ResumeAnalysisOutput> {
  const userText = buildJobPostingUserText(
    targetJobTitle,
    companyName,
    jobDescription,
  );

  const { output } = await generateText({
    model: google("gemini-3.5-flash-lite"),
    system: SYSTEM_PROMPT,
    output: Output.object({
      schema: resumeAnalysisSchema.omit({ overallScore: true }),
    }),
    temperature: 0,
    messages: [
      {
        role: "user",
        content: [
          { type: "file", data: pdfBuffer, mediaType: "application/pdf" },
          { type: "text", text: userText },
        ],
      },
    ],
  });

  const score = output.scores;
  const overallScore = Math.round(
    score.skillsMatch * WEIGHTS.skillsMatch +
      score.experienceFit * WEIGHTS.experienceFit +
      score.quantifiableImpact * WEIGHTS.quantifiableImpact +
      score.atsFormatting * WEIGHTS.atsFormatting,
  );

  return { ...output, overallScore };
}
