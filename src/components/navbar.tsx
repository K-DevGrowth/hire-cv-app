"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Image from "next/image";

export function NavigationMenuDemo() {
  return (
    <header className="border-b border-Neutral-800 bg-Navy-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="logo.svg" alt="" width={140} height={0} />
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/jobs">Việc làm</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/applications">Hồ sơ ứng tuyển</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/resume-analysis">Phân tích CV</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/interviews">Lịch phỏng vấn</Link>}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          <Button
            variant="neon-outline"
            size="sm"
            render={<Link href="/login">Đăng nhập</Link>}
          />
        </div>
      </div>
    </header>
  );
}
