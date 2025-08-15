// services/productService.js
import api from "./api"; // Assuming you have an axios instance set up

// Get all products with optional pagination
export const getProducts = async (page = 1, limit = 10) => {
  const res = await api.get(`/product?page=${page}&limit=${limit}`);
  return res.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

// Search products by query
export const searchProducts = async (query, category) => {
  const params = {};
  if (query) params.q = query;
  if (category) params.category = category;

  const { data } = await api.get("/product/search", { params });
  return data;
};

// Create new product
export const createProduct = async (data) => {
  const res = await api.post("/product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update existing product
export const updateProduct = async (id, data) => {
  const res = await api.put(`/product/${id}`, data);
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/product/${id}`);
  return res.data;
};
