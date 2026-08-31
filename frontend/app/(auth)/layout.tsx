import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-svh flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            href="/"
            className="absolute top-4 left-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-6 w-6" />
            Back to Home
          </Link>

          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
