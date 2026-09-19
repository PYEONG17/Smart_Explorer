import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import courseRoutes from "./modules/courses/course.routes.js";
import classRoutes from "./modules/classes/class.routes.js";
import lessonRoutes from "./modules/lessons/lesson.routes.js";
import authRoutes from "./modules/auth/routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartExplorer API is running",
    data: {
      timestamp: new Date().toISOString(),
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/lessons", lessonRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
