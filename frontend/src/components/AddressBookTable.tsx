import React from "react";
import { Table, Button, Space, Tooltip, Image, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { AddressBookEntry } from "../types";
import { useMediaQuery } from "react-responsive";
import type { ColumnsType } from "antd/es/table";

const { Paragraph } = Typography;

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const PHOTO_URL =
    import.meta.env.VITE_PHOTO_API_URL || "http://localhost:5270/uploads";
  const getColumns = (): ColumnsType<AddressBookEntry> => {
    const baseColumns: ColumnsType<AddressBookEntry> = [
      {
        title: "Photo",
        dataIndex: "photoPath",
        key: "photo",
        width: isMobile ? 40 : 70,
        // fixed: isMobile ? ("left" as const) : undefined,
        render: (photoPath: string) =>
          photoPath ? (
            <Image
              src={`${PHOTO_URL}/${photoPath}`}
              alt="Profile"
              width={40}
              height={40}
              style={{ objectFit: "cover", borderRadius: "50%" }}
              fallback="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
            />
          ) : null,
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
        key: "fullName",
        // fixed: isMobile ? ("left" as const) : undefined,
        // width: isMobile ? 50 : 180,
        sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
          a.fullName.localeCompare(b.fullName),
        render: (text: string) => (
          <Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
            {text}
          </Paragraph>
        ),
      },
      {
        title: "Job",
        dataIndex: ["job", "title"],
        key: "job",
        // width: isMobile ? 70 : 130,
        // responsive: ["md"],
        sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
          (a.job?.title || "").localeCompare(b.job?.title || ""),
      },
      {
        title: "Department",
        dataIndex: ["department", "name"],
        key: "department",
        // width: isMobile ? 70 : 130,
        // responsive: ["lg"],
        sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
          (a.department?.name || "").localeCompare(b.department?.name || ""),
      },
      {
        title: "Mobile",
        dataIndex: "mobileNumber",
        key: "mobileNumber",
        // width: isMobile ? 70 : 130,
        // responsive: ["sm"],
        sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        // width: isMobile ? 70 : 220,
        // responsive: ["sm"],
        render: (text: string) => (
          <Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
            {text}
          </Paragraph>
        ),
        sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
          a.email.localeCompare(b.email),
      },
      {
        title: "Date of Birth",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
        // width: isMobile ? 120 : undefined,
        // responsive: ["lg"],
        sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
          a.dateOfBirth.localeCompare(b.dateOfBirth),
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: isMobile ? 50 : 70,
        // responsive: ["md"],
        sorter: (a: AddressBookEntry, b: AddressBookEntry) => a.age - b.age,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        // width: isMobile ? 70 : 200,
        // responsive: ["md"],
        sorter: (a: AddressBookEntry, b: AddressBookEntry) =>
          a.address.localeCompare(b.address),
      },

      {
        title: "Actions",
        key: "actions",
        fixed: "right" as const,
        align: "center" as const,
        // width: isMobile ? 50 : 100,
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

    return baseColumns;
  };

  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <Table
        columns={getColumns()}
        dataSource={data}
        loading={loading}
        rowKey="id"
        scroll={{ x: 800 }}
        size={isMobile ? "small" : "middle"}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          size: isMobile ? "small" : "default",
        }}
      />
    </div>
  );
};
