"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Upload, BookOpen, Users, Star, Video, FileText, Edit, ExternalLink, Sparkles, Layers, Edit3, BarChart3, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCourses } from "@/lib/mock-data";
import { useLang } from "@/contexts/LanguageContext";
import { motion } from "motion/react";

export default function TeacherDashboardPage() {
  const [courses, setCourses] = useState(mockCourses);
  const { t, locale } = useLang();

  const teacherStats = [
    { label: locale === "vi" ? "Khóa học đã tạo" : "Courses Created", value: courses.length, icon: BookOpen, color: "text-blue-500 bg-blue-500/10" },
    { label: locale === "vi" ? "Học sinh đăng ký" : "Enrolled Students", value: "1,450+", icon: Users, color: "text-emerald-500 bg-emerald-500/10" },
    { label: locale === "vi" ? "Đánh giá trung bình" : "Average Rating", value: "4.8 / 5.0", icon: Star, color: "text-amber-500 bg-amber-500/10" },
    { label: locale === "vi" ? "Tài liệu & Video đã đăng" : "Materials & Videos", value: "120+", icon: Video, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs text-purple-600 dark:text-purple-300 mb-3 font-semibold">
              <Sparkles className="w-4 h-4 text-purple-500" />
              {locale === "vi" ? "Dành cho Giáo viên & Tác giả Khóa học" : "For Teachers & Course Authors"}
            </div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t("teacher.title")}
            </h1>
            <p className="mt-2 text-muted-foreground text-base max-w-2xl">
              {t("teacher.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl shadow-md py-5 font-semibold" asChild>
              <Link href="/teacher/courses/create">
                <Plus className="w-4 h-4 mr-2" />
                {t("teacher.create")}
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {teacherStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">{stat.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Courses Table / Cards */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              {t("teacher.courses")}
            </h2>
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {courses.length} {t("teacher.stat.courses").toLowerCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl border border-border bg-background hover:border-blue-500/40 hover:shadow-md transition-all gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color || "from-blue-500 to-indigo-600"} flex items-center justify-center text-white shrink-0 shadow-md`}>
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-0">
                        {locale === "vi" ? course.subjectLabel : course.subject === "math" ? "Mathematics" : "Science"}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-medium">
                        {locale === "vi" ? "Lớp" : "Grade"} {course.level}
                      </Badge>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        {locale === "vi" ? "Đang xuất bản" : "Published"}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground text-lg hover:text-blue-600 transition-colors">
                      {locale === "vi" ? course.title : course.titleEn || course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {locale === "vi" ? course.description : course.descriptionEn || course.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-medium">
                      <span>{course.lessonCount || 8} {locale === "vi" ? "bài học" : "lessons"}</span>
                      <span>•</span>
                      <span>{course.enrolled || 150} {locale === "vi" ? "học sinh" : "students"}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-yellow-500 font-bold">★ {course.rating || 4.8}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center">
                  <Button variant="outline" size="sm" className="rounded-xl font-semibold border-border hover:bg-muted" asChild>
                    <Link href={`/teacher/courses/${course.id}/edit`}>
                      <Edit className="w-4 h-4 mr-1.5 text-blue-500" />
                      {t("teacher.edit")}
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground hover:text-foreground" asChild title={locale === "vi" ? "Xem giao diện học sinh" : "View as student"}>
                    <Link href={`/courses/${course.id}`} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
