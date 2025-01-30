import React from "react";
import { Table, Button, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Department } from "../../types";

interface DepartmentsTableProps {
  data: Department[];
  loading: boolean;
  onEdit: (record: Department) => void;
  onDelete: (id: number) => void;
}

export const DepartmentsTable: React.FC<DepartmentsTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Department Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Department, b: Department) => a.name.localeCompare(b.name),
    },

    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: Department) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
              size="small"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} departments`,
      }}
    />
  );
};
