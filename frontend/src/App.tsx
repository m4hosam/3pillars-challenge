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
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <AppHeader />
          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AddressBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <JobsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/departments"
                element={
                  <ProtectedRoute>
                    <DepartmentsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
