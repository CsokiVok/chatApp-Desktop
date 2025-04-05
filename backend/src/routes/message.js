import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { getMessages, getUsers, sendMessage } from "../controllers/message.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage) //üzenetküldés

export default router;