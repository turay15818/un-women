import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly, vendorOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// router.get("/users", getUsers);
router.get("/users", verifyUser, vendorOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/users", createUser);
router.patch("/update-users/:id", verifyUser, adminOnly, updateUser);
router.patch("/delete-users/:id", verifyUser, adminOnly, deleteUser);

export default router;
