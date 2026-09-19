import { AppError } from "../../utils/app-error.js";
import { signAccessToken } from "../../utils/jwt.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { authRepository } from "./repository.js";
import type { LoginInput, RegisterInput } from "./schema.js";
import type { AuthResult, PublicUser } from "./types.js";

function toPublicUser(user: {
  id: string;
  name: string;
  email: string;
  role: PublicUser["role"];
  createdAt: Date;
  updatedAt: Date;
}): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function issueAuth(user: PublicUser): AuthResult {
  const token = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
  return { user, token };
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError("Email is already registered", 409);
    }

    const passwordHash = await hashPassword(input.password);
    const user = await authRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    });

    return issueAuth(toPublicUser(user));
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await authRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const matches = await verifyPassword(input.password, user.passwordHash);
    if (!matches) {
      throw new AppError("Invalid email or password", 401);
    }

    return issueAuth(toPublicUser(user));
  },

  async getMe(userId: string): Promise<PublicUser> {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return toPublicUser(user);
  },
};
