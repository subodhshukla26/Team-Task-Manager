import express from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getAllTasks);
router.post("/", requireAuth, requireRole("ADMIN"), createTask);
router.patch("/:id", requireAuth, updateTask);

export default router;
