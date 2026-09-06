import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Auth layout: used for /login and /register pages.
 * ThemeProvider is inherited from root layout – no duplication needed.
 * Renders a centered card layout without main content area padding from root.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
      {/* Back to Home link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Về trang chủ
      </Link>

      {/* Auth card container */}
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

