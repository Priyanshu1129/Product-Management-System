// src/components/CrudList.jsx
"use client";

import { Button, Table, Typography, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function CrudList({
  title,
  data,
  columns,
  loading,
  onAdd,
  onEdit,
  onDelete,
}) {
  const tableData = data.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
    key: item.id || item._id || index, // ensure unique key
  }));

  // Merge custom columns with action buttons
  const mergedColumns = [
    { title: "S.No", dataIndex: "serialNumber", key: "serialNumber" },
    ...columns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit?.(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete?.(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>{title}</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={onAdd}
      >
        Add {title}
      </Button>

      <Table
        dataSource={tableData.map((item) => ({
          ...item,
          key: item.id || item._id,
        }))}
        columns={mergedColumns}
        loading={loading}
      />
    </div>
  );
}
