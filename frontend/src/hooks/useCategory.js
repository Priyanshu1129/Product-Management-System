import { useDispatch, useSelector } from "react-redux";
import {
  getCategories as fetchCategories,
  getCategoryById as fetchCategoryById,
  createCategory as createCategoryAction,
  updateCategory as updateCategoryAction,
  deleteCategory as deleteCategoryAction,
} from "@/redux/actions/categoryAction";
import { resetCategoryState } from "@/redux/slices/categorySlice";

export const useCategory = () => {
  const dispatch = useDispatch();
  const { categories, category, loading, error } = useSelector(
    (state) => state.category
  );

  const getCategories = () => dispatch(fetchCategories());
  const getCategoryById = (id) => dispatch(fetchCategoryById(id));
  const createCategory = (data) => dispatch(createCategoryAction(data));
  const updateCategory = (id, data) => dispatch(updateCategoryAction(id, data));
  const deleteCategory = (id) => dispatch(deleteCategoryAction(id));
  const resetCategory = () => dispatch(resetCategoryState());

  return {
    categories,
    category,
    loading,
    error,
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    resetCategory,
  };
};
