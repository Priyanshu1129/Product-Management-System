"use client";
import { Form, Input, InputNumber, Select, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useCategory } from "@/hooks/useCategory";

export default function ProductForm({
  open,
  onCancel,
  onSubmit,
  initialValues,
  confirmLoading,
}) {
  const [form] = Form.useForm();
  const { categories } = useCategory();

  useEffect(() => {
    console.log("ProductForm initialValues:", initialValues);
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category: initialValues.category?.id || initialValues.category,
        image: initialValues.imageUrl
        ? [
            {
              uid: "-1",
              name: "product-image.jpg",
              status: "done",
              url: initialValues.imageUrl,
            },
          ]
        : [],
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
          <Select>
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
          name="image"
          label="Product Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload a product image" }]}
        >

          <Upload
            listType="picture-card"
            multiple={false}
            beforeUpload={(file) => {
              const isAllowedType =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/webp";
              if (!isAllowedType) {
                message.error("Only JPG/PNG/WEBP files are allowed");
                return Upload.LIST_IGNORE;
              }

              const isLt10M = file.size / 1024 / 1024 < 10;
              if (!isLt10M) {
                message.error("Image must be smaller than 10MB!");
                return Upload.LIST_IGNORE;
              }

              return false; // Prevent auto upload
            }}
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
