import Joi from "joi";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// Common field: category name validation
const categoryName = Joi.string()
  .trim()
  .pattern(/^[A-Za-z\s]+$/)
  .min(3)
  .max(50)
  .messages({
    "string.pattern.base":
      "Category name must contain only alphabets and spaces",
    "string.min": "Category name must be at least 3 characters long",
    "string.max": "Category name must be at most 50 characters long",
  });

// Schemas
export const createCategorySchema = Joi.object({
  name: categoryName.required().messages({
    "string.empty": "Category name is required",
    "any.required": "Category name is required",
  }),
});

export const updateCategorySchema = Joi.object({
  name: categoryName,
});

export const categoryIdParamSchema = Joi.object({
  id: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid category ID",
    "any.required": "Category ID is required",
  }),
});
