import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

import { jobs, type NewJob } from "./schema/jobs";
import { user, type NewUser } from "./schema/auth-schema";
import { interviews, type NewInterview } from "./schema/interviews";
import {
  resumeAnalyses,
  type NewResumeAnalysis,
} from "./schema/resumeAnalyses";

const usersData: NewUser[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Nguyễn Thu Hà",
    email: "ha.nguyen@example.com",
    role: "hr",
    image: "https://i.pravatar.cc/150?img=47",
    phone: "0912345678",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Trần Minh Khoa",
    email: "khoa.tran@example.com",
    role: "interviewer",
    image: "https://i.pravatar.cc/150?img=12",
    phone: "0923456789",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    role: "candidate",
    image: "https://i.pravatar.cc/150?img=68",
    phone: "0901234567",
  },
];
import { jobApplications, type NewApplication } from "./schema/jobApplications";

const jobsData: NewJob[] = [
  {
    id: "eng-1",
    title: "Senior Frontend Engineer",
    department: "Kỹ thuật",
    location: "TP. Hồ Chí Minh",
    workplace: "Kết hợp",
    type: "Toàn thời gian",
    experience: "Senior",
    salary: "2.500$ - 3.500$ / tháng",
    summary:
      "Xây dựng giao diện web hiệu năng cao cho nền tảng tuyển dụng phục vụ hàng trăm nghìn người dùng.",
    description:
      "Bạn sẽ làm việc cùng đội ngũ sản phẩm và thiết kế để phát triển các tính năng mới, tối ưu hiệu năng và xây dựng hệ thống component dùng chung.",
    responsibilities: [
      "Thiết kế và phát triển các tính năng frontend với React và Next.js",
      "Tối ưu hiệu năng, SEO và khả năng truy cập của ứng dụng",
      "Review code và hướng dẫn các thành viên junior",
    ],
    requirements: [
      "Từ 4 năm kinh nghiệm với React và TypeScript",
      "Hiểu sâu về rendering, state management và web performance",
      "Giao tiếp tốt, làm việc nhóm hiệu quả",
    ],
    niceToHave: [
      "Kinh nghiệm với Next.js App Router",
      "Đã từng xây dựng design system",
    ],
    benefits: [
      "Thưởng hiệu suất tối đa 3 tháng lương",
      "Bảo hiểm sức khỏe cao cấp cho bản thân và người thân",
      "Ngân sách học tập 20.000.000đ / năm",
    ],
    tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS"],
    recruiterName: "Nguyễn Thu Hà",
    recruiterTitle: "Senior Talent Partner",
    recruiterAvatar: "https://i.pravatar.cc/150?img=47",
    recruiterEmail: "ha.nguyen@example.com",
    featured: true,
    status: "open",
  },
  {
    id: "eng-2",
    title: "Backend Engineer (Node.js)",
    department: "Kỹ thuật",
    location: "Singapore",
    workplace: "Từ xa",
    type: "Toàn thời gian",
    experience: "Mid",
    salary: "3.000$ - 4.500$ / tháng",
    summary:
      "Phát triển API và dịch vụ nền tảng, đảm bảo hệ thống ổn định và mở rộng được.",
    description:
      "Tham gia thiết kế kiến trúc backend, xây dựng các dịch vụ xử lý hồ sơ ứng tuyển và tích hợp với các hệ thống bên thứ ba.",
    responsibilities: [
      "Thiết kế và triển khai RESTful API, background job",
      "Tối ưu truy vấn PostgreSQL và schema cơ sở dữ liệu",
      "Giám sát, xử lý sự cố và cải thiện độ tin cậy hệ thống",
    ],
    requirements: [
      "Từ 3 năm kinh nghiệm với Node.js và TypeScript",
      "Thành thạo PostgreSQL, hiểu về indexing và transaction",
      "Có kinh nghiệm viết test tự động",
    ],
    niceToHave: ["Kinh nghiệm với Drizzle ORM", "Kiến thức về AWS hoặc GCP"],
    benefits: [
      "Làm việc từ xa linh hoạt",
      "Thiết bị làm việc do công ty cung cấp",
      "Nghỉ phép 18 ngày / năm",
    ],
    tags: ["Node.js", "PostgreSQL", "Drizzle", "Docker"],
    recruiterName: "Trần Minh Khoa",
    recruiterTitle: "Technical Recruiter",
    recruiterAvatar: "https://i.pravatar.cc/150?img=12",
    recruiterEmail: "khoa.tran@example.com",
    featured: false,
    status: "open",
  },
  {
    id: "ai-1",
    title: "AI Engineer",
    department: "Dữ liệu & AI",
    location: "TP. Hồ Chí Minh",
    workplace: "Tại văn phòng",
    type: "Toàn thời gian",
    experience: "Lead",
    salary: "4.000$ - 6.000$ / tháng",
    summary:
      "Dẫn dắt việc xây dựng mô hình chấm điểm tương thích giữa hồ sơ ứng viên và mô tả công việc.",
    description:
      "Bạn sẽ chịu trách nhiệm toàn bộ vòng đời của các tính năng AI, từ nghiên cứu, thử nghiệm đến triển khai production.",
    responsibilities: [
      "Thiết kế pipeline trích xuất thông tin từ CV và chấm điểm tương thích",
      "Đánh giá chất lượng mô hình và giảm thiên vị trong tuyển dụng",
      "Dẫn dắt nhóm 3 kỹ sư dữ liệu và ML",
    ],
    requirements: [
      "Từ 5 năm kinh nghiệm về ML hoặc NLP",
      "Thành thạo Python và các framework LLM",
      "Kinh nghiệm đưa mô hình lên production",
    ],
    niceToHave: [
      "Kinh nghiệm với RAG và vector database",
      "Có công bố nghiên cứu",
    ],
    benefits: [
      "Cổ phần thưởng (ESOP)",
      "Ngân sách tính toán GPU cho nghiên cứu",
      "Bảo hiểm sức khỏe cao cấp",
    ],
    tags: ["Python", "LLM", "NLP", "PyTorch"],
    recruiterName: "Nguyễn Thu Hà",
    recruiterTitle: "Senior Talent Partner",
    recruiterAvatar: "https://i.pravatar.cc/150?img=47",
    recruiterEmail: "ha.nguyen@example.com",
    featured: true,
    status: "open",
  },
  {
    id: "design-1",
    title: "Product Designer",
    department: "Sản phẩm & Thiết kế",
    location: "TP. Hồ Chí Minh",
    workplace: "Kết hợp",
    type: "Hợp đồng",
    experience: "Mid",
    salary: "1.800$ - 2.600$ / tháng",
    summary:
      "Thiết kế trải nghiệm nộp hồ sơ và quản lý ứng viên đơn giản, trực quan.",
    description:
      "Hợp đồng 12 tháng, có khả năng chuyển sang toàn thời gian. Bạn sẽ làm việc sát với PM và kỹ sư từ giai đoạn nghiên cứu đến bàn giao.",
    responsibilities: [
      "Nghiên cứu người dùng và xây dựng user flow",
      "Thiết kế wireframe, prototype và giao diện hoàn chỉnh",
      "Đóng góp vào design system của sản phẩm",
    ],
    requirements: [
      "Từ 3 năm kinh nghiệm thiết kế sản phẩm số",
      "Thành thạo Figma",
      "Portfolio thể hiện rõ quy trình tư duy thiết kế",
    ],
    niceToHave: [
      "Kiến thức cơ bản về HTML/CSS",
      "Kinh nghiệm thiết kế dashboard",
    ],
    benefits: [
      "Giờ làm việc linh hoạt",
      "Thưởng dự án",
      "Máy tính và bản quyền phần mềm",
    ],
    tags: ["Figma", "UX Research", "Design System"],
    recruiterName: "Lê Quỳnh Anh",
    recruiterTitle: "Talent Acquisition Specialist",
    recruiterAvatar: "https://i.pravatar.cc/150?img=32",
    recruiterEmail: "anh.le@example.com",
    featured: false,
    status: "open",
  },
  {
    id: "hr-1",
    title: "Talent Acquisition Specialist",
    department: "Nhân sự & Tuyển dụng",
    location: "TP. Hồ Chí Minh",
    workplace: "Tại văn phòng",
    type: "Toàn thời gian",
    experience: "Mid",
    salary: "1.200$ - 1.800$ / tháng",
    summary:
      "Chủ động tìm kiếm, sàng lọc và kết nối ứng viên chất lượng cho các vị trí công nghệ.",
    description:
      "Bạn sẽ là cầu nối giữa ứng viên và các đội kỹ thuật, đảm bảo trải nghiệm tuyển dụng chuyên nghiệp.",
    responsibilities: [
      "Sourcing ứng viên qua LinkedIn và các cộng đồng",
      "Sàng lọc hồ sơ và tổ chức phỏng vấn",
      "Theo dõi số liệu tuyển dụng và đề xuất cải tiến",
    ],
    requirements: [
      "Từ 2 năm kinh nghiệm tuyển dụng IT",
      "Kỹ năng giao tiếp và đàm phán tốt",
      "Tiếng Anh giao tiếp thành thạo",
    ],
    niceToHave: ["Từng sử dụng hệ thống ATS", "Kinh nghiệm employer branding"],
    benefits: [
      "Thưởng theo số lượng tuyển thành công",
      "Du lịch công ty hằng năm",
    ],
    tags: ["Recruiting", "Sourcing", "Interviewing"],
    recruiterName: "Lê Quỳnh Anh",
    recruiterTitle: "Talent Acquisition Specialist",
    recruiterAvatar: "https://i.pravatar.cc/150?img=32",
    recruiterEmail: "anh.le@example.com",
    featured: false,
    status: "open",
  },
  {
    id: "growth-1",
    title: "Growth Marketing Manager",
    department: "Tăng trưởng & Vận hành",
    location: "Singapore",
    workplace: "Kết hợp",
    type: "Toàn thời gian",
    experience: "Senior",
    salary: "3.500$ - 5.000$ / tháng",
    summary:
      "Xây dựng chiến lược tăng trưởng người dùng và doanh thu cho thị trường Đông Nam Á.",
    description:
      "Vị trí đã đóng tuyển. Dữ liệu này được giữ lại để kiểm thử trạng thái closed.",
    responsibilities: [
      "Lập kế hoạch và tối ưu các kênh acquisition",
      "Chạy thử nghiệm A/B và phân tích funnel",
    ],
    requirements: [
      "Từ 5 năm kinh nghiệm growth hoặc performance marketing",
      "Tư duy dựa trên dữ liệu",
    ],
    niceToHave: ["Kinh nghiệm với sản phẩm B2B SaaS"],
    benefits: ["Ngân sách marketing linh hoạt", "Thưởng theo KPI"],
    tags: ["Growth", "SEO", "Analytics"],
    recruiterName: "Trần Minh Khoa",
    recruiterTitle: "Technical Recruiter",
    recruiterAvatar: "https://i.pravatar.cc/150?img=12",
    recruiterEmail: "khoa.tran@example.com",
    featured: false,
    status: "closed",
  },
];

