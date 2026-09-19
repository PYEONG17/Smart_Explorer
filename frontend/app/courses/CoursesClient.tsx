"use client";

import { useState, useMemo, useEffect } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, LayoutGrid, List, SlidersHorizontal, Sparkles, BookOpen, Clock, Star } from "lucide-react";
import { motion } from "motion/react";
import type { SubjectType as Subject, Course } from "@/types";
import { useLang } from "@/contexts/LanguageContext";
type Level = "6" | "7" | "8" | "9";

export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const { t, locale } = useLang();

  const subjects: { value: Subject | "all"; label: string }[] = [
    { value: "all", label: t("courses.page.all_sub") },
    { value: "math", label: t("courses.page.math") },
    { value: "science", label: t("courses.page.science") },
  ];

  const levels: { value: Level | "all"; label: string }[] = [
    { value: "all", label: t("courses.page.all_level") },
    { value: "6", label: `${t("courses.page.level")} 6` },
    { value: "7", label: `${t("courses.page.level")} 7` },
    { value: "8", label: `${t("courses.page.level")} 8` },
    { value: "9", label: `${t("courses.page.level")} 9` },
  ];

  const searchParams = useSearchParams();
  const initialLevelParam = searchParams.get("level") as Level | null;

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Subject | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<Level | "all">(initialLevelParam || "all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "lessons">("popular");

  useEffect(() => {
    if (initialLevelParam && ["6", "7", "8", "9"].includes(initialLevelParam)) {
      setSelectedLevel(initialLevelParam as Level);
    }
  }, [initialLevelParam]);

  const filteredCourses = useMemo(() => {
    let result = initialCourses.filter((course) => {
      const matchSearch =
        search === "" ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        (course.titleEn && course.titleEn.toLowerCase().includes(search.toLowerCase()));

      const matchSubject =
        selectedSubject === "all" || course.subject === selectedSubject;

      const matchLevel =
        selectedLevel === "all" || course.level === selectedLevel;

      return matchSearch && matchSubject && matchLevel;
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "lessons") {
      result = [...result].sort((a, b) => (b.lessonCount || 0) - (a.lessonCount || 0));
    } else {
      result = [...result].sort((a, b) => (b.enrolled || 0) - (a.enrolled || 0));
    }

    return result;
  }, [search, selectedSubject, selectedLevel, sortBy, initialCourses]);

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-cyan-500/15 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            {initialCourses.length} {t("courses.page.badge_count")}
          </div>
          <h1 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl mb-4">
            {t("courses.page.title")}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {t("courses.page.subtitle")}
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="bg-background border-b border-border sticky top-16 z-30 shadow-sm backdrop-blur-md bg-background/90">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("courses.page.search_ph")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Subject & Level Filter Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Subject filter */}
              <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1">
                {subjects.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedSubject(s.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      selectedSubject === s.value
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Level filter */}
              <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1">
                {levels.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setSelectedLevel(l.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      selectedLevel === l.value
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as "popular" | "rating" | "lessons")}
                className="rounded-xl border border-border bg-muted/30 py-2 px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="popular">{t("courses.page.sort.popular")}</option>
                <option value="rating">{t("courses.page.sort.rating")}</option>
                <option value="lessons">{t("courses.page.sort.lessons")}</option>
              </select>

              {/* View mode toggle */}
              <div className="hidden sm:flex items-center gap-1 border border-border rounded-xl p-1 bg-muted/30">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                  title="Chế độ lưới"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                  title="Chế độ danh sách"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid / List */}
      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Hiển thị{" "}
              <span className="font-semibold text-foreground">
                {filteredCourses.length}
              </span>{" "}
              khóa học phù hợp
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("courses.page.no_result")}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {t("courses.page.no_result_sub")}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <motion.div 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
              }}
            >
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={`/courses/${course.id}`}
                    className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${course.color || "from-blue-500 to-blue-700"} overflow-hidden`}
                    >
                      {course.thumbnail ? (
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                          <div className="relative z-10 text-center p-6">
                            <div className="mb-2 text-3xl font-black text-white/90">
                              {course.subjectLabelEn || (course.subject === 'math' ? 'Mathematics' : 'Science')}
                            </div>
                            <div className="text-sm text-white/80 font-medium">
                              Khối Lớp {course.level}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            course.subject === "math"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                              : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                          }`}
                        >
                          {course.subjectLabel || (course.subject === 'math' ? 'Toán học' : 'Khoa học')}
                        </span>
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          Lớp {course.level}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-foreground text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {course.titleEn}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                            {course.lessonCount || 0} bài
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-cyan-500" />
                            {course.duration || "4 giờ"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-foreground">{course.rating || 4.8}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group flex flex-col md:flex-row gap-6 p-5 rounded-2xl border border-border bg-card hover:border-blue-500/40 hover:shadow-lg transition-all"
                >
                  <div className={`w-full md:w-56 h-36 rounded-xl bg-gradient-to-br ${course.color || "from-blue-500 to-blue-700"} overflow-hidden flex items-center justify-center shrink-0`}>
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="text-center text-white p-4">
                        <div className="text-2xl font-black">{course.subjectLabelEn || "STEM"}</div>
                        <div className="text-xs opacity-80 mt-1">Lớp {course.level}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {course.subjectLabel}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">Lớp {course.level}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mb-2">{course.titleEn}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    </div>

                    <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium"><BookOpen className="w-4 h-4 text-blue-500" /> {course.lessonCount} bài học</span>
                      <span className="flex items-center gap-1 font-medium"><Clock className="w-4 h-4 text-cyan-500" /> {course.duration}</span>
                      <span className="flex items-center gap-1 font-medium"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {course.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
