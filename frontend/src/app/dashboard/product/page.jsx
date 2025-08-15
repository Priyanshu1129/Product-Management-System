"use client";
import { useEffect, useState } from "react";
import { Input, Select, Space } from "antd";
import { useProduct } from "@/hooks/useProduct";
import { useCategory } from "@/hooks/useCategory";
import CrudList from "@/components/crudList";
import dayjs from "dayjs";
import { debounce } from "lodash";
import ProductForm from "@/components/productFormModal";
import DeleteConfirmModal from "@/components/deleteConfirmModal";

export default function ProductList() {
  const {
    products,
    total,
    loading,
    fetchProducts,
    searchProductList,
    addProduct,
    editProduct,
    removeProduct,
  } = useProduct();

  const { categories, getCategories } = useCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productFetched, setProductFetched] = useState(false);
  const [categoryFetched, setCategoryFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if ((!products || products.length === 0) && !productFetched) {
      setProductFetched(true);
      fetchProducts(currentPage, pageSize);
    }
    if ((!categories || categories.length === 0) && !categoryFetched) {
      setCategoryFetched(true);
      getCategories();
    }
  }, [products, categories, fetchProducts, getCategories]);

  const debouncedSearch = debounce((value, category) => {
    searchProductList(value, category);
  }, 500); // wait 500ms after typing stops

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value, selectedCategory);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    searchProductList(searchQuery, value);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    setFormOpen(true);
  };

  const handleSubmit = (values) => {
    if (values.category && values.category?.id) {
      values.category = values.category.id;
    }
    if (editingProduct) {
      editProduct(editingProduct.id, values);
    } else {
      addProduct(values);
    }
    setFormOpen(false);
  };

  const handleDeleteClick = (record) => {
    setDeletingProduct(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      removeProduct(deletingProduct.id);
    }
    setDeleteModalVisible(false);
    setDeletingProduct(null);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    fetchProducts(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `₹${value}`, // currency formatting
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (categoryId) => {
        const category = categories?.find((cat) => cat.id === categoryId);
        return category ? category.name : "-";
      },
    },
    {
      title: "Stock Qty",
      dataIndex: "stockQty",
      key: "stockQty",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (value) => (value ? "Yes" : "No"),
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: "Updated On",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by product name"
          allowClear
          value={searchQuery}
          // onSearch={handleSearch}
          onChange={handleSearchChange}
          style={{ width: 300 }}
        />

        <Select
          placeholder="Filter by category"
          allowClear
          style={{ width: 200 }}
          onChange={handleCategoryChange}
          value={selectedCategory || undefined}
        >
          {categories.map((cat) => (
            <Select.Option key={cat.id} value={cat.id}>
              {cat.name}
            </Select.Option>
          ))}
        </Select>
      </Space>

      <CrudList
        title="Products"
        data={products}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
        }}
        onTableChange={handleTableChange}
      />

      <ProductForm
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingProduct}
      />

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={loading}
        itemName={deletingProduct?.name}
      />
    </>
  );
}
