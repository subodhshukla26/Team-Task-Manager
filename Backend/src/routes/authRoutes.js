import { Router } from "express";
import { login, logout, me, signup } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { loginRules, signupRules, validateRequest } from "../validators/authValidators.js";

const router = Router();

router.post("/signup", signupRules, validateRequest, signup);
router.post("/register", signupRules, validateRequest, signup);
router.post("/login", loginRules, validateRequest, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
