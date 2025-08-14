"use client";

import { Modal } from "antd";

export default function DeleteConfirmModal({
  visible,
  onConfirm,
  onCancel,
  confirmLoading,
  itemName,
}) {
  return (
    <Modal
      title="Confirm Delete"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
    >
      Are you sure you want to delete <strong>{itemName}</strong>?
    </Modal>
  );
}
