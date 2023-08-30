import express from "express";
import {
  createBusinessProfile,
  getBusinessProfile,
  getBusinessProfileById,
  updateBusinessProfile,
  deleteBusinessProfile,
} from "../controllers/BusinessProfileController.js";
import { verifyUser, vendorOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/businessProfile", verifyUser, vendorOnly, getBusinessProfile);
// router.get('/users', verifyUser, adminOnly, getBusinessProfile);
router.get(
  "/businessProfile/:id",
  verifyUser,
  vendorOnly,
  getBusinessProfileById
);
router.post("/businessProfile", verifyUser, vendorOnly, createBusinessProfile);
router.patch(
  "/businessProfile/:id",
  verifyUser,
  vendorOnly,
  updateBusinessProfile
);
router.patch(
  "/delete-business-profile/:id",
  verifyUser,
  vendorOnly,
  deleteBusinessProfile
);

export default router;
