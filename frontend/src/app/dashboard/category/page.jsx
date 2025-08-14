"use client";
import { useEffect, useState } from "react";
import { useCategory } from "@/hooks/useCategory";
import CrudList from "@/components/crudList";
import CategoryFormModal from "@/components/categoryFormModal";
import DeleteConfirmModal from "@/components/deleteConfirmModal";

export default function CategoryList() {
  const {
    categories,
    loading,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if ((!categories || categories.length === 0) && !fetched) {
      setFetched(true);
      getCategories();
    }
  }, [categories, getCategories]);
  const handleAdd = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setModalVisible(true);
  };

  const handleSubmit = (values) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, values);
    } else {
      createCategory(values);
    }
    setModalVisible(false);
  };

  const handleDeleteClick = (record) => {
    setDeletingCategory(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory.id);
    }
    setDeleteModalVisible(false);
    setDeletingCategory(null);
  };
  const columns = [{ title: "Name", dataIndex: "name", key: "name" }];

  return (
    <>
      <CrudList
        title="Categories"
        data={categories}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      <CategoryFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={editingCategory}
        confirmLoading={loading}
      />
      <DeleteConfirmModal
        visible={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={loading}
        itemName={deletingCategory?.name}
      />
    </>
  );
}
