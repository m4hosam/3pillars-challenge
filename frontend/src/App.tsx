import React from "react";
import { Layout } from "antd";
import AddressBookTable from "./components/AddressBookTable";
import { Provider } from "react-redux";
import { store } from "./store/store";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <AddressBookTable />
        </Content>
      </Layout>
    </Provider>
  );
};

export default App;
