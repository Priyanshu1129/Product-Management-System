import Category from "../models/category.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

// @desc Get all categories
export const getCategories = catchAsyncError(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

// @desc Get category by ID
export const getCategoryById = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({ success: true, category });
});

// @desc Create category
export const createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  // Business logic check: duplicate name
  const existing = await Category.findOne({ name: name.trim() });
  if (existing) {
    return next(new ErrorHandler("Category already exists", 400));
  }

  const category = await Category.create({ name: name.trim() });
  res.status(201).json({ success: true, category });
}, false); // No transaction needed

// @desc Update category
export const updateCategory = catchAsyncError(
  async (req, res, next, session) => {
    const { name } = req.body;

    const category = await Category.findById(req.params.id).session(session);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    if (name) category.name = name.trim();

    await category.save({ session });
    res.status(200).json({ success: true, category });
  },
  true
);

// @desc Delete category
export const deleteCategory = catchAsyncError(
  async (req, res, next, session) => {
    const category = await Category.findById(req.params.id).session(session);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    // Business logic check: linked products
    const productExists = await Product.exists({
      category: req.params.id,
    }).session(session);
    if (productExists) {
      return next(
        new ErrorHandler("Cannot delete category with existing products", 400)
      );
    }

    await category.deleteOne({ session });
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  },
  true
);
