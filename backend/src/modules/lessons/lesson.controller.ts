import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        materials: true,
        videos: {
          include: { activities: true }
        },
        quizzes: {
          include: {
            questions: {
              include: { answers: true }
            }
          }
        },
        course: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
