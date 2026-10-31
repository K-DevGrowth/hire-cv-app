"use client";

import { BadgeCheckIcon, BellIcon, LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleUser } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export function DropdownMenuAvatar() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/signin") },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<CircleUser />} />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Tài khoản
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Thông báo
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
