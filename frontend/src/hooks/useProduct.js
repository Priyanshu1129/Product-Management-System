import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/redux/actions/productAction";
import { resetProductState } from "@/redux/slices/productSlice";

export const useProduct = () => {
  const dispatch = useDispatch();

  // Select state from Redux store
  const { products, product, total, loading, error } = useSelector(
    (state) => state.product
  );

  // CRUD actions
  const fetchProducts = (page = 1, limit = 10) =>
    dispatch(getProducts(page, limit));

  const fetchProductById = (id) => dispatch(getProductById(id));

  const searchProductList = (query, category) =>
    dispatch(searchProducts(query, category));

  const addProduct = (productData) => dispatch(createProduct(productData));

  const editProduct = (id, productData) =>
    dispatch(updateProduct(id, productData));

  const removeProduct = (id) => dispatch(deleteProduct(id));

  const resetProduct = () => dispatch(resetProductState());

  return {
    products,
    product,
    total,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    searchProductList,
    addProduct,
    editProduct,
    removeProduct,
    resetProduct,
  };
};
