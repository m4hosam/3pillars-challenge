import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RootState, AppDispatch } from "../../store/store";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../../store/slices/jobsSlice";
import { JobsTable } from "./JobsTable";
import { JobModal } from "./JobModal";
import type { Job } from "../../types";

const JobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector((state: RootState) => state.jobs.items);
  const loading = useSelector((state: RootState) => state.jobs.loading);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleCreate = () => {
    setEditingJob(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Job) => {
    setEditingJob(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      onOk: async () => {
        try {
          await dispatch(deleteJob(id)).unwrap();
          message.success("Job deleted successfully");
        } catch (error) {
          message.error("Failed to delete job");
        }
      },
    });
  };

  const handleSubmit = async (values: Omit<Job, "id">) => {
    try {
      if (editingJob) {
        await dispatch(updateJob({ id: editingJob.id, data: values })).unwrap();
        message.success("Job updated successfully");
      } else {
        await dispatch(createJob(values)).unwrap();
        message.success("Job created successfully");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Operation failed");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add New Job
        </Button>
      </div>

      <JobsTable
        data={jobs}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <JobModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onFinish={handleSubmit}
        initialValues={editingJob}
      />
    </div>
  );
};

export default JobsPage;
