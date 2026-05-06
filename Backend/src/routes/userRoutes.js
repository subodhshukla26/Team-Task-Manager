import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getAllUsers);

export default router;
