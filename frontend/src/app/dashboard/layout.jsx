"use client";
import React, { useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "@/components/sideBar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) return null;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              borderRadius: 8,
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
