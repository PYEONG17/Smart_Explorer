"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Image as ImageIcon, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createCourse } from "@/lib/api";
import type { SubjectType } from "@/types";
import { useLang } from "@/contexts/LanguageContext";

export default function CreateCoursePage() {
  const router = useRouter();
  const { t, locale } = useLang();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [subject, setSubject] = useState<SubjectType>("math");
  const [level, setLevel] = useState("8");
  const [description, setDescription] = useState("");
  const [descEn, setDescEn] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Vui lòng nhập đầy đủ Tên và Mô tả khóa học");
      return;
    }

    setLoading(true);
    try {
      const res = await createCourse({
        title,
        titleEn: titleEn || title,
        description,
        descEn: descEn || description,
        subject,
        level,
        thumbnail: thumbnail || "/hero-illustration.png",
      });

      if (res.success && res.data) {
        toast.success(t("common.success"));
        router.push(`/teacher/courses/${res.data.id}/edit`);
      }
    } catch (err) {
      toast.error(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6">
        <Link 
          href="/teacher" 
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("create.back")}
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">{t("create.title")}</h1>
              <p className="text-sm text-muted-foreground">{t("create.subtitle")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject & Level Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">{t("create.subject")}</label>
                <select
                  value={subject}
                  onChange={(e: any) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="math">{locale === "vi" ? "Toán học (Mathematics)" : "Mathematics"}</option>
                  <option value="science">{locale === "vi" ? "Khoa học (Science)" : "Science"}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">{t("create.level")}</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {["6", "7", "8", "9", "10", "11", "12"].map((lvl) => (
                    <option key={lvl} value={lvl}>{locale === "vi" ? "Lớp" : "Grade"} {lvl}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Title (VI / EN) */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t("create.name.vi")}</label>
                <input
                  type="text"
                  placeholder={locale === "vi" ? "Ví dụ: Hình học phẳng và Định lý Pythagoras" : "e.g. Plane Geometry"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t("create.name.en")}</label>
                <input
                  type="text"
                  placeholder="Example: Plane Geometry & Pythagorean Theorem"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            {/* Description (VI / EN) */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t("create.desc.vi")}</label>
                <textarea
                  rows={3}
                  placeholder={locale === "vi" ? "Tóm tắt nội dung chính và mục tiêu đầu ra của khóa học..." : "Course summary..."}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t("create.desc.en")}</label>
                <textarea
                  rows={2}
                  placeholder="Course summary and learning outcomes in English..."
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>
            </div>

            {/* Thumbnail URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">{t("create.thumbnail")}</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="https://example.com/thumbnail.png (Để trống nếu dùng mặc định)"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
              <Button variant="ghost" asChild>
                <Link href="/teacher">{t("create.cancel")}</Link>
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl px-6 py-5 font-semibold"
              >
                {loading ? t("create.creating") : t("create.submit")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
