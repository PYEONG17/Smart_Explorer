import Link from "next/link";

/**
 * Courses Preview Section: Showcases featured courses on the homepage.
 * Data is static for now; will be replaced with API data in Phase 4.
 */

const featuredCourses = [
  {
    id: 1,
    subject: "Toán học",
    subjectEn: "Mathematics",
    level: "Lớp 6",
    title: "Phân số và số thập phân",
    titleEn: "Fractions & Decimals",
    description:
      "Nắm vững khái niệm phân số, số thập phân và các phép tính cơ bản qua video tương tác và bài tập thực hành.",
    lessons: 12,
    duration: "4 giờ",
    color: "from-blue-500 to-blue-700",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    icon: (
      <svg
        className="h-8 w-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.759 1.5 5.771 1.5 9s-.533 6.241-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09"
        />
      </svg>
    ),
  },
  {
    id: 2,
    subject: "Khoa học",
    subjectEn: "Science",
    level: "Lớp 7",
    title: "Hệ thống thái dương",
    titleEn: "The Solar System",
    description:
      "Khám phá 8 hành tinh, mặt trăng và các vật thể trong không gian qua mô hình 3D tương tác và bản đồ sao.",
    lessons: 10,
    duration: "3.5 giờ",
    color: "from-purple-500 to-indigo-700",
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    icon: (
      <svg
        className="h-8 w-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
  {
    id: 3,
    subject: "Toán học",
    subjectEn: "Mathematics",
    level: "Lớp 8",
    title: "Hình học phẳng",
    titleEn: "Plane Geometry",
    description:
      "Học về tam giác, tứ giác, đường tròn và các định lý hình học qua mô hình động và chứng minh tương tác.",
    lessons: 15,
    duration: "5 giờ",
    color: "from-emerald-500 to-teal-700",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    icon: (
      <svg
        className="h-8 w-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
        />
      </svg>
    ),
  },
];

export default function CoursesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-4">
              Khóa học nổi bật
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Bắt đầu với những khóa học{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                được yêu thích
              </span>
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Xem tất cả khóa học
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card header with gradient */}
              <div
                className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${course.color} p-6`}
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    {course.icon}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                {/* Badges */}
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${course.badge}`}
                  >
                    {course.subject}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {course.level}
                  </span>
                </div>

                {/* Title – bilingual */}
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {course.titleEn}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {course.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                    {course.lessons} bài học
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {course.duration}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
