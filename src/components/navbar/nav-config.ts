import { Permissions } from "@/lib/auth/permissions";

export interface NavItem {
  label: string;
  href: string;

  permission?: Permissions;
}

const STAFF_NAV: NavItem[] = [
  { label: "Tổng quan", href: "/dashboard" },
  { label: "Việc làm", href: "/jobs", permission: { job: ["read"] } },
  {
    label: "Ứng viên",
    href: "/candidates",
    permission: { candidate: ["read"] },
  },
  {
    label: "Lịch phỏng vấn",
    href: "/interviews",
    permission: { interview: ["read"] },
  },
  {
    label: "Phiếu đánh giá",
    href: "/scorcard",
    permission: { scorecard: ["read"] },
  },
  { label: "Offers", href: "/offers", permission: { offer: ["read"] } },
  { label: "Người dùng", href: "/admin/users", permission: { user: ["list"] } },
];

const PORTAl_NAV: NavItem[] = [
  { label: "Việc làm", href: "/careers" },
  {
    label: "Đơn ứng tuyển",
    href: "/applications",
    permission: { application: ["read"] },
  },
  {
    label: "Hồ sơ",
    href: "/profile",
    permission: { candidate: ["read"] },
  },
];

export const NAV_BY_VARIANT = {
  staff: STAFF_NAV,
  portal: PORTAl_NAV,
} as const;

export type NavVariant = keyof typeof NAV_BY_VARIANT;
