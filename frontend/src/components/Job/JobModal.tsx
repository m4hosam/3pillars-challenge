import React from "react";
import { Modal, Form, Input } from "antd";
import type { Job } from "../../types";

interface JobModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: Omit<Job, "id">) => void;
  initialValues?: Job | null;
}

export const JobModal: React.FC<JobModalProps> = ({
  visible,
  onCancel,
  onFinish,
  initialValues,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, form, initialValues]);

  return (
    <Modal
      title={initialValues ? "Edit Job" : "Create New Job"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Job Title"
          rules={[{ required: true, message: "Please input job title!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
