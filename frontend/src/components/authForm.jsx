"use client";
import { Form, Input, Button, Typography, Alert } from "antd";
import { useState } from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

const AuthForm = ({ type = "login", onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 24,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        {type === "login" ? "Login" : "Register"}
      </Title>

      {error && (
        <Alert type="error" message={error} style={{ marginBottom: 16 }} />
      )}

      <Form form={form} onFinish={handleFinish} layout="vertical">
        {type === "register" && (
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {type === "login" ? "Login" : "Register"}
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          {type === "login" ? (
            <Text>
              Don't have an account? <Link href="/register">Register here</Link>
            </Text>
          ) : (
            <Text>
              Already have an account? <Link href="/login">Login here</Link>
            </Text>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
