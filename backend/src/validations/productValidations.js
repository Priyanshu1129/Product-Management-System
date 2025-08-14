import Joi from "joi";
import mongoose from "mongoose";

// 🔹 Reusable ObjectId validator
const objectId = (label = "ID") =>
  Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId Validation")
    .messages({
      "any.invalid": `Invalid ${label} format`,
      "string.base": `${label} must be a string`,
      "string.empty": `${label} cannot be empty`,
    });

// 🔹 Search products schema
export const searchProductsSchema = Joi.object({
  q: Joi.string().trim().max(100).optional(),
  category: objectId("Category ID").optional(),
});

// 🔹 Create product schema
export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 3 characters long",
    "string.max": "Product name must be at most 100 characters long",
    "any.required": "Product name is required",
  }),
  description: Joi.string().trim().min(10).max(1000).allow("").messages({
    "string.max": "Description must be at most 1000 characters long",
    "string.min": "Description must be at least 10 characters long",
  }),
  price: Joi.number().min(1).max(1000000).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 1",
    "number.max": "Price must be at most 1,000,000",
    "any.required": "Price is required",
  }),
  category: objectId("Category ID").required().messages({
    "any.required": "Category ID is required",
  }),
  stockQty: Joi.number().min(0).max(100000).required().messages({
    "number.base": "Stock quantity must be a number",
    "number.min": "Stock cannot be negative",
    "number.max": "Stock quantity must be at most 100,000",
    "any.required": "Stock quantity is required",
  }),
  imageUrl: Joi.string().uri().allow("").messages({
    "string.uri": "Image URL must be a valid URI",
  }),
});

// 🔹 Update product schema
export const updateProductSchema = Joi.object({
  name: Joi.string().trim().max(160).messages({
    "string.max": "Product name must be at most 160 characters long",
  }),
  description: Joi.string().trim().max(5000).allow(""),
  price: Joi.number().min(0).messages({
    "number.min": "Price must be non-negative",
  }),
  category: objectId("Category ID"),
  stockQty: Joi.number().min(0).messages({
    "number.min": "Stock cannot be negative",
  }),
  imageUrl: Joi.string().uri().allow(""),
}).min(1); // ✅ at least one field must be provided

// 🔹 ID param schema
export const productIdParamSchema = Joi.object({
  id: objectId("Product ID").required(),
});
