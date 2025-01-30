import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RootState, AppDispatch } from "../../store/store";
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../store/slices/departmentsSlice";
import { DepartmentsTable } from "./DepartmentsTable";
import { DepartmentModal } from "./DepartmentModal";
import type { Department } from "../../types";

const DepartmentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const departments = useSelector(
    (state: RootState) => state.departments.items
  );
  const loading = useSelector((state: RootState) => state.departments.loading);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleCreate = () => {
    setEditingDepartment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Department) => {
    setEditingDepartment(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this department?",
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        try {
          await dispatch(deleteDepartment(id)).unwrap();
          message.success("Department deleted successfully");
        } catch (error) {
          message.error("Failed to delete department");
        }
      },
    });
  };

  const handleSubmit = async (values: Omit<Department, "id">) => {
    try {
      if (editingDepartment) {
        await dispatch(
          updateDepartment({ id: editingDepartment.id, data: values })
        ).unwrap();
        message.success("Department updated successfully");
      } else {
        await dispatch(createDepartment(values)).unwrap();
        message.success("Department created successfully");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Operation failed");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Departments Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add New Department
        </Button>
      </div>

      <DepartmentsTable
        data={departments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DepartmentModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onFinish={handleSubmit}
        initialValues={editingDepartment}
      />
    </div>
  );
};

export default DepartmentsPage;
