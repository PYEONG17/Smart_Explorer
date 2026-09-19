"use client";

import { mockDashboardStats, mockProgressData, mockRecentLessons, mockUser } from "@/lib/mock-data";
import { BookOpen, CheckCircle2, Flame, Trophy, PlayCircle, Award, Target, Calendar } from "lucide-react";
import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { motion } from "motion/react";
import { useLang } from "@/contexts/LanguageContext";

export default function DashboardPage() {
  const { t, locale } = useLang();

  const achievements = [
    { titleKey: "dashboard.ach.math_genius" as const, descKey: "dashboard.ach.math_genius_desc" as const, icon: Trophy, color: "text-amber-500 bg-amber-500/10" },
    { titleKey: "dashboard.ach.scientist" as const, descKey: "dashboard.ach.scientist_desc" as const, icon: Award, color: "text-purple-500 bg-purple-500/10" },
    { titleKey: "dashboard.ach.streak7" as const, descKey: "dashboard.ach.streak7_desc" as const, icon: Flame, color: "text-orange-500 bg-orange-500/10" },
  ];
  const stats = [
    {
      labelKey: "dashboard.stat.enrolled" as const,
      value: mockDashboardStats.enrolledCourses,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      labelKey: "dashboard.stat.completed" as const,
      value: mockDashboardStats.completedLessons,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      labelKey: "dashboard.stat.avg_score" as const,
      value: `${mockDashboardStats.averageScore}%`,
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      labelKey: "dashboard.stat.streak" as const,
      value: `${mockDashboardStats.streakDays} ${t("dashboard.stat.streak_unit")}`,
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div 
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t("dashboard.welcome")} <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{mockUser.name.split(" ").pop()}</span>! 👋
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              {t("dashboard.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-muted/40 border border-border px-4 py-2 rounded-2xl text-xs font-semibold text-muted-foreground">
            <Calendar className="w-4 h-4 text-blue-500" />
            {t("dashboard.today")} {new Date().toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx} 
                className="group relative p-6 rounded-2xl border border-border bg-card flex items-center gap-4 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-colors duration-500" />
                
                <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl font-black text-foreground">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{t(stat.labelKey)}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Progress Chart */}
            <div className="p-6 rounded-2xl border border-border bg-card relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t("dashboard.chart.weekly")}</h2>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-500">
                  <Target className="w-4 h-4" /> {locale === "vi" ? "Mục tiêu: ≥ 85%" : "Goal: ≥ 85%"}
                </div>
              </div>
              <div className="h-[280px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    />
                    <Area type="natural" dataKey="quizScore" name="Điểm trung bình" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gamification Achievements */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">{t("dashboard.achievement.title")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {achievements.map((ach, i) => {
                  const Icon = ach.icon;
                  return (
                    <div key={i} className="p-4 rounded-xl border border-border bg-muted/30 flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl ${ach.color} shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{t(ach.titleKey)}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{t(ach.descKey)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Sidebar Area */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-6 rounded-2xl border border-border bg-card relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-xl font-bold">{t("dashboard.recent.title")}</h2>
                <Link href="/courses" className="text-sm font-semibold text-blue-500 hover:underline">
                  {t("dashboard.recent.view_all")}
                </Link>
              </div>
              <div className="space-y-4 relative z-10">
                {mockRecentLessons.map((lesson) => (
                  <Link 
                    key={lesson.id} 
                    href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}
                    className="block p-4 rounded-2xl border border-border bg-background/50 hover:bg-muted/50 transition-all group hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                        <PlayCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-foreground truncate group-hover:text-blue-600 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate font-medium">
                          {lesson.courseTitle}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                              style={{ width: `${lesson.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground w-8 text-right">
                            {lesson.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
