import express from "express";
const router = express.Router();

import messageController from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.get("/users", protectRoute, messageController.getUsersList);
router.get("/:id", protectRoute, messageController.getMessages);
router.post("/:id/send", protectRoute, messageController.sendMessage);
export default router;