import Joi from "joi";

// Common reusable messages
const messages = {
  required: (field) => `${field} is required`,
  min: (field, min) => `${field} must be at least ${min} characters long`,
  max: (field, max) => `${field} must not exceed ${max} characters`,
  invalid: (field) => `Please enter a valid ${field}`,
  onlyLetters: (field) => `${field} must contain only alphabets and spaces`,
};

// Common reusable fields
const nameField = Joi.string()
  .pattern(/^[A-Za-z\s]+$/)
  .min(3)
  .max(80)
  .required()
  .messages({
    "string.empty": messages.required("Name"),
    "string.pattern.base": messages.onlyLetters("Name"),
    "string.min": messages.min("Name", 3),
    "string.max": messages.max("Name", 80),
    "any.required": messages.required("Name"),
  });

const emailField = Joi.string()
  .email()
  .required()
  .messages({
    "string.empty": messages.required("Email"),
    "string.email": messages.invalid("email address"),
    "any.required": messages.required("Email"),
  });

const passwordField = Joi.string()
  .min(8)
  .max(100)
  // Optional: add regex for stronger passwords
  // .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  .required()
  .messages({
    "string.empty": messages.required("Password"),
    "string.min": messages.min("Password", 8),
    "string.max": messages.max("Password", 100),
    // "string.pattern.base": "Password must include at least one uppercase letter, one lowercase letter, and one digit",
    "any.required": messages.required("Password"),
  });

// Schemas
export const registerSchema = Joi.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  avatarUrl: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": messages.invalid("avatar URL"),
    }),
});

export const loginSchema = Joi.object({
  email: emailField,
  password: passwordField,
});
