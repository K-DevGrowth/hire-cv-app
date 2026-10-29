export interface NavItem {
  label: string;
  href: string;
}

export type Role = "candidate" | "hr" | "interviewer" | "admin";

export const PublicNav: NavItem[] = [
  { label: "Việc làm", href: "/careers" },
  { label: "Đăng nhập", href: "/login" },
  { label: "Đăng ký", href: "/signup" },
];

export const NAV_CONFIG: Record<Role, NavItem[]> = {
  candidate: [
    { label: "Việc làm", href: "/careers" },
    { label: "Đơn của tôi", href: "/me/applications" },
    { label: "Hồ sơ", href: "/me/profile" },
  ],
  hr: [
    { label: "Dashboard", href: "/hr/dashboard" },
    { label: "Jobs", href: "/hr/jobs" },
    { label: "Ứng viên", href: "/hr/candidates" },
    { label: "Phỏng vấn", href: "/hr/interviews" },
    { label: "Offers", href: "/hr/offers" },
    { label: "Báo cáo", href: "/hr/reports" },
  ],
  interviewer: [
    { label: "Việc của tôi", href: "/interviewer/dashboard" },
    { label: "Phỏng vấn", href: "/interviewer/interviews" },
    { label: "Jobs tham gia", href: "/interviewer/jobs" },
  ],
  admin: [
    { label: "Người dùng", href: "/admin/users" },
    { label: "Phòng ban", href: "/admin/departments" },
    { label: "Pipeline template", href: "/admin/pipeline-templates" },
    { label: "Scorecard", href: "/admin/scorecards" },
    { label: "Lý do từ chối", href: "/admin/rejection-reasons" },
    { label: "Email template", href: "/admin/email-templates" },
    { label: "Audit log", href: "/admin/audit-log" },
    { label: "Cài đặt", href: "/admin/settings" },
  ],
};
