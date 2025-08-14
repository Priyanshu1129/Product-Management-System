// app/login/page.jsx
"use client";
import AuthForm from "@/components/authForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { handleLogin, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard/product");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return null;

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
