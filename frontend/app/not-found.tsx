import Link from "next/link";
import { Ghost, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full w-full h-full" />
        <Ghost className="w-32 h-32 text-blue-500 relative z-10 animate-bounce" />
      </div>
      
      <h1 className="text-7xl font-extrabold text-foreground mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-4">Không tìm thấy trang</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không thể truy cập.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold transition-colors"
        >
          <Home className="w-4 h-4" />
          Về trang chủ
        </Link>
        <Link
          href="/courses"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background hover:bg-muted text-foreground px-6 py-3 text-sm font-semibold transition-colors"
        >
          <Search className="w-4 h-4" />
          Khám phá khóa học
        </Link>
      </div>
    </div>
  );
}
