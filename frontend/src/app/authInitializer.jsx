"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { checkAuth } from "@/redux/actions/authAction";
import { useDispatch } from "react-redux";
import Loading from "@/components/loading";

export default function AuthInitializer({ children }) {
  const { loading } = useAuth();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  // if (loading) return <Loading message="Checking authentication..." />;
  return children;
}
