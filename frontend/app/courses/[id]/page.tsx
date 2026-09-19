import { notFound } from "next/navigation";
import { mockCourses, mockLessons } from "@/lib/mock-data";
import CourseDetailClient from "./CourseDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = mockCourses.find((c) => c.id === id);
  if (!course) return { title: "Khóa học không tìm thấy" };

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} | SmartExplorer`,
      description: course.description,
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = mockCourses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  // Use mockLessons for course c1, generate mock for others
  const lessons =
    course.id === "c1"
      ? mockLessons
      : Array.from({ length: course.lessonCount }, (_, i) => ({
          id: `${course.id}-l${i + 1}`,
          title: `Bài ${i + 1}: Nội dung bài học ${i + 1}`,
          titleEn: `Lesson ${i + 1}: Lesson content ${i + 1}`,
          description: `Mô tả ngắn cho bài học ${i + 1} của khóa ${course.title}`,
          descriptionEn: `Short description for lesson ${i + 1} of ${course.titleEn}`,
          order: i + 1,
          duration: `${15 + Math.floor(Math.random() * 20)} phút`,
          courseId: course.id,
          isLocked: i > 2,
          isCompleted: i < 2,
        }));

  return <CourseDetailClient course={course} lessons={lessons} />;
}
