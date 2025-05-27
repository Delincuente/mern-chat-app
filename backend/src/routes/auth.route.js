import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.put("/update-profile", protectRoute, authController.updateProfile);
router.get("/check", protectRoute, authController.checkAuth);
export default router;