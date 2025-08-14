"use client";
import { useEffect } from "react";
import { notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clearMessages as clearAuthMessages } from "@/redux/slices/authSlice";
import { clearMessages as clearCategoryMessages } from "@/redux/slices/categorySlice";
import { clearMessages as clearProductMessages } from "@/redux/slices/productSlice";

export default function NotificationListener() {
  const dispatch = useDispatch();

  const { error, successMessage, source } = useSelector((state) => {
    if (state.auth.error || state.auth.successMessage)
      return {
        error: state.auth.error,
        successMessage: state.auth.successMessage,
        source: "auth",
      };
    if (state.category.error || state.category.successMessage)
      return {
        error: state.category.error,
        successMessage: state.category.successMessage,
        source: "category",
      };
    if (state.product.error || state.product.successMessage)
      return {
        error: state.product.error,
        successMessage: state.product.successMessage,
        source: "product",
      };
    return {};
  });

  useEffect(() => {
    if (error) {
      console.log("source", source, successMessage, error);
      notification.error({
        message: "Error",
        description: error,
      });
      if (source === "auth") dispatch(clearAuthMessages());
      if (source === "category") dispatch(clearCategoryMessages());
      if (source === "product") dispatch(clearProductMessages());
    }
  }, [error, source, dispatch]);

  useEffect(() => {
    if (successMessage) {
      console.log("source", source, successMessage, error);

      notification.success({
        message: "Success",
        description: successMessage,
      });
      if (source === "auth") dispatch(clearAuthMessages());
      if (source === "category") dispatch(clearCategoryMessages());
      if (source === "product") dispatch(clearProductMessages());
    }
  }, [successMessage, source, dispatch]);

  return null;
}
