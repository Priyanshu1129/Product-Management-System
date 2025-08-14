// slices/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
  successMessage: null, // ✅ add this
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
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
    resetCategoryState(state) {
      state.category = null;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  setCategories,
  setCategory,
  setError,
  setSuccessMessage,
  clearMessages,
  resetCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer;
