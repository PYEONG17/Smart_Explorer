import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-muted-foreground animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/20 animate-pulse" />
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 relative z-10" />
      </div>
      <p className="text-sm font-medium animate-pulse">Đang tải dữ liệu...</p>
    </div>
  );
}
