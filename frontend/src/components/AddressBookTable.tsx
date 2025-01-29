import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "../api";
import AddressBookForm from "./AddressBookForm";
import { AddressBookEntry } from "../types";

const AddressBookTable: React.FC = () => {
  const [data, setData] = useState<AddressBookEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingEntry, setEditingEntry] = useState<AddressBookEntry | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.getAddressBook();
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch address book data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk: async () => {
        try {
          await api.deleteEntry(id);
          message.success("Entry deleted successfully");
          fetchData();
        } catch (error) {
          message.error("Failed to delete entry");
        }
      },
    });
  };

  const columns = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: AddressBookEntry) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingEntry(record);
              setIsModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setEditingEntry(null);
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add New Entry
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />
      <AddressBookForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={() => {
          setIsModalVisible(false);
          fetchData();
        }}
        initialValues={editingEntry}
      />
    </div>
  );
};

export default AddressBookTable;
