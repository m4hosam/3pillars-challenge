import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Job, Department, AddressBookEntry } from "../types";

interface AddressBookFormProps {
  form: any;
  jobs: Job[];
  departments: Department[];
  editingEntry: AddressBookEntry | null;
  onFinish: (values: any) => void;
}

export const AddressBookForm: React.FC<AddressBookFormProps> = ({
  form,
  jobs,
  departments,
  editingEntry,
  onFinish,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const PHOTO_URL =
    import.meta.env.VITE_PHOTO_API_URL || "http://localhost:5270/uploads";

  useEffect(() => {
    if (editingEntry?.photoPath) {
      setPreviewImage(`${PHOTO_URL}/${editingEntry.photoPath}`);
    } else {
      setPreviewImage(
        "https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
      );
    }
  }, [editingEntry]);

  const handleImagePreview = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target?.result as string);
    reader.readAsDataURL(file);
    return false; // Prevent auto-upload
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Please input full name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="jobId"
        label="Job"
        rules={[{ required: true, message: "Please select a job!" }]}
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
        rules={[{ required: true, message: "Please select a department!" }]}
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
        name="mobileNumber"
        label="Mobile Number"
        rules={[
          { required: true, message: "Please input mobile number!" },
          {
            pattern: /^\+?[\d\s-]+$/,
            message: "Please enter a valid phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label="Date of Birth"
        rules={[{ required: true, message: "Please select date of birth!" }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please input address!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      {!editingEntry && (
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input password!" }]}
        >
          <Input.Password />
        </Form.Item>
      )}

      {editingEntry && (
        <Form.Item
          name="password"
          label="New Password (leave empty to keep current)"
        >
          <Input.Password />
        </Form.Item>
      )}

      {/* Image Upload & Preview */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt="Preview"
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "50%" }}
            fallback="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
          />
        )}

        <Form.Item name="photo">
          <Upload
            beforeUpload={handleImagePreview}
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>
              {editingEntry ? "Update Photo" : "Upload Photo"}
            </Button>
          </Upload>
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {editingEntry ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};
