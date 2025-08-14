import jwt from "jsonwebtoken";
import User from "../models/user.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Helper to send JWT via cookie
const sendTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

// Register
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatarUrl } = req.body; // already validated by Joi

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email is already in use", 400));
  }

  const user = await User.create({ name, email, password, avatarUrl });

  const token = generateToken(user);
  sendTokenCookie(res, token);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

// Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken(user);
  sendTokenCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user,
  });
});

// Logout
export const logout = catchAsyncError(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Check Auth (verify user from cookie)
export const checkAuth = catchAsyncError(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
