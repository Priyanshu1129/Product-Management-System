"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { menuItems } from "@/app/config/menuItems";
import { useAuth } from "@/hooks/useAuth";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { handleLogout } = useAuth();

  const handleMenuClick = ({ key }) => {
    if (key === "signout") {
      handleLogout();
      router.replace("/login");
    } else {
      router.push(key);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {/* PMS Logo / Title */}
      <div
        style={{
          height: 40,
          margin: 16,
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: collapsed ? "0.9rem" : "1.2rem",
          color: "#fff",
          letterSpacing: 1,
        }}
      >
        PMS
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}
