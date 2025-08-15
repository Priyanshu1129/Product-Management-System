import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../controllers/productController.js";
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  searchProductsSchema,
} from "../validations/productValidations.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", authMiddleware, getProducts);
router.get(
  "/search",
  authMiddleware,
  validate(searchProductsSchema),
  searchProducts
);
router.get(
  "/:id",
  authMiddleware,
  validate(productIdParamSchema, "params"),
  getProductById
);

// Protected routes
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  validate(createProductSchema),
  createProduct
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  validate(productIdParamSchema, "params"),
  validate(updateProductSchema),
  updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  validate(productIdParamSchema, "params"),
  deleteProduct
);

export default router;
