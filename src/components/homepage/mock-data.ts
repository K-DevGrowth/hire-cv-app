export interface Job {
  id: string;
  title: string;
  department: "Kỹ thuật" | "Sản phẩm & Thiết kế" | "Dữ liệu & AI" | "Nhân sự & Tuyển dụng" | "Tăng trưởng & Vận hành";
  location: string;
  workplace: "Từ xa" | "Kết hợp" | "Tại văn phòng";
  type: "Toàn thời gian" | "Hợp đồng";
  experience: "Mid" | "Senior" | "Lead" | "Staff";
  salary: string;
  postedAt: string;
  featured?: boolean;
  summary: string;
  tags: string[];
  aboutRole?: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
  benefitsList?: string[];
  hiringManager?: {
    name: string;
    role: string;
    avatarText: string;
    email: string;
  };
}

export const SAMPLE_JOBS: Job[] = [
  {
    id: "eng-1",
    title: "Kỹ sư Full-Stack Cao cấp (Senior Full-Stack Engineer)",
    department: "Kỹ thuật",
    location: "TP. Hồ Chí Minh, Việt Nam",
    workplace: "Kết hợp",
    type: "Toàn thời gian",
    experience: "Senior",
    salary: "3.500$ - 5.000$ / tháng",
    postedAt: "Vừa đăng",
    featured: true,
    summary: "Xây dựng các quy trình hiệu năng cao trên nền tảng Next.js 16, TypeScript, Neon Serverless Postgres và hệ thống tuyển dụng thời gian thực.",
    tags: ["React 19", "Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL"],
    aboutRole: "Ở vị trí Kỹ sư Full-Stack Cao cấp, bạn sẽ là nhân tố chủ chốt tham gia thiết kế và hiện thực hóa các phân hệ cốt lõi của nền tảng HireNext ATS — từ quy trình nộp hồ sơ mượt mà của ứng viên đến hệ thống điều phối phỏng vấn theo thời gian thực của các nhà tuyển dụng hàng đầu. Bạn sẽ cùng đội ngũ kỹ sư giải quyết các thách thức về độ ổn định, hiệu năng và tính mở rộng trên kiến trúc Next.js App Router hiện đại nhất.",
    responsibilities: [
      "Kiến trúc và phát triển các tính năng Full-Stack toàn diện bằng React 19, Next.js 16, Server Components và TypeScript.",
      "Tối ưu hóa cơ sở dữ liệu Neon Serverless Postgres với Drizzle ORM, đảm bảo thời gian phản hồi truy vấn dưới 50ms.",
      "Xây dựng API bảo mật, đồng bộ hóa lịch phỏng vấn và hệ thống thông báo đa kênh (Email, Slack, Webhooks).",
      "Dẫn dắt các buổi thảo luận kiến trúc, tham gia Code Review định kỳ và xây dựng văn hóa kiểm thử tự động.",
      "Cùng bộ phận Thiết kế và Sản phẩm tạo ra trải nghiệm ứng dụng thân thiện, không có độ trễ cho người dùng."
    ],
    requirements: [
      "Có ít nhất 4+ năm kinh nghiệm làm việc chuyên sâu với JavaScript/TypeScript, React và hệ sinh thái Node.js.",
      "Thành thạo Next.js (App Router, Server Actions, Caching, Turbopack) và Tailwind CSS.",
      "Kinh nghiệm thực tế trong thiết kế cơ sở dữ liệu quan hệ (PostgreSQL, MySQL) và sử dụng ORM hiện đại (Drizzle, Prisma).",
      "Hiểu biết vững chắc về RESTful API, bảo mật web (OWASP, JWT, CSRF) và quy trình CI/CD.",
      "Kỹ năng tư duy logic xuất sắc, giao tiếp cởi mở và chủ động tìm kiếm giải pháp tối ưu cho sản phẩm."
    ],
    niceToHave: [
      "Đã từng xây dựng hoặc tối ưu hóa các ứng dụng ATS, CRM hoặc nền tảng SaaS B2B có lưu lượng truy cập lớn.",
      "Có kinh nghiệm với Serverless Architecture, Redis caching hoặc WebSockets.",
      "Từng tham gia đóng góp cho các thư viện mã nguồn mở hoặc xây dựng Design System."
    ],
    benefitsList: [
      "Mức lương cạnh tranh 3.500$ - 5.000$/tháng + Thưởng hiệu quả kinh doanh + Quyền chọn cổ phần (Stock options).",
      "Ngân sách 2.500$/năm dành riêng cho học tập, thi chứng chỉ quốc tế và tham dự hội nghị công nghệ.",
      "Trang bị ngay MacBook Pro M3 Max / M4 Pro hoặc máy trạm chuyên dụng cùng màn hình 4K sắc nét.",
      "Bảo hiểm sức khỏe VIP toàn diện (nội trú, ngoại trú, nha khoa) cho bản thân và 01 người phụ thuộc.",
      "Môi trường làm việc Hybrid linh hoạt, tự chủ quản lý thời gian và 18 ngày phép năm hưởng nguyên lương."
    ],
    hiringManager: {
      name: "Trần Minh Quân",
      role: "Giám đốc Kỹ thuật (VP of Engineering)",
      avatarText: "MQ",
      email: "quan.tran@hirenext.vn"
    }
  },
  {
    id: "eng-2",
    title: "Kỹ sư Frontend Chuyên gia — Hệ thống Giao diện (Staff Frontend Engineer)",
    department: "Kỹ thuật",
    location: "Làm việc từ xa (Toàn cầu)",
    workplace: "Từ xa",
    type: "Toàn thời gian",
    experience: "Staff",
    salary: "5.000$ - 7.000$ / tháng",
    postedAt: "2 ngày trước",
    featured: true,
    summary: "Dẫn dắt phát triển hệ thống thiết kế (Design System), bộ thành phần UI chuẩn mực, trải nghiệm vi tương tác và tiêu chuẩn tiếp cận (a11y).",
    tags: ["Tailwind CSS", "Base UI", "Accessibility (a11y)", "Design Systems"],
    aboutRole: "Chúng tôi đang tìm kiếm một Staff Frontend Engineer xuất sắc để làm chủ bộ khung Design System và tiêu chuẩn giao diện người dùng trên toàn bộ hệ thống HireNext. Bạn sẽ chịu trách nhiệm định hình các nguyên tắc UI/UX, tối ưu hóa bundle size, chuẩn hóa khả năng tiếp cận (Accessibility WCAG 2.1 AA) và cung cấp bộ công cụ trực quan mạnh mẽ cho các kỹ sư khác.",
    responsibilities: [
      "Xây dựng và duy trì bộ thư viện thành phần Design System dùng chung dựa trên Tailwind CSS và Base UI / Radix primitives.",
      "Thiết lập chuẩn mực về hiệu năng hiển thị (Core Web Vitals), khả năng tiếp cận (a11y) và trải nghiệm bàn phím mượt mà.",
      "Viết tài liệu hướng dẫn kỹ thuật chi tiết, bộ test UI (Playwright, Storybook) và hỗ trợ các nhóm sản phẩm tích hợp.",
      "Nghiên cứu áp dụng các công nghệ frontend mới nhất để giảm thiểu độ trễ tương tác người dùng."
    ],
    requirements: [
      "Có trên 6+ năm kinh nghiệm phát triển Frontend hiện đại với React, TypeScript và các hệ thống UI quy mô lớn.",
      "Hiểu biết sâu sắc về kiến trúc Design System, token màu sắc, typography và micro-interactions.",
      "Am hiểu tường tận về các tiêu chuẩn Web Accessibility (WAI-ARIA, WCAG).",
      "Kỹ năng cố vấn (mentorship) và dẫn dắt kỹ thuật cho các kỹ sư trẻ trong đội ngũ."
    ],
    niceToHave: [
      "Đã từng làm việc tại các công cụ design-to-code hoặc nền tảng hướng nhà phát triển (Linear, Figma plugins, Vercel).",
      "Kinh nghiệm đóng góp vào các open-source UI libraries có hàng ngàn stars trên GitHub."
    ],
    benefitsList: [
      "Mức đãi ngộ dẫn đầu thị trường: 5.000$ - 7.000$/tháng + Gói cổ phần giá trị cao.",
      "Chính sách làm việc 100% từ xa (Remote-first) bất kỳ nơi nào trên thế giới.",
      "Ngân sách thiết lập góc làm việc tại nhà lên đến 2.000$ và 250$/tháng chi phí coworking/internet.",
      "Bảo hiểm sức khỏe quốc tế chất lượng cao và ngày nghỉ sức khỏe tinh thần hàng tháng."
    ],
    hiringManager: {
      name: "Lê Hoàng Yến",
      role: "Trưởng nhóm Trải nghiệm Sản phẩm (Head of Design & UX)",
      avatarText: "HY",
      email: "yen.le@hirenext.vn"
    }
  },
  {
    id: "eng-3",
    title: "Kỹ sư Hệ thống Phân tán & Hạ tầng (Distributed Systems Engineer)",
    department: "Kỹ thuật",
    location: "Singapore / Làm việc từ xa",
    workplace: "Từ xa",
    type: "Toàn thời gian",
    experience: "Senior",
    salary: "4.500$ - 6.500$ / tháng",
    postedAt: "4 ngày trước",
    summary: "Mở rộng hệ thống hàng đợi sự kiện bất đồng bộ, tối ưu hóa năng suất trích xuất CV tự động và phân tán cơ sở dữ liệu quy mô lớn.",
    tags: ["Node.js", "Go", "Redis", "Docker", "AWS"],
    aboutRole: "Tham gia đội ngũ Hạ tầng cốt lõi để đảm bảo hệ thống HireNext luôn đạt độ khả dụng 99.99% khi xử lý hàng triệu lượt nộp hồ sơ, trích xuất dữ liệu đa phương tiện và xử lý hàng đợi phỏng vấn bất đồng bộ.",
    responsibilities: [
      "Thiết kế và duy trì hạ tầng đám mây trên AWS/GCP bằng Terraform và Kubernetes.",
      "Tối ưu hóa hàng đợi bất đồng bộ (BullMQ, Redis, Kafka) phục vụ phân tích CV và thông báo thời gian thực.",
      "Thiết lập hệ thống giám sát, cảnh báo sớm và nhật ký tập trung (Datadog, Prometheus, Grafana).",
      "Đảm bảo an toàn thông tin, sao lưu dữ liệu tự động và chuẩn bị kịch bản khôi phục sự cố (Disaster Recovery)."
    ],
    requirements: [
      "4+ năm kinh nghiệm về DevOps, hạ tầng đám mây hoặc kỹ thuật hệ thống phân tán (Go, Node.js hoặc Python).",
      "Kinh nghiệm vững chắc với Docker, Kubernetes, CI/CD pipelines và Infrastructure as Code (Terraform).",
      "Hiểu biết sâu sắc về cơ sở dữ liệu quan hệ, NoSQL và cơ chế caching phân tán."
    ],
    hiringManager: {
      name: "Đỗ Anh Tuấn",
      role: "Trưởng nhóm Hạ tầng Nền tảng (Principal Cloud Architect)",
      avatarText: "AT",
      email: "tuan.do@hirenext.vn"
    }
  },
  {
    id: "ai-1",
    title: "Kỹ sư Học máy Cao cấp — Hệ thống CV & Mô hình Ngôn ngữ (Senior ML Engineer)",
    department: "Dữ liệu & AI",
    location: "TP. Hồ Chí Minh / Từ xa",
    workplace: "Kết hợp",
    type: "Toàn thời gian",
    experience: "Senior",
    salary: "4.000$ - 6.000$ / tháng",
    postedAt: "Hôm qua",
    featured: true,
    summary: "Phát triển công cụ khớp ngữ nghĩa tiên tiến, hệ thống đánh giá độ tương thích giữa CV và mô tả công việc, loại bỏ định kiến trong sàng lọc ứng viên.",
    tags: ["Python", "PyTorch", "Tinh chỉnh LLM", "RAG", "Embeddings"],
    aboutRole: "Bạn sẽ trực tiếp chỉ đạo nghiên cứu và triển khai các thuật toán AI tiên tiến nhất giúp đối sánh năng lực ứng viên với yêu cầu công việc, trích xuất kỹ năng từ CV đa ngôn ngữ và loại bỏ hoàn toàn các yếu tố thiên kiến vô thức trong sàng lọc nhân tài.",
    responsibilities: [
      "Xây dựng đường ống RAG và fine-tuning các mô hình ngôn ngữ lớn (LLM) để trích xuất thông tin có cấu trúc từ hồ sơ ứng viên.",
      "Thiết kế thuật toán xếp hạng và gợi ý công việc dựa trên vector embeddings và tìm kiếm ngữ nghĩa.",
      "Triển khai mô hình AI ra môi trường production với độ trễ thấp và chi phí suy luận (inference cost) tối ưu.",
      "Đảm bảo tính minh bạch, công bằng và bảo mật tuyệt đối cho dữ liệu nhạy cảm của ứng viên."
    ],
    requirements: [
      "Ít nhất 4 năm kinh nghiệm nghiên cứu hoặc triển khai ứng dụng Machine Learning / NLP trong thực tế.",
      "Thành thạo Python, PyTorch / TensorFlow, Hugging Face transformers và các cơ sở dữ liệu vector (Qdrant, Pinecone, pgvector).",
      "Kinh nghiệm thực tiễn với Prompt Engineering, RAG architectures và đánh giá chất lượng mô hình LLM."
    ],
    hiringManager: {
      name: "TS. Nguyễn Minh Khang",
      role: "Trưởng phòng Nghiên cứu Trí tuệ Nhân tạo (Head of AI)",
      avatarText: "MK",
      email: "khang.nguyen@hirenext.vn"
    }
  },
  {
    id: "ai-2",
    title: "Kỹ sư Phân tích Dữ liệu Tuyển dụng (Data Analytics Engineer)",
    department: "Dữ liệu & AI",
    location: "Từ xa (Khu vực APAC)",
    workplace: "Từ xa",
    type: "Toàn thời gian",
    experience: "Mid",
    salary: "2.800$ - 4.200$ / tháng",
    postedAt: "1 tuần trước",
    summary: "Xây dựng bảng điều khiển hiệu quả phễu tuyển dụng, phân tích thời gian tuyển dụng (Time-to-hire) và báo cáo chuyển đổi cho ban lãnh đạo.",
    tags: ["PostgreSQL", "dbt", "Tableau", "SQL", "Chỉ số tuyển dụng"],
  },
  {
    id: "prod-1",
    title: "Trưởng nhóm Thiết kế Sản phẩm — Trải nghiệm Ứng viên (Lead Product Designer)",
    department: "Sản phẩm & Thiết kế",
    location: "TP. Hồ Chí Minh, Việt Nam",
    workplace: "Kết hợp",
    type: "Toàn thời gian",
    experience: "Lead",
    salary: "3.800$ - 5.200$ / tháng",
    postedAt: "3 ngày trước",
    featured: true,
    summary: "Kiến tạo quy trình ứng tuyển mượt mà, tiện lợi và trải nghiệm tự đặt lịch phỏng vấn đem lại sự thoải mái tối đa cho ứng viên.",
    tags: ["Figma", "Design Systems", "Prototyping", "Nghiên cứu người dùng"],
    aboutRole: "Ở vai trò Lead Product Designer, bạn sẽ là người thổi hồn vào từng giao diện, từng tương tác nhỏ nhất mà hàng triệu ứng viên tiếp xúc. Bạn sẽ biến quy trình xin việc vốn căng thẳng thành một trải nghiệm minh bạch, ấm áp và chuyên nghiệp hàng đầu thị trường.",
    responsibilities: [
      "Dẫn dắt thiết kế UX/UI cho toàn bộ phân hệ Ứng viên (Candidate Portal), trang chi tiết việc làm và form nộp hồ sơ trực tuyến.",
      "Thực hiện các cuộc phỏng vấn người dùng, kiểm thử nguyên mẫu (usability testing) để thấu hiểu rào cản tâm lý của ứng viên.",
      "Định nghĩa ngôn ngữ hình ảnh, bảng màu, biểu tượng và micro-animations phối hợp cùng các kỹ sư Frontend.",
      "Xây dựng các tiêu chuẩn thiết kế tinh giản, tối ưu trên cả giao diện di động và máy tính bảng."
    ],
    requirements: [
      "Có ít nhất 5+ năm kinh nghiệm thiết kế sản phẩm số (Product Design / UI-UX), ưu tiên mảng SaaS B2B hoặc Consumer Platforms.",
      "Portfolio xuất sắc thể hiện tư duy giải quyết vấn đề, hệ thống phân cấp thị giác và sự chăm chút tỉ mỉ cho từng chi tiết.",
      "Thành thạo công cụ Figma, quy trình xây dựng Design System và các nguyên lý tâm lý học hành vi người dùng."
    ],
    hiringManager: {
      name: "Phạm Hải Đăng",
      role: "Giám đốc Sản phẩm (Chief Product Officer)",
      avatarText: "HD",
      email: "dang.pham@hirenext.vn"
    }
  },
  {
    id: "prod-2",
    title: "Giám đốc Sản phẩm Kỹ thuật Cao cấp — Quy trình Tuyển dụng (Senior TPM)",
    department: "Sản phẩm & Thiết kế",
    location: "Singapore / Làm việc từ xa",
    workplace: "Từ xa",
    type: "Toàn thời gian",
    experience: "Senior",
    salary: "4.500$ - 6.200$ / tháng",
    postedAt: "5 ngày trước",
    summary: "Định hình lộ trình sản phẩm cho bảng Kanban tuyển dụng thế hệ mới, phiếu chấm điểm phỏng vấn và cơ chế phân quyền đa cấp bậc.",
    tags: ["Chiến lược sản phẩm", "Hệ thống ATS", "Roadmap", "Agile"],
  },
  {
    id: "people-1",
    title: "Chuyên viên Tuyển dụng Kỹ thuật Cao cấp (Senior Tech Talent Partner)",
    department: "Nhân sự & Tuyển dụng",
    location: "TP. Hồ Chí Minh, Việt Nam",
    workplace: "Kết hợp",
    type: "Toàn thời gian",
    experience: "Senior",
    salary: "2.500$ - 3.800$ / tháng",
    postedAt: "3 ngày trước",
    summary: "Đồng hành trực tiếp cùng đội ngũ Lãnh đạo Công nghệ để tìm kiếm, kết nối và thu hút những nhân tài công nghệ hàng đầu Đông Nam Á.",
    tags: ["Tuyển dụng Tech", "Sourcing", "Chăm sóc ứng viên", "Thương lượng offer"],
    aboutRole: "Bạn sẽ đóng vai trò đại sứ kết nối HireNext với cộng đồng kỹ sư xuất sắc. Bạn không chỉ tuyển dụng mà còn trực tiếp cải tiến trải nghiệm ứng viên, đảm bảo cam kết phản hồi dưới 48 giờ và mang lại cảm giác được tôn trọng cao nhất cho mọi người tìm việc.",
    responsibilities: [
      "Chủ động tìm kiếm, tạo nguồn và tiếp cận các ứng viên kỹ thuật xuất sắc (Software Engineers, Data/AI Scientists, Designers).",
      "Điều phối trọn vẹn quy trình tuyển dụng từ sàng lọc ban đầu, phỏng vấn thử thách năng lực cho đến thương lượng đãi ngộ.",
      "Thu thập phản hồi từ ứng viên để đề xuất nâng cấp tính năng cho chính hệ thống HireNext ATS.",
      "Tổ chức các sự kiện kết nối công nghệ và xây dựng thương hiệu tuyển dụng trên mạng xã hội."
    ],
    requirements: [
      "3+ năm kinh nghiệm tuyển dụng kỹ thuật chuyên sâu (Technical Recruiting) tại các công ty công nghệ hoặc quỹ đầu tư.",
      "Thấu hiểu ngôn ngữ kỹ thuật, các công nghệ phổ biến và kỳ vọng của ứng viên ngành phần mềm.",
      "Kỹ năng thương lượng khéo léo, đồng cảm sâu sắc và phong cách làm việc chuyên nghiệp, ấm áp."
    ],
    hiringManager: {
      name: "Vũ Mai Phương",
      role: "Trưởng phòng Thu hút Nhân tài (Head of Talent Acquisition)",
      avatarText: "MP",
      email: "phuong.vu@hirenext.vn"
    }
  },
  {
    id: "people-2",
    title: "Chuyên viên Đãi ngộ & Vận hành Nhân sự (Total Rewards Specialist)",
    department: "Nhân sự & Tuyển dụng",
    location: "Từ xa (Việt Nam)",
    workplace: "Từ xa",
    type: "Toàn thời gian",
    experience: "Mid",
    salary: "2.000$ - 3.000$ / tháng",
    postedAt: "1 tuần trước",
    summary: "Quản lý các dải lương minh bạch theo chuẩn thị trường, chính sách phúc lợi cạnh tranh và trải nghiệm hội nhập nhân viên mới.",
    tags: ["Khung lương", "Vận hành nhân sự", "Phúc lợi", "Onboarding"],
  },
  {
    id: "growth-1",
    title: "Trưởng nhóm Tiếp thị Tăng trưởng & Thương hiệu (Growth Marketing Lead)",
    department: "Tăng trưởng & Vận hành",
    location: "Làm việc từ xa (Toàn cầu)",
    workplace: "Từ xa",
    type: "Toàn thời gian",
    experience: "Lead",
    salary: "3.800$ - 5.500$ / tháng",
    postedAt: "6 ngày trước",
    summary: "Lan tỏa thương hiệu nhà tuyển dụng, tổ chức các buổi hội thảo công nghệ và chia sẻ những câu chuyện kỹ thuật truyền cảm hứng.",
    tags: ["Thương hiệu nhà tuyển dụng", "Nội dung", "Cộng đồng Tech", "Chiến dịch"],
  },
];

