import express from "express";
import {
  getProductImage,
  getProductImageById,
  createProductImage,
  updateProductImage,
  //   deleteProduct,
} from "../controllers/ProductImageController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/productImage", verifyUser, adminOnly, getProductImage);
router.get("/productImage/:id", verifyUser, adminOnly, getProductImageById);
router.post("/productImage", verifyUser, adminOnly, createProductImage);
router.patch("/productImage/:id", verifyUser, adminOnly, updateProductImage);

// router.patch(
//   "/delete-productImage/:id",
//   verifyUser,
//   adminOnly,
//   deleteProductImage
// );

export default router;
