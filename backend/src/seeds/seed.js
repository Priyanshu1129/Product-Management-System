import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/category.js";
import Product from "../models/product.js";
import { categoryData } from "./data/categories.js";
import { productData } from "./data/products.js";

dotenv.config();

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Clearing existing data...");
    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log("Inserting categories...");
    const insertedCategories = await Category.insertMany(categoryData);

    // Map category name to _id
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    console.log("Preparing products...");
    const productsToInsert = productData.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    console.log("Inserting products...");
    await Product.insertMany(productsToInsert);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

seedDatabase();
