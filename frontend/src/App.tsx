import React from "react";
import { Layout } from "antd";
// import AddressBookTable from "./components/AddressBookTable";
import AddressBook from "./components/AddressBook";
import { Provider } from "react-redux";
import { store } from "./store/store";
import JobsPage from "./components/Job/JobsPage";
import DepartmentsPage from "./components/Department/DepartmentsPage";
import AppHeader from "./components/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <AppHeader />
          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<AddressBook />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
