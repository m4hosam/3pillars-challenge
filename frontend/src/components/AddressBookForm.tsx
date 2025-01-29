import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { api } from "../api";
import { AddressBookEntry, Job, Department } from "../types";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  initialValues?: AddressBookEntry | null;
}

const AddressBookForm: React.FC<Props> = ({
  visible,
  onCancel,
  onSuccess,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [jobsRes, deptsRes] = await Promise.all([
          api.getJobs(),
          api.getDepartments(),
        ]);
        setJobs(jobsRes.data);
        setDepartments(deptsRes.data);
      } catch (error) {
        message.error("Failed to fetch form options");
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dateOfBirth: moment(initialValues.dateOfBirth),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "dateOfBirth") {
          formData.append(key, values[key].format("YYYY-MM-DD"));
        } else if (
          key === "photo" &&
          values[key]?.fileList?.[0]?.originFileObj
        ) {
          formData.append(key, values[key].fileList[0].originFileObj);
        } else if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      if (initialValues?.id) {
        await api.updateEntry(initialValues.id, formData);
        message.success("Entry updated successfully");
      } else {
        await api.createEntry(formData);
        message.success("Entry created successfully");
      }
      onSuccess();
    } catch (error) {
      message.error("Failed to save entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Entry" : "Add New Entry"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please input full name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="jobId"
          label="Job"
          rules={[{ required: true, message: "Please select job" }]}
        >
          <Select>
            {jobs.map((job) => (
              <Select.Option key={job.id} value={job.id}>
                {job.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="departmentId"
          label="Department"
          rules={[{ required: true, message: "Please select department" }]}
        >
          <Select>
            {departments.map((dept) => (
              <Select.Option key={dept.id} value={dept.id}>
                {dept.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input email" },
            { type: "email", message: "Please input valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="mobileNumber"
          label="Mobile Number"
          rules={[
            { required: true, message: "Please input mobile number" },
            { pattern: /^\d+$/, message: "Please input valid mobile number" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: "Please select date of birth" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input address" }]}
        >
          <Input.TextArea />
        </Form.Item>

        {!initialValues && (
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input password" }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item name="photo" label="Photo" valuePropName="file">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Select Photo</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressBookForm;
