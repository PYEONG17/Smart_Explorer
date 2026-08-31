"use client";
import * as React from "react";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/themeToggle";
import Link from "next/link";
import Image from "next/image";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Classes", href: "/classes" },
  { label: "Lessons", href: "/lessons" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-primary tracking-wide hover:text-primary/80 transition-colors"
        >
          <Image
            src="/logo_eduka.png"
            width={45}
            height={40}
            alt="Eduka Logo"
            className="cursor-pointer"
          />
          SmartExplorer
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="bold-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition-all duration-300"
          >
            Register
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
