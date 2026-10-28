"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";

const NAV_ITEMS = [
  { label: "Việc làm", href: "/jobs" },
  { label: "Hồ sơ ứng tuyển", href: "/applications" },
  { label: "Phân tích CV", href: "/resume-analysis" },
  { label: "Lịch phỏng vấn", href: "/interviews" },
];

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const router = useRouter();

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <span>HireNext</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1 flex-row">
              {NAV_ITEMS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors",
                        active && "text-foreground font-semibold bg-muted",
                      )}
                      render={<Link href={item.href}>{item.label}</Link>}
                    />
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Action */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/profile">Hồ sơ của tôi</Link>}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: { onSuccess: () => router.push("/") },
                  })
                }
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/login">Đăng nhập</Link>}
            />
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors focus:outline-none"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-3 pt-3 border-t border-border">
            <div className="hidden md:flex items-center gap-3">
              {isPending ? (
                <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
              ) : user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href="/profile">Hồ sơ của tôi</Link>}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      authClient.signOut({
                        fetchOptions: { onSuccess: () => router.push("/") },
                      })
                    }
                  >
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href="/login">Đăng nhập</Link>}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export { NavigationMenuDemo as Navbar };