const applicationsData: NewApplication[] = [
  {
    jobId: "eng-1",
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    applicationCode: "HN-2026-8942",
    fullName: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    phoneNumber: "0901234567",
    address: "Quận 1, TP. Hồ Chí Minh",
    linkedinUrl: "https://linkedin.com/in/an-nguyen",
    portfolioUrl: "https://an-nguyen.dev",
    coverLetter:
      "Tôi có 5 năm kinh nghiệm xây dựng ứng dụng React quy mô lớn và rất quan tâm đến sản phẩm của công ty.",
    availableStartDate: "2 tuần",
    expectedSalary: "3.200$ / tháng",
    resumeUrl: "https://example.com/uploads/cv/NguyenVanAn_CV.pdf",
    resumeFileName: "NguyenVanAn_CV.pdf",
    resumeFileSize: 245_760,
    resumeFileType: "application/pdf",
    aiMatchScore: 91,
    status: "phong_van",
    internalNotes: "Portfolio tốt, đã lên lịch phỏng vấn kỹ thuật vòng 1.",
  },
  {
    jobId: "eng-1",
    applicationCode: "HN-2026-8943",
    fullName: "Trần Thị Bích",
    email: "bich.tran@example.com",
    phoneNumber: "0912345678",
    address: "Thủ Đức, TP. Hồ Chí Minh",
    linkedinUrl: "https://linkedin.com/in/bich-tran",
    coverLetter: "Tôi muốn phát triển sâu hơn về hiệu năng frontend.",
    availableStartDate: "1 tháng",
    expectedSalary: "2.800$ / tháng",
    resumeUrl: "https://example.com/uploads/cv/TranThiBich_CV.pdf",
    resumeFileName: "TranThiBich_CV.pdf",
    resumeFileSize: 198_400,
    resumeFileType: "application/pdf",
    aiMatchScore: 76,
    status: "da_xem",
  },
  {
    jobId: "eng-2",
    applicationCode: "HN-2026-8944",
    fullName: "Lê Hoàng Nam",
    email: "nam.le@example.com",
    phoneNumber: "0923456789",
    address: "Đà Nẵng",
    linkedinUrl: "https://linkedin.com/in/nam-le",
    portfolioUrl: "https://github.com/namle",
    coverLetter:
      "Tôi từng thiết kế hệ thống xử lý hàng triệu request mỗi ngày.",
    availableStartDate: "2 tuần",
    expectedSalary: "3.800$ / tháng",
    resumeUrl: "https://example.com/uploads/cv/LeHoangNam_CV.pdf",
    resumeFileName: "LeHoangNam_CV.pdf",
    resumeFileSize: 312_320,
    resumeFileType: "application/pdf",
    aiMatchScore: 88,
    status: "offer",
    internalNotes: "Đã thống nhất mức lương, chờ ứng viên phản hồi offer.",
  },
  {
    jobId: "ai-1",
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    applicationCode: "HN-2026-8945",
    fullName: "Phạm Quốc Bảo",
    email: "bao.pham@example.com",
    phoneNumber: "0934567890",
    address: "Quận 7, TP. Hồ Chí Minh",
    linkedinUrl: "https://linkedin.com/in/bao-pham",
    coverLetter:
      "Tôi đã dẫn dắt nhóm ML triển khai hệ thống gợi ý phục vụ hơn 1 triệu người dùng.",
    availableStartDate: "1 tháng",
    expectedSalary: "5.500$ / tháng",
    resumeUrl: "https://example.com/uploads/cv/PhamQuocBao_CV.pdf",
    resumeFileName: "PhamQuocBao_CV.pdf",
    resumeFileSize: 402_944,
    resumeFileType: "application/pdf",
    aiMatchScore: 94,
    status: "phong_van",
  },
  {
    jobId: "design-1",
    applicationCode: "HN-2026-8946",
    fullName: "Võ Thị Cẩm Tú",
    email: "tu.vo@example.com",
    phoneNumber: "0945678901",
    address: "Quận 3, TP. Hồ Chí Minh",
    portfolioUrl: "https://behance.net/camtu",
    coverLetter:
      "Tôi yêu thích việc biến quy trình phức tạp thành trải nghiệm đơn giản.",
    availableStartDate: "Ngay lập tức",
    expectedSalary: "2.200$ / tháng",
    resumeUrl: "https://example.com/uploads/cv/VoThiCamTu_CV.pdf",
    resumeFileName: "VoThiCamTu_CV.pdf",
    resumeFileSize: 523_264,
    resumeFileType: "application/pdf",
    aiMatchScore: 82,
    status: "moi_nop",
  },
  {
    jobId: "design-1",
    applicationCode: "HN-2026-8947",
    fullName: "Đặng Minh Quân",
    email: "quan.dang@example.com",
    phoneNumber: "0956789012",
    resumeUrl: "https://example.com/uploads/cv/DangMinhQuan_CV.docx",
    resumeFileName: "DangMinhQuan_CV.docx",
    resumeFileSize: 148_480,
    resumeFileType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    aiMatchScore: 54,
    status: "tu_choi",
    internalNotes: "Portfolio chưa thể hiện được quy trình thiết kế.",
  },
  {
    jobId: "hr-1",
    applicationCode: "HN-2026-8948",
    fullName: "Bùi Ngọc Lan",
    email: "lan.bui@example.com",
    phoneNumber: "0967890123",
    address: "Bình Thạnh, TP. Hồ Chí Minh",
    linkedinUrl: "https://linkedin.com/in/lan-bui",
    coverLetter:
      "Tôi có 3 năm kinh nghiệm tuyển dụng IT cho các công ty sản phẩm.",
    availableStartDate: "2 tuần",
    expectedSalary: "1.500$ / tháng",
    resumeUrl: "https://example.com/uploads/cv/BuiNgocLan_CV.pdf",
    resumeFileName: "BuiNgocLan_CV.pdf",
    resumeFileSize: 176_128,
    resumeFileType: "application/pdf",
    aiMatchScore: 79,
    status: "da_xem",
  },
  {
    jobId: "growth-1",
    applicationCode: "HN-2026-8949",
    fullName: "Hoàng Gia Huy",
    email: "huy.hoang@example.com",
    phoneNumber: "0978901234",
    address: "Hà Nội",
    linkedinUrl: "https://linkedin.com/in/huy-hoang",
    availableStartDate: "1 tháng",
    expectedSalary: "4.200$ / tháng",
    resumeUrl: "https://example.com/uploads/cv/HoangGiaHuy_CV.pdf",
    resumeFileName: "HoangGiaHuy_CV.pdf",
    resumeFileSize: 289_792,
    resumeFileType: "application/pdf",
    aiMatchScore: 85,
    status: "tu_choi",
    internalNotes: "Vị trí đã đóng tuyển.",
  },
];

