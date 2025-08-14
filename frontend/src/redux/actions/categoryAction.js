// actions/categoryActions.js
import {
  setLoading,
  setCategories,
  setCategory,
  setError,
  setSuccessMessage,
} from "../slices/categorySlice";

import {
  getCategories as fetchCategories,
  getCategoryById as fetchCategoryById,
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../../services/categoryService";

// Fetch all categories
export const getCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fetchCategories();
    dispatch(setCategories(data.categories || data));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || "Failed to fetch categories")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch single category by ID
export const getCategoryById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fetchCategoryById(id);
    dispatch(setCategory(data.category || data));
    dispatch(setSuccessMessage("Category loaded successfully"));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || "Failed to fetch category")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Create category
export const createCategory = (categoryData) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const data = await createCategoryService(categoryData);
    const { categories } = getState().category;
    dispatch(setCategories([...categories, data.category || data]));
    dispatch(setSuccessMessage("Category created successfully"));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || "Failed to create category")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Update category
export const updateCategory =
  (id, categoryData) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const data = await updateCategoryService(id, categoryData);
      const { categories } = getState().category;
      dispatch(
        setCategories(
          categories.map((cat) => (cat.id === id ? data.category || data : cat))
        )
      );
      dispatch(setSuccessMessage("Category updated successfully"));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to update category")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

// Delete category
export const deleteCategory = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const res = await deleteCategoryService(id);
    const { categories } = getState().category;
    dispatch(setCategories(categories.filter((cat) => cat.id !== id)));
    dispatch(setSuccessMessage(res.message || "Category deleted successfully"));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || "Failed to delete category")
    );
  } finally {
    dispatch(setLoading(false));
  }
};
