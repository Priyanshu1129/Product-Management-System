import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be non-negative"],
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    stockQty: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      index: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Text index for search
ProductSchema.index(
  { name: "text", description: "text" },
  { name: "ProductTextIndex" }
);

// Compound index for category + price
ProductSchema.index({ category: 1, price: 1 });

ProductSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Product", ProductSchema);