export const DEPARTMENTS = [
  "Tất cả",
  "Kỹ thuật",
  "Sản phẩm & Thiết kế",
  "Dữ liệu & AI",
  "Nhân sự & Tuyển dụng",
  "Tăng trưởng & Vận hành",
] as const;

export const COMPANY_BENEFITS = [
  {
    title: "Thu nhập Cạnh tranh & Minh bạch",
    description: "Mọi vị trí đều công khai dải lương và quyền chọn cổ phần (equity). Không mặc cả ngầm, rõ ràng từ đầu.",
    icon: "DollarSign",
  },
  {
    title: "Làm việc Từ xa & Linh hoạt",
    description: "Tự do chọn nơi làm việc tối ưu năng suất. Không gian làm việc hiện đại khi cần và quyền tự chủ tuyệt đối khi làm từ xa.",
    icon: "Globe",
  },
  {
    title: "Chăm sóc Sức khỏe Toàn diện",
    description: "Bảo hiểm sức khỏe cao cấp (nội trú, ngoại trú, nha khoa và chăm sóc sức khỏe tinh thần) cho bạn và người thân phụ thuộc.",
    icon: "HeartPulse",
  },
  {
    title: "Ngân sách Phát triển 2.500$/năm",
    description: "Chi phí tham gia hội thảo quốc tế, sách, khóa học chuyên sâu hoặc chứng chỉ — chúng tôi luôn đồng hành cùng sự phát triển của bạn.",
    icon: "GraduationCap",
  },
  {
    title: "Trang thiết bị Hàng đầu",
    description: "Lựa chọn MacBook Pro đời mới nhất hoặc máy trạm Linux cấu hình cao, màn hình 4K và ngân sách trang bị góc làm việc tại nhà.",
    icon: "Laptop",
  },
  {
    title: "Văn hóa Nghỉ ngơi & Tái tạo",
    description: "Chính sách nghỉ phép linh hoạt, ngày nghỉ toàn công ty để tái nạp năng lượng và chế độ thai sản đầy đủ cho cả cha và mẹ.",
    icon: "Compass",
  },
];

