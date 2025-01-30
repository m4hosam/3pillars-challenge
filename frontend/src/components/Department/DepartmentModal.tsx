import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import type { Department } from "../../types";

interface DepartmentModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: Omit<Department, "id">) => void;
  initialValues?: Department | null;
}

export const DepartmentModal: React.FC<DepartmentModalProps> = ({
  visible,
  onCancel,
  onFinish,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, form, initialValues]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onFinish(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={initialValues ? "Edit Department" : "Create New Department"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={initialValues ? "Update" : "Create"}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || undefined}
      >
        <Form.Item
          name="name"
          label="Department Name"
          rules={[
            { required: true, message: "Please input department name!" },
            { max: 100, message: "Name cannot be longer than 100 characters!" },
          ]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
