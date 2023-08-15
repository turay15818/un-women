import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  createProductAndImages,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/products", verifyUser, adminOnly, getProducts);
router.get("/products/:id", verifyUser, adminOnly, getProductById);
router.post("/products", verifyUser, adminOnly, createProduct);
router.post(
  "/productsAndProductImages",
  verifyUser,
  adminOnly,
  createProductAndImages
);
router.patch("/products/:id", updateProduct);
router.patch("/delete-product/:id", verifyUser, adminOnly, deleteProduct);

export default router;
