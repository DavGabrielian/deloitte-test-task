import React, { useEffect, useState } from "react";
import "./App.css";
import Content from "./Content/Content";

import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [logo, setLogo] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(
      "https://app.highattendance.com/content-app-cats/jVV3Q?appId=2731&eventId=2570"
    )
      .then((results) => results.json())
      .then((data) => {
        setLogo(data.header_logo);
        setEventName(data.title);
        setCategory(data.cats);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const toggleMenu = () => {
    setCollapsed((state) => !state);
  };

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <div>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => toggleMenu(),
            }
          )}
          <img src={logo} width="150" height="auto" alt="deloitte-logo" />
          <h1>{eventName}</h1>
        </div>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            {category?.map((e) => {
              return <Menu.Item key={category.indexOf(e)}>{e.name}</Menu.Item>;
            })}
          </Menu>
        </Sider>
        <Layout>
          <Content />
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
