"use client";
import { Form, Input, InputNumber, Select, Switch, Modal } from "antd";
import { useEffect, useState } from "react";
import { useCategory } from "@/hooks/useCategory";

export default function ProductForm({
  open,
  onCancel,
  onSubmit,
  initialValues,
  confirmLoading,
}) {
  const [form] = Form.useForm();
  const { categories, getCategories } = useCategory();
  const [loadingCats, setLoadingCats] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      setLoadingCats(true);
      await getCategories();
      setLoadingCats(false);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category: initialValues.category?.id || initialValues.category,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Modal
      open={open}
      title={initialValues ? "Edit Product" : "Add Product"}
      okText={initialValues ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        layout="vertical"
        name="productForm"
        onFinish={onSubmit}
      >
        {/* Product Name */}
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please enter product name" },
            { min: 3, message: "Product name must be at least 3 characters" },
            {
              max: 100,
              message: "Product name must be at most 100 characters",
            },
            {
              pattern: /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/,
              message: "Name must contain alphabetic characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { min: 10, message: "Description must be at least 10 characters" },
            {
              max: 1000,
              message: "Description must be at most 1000 characters",
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Price */}
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter price" },
            {
              type: "number",
              min: 1,
              max: 1000000,
              message: "Price must be between 1 and 1,000,000",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        {/* Category */}
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select loading={loadingCats}>
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Stock Quantity */}
        <Form.Item
          name="stockQty"
          label="Stock Quantity"
          rules={[
            { required: true, message: "Please enter stock quantity" },
            {
              type: "number",
              min: 0,
              max: 100000,
              message: "Stock quantity must be between 0 and 100,000",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        {/* Image URL */}
        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[
            {
              type: "url",
              message: "Please enter a valid URL",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
