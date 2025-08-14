"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { checkAuth } from "@/redux/actions/authAction";
import { useDispatch } from "react-redux";

export default function AuthInitializer({ children }) {
  const { loading } = useAuth();
  const dispatch = useDispatch();
  console.log("inside intializer");

  useEffect(() => {
    console.log("inside intializer-2");
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) return <div>initializer Loading...</div>;
  return children;
}
