"use client";
import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

export default function CategoryFormModal({
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  confirmLoading = false,
}) {
  const [form] = Form.useForm();

  // Set form values when editing
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={visible}
      title={initialValues?.id ? "Edit Category" : "Add Category"}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      okText={initialValues?.id ? "Update" : "Create"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            { required: true, message: "Please enter category name" },
            { min: 3, message: "Category name must be at least 3 characters" },
            {
              max: 50,
              message: "Category name must be at most 50 characters",
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Category name must contain only alphabets and spaces",
            },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
