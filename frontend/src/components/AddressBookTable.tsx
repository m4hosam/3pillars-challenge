import React from "react";
import { Table, Button, Image } from "antd";
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
    },
    {
      title: "Job",
      dataIndex: ["job", "title"],
      key: "job",
    },
    {
      title: "Department",
      dataIndex: ["department", "name"],
      key: "department",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: AddressBookEntry) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
  );
};
