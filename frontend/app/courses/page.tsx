import { fetchCourses } from "@/lib/api";
import CoursesClient from "./CoursesClient";
import { mockCourses } from "@/lib/mock-data";
import type { Course } from "@/types";

export const metadata = {
  title: "Khóa học | SmartExplorer",
  description: "Khám phá các khóa học STEM tương tác song ngữ.",
};

export default async function CoursesPage() {
  let courses = await fetchCourses();
  
  if (!courses || courses.length === 0) {
    courses = mockCourses as unknown as Course[];
  }

  return <CoursesClient initialCourses={courses} />;
}
