import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "SmartExplorer – Interactive Bilingual STEM Learning",
  description:
    "Nền tảng học Toán và Khoa học bằng tiếng Anh thông qua video, hoạt động tương tác, AI và mô hình 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Fixed Navbar sits outside <main> for correct semantic HTML */}
          <Navbar />
          {/* pt-16 offsets content below the fixed 64px navbar */}
          <main className="min-h-screen pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
