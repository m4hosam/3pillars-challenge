import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RootState, AppDispatch } from "../store/store";
import {
  fetchAddressBook,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../store/slices/addressBookSlice";
import { api } from "../api";
import type { AddressBookEntry, Job, Department } from "../types";
import { AddressBookTable } from "./AddressBookTable";
import { AddressBookModal } from "./AddressBookModal";
import dayjs from "dayjs";

const AddressBook: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addressBook = useSelector(
    (state: RootState) => state.addressBook.entries
  );
  const loading = useSelector((state: RootState) => state.addressBook.loading);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<AddressBookEntry | null>(
    null
  );
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    dispatch(fetchAddressBook());
    loadJobsAndDepartments();
  }, [dispatch]);

  const loadJobsAndDepartments = async () => {
    try {
      const [jobsResponse, deptsResponse] = await Promise.all([
        api.getJobs(),
        api.getDepartments(),
      ]);
      setJobs(jobsResponse.data);
      setDepartments(deptsResponse.data);
    } catch (error) {
      message.error("Failed to load jobs and departments");
    }
  };

  const handleCreate = () => {
    setEditingEntry(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: AddressBookEntry) => {
    setEditingEntry(record);
    form.setFieldsValue({
      ...record,
      dateOfBirth: record.dateOfBirth ? dayjs(record.dateOfBirth) : undefined,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk() {
        dispatch(deleteEntry(id));
      },
    });
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "photo" && values[key]?.fileList?.[0]) {
        formData.append("photo", values[key].fileList[0].originFileObj);
      } else if (key === "dateOfBirth") {
        formData.append(key, values[key].format("YYYY-MM-DD"));
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      if (editingEntry) {
        await dispatch(updateEntry({ id: editingEntry.id, data: formData }));
      } else {
        await dispatch(createEntry(formData));
      }
      setIsModalVisible(false);
      form.resetFields();
      message.success(
        `Successfully ${editingEntry ? "updated" : "created"} entry`
      );
    } catch (error) {
      message.error("Operation failed");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add New Entry
        </Button>
      </div>

      <AddressBookTable
        data={addressBook}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddressBookModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        form={form}
        jobs={jobs}
        departments={departments}
        editingEntry={editingEntry}
        onFinish={handleSubmit}
      />
    </div>
  );
};

export default AddressBook;
