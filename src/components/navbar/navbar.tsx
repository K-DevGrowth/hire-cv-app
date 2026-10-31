"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import type { Permissions, RoleName } from "@/lib/auth/permissions";
import { NAV_BY_VARIANT, type NavVariant } from "./nav-config";
import { DropdownMenuAvatar } from "../layout/avatar";
import { Button } from "../ui/button";

type Props = {
  variant: NavVariant;
  user?: { name: string; email: string; role?: string | null } | null;
};

function canSee(role: string | null | undefined, permission?: Permissions) {
  if (!permission) return true;
  if (!role) return false;

  return (role ?? "").split(",").some((r) =>
    authClient.admin.checkRolePermission({
      role: r as RoleName,
      permissions: permission,
    }),
  );
}

export function Navbar({ variant, user }: Props) {
  const pathname = usePathname();

  const items = NAV_BY_VARIANT[variant].filter((item) =>
    canSee(user?.role, item.permission),
  );

  return (
    <header className="border-b">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <span className="font-semibold">HireTitan</span>

        <ul className="flex flex-1 items-center gap-4">
          {items.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 py-0.5 text-sm ${
                    active
                      ? "text-blue-600 border-b-[1.5] font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <DropdownMenuAvatar />
          ) : (
            <Button size="sm" variant="ghost">
              <Link href="/signin">Đăng nhập</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
