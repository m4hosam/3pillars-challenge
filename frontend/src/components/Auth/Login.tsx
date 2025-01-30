import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import { useNavigate, Link } from "react-router-dom";
import { LoginCredentials } from "../../types";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: LoginCredentials) => {
    try {
      await dispatch(login(values)).unwrap();
      message.success("Login successful");
      navigate("/");
    } catch (err) {
      message.error("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Login" className="w-full max-w-md">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            Create New Account <Link to="/register">Register</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
