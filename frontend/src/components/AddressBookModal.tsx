import React from "react";
import { Modal } from "antd";
import { AddressBookForm } from "./AddressBookForm";
import type { Job, Department, AddressBookEntry } from "../types";

interface AddressBookModalProps {
  visible: boolean;
  onCancel: () => void;
  form: any;
  jobs: Job[];
  departments: Department[];
  editingEntry: AddressBookEntry | null;
  onFinish: (values: any) => void;
}

export const AddressBookModal: React.FC<AddressBookModalProps> = ({
  visible,
  onCancel,
  form,
  jobs,
  departments,
  editingEntry,
  onFinish,
}) => {
  // reset password to empty string
  form.setFieldsValue({ password: "" });
  return (
    <Modal
      title={editingEntry ? "Edit Entry" : "Create New Entry"}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <AddressBookForm
        form={form}
        jobs={jobs}
        departments={departments}
        editingEntry={editingEntry}
        onFinish={onFinish}
      />
    </Modal>
  );
};
