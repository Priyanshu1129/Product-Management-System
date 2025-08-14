"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

export default function PublicRoute({
  children,
  redirectAuthenticatedTo = "/",
}) {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace(redirectAuthenticatedTo);
      }
      setChecked(true); // mark that auth check is done
    }
  }, [loading, isAuthenticated, router, redirectAuthenticatedTo]);

  // Wait until loading is done and redirect (if needed) happens
  if (loading || !checked) return <Loading />;

  // Only render children if user is NOT authenticated
  if (!isAuthenticated) return children;

  return null; // while redirecting
}
