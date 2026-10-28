import {
  Briefcase,
  Calendar,
  FileSearch,
  FileText,
  Kanban,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Shield,
  UserCheck,
  UserIcon,
  Users,
} from "lucide-react";

export type UserRole = "candidate" | "hr" | "interviewer" | "admin";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;

  roles?: UserRole[];
}

export const navigationConfig: NavItem[] = [
  // --- DÀNH CHO ỨNG VIÊN (CANDIDATE) ---
  {
    label: "Việc làm",
    href: "/candidates/jobs",
    icon: Briefcase,
    roles: ["candidate", "admin"],
  },
  {
    label: "Đơn ứng tuyển",
    href: "/candidates/applications",
    icon: FileText,
    roles: ["candidate", "admin"],
  },
  {
    label: "Lịch phỏng vấn",
    href: "/candidates/interviews",
    icon: Calendar,
    roles: ["candidate"],
  },
  {
    label: "Phân tích CV (AI)",
    href: "/candidates/resume-analysis",
    icon: FileSearch,
    roles: ["candidate", "admin"],
  },
  {
    label: "Hồ sơ cá nhân",
    href: "/candidates/profile",
    icon: UserIcon,
    roles: ["candidate"],
  },

  // --- DÀNH CHO NHÀ TUYỂN DỤNG (HR) ---
  {
    label: "Tổng quan HR",
    href: "/hr/dashboard",
    icon: LayoutDashboard,
    roles: ["hr", "admin"],
  },
  {
    label: "Quản lý tuyển dụng",
    href: "/hr/jobs",
    icon: Briefcase,
    roles: ["hr", "admin"],
  },
  {
    label: "Quy trình (Pipeline)",
    href: "/hr/pipeline",
    icon: Kanban,
    roles: ["hr", "admin"],
  },
  {
    label: "Lọc hồ sơ (Screening)",
    href: "/hr/screening",
    icon: UserCheck,
    roles: ["hr", "admin"],
  },
  {
    label: "Lịch phỏng vấn HR",
    href: "/hr/interviews",
    icon: Calendar,
    roles: ["hr", "admin"],
  },

  // --- DÀNH CHO INTERVIEWER ---
  {
    label: "Lịch đánh giá",
    href: "/interviewer/schedule",
    icon: Calendar,
    roles: ["interviewer", "admin"],
  },
];
