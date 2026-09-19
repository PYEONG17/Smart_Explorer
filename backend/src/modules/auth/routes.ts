import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { login, logout, me, register } from "./controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

export default router;
