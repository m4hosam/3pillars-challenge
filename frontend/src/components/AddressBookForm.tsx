import React from "react";
import { Form, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Job, Department, AddressBookEntry } from "../types";
import dayjs from "dayjs";

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

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: !editingEntry, message: "Please input password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="photo" label="Photo">
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload Photo</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {editingEntry ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};