const interviewsData: NewInterview[] = [
  {
    id: "44444444-4444-4444-8444-444444444444",
    applicationId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    interviewerId: "22222222-2222-4222-8222-222222222222",
    scheduledAt: new Date(Date.now() + 86400000 * 2), // 2 ngày tới
    format: "online",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    status: "scheduled",
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    applicationId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    interviewerId: "22222222-2222-4222-8222-222222222222",
    scheduledAt: new Date(Date.now() - 86400000 * 3), // 3 ngày trước
    format: "online",
    meetingLink: "https://meet.google.com/xyz-uvwx-rst",
    status: "completed",
    score: 92,
    feedback:
      "Ứng viên nắm rất vững kiến thức về Machine Learning và kiến trúc hệ thống dữ liệu lớn. Tác phong chuyên nghiệp.",
    recommendation: "strong_hire",
  },
];

const resumeAnalysesData: NewResumeAnalysis[] = [
  {
    id: "66666666-6666-4666-8666-666666666666",
    jobId: "eng-1",
    targetJobTitle: "Senior Frontend Engineer",
    companyName: "HireNext Technology",
    jobDescription:
      "Yêu cầu từ 4 năm kinh nghiệm React, TypeScript, Next.js và tối ưu hiệu năng web.",
    resumeUrl: "/uploads/cvs/sample-frontend-cv.pdf",
    resumeFileName: "NguyenVanAn_CV.pdf",
    matchScore: 88,
    summary:
      "Hồ sơ ứng viên rất tiềm năng, kỹ năng kỹ thuật khớp 88% với yêu cầu công việc.",
    strengths: [
      "Thành thạo React 19, TypeScript và Next.js App Router",
      "Kinh nghiệm xây dựng và tối ưu hoá Web Vitals quy mô lớn",
      "Từng dẫn dắt và mentoring cho các kỹ sư trẻ",
    ],
    weaknesses: [
      "Chưa có nhiều kinh nghiệm viết Automated E2E Testing (Playwright / Cypress)",
      "Thiếu các chỉ số định lượng về doanh thu/chi phí tiết kiệm được",
    ],
    suggestions: [
      "Bổ sung mục các số liệu đo lường hiệu năng (ví dụ: giảm thời gian tải trang 35%)",
      "Đính kèm link dự án cá nhân GitHub hoặc sản phẩm trực tiếp đã triển khai",
    ],
  },
];

async function seed() {
  console.log("Seeding database...");
  await db.delete(interviews);
  await db.delete(resumeAnalyses);

  await db.delete(jobApplications);
  await db.delete(jobs);
  await db.delete(user);

  await db.insert(user).values(usersData);
  console.log(`Inserted ${usersData.length} users`);

  await db.insert(jobs).values(jobsData);
  console.log(`Inserted ${jobsData.length} jobs`);

  await db.insert(jobApplications).values(applicationsData);
  console.log(`Inserted ${applicationsData.length} job applications`);

  await db.insert(interviews).values(interviewsData);
  console.log(`Inserted ${interviewsData.length} interviews`);

  await db.insert(resumeAnalyses).values(resumeAnalysesData);
  console.log(`Inserted ${resumeAnalysesData.length} resume analyses`);

  console.log("Seed completed.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
