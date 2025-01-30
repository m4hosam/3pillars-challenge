import React from "react";
import { Table, Button, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Job } from "../../types";

interface JobsTableProps {
  data: Job[];
  loading: boolean;
  onEdit: (record: Job) => void;
  onDelete: (id: number) => void;
}

export const JobsTable: React.FC<JobsTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Job, b: Job) => a.title.localeCompare(b.title),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: Job) => (
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
        showTotal: (total) => `Total ${total} jobs`,
      }}
    />
  );
};
