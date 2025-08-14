"use client";
import AuthForm from "@/components/authForm";
import { useAuth } from "@/hooks/useAuth";
import PublicRoute from "../publicRoute";

export default function LoginPage() {
  const { handleLogin } = useAuth();

  return (
    <PublicRoute redirectAuthenticatedTo="/dashboard/product">
      <AuthForm type="login" onSubmit={handleLogin} />
    </PublicRoute>
  );
}
