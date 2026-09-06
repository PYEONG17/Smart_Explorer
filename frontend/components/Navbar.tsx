"use client";
import * as React from "react";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/themeToggle";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Khóa học", href: "/courses" },
  { label: "Lớp học", href: "/classes" },
  { label: "Bài học", href: "/lessons" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            width={36}
            height={36}
            alt="SmartExplorer Logo"
            className="rounded-lg"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Smart<span className="text-blue-500">Explorer</span>
          </span>
        </Link>

        {/* Navigation links – hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Auth buttons + Theme toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            Đăng nhập
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all duration-200"
          >
            Đăng ký
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
