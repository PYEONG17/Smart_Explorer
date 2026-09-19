import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error.js";
import { success } from "../../utils/api-response.js";
import { loginSchema, registerSchema } from "./schema.js";
import { authService } from "./service.js";

export async function register(req: Request, res: Response) {
  const body = registerSchema.parse(req.body);
  const data = await authService.register(body);
  res.status(201).json(success(data, "Registration successful"));
}

export async function login(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);
  const data = await authService.login(body);
  res.json(success(data, "Login successful"));
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }
  const data = await authService.getMe(req.user.id);
  res.json(success(data, "Success"));
}

export async function logout(_req: Request, res: Response) {
  res.json(success(null, "Logout successful"));
}
