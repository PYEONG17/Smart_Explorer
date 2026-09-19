import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: { lessons: true }
        }
      }
    });
    
    // Map data to match frontend expectations
    const formattedCourses = courses.map(course => ({
      ...course,
      lessonCount: course._count.lessons,
      // mock some missing fields that frontend expects but aren't in DB yet
      subjectLabel: course.subject === 'math' ? 'Toán học' : 'Khoa học',
      duration: "4 giờ",
      color: course.subject === 'math' ? "from-blue-500 to-blue-700" : "from-purple-500 to-indigo-700",
      enrolled: 150,
      rating: 4.8
    }));

    res.json({ success: true, data: formattedCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { lessons: true }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const formattedCourse = {
      ...course,
      lessonCount: course._count.lessons,
      subjectLabel: course.subject === 'math' ? 'Toán học' : 'Khoa học',
      duration: "4 giờ",
      color: "from-blue-500 to-blue-700",
      enrolled: 150,
      rating: 4.8,
      lessons: course.lessons.map(lesson => ({
        ...lesson,
        duration: "20 phút",
        isLocked: lesson.order > 2,
        isCompleted: lesson.order <= 2
      }))
    };

    res.json({ success: true, data: formattedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
