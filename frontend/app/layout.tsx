import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SmartExplorer",
  description: "Nền tảng học tập tương tác SmartExplorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Navbar />

        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
