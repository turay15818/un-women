import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";
import { validateToken } from "../controllers/TokenValidation.js";
const router = express.Router();

router.post("/login", Login);
router.get("/validateToken", validateToken);
router.get("/me", Me);
router.delete("/logout", logOut);

export default router;
