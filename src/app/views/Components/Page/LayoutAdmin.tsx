import {
  BranchesOutlined,
  DeploymentUnitOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import "../../../Style/LayoutAdmin.css";
import { BsFileEarmarkMusic, BsLayoutTextWindow, BsKey } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label: any, key: any, icon: any, itemIcon: any) {
  return {
    label,
    key,
    icon,
    itemIcon,
  };
}
const LayoutAdmin: React.FC = () => {
  const items: any = [
    getItem(
      "Quản lý nhóm nhạc",
      "1",
      <BranchesOutlined />,
      <Link to="manage-artist" />
    ),
    getItem(
      "Quản lý chương trình",
      "2",
      <DeploymentUnitOutlined />,
      <Link to="manage-setlist" />
    ),
    getItem(
      "Quản lý thành viên",
      "sub1",
      <UserOutlined />,
      <Link to="manage-member" />
    ),
    getItem(
      "Quản lý bài hát",
      "sub2",
      <BsFileEarmarkMusic />,
      <Link to="manage-songs" />
    ),
    getItem(
      "Quản lý sân khấu",
      "9",
      <BsLayoutTextWindow />,
      <Link to="manage-stage-plot" />
    ),
    getItem("Generate password", "10", <BsKey />, <Link to="manage-setlist" />),
  ];
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            borderRight: "1px solid rgb(245, 245, 245)",
          }}
          className="site-layout-background"
        >
          <div className="logo">NRC - Sân khấu</div>
          <Menu
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            overflow: "auto",
            height: "100vh",
            marginLeft: 200,
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: "sticky",
              top: 0,
              zIndex: 100,
              boxShadow: "0 0 0 5px rgb(245, 245, 245)",
            }}
          >
            <div style={{ textAlign: "right", marginRight: 20 }}>
              <Avatar
                size={40}
                style={{ marginRight: 10 }}
                src="https://img.websosanh.vn/v2/users/review/images/4wvuq0i4ozs1q.jpg?compress=85"
              />
              <span>
                ADMIN :{" "}
                <span style={{ color: "red", fontWeight: "600" }}>
                  tranvandoan
                </span>{" "}
              </span>
            </div>
          </Header>
          <Content
            style={{
              margin: "0 0 0 16px",
              flex: 1,
              height: "100%",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                marginTop: 10,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutAdmin;
