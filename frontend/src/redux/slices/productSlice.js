import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  total: 0,
  loading: false,
  error: null,
  successMessage: null, // Added for notifications
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload.products;
      state.total = action.payload.total || action.payload.length;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
    resetProductState(state) {
      state.product = null;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setProduct,
  setError,
  setSuccessMessage,
  clearMessages,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