export const HIRING_STEPS = [
  {
    step: "01",
    title: "Ứng tuyển & Phản hồi nhanh",
    duration: "Trong vòng 48 giờ",
    description: "Gửi CV hoặc hồ sơ LinkedIn của bạn. Đội ngũ tuyển dụng sẽ phản hồi trong vòng 2 ngày làm việc dựa trên tiêu chí khách quan.",
  },
  {
    step: "02",
    title: "Trao đổi cùng Recruiter",
    duration: "30 phút • Video call",
    description: "Cuộc trò chuyện cởi mở về định hướng nghề nghiệp, kỳ vọng đãi ngộ, văn hóa làm việc và giải đáp mọi thắc mắc của bạn.",
  },
  {
    step: "03",
    title: "Đánh giá Năng lực Thực tế",
    duration: "60-90 phút • Trực tuyến",
    description: "Buổi làm việc cùng chuyên gia xoay quanh các bài toán thực tế bạn sẽ giải quyết trong công việc. Nói không với câu đố mẹo.",
  },
  {
    step: "04",
    title: "Gặp gỡ Đội ngũ & Văn hóa",
    duration: "45 phút",
    description: "Giao lưu cùng các đồng nghiệp tương lai và ban lãnh đạo để tìm hiểu phong cách phối hợp và môi trường làm việc chung.",
  },
  {
    step: "05",
    title: "Đề nghị Tuyển dụng (Offer)",
    duration: "Trong tuần",
    description: "Thư mời nhận việc chi tiết về lương thưởng, quyền chọn cổ phần, lộ trình phát triển và phân công người hướng dẫn (buddy) tận tình.",
  },
];

