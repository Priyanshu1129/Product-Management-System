import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new ErrorHandler("Not authorized, no token provided", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid token. Please log in again.", 401));
    }

    if (error.name === "TokenExpiredError") {
      return next(
        new ErrorHandler("Your session has expired. Please log in again.", 401)
      );
    }

    return next(
      new ErrorHandler("Not authorized, token verification failed", 401)
    );
  }
};

export default authMiddleware;
