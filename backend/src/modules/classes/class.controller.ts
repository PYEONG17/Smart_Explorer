import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await prisma.class.findMany();
    
    // Map data to match frontend expectations
    const formattedClasses = classes.map(c => ({
      ...c,
      studentCount: 30,
      courseCount: 4,
      color: "from-blue-500 to-indigo-600"
    }));

    res.json({ success: true, data: formattedClasses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
