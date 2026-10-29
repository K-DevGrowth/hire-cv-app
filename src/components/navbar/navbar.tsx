"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "./nav-config";

type Props = {
  links: NavItem[];
  userName: string;
};

export default function Navbar({ links, userName }: Props) {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === pathname ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <span>{userName}</span>
    </nav>
  );
}
