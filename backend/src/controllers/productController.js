import Product from "../models/product.js";
import Category from "../models/category.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import mongoose from "mongoose";

// Get products with pagination
export const getProducts = catchAsyncError(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const products = await Product.find()
    .populate("category", "name")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments();

  res.status(200).json({ success: true, total, page, limit, products });
});

// Get single product
export const getProductById = catchAsyncError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  const product = await Product.findById(req.params.id).populate(
    "category",
    "name"
  );
  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({ success: true, product });
});

// Create product
export const createProduct = catchAsyncError(
  async (req, res, next, session) => {
    const { name, description, price, category, stockQty, imageUrl } = req.body;

    // DB-dependent validation
    const categoryExists = await Category.findById(category).session(session);
    if (!categoryExists) {
      return next(new ErrorHandler("Category not found", 400));
    }

    const product = await Product.create(
      [{ name, description, price, category, stockQty, imageUrl }],
      { session }
    );

    product[0].category = categoryExists;
    res.status(201).json({ success: true, product: product[0] });
  },
  true
);

// Update product
export const updateProduct = catchAsyncError(
  async (req, res, next, session) => {
    const { id } = req.params;
    const { name, description, price, category, stockQty, imageUrl } = req.body;

    const product = await Product.findById(id).session(session);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    let categoryExists = null;
    if (category) {
      categoryExists = await Category.findById(category).session(session);
      if (!categoryExists) {
        return next(new ErrorHandler("Category not found", 400));
      }
      product.category = category;
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (stockQty !== undefined) product.stockQty = stockQty;
    if (imageUrl) product.imageUrl = imageUrl;

    await product.save({ session });
    product.category = categoryExists;

    res.status(200).json({ success: true, product });
  },
  true
);

// Delete product
export const deleteProduct = catchAsyncError(
  async (req, res, next, session) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorHandler("Invalid product ID", 400));
    }

    const product = await Product.findById(req.params.id).session(session);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    await product.deleteOne({ session });
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  },
  true
);

// Search products
export const searchProducts = catchAsyncError(async (req, res) => {
  const { q, category } = req.query;

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category; // already validated by Joi

  const products = await Product.find(filter)
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: products.length, products });
});
