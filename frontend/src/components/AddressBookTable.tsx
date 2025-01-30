import React from "react";
import { Table, Button, Space, Tooltip, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { AddressBookEntry } from "../types";

interface AddressBookTableProps {
  data: AddressBookEntry[];
  loading: boolean;
  onEdit: (record: AddressBookEntry) => void;
  onDelete: (id: number) => void;
}

export const AddressBookTable: React.FC<AddressBookTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Photo",
      dataIndex: "photoPath",
      key: "photo",
      render: (photoPath: string) =>
        photoPath ? (
          <Image
            src={`http://localhost:5270/uploads/${photoPath}`}
            alt="Profile"
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "50%" }}
            fallback="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
          />
        ) : null,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
        a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Job",
      dataIndex: ["job", "title"],
      key: "job",
      sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
        (a.job?.title || "").localeCompare(b.job?.title || ""),
    },
    {
      title: "Department",
      dataIndex: ["department", "name"],
      key: "department",
      sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
        (a.department?.name || "").localeCompare(b.department?.name || ""),
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
        a.mobileNumber.localeCompare(b.mobileNumber),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
        a.email.localeCompare(b.email),
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
        a.dateOfBirth.localeCompare(b.dateOfBirth),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: AddressBookEntry) => (
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
    <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
  );
};
