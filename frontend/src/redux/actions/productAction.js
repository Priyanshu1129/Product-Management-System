import {
  setLoading,
  setProducts,
  setProduct,
  setError,
  setSuccessMessage,
} from "../slices/productSlice";

import {
  getProducts as fetchProducts,
  getProductById as fetchProductById,
  searchProducts as searchProductsService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../../services/productService";

// Fetch all products (with pagination)
export const getProducts =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await fetchProducts(page, limit);
      dispatch(setProducts(data));
    } catch (err) {
      dispatch(setError(err.message || "Failed to fetch products"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch single product by ID
export const getProductById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fetchProductById(id);
    dispatch(setProduct(data.product || data));
    dispatch(setSuccessMessage("Product fetched successfully"));
  } catch (err) {
    dispatch(setError(err.message || "Failed to fetch product"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Search products with optional category
export const searchProducts = (query, category) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await searchProductsService(query, category);
    dispatch(setProducts(data));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || "Failed to search products")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Create product
export const createProduct = (productData) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const data = await createProductService(productData);
    const { products, total } = getState().product;

    dispatch(
      setProducts({
        products: [...products, data.product],
        total: total + 1,
      })
    );
    dispatch(setSuccessMessage("Product created successfully"));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || "Failed to create product")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Update product
export const updateProduct =
  (id, productData) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const data = await updateProductService(id, productData);
      const { products, total } = getState().product;

      dispatch(
        setProducts({
          products: products.map((p) => (p.id === id ? data.product : p)),
          total,
        })
      );
      dispatch(setSuccessMessage("Product updated successfully"));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to update product")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

// Delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    await deleteProductService(id);
    const { products, total } = getState().product;
    dispatch(
      setProducts({
        products: products.filter((p) => p.id !== id),
        total: total - 1,
      })
    );
    dispatch(setSuccessMessage("Product deleted successfully"));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || "Failed to delete product")
    );
  } finally {
    dispatch(setLoading(false));
  }
};
