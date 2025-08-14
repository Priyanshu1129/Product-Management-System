// ES6 imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Global middlewares
app.use(
  cors({
    origin: [
      "https://product-management-system-opal.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// Public auth routes
app.use("/api/auth", authRoutes);

// Protect all routes after this middleware
app.use(authMiddleware);

// Protected routes
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
