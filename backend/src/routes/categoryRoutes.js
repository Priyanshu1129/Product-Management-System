import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
} from "../validations/categoryValidations.js";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", authMiddleware, getCategories);

router.get(
  "/:id",
  authMiddleware,
  validate(categoryIdParamSchema, "params"),
  getCategoryById
);

router.post(
  "/",
  authMiddleware,
  validate(createCategorySchema),
  createCategory
);

router.put(
  "/:id",
  authMiddleware,
  validate(categoryIdParamSchema, "params"),
  validate(updateCategorySchema),
  updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  validate(categoryIdParamSchema, "params"),
  deleteCategory
);

export default router;
