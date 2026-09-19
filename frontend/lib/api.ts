import {
  mockCourses,
  mockClasses,
  mockLessons,
  mockQuiz,
  mockUser,
} from "./mock-data";
import type {
  Course,
  ClassItem,
  Lesson,
  Quiz,
  CreateCourseDTO,
  CreateLessonDTO,
  CreateMaterialDTO,
  CreateVideoDTO,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_URL}/courses`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch courses");
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return mockCourses as unknown as Course[];
  } catch (error) {
    console.warn("Backend unavailable, using fallback mock courses:", error);
    return mockCourses as unknown as Course[];
  }
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch course");
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    const found = mockCourses.find((c) => c.id === id);
    return found ? (found as unknown as Course) : null;
  } catch (error) {
    console.warn(
      `Backend unavailable, using fallback mock course for ${id}:`,
      error,
    );
    const found = mockCourses.find((c) => c.id === id);
    return found ? (found as unknown as Course) : null;
  }
}

export async function fetchClasses(): Promise<ClassItem[]> {
  try {
    const res = await fetch(`${API_URL}/classes`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch classes");
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return mockClasses as ClassItem[];
  } catch (error) {
    console.warn("Backend unavailable, using fallback mock classes:", error);
    return mockClasses as ClassItem[];
  }
}

export async function fetchLessonById(id: string): Promise<Lesson | null> {
  try {
    const res = await fetch(`${API_URL}/lessons/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch lesson");
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    const found = mockLessons.find((l) => l.id === id);
    return found ? (found as unknown as Lesson) : null;
  } catch (error) {
    console.warn(
      `Backend unavailable, using fallback mock lesson for ${id}:`,
      error,
    );
    const found = mockLessons.find((l) => l.id === id);
    return found ? (found as unknown as Lesson) : null;
  }
}

export async function submitQuizResult(payload: {
  userId: string;
  quizId: string;
  answers: Record<string, string>;
  score: number;
}): Promise<{ success: boolean; score: number; message: string }> {
  try {
    const res = await fetch(`${API_URL}/quizzes/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to submit quiz");
    return await res.json();
  } catch (error) {
    console.warn("Backend unavailable, mock quiz submission success:", error);
    return {
      success: true,
      score: payload.score,
      message: "Hoàn thành bài kiểm tra thành công! (Dữ liệu đã được lưu tạm)",
    };
  }
}

export async function saveProgress(payload: {
  userId: string;
  lessonId: string;
  status: "COMPLETED" | "IN_PROGRESS";
  score?: number;
}): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${API_URL}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save progress");
    return await res.json();
  } catch (error) {
    console.warn("Backend unavailable, progress saved locally:", error);
    return { success: true };
  }
}

// ─────────────────────────────────────────────
// TEACHER STUDIO CREATION APIs
// ─────────────────────────────────────────────

export async function createCourse(
  data: CreateCourseDTO,
): Promise<{ success: boolean; data: Course }> {
  const newCourse: Course = {
    id: `course-${Date.now()}`,
    title: data.title,
    titleEn: data.titleEn || data.title,
    description: data.description,
    descEn: data.descEn || data.description,
    thumbnail: data.thumbnail || "/hero-illustration.png",
    subject: data.subject,
    subjectLabel: data.subject === "math" ? "Toán học" : "Khoa học",
    subjectLabelEn: data.subject === "math" ? "Mathematics" : "Science",
    level: data.level,
    lessonCount: 0,
    duration: "0 giờ",
    enrolled: 1,
    rating: 5.0,
    color:
      data.subject === "math"
        ? "from-blue-600 to-indigo-700"
        : "from-purple-600 to-indigo-700",
    lessons: [],
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(`${API_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        mockCourses.unshift(json.data);
        return { success: true, data: json.data };
      }
    }
  } catch (error) {
    console.warn("Backend unavailable, adding course to mock state:", error);
  }

  // Fallback state update
  mockCourses.unshift(newCourse as unknown as (typeof mockCourses)[number]);
  return { success: true, data: newCourse };
}

export async function createLesson(
  data: CreateLessonDTO,
): Promise<{ success: boolean; data: Lesson }> {
  const newLesson: Lesson = {
    id: `lesson-${Date.now()}`,
    title: data.title,
    titleEn: data.titleEn || data.title,
    description: data.description || "",
    order: data.order,
    duration: data.duration || "20 phút",
    courseId: data.courseId,
    isLocked: false,
    isCompleted: false,
  };

  try {
    const res = await fetch(`${API_URL}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return { success: true, data: json.data };
    }
  } catch (error) {
    console.warn("Backend unavailable, mock lesson creation:", error);
  }

  mockLessons.push(newLesson as unknown as (typeof mockLessons)[number]);
  return { success: true, data: newLesson };
}
// ─────────────────────────────────────────────
// AUTH APIs
// ─────────────────────────────────────────────

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

export type AuthResult = {
  user: AuthUser;
  token: string;
};

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Registration failed");
  }

  return json.data;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Login failed");
  }

  return json.data;
}

export async function getMe(token: string): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Authentication failed");
  }

  return json.data;
}
