"use client";
import AuthForm from "@/components/authForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const { handleRegister, isAuthenticated, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard/product"); // redirect to home after register/login
  }, [isAuthenticated, router]);

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
