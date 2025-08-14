import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validations/authValidations.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, checkAuth);

export default router;
