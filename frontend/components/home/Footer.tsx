import Link from "next/link";
import Image from "next/image";

/**
 * Footer: Site-wide footer with links and branding.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Học tập": [
      { label: "Khóa học", href: "/courses" },
      { label: "Lớp học", href: "/classes" },
      { label: "Bài học", href: "/lessons" },
      { label: "Quiz", href: "/quiz" },
    ],
    "Tài nguyên": [
      { label: "Mô hình 3D", href: "/three-d" },
      { label: "Trợ lý AI", href: "/ai" },
      { label: "Tiến trình học", href: "/progress" },
    ],
    "Tài khoản": [
      { label: "Đăng nhập", href: "/login" },
      { label: "Đăng ký", href: "/register" },
      { label: "Hồ sơ", href: "/profile" },
    ],
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.png"
                width={32}
                height={32}
                alt="SmartExplorer Logo"
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-foreground">
                Smart<span className="text-blue-500">Explorer</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Nền tảng học Toán và Khoa học bằng tiếng Anh dành cho học sinh
              K-9.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Hỗ trợ song ngữ Việt – Anh
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {category}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} SmartExplorer. Đồ án tốt nghiệp – Nguyễn Tiến Bình.
          </p>
          <p className="text-xs text-muted-foreground">
            Được xây dựng với Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
