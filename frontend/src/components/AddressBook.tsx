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
import { AddressBookSearch } from "./AddressBookSearch";
import dayjs from "dayjs";

const AddressBook: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addressBook = useSelector(
    (state: RootState) => state.addressBook.entries
  );
  const loading = useSelector((state: RootState) => state.addressBook.loading);

  const [form] = Form.useForm();

  const [searchResults, setSearchResults] = useState<AddressBookEntry[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<AddressBookEntry | null>(
    null
  );
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const displayData = isSearching ? searchResults : addressBook;

  const handleSearch = async (searchParams: {
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      setIsSearching(true);
      const response = await api.searchAddressBook(searchParams);
      setSearchResults(response.data);
    } catch (error) {
      message.error("Failed to search address book");
      console.error(error);
    }
  };

  const handleResetSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
  };

  // Modified useEffect to depend on updateTrigger
  useEffect(() => {
    dispatch(fetchAddressBook());
    loadJobsAndDepartments();
  }, [dispatch, updateTrigger]); // Add updateTrigger to dependencies

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
      onOk: async () => {
        try {
          await dispatch(deleteEntry(id)).unwrap();
          message.success("Entry deleted successfully");
          setUpdateTrigger((prev) => prev + 1); // Trigger refresh after delete
        } catch (error) {
          message.error("Failed to delete entry");
        }
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
      } else if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    try {
      if (editingEntry) {
        await dispatch(
          updateEntry({ id: editingEntry.id, data: formData })
        ).unwrap();
        message.success("Entry updated successfully");
      } else {
        await dispatch(createEntry(formData)).unwrap();
        message.success("Entry created successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
      setUpdateTrigger((prev) => prev + 1); // Trigger refresh after create/update
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

      <AddressBookSearch onSearch={handleSearch} onReset={handleResetSearch} />

      <AddressBookTable
        data={displayData}
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
