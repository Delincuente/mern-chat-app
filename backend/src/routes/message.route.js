const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { protectRoute } = require("../middleware/auth.middleware");

router.get("/users", protectRoute, messageController.getUsersList);
router.get("/:id", protectRoute, messageController.getMessages);
router.post("/:id/send", protectRoute, messageController.sendMessage);
module.exports = router;