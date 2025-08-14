"use client";
import AuthForm from "@/components/authForm";
import { useAuth } from "@/hooks/useAuth";
import PublicRoute from "../publicRoute";

export default function RegisterPage() {
  const { handleRegister } = useAuth();

  return (
    <PublicRoute redirectAuthenticatedTo="/dashboard/product">
      <AuthForm type="register" onSubmit={handleRegister} />
    </PublicRoute>
  );
}
