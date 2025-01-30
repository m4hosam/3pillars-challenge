import React from "react";
import { Button, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated(); // Check if user is authenticated

  const handleLogout = () => {
    authService.logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[window.location.pathname]}
    >
      <Menu.Item key="/">
        <Link to="/">Address Book</Link>
      </Menu.Item>
      <Menu.Item key="/jobs" style={{ marginLeft: "auto" }}>
        <Link to="/jobs">Jobs</Link>
      </Menu.Item>
      <Menu.Item key="/departments">
        <Link to="/departments">Departments</Link>
      </Menu.Item>

      {isAuthenticated && ( // Show logout button only if authenticated
        <Menu.Item key="logout" style={{ color: "red" }}>
          <Button onClick={handleLogout}>Logout</Button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default AppHeader;
