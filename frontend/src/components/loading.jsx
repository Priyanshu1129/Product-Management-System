"use client";
import { Spin } from "antd";
import React from "react";

export default function Loading({ message = "Loading..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        gap: "16px",
      }}
    >
      <Spin size="large" />
      <div style={{ fontSize: 16, color: "#555" }}>{message}</div>
    </div>
  );
}
