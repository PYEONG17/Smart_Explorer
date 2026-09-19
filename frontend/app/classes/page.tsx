import { mockClasses } from "@/lib/mock-data";
import Link from "next/link";
import { Users, BookOpen, ChevronRight, GraduationCap, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Lớp học | SmartExplorer",
  description: "Danh sách lớp học STEM song ngữ dành cho học sinh trung học.",
};

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs text-blue-600 dark:text-blue-300 mb-3 font-semibold">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              Lớp học chuẩn STEM
            </div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              Danh sách lớp học của tôi
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              Chọn lớp học theo khối lớp của bạn để tham gia chương trình học Toán & Khoa học tương tác song ngữ.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-xl">
              Tổng số: {mockClasses.length} lớp học
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((cls) => {
            const gradeNum = cls.name.replace(/\D/g, '').substring(0, 1);
            return (
              <div
                key={cls.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className={`h-28 bg-gradient-to-r ${cls.color} p-6 flex items-center justify-between text-white relative`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                      Khối Lớp {gradeNum}
                    </span>
                    <h3 className="text-2xl font-black mt-1">
                      {cls.name}
                    </h3>
                  </div>
                  <GraduationCap className="w-10 h-10 text-white/40 group-hover:scale-110 transition-transform" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                    {cls.description}
                  </p>

                  <div>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground font-semibold mb-6">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>{cls.studentCount} học sinh</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-cyan-500" />
                        <span>{cls.courseCount} khóa học</span>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 font-semibold group-hover:shadow-md transition-all" asChild>
                      <Link href={`/courses?level=${gradeNum}`}>
                        <span className="mr-2">Vào danh sách khóa học</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
