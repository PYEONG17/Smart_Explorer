import { Router } from "express";
import { getAllClasses } from "./class.controller.js";

const router = Router();

router.get("/", getAllClasses);

export default router;
