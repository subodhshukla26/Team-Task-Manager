import express from "express";
import {
  addProjectMember,
  createProject,
  getAllProjects,
  getProjectMembers,
} from "../controllers/projectController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getAllProjects);
router.post("/", requireAuth, requireRole("ADMIN"), createProject);
router.get("/:id/members", requireAuth, getProjectMembers);
router.post("/:id/members", requireAuth, requireRole("ADMIN"), addProjectMember);

export default router;
