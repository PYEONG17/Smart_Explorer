import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AppError("Authentication required", 401);
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  const payload = verifyAccessToken(token);
  req.user = {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
  };
  next();
}
