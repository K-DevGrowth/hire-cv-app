"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const NAV_ITEMS = [
  { label: "Việc làm", href: "/jobs" },
  { label: "Hồ sơ ứng tuyển", href: "/applications" },
  { label: "Phân tích CV", href: "/resume-analysis" },
  { label: "Lịch phỏng vấn", href: "/interviews" },
];

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-Neutral-800 bg-Navy-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-[family-name:var(--font-orbitron)] font-bold text-base tracking-wider text-Neutral-50 hover:text-Lime-400 transition-colors"
          >
            <span className="text-Lime-500 font-black">//</span>
            <span>HIREDEMO</span>
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
                        "font-mono text-xs uppercase bg-transparent text-Neutral-300 hover:text-Lime-400 hover:bg-Neutral-900/70 rounded-none transition-colors",
                        active &&
                          "text-Lime-400 bg-Neutral-900 font-semibold border-b-2 border-Lime-500",
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
          <Button
            variant="neon-outline"
            size="sm"
            render={<Link href="/login">Đăng nhập</Link>}
          />
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center p-2 text-Neutral-300 hover:text-Lime-400 hover:bg-Neutral-900 border border-Neutral-800 transition-colors focus:outline-none"
          >
            {isOpen ? (
              <X className="size-5 text-Navy-950" />
            ) : (
              <Menu className="size-5 text-Navy-950" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-Neutral-800 bg-Navy-950 px-4 py-3 md:hidden">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors",
                    active
                      ? "border-l-2 border-Lime-500 bg-Neutral-900 text-Lime-400 font-bold pl-2.5"
                      : "text-Neutral-300 hover:bg-Neutral-900/60 hover:text-Lime-400",
                  )}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="text-[10px] text-Lime-500 font-bold">
                      &gt;
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-3 pt-3 border-t border-Neutral-800/80">
            <Button
              variant="neon-outline"
              size="sm"
              className="w-full justify-center"
              render={
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Đăng nhập
                </Link>
              }
            />
          </div>
        </div>
      )}
    </header>
  );
}

export { NavigationMenuDemo as Navbar };
