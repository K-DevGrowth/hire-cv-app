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
      <ul className="flex gap-4 p-4 bg-indigo-600 text-white font-semibold">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === pathname ? "page" : undefined}
              className={`${item.href === pathname ? "bg-indigo-700" : ""} px-2 py-1 rounded`}
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
