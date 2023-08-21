import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  createProductAndImages,
  updateProduct,
  deleteProduct,
  getProductRoleAndById,
  getProductsbyRole,
} from "../controllers/ProductController.js";
import { verifyUser, vendorOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/products", verifyUser, vendorOnly, getProducts);
router.get("/products-by-role", verifyUser, vendorOnly, getProductsbyRole);
router.get("/products/:id", verifyUser, vendorOnly, getProductById);
router.get(
  "/products-by-role/:id",
  verifyUser,
  vendorOnly,
  getProductRoleAndById
);
router.post("/products", verifyUser, vendorOnly, createProduct);
router.post(
  "/productsAndProductImages",
  verifyUser,
  vendorOnly,
  createProductAndImages
);
router.patch("/products/:id", verifyUser, vendorOnly, updateProduct);
router.patch("/delete-product/:id", verifyUser, vendorOnly, deleteProduct);

export default router;
