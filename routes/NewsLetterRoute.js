import express from "express";
import {
  deleteNewsLetter,
  createNewsLetter,
  getNewsLetter,
} from "../controllers/NewsLetterController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/newsLetter", verifyUser, adminOnly, getNewsLetter);
router.post("/newsLetter", verifyUser, adminOnly, createNewsLetter);
router.patch("/newsLetter/:id", verifyUser, adminOnly, deleteNewsLetter);

export default router;
