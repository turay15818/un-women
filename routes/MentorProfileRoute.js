import express from "express";
import {
  getMentorProfile,
  getMentorProfileById,
  createMentorProfile,
  updateMentorProfile,
  deleteMentorProfile,
} from "../controllers/MentorProfileController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/mentor-profile", verifyUser, adminOnly, getMentorProfile);
router.get("/mentor-profile/:id", verifyUser, adminOnly, getMentorProfileById);
router.post("/mentor-profile", verifyUser, adminOnly, createMentorProfile);
router.patch("/mentor-profile/:id", verifyUser, adminOnly, updateMentorProfile);
router.patch(
  "/delete-mentor-profile/:id",
  verifyUser,
  adminOnly,
  deleteMentorProfile
);

export default router;
