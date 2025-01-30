import React from "react";
import { Form, Input, DatePicker, Button, Space } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

interface SearchFormValues {
  searchTerm?: string;
  dateRange?: [Dayjs, Dayjs];
}

interface AddressBookSearchProps {
  onSearch: (values: {
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  onReset: () => void;
}

export const AddressBookSearch: React.FC<AddressBookSearchProps> = ({
  onSearch,
  onReset,
}) => {
  const [form] = Form.useForm();

  const handleSearch = (values: SearchFormValues) => {
    onSearch({
      searchTerm: values.searchTerm,
      startDate: values.dateRange?.[0]?.format("YYYY-MM-DD"),
      endDate: values.dateRange?.[1]?.format("YYYY-MM-DD"),
    });
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleSearch}
      style={{ marginBottom: 16, gap: 16 }}
    >
      <Form.Item name="searchTerm" className="w-70">
        <Input
          placeholder="Search by name, email, or mobile"
          prefix={<SearchOutlined />}
          allowClear
        />
      </Form.Item>

      <Form.Item name="dateRange">
        <DatePicker.RangePicker />
      </Form.Item>

      <Form.Item className="w-40 mt-8">
        <Space>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Search
          </Button>
          <Button onClick={handleReset} icon={<ClearOutlined />}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
