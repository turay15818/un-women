import express from "express";
import {
  createBusinessProfile,
  getBusinessProfile,
  getBusinessProfileById,
  updateBusinessProfile,
  deleteBusinessProfile,
} from "../controllers/BusinessProfileController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/businessProfile", verifyUser, adminOnly, getBusinessProfile);
// router.get('/users', verifyUser, adminOnly, getBusinessProfile);
router.get(
  "/businessProfile/:id",
  verifyUser,
  adminOnly,
  getBusinessProfileById
);
router.post("/businessProfile", verifyUser, adminOnly, createBusinessProfile);
router.patch(
  "/businessProfile/:id",
  verifyUser,
  adminOnly,
  updateBusinessProfile
);
router.patch(
  "/delete-business-profile/:id",
  verifyUser,
  adminOnly,
  deleteBusinessProfile
);

export default router;
