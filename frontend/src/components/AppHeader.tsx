import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[window.location.pathname]}
    >
      <Menu.Item key="/">
        <Link to="/">Address Book</Link>
      </Menu.Item>
      {/* <div style={{ marginLeft: "auto" }}> */}
      <Menu.Item key="/jobs" style={{ marginLeft: "auto" }}>
        <Link to="/jobs">Jobs</Link>
      </Menu.Item>
      <Menu.Item key="/departments">
        <Link to="/departments">Departments</Link>
      </Menu.Item>
      {/* </div> */}
    </Menu>
  );
};

export default AppHeader;