export const ATS_PORTALS = [
  {
    title: "Cổng thông tin Ứng viên",
    badge: "Dành cho Ứng viên",
    description: "Khám phá các vị trí tuyển dụng, theo dõi trạng thái hồ sơ ứng tuyển theo thời gian thực, xem lịch phỏng vấn và phân tích CV bằng AI.",
    href: "/jobs",
    cta: "Xem Việc làm & Hồ sơ của tôi",
    icon: "Users2",
    features: ["Vị trí mở với dải lương minh bạch", "Cập nhật tiến độ hồ sơ thời gian thực", "Công cụ AI phân tích & tối ưu CV"],
  },
  {
    title: "Bàn làm việc Nhà tuyển dụng (HR)",
    badge: "Đội ngũ Tuyển dụng",
    description: "Bảng điều khiển quản lý quy trình tuyển dụng trọn vẹn: quy trình Kanban trực quan, sàng lọc hồ sơ tự động và điều phối phỏng vấn.",
    href: "/hr/dashboard",
    cta: "Mở Bảng điều khiển Tuyển dụng",
    icon: "Building2",
    features: ["Phễu tuyển dụng Kanban đa giai đoạn", "Hệ thống AI sàng lọc ứng viên thông minh", "Điều phối lịch & gửi thư mời nhận việc"],
  },
  {
    title: "Không gian Người Phỏng vấn",
    badge: "Trưởng nhóm & Chuyên gia",
    description: "Phiếu đánh giá phỏng vấn theo khung năng lực chuẩn mực, đồng bộ lịch làm việc và ghi chú nhận xét nhanh chóng, khách quan.",
    href: "/interviewer/schedule",
    cta: "Xem Lịch phỏng vấn của tôi",
    icon: "Calendar",
    features: ["Lịch trình phỏng vấn theo ngày", "Tiêu chí chấm điểm chuẩn hóa", "Gửi nhận xét đánh giá tức thì"],
  },
];

/**
 * Helper to fetch a job by its unique ID
 */
export function getJobById(id: string): Job | undefined {
  return SAMPLE_JOBS.find((j) => j.id === id);
}

/**
 * Helper to fetch related jobs within the same department
 */
export function getRelatedJobs(currentId: string, department: string, limit = 3): Job[] {
  return SAMPLE_JOBS
    .filter((j) => j.id !== currentId && j.department === department)
    .slice(0, limit);
}

