import {
  BranchesOutlined,
  CaretRightOutlined,
  DeploymentUnitOutlined,
  EnterOutlined,
  LeftOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";
import "../../../Style/LayoutAdmin.css";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AppDispatch, RootState } from "../../../APP/Store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../Features/ArtistSlice/ArtistSlice";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label: any, key: any, itemIcon: any) {
  return {
    label,
    key,
    itemIcon,
  };
}
const LayoutArtist: React.FC = () => {
  const navigate = useNavigate();
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  useEffect(() => {
    dispatch(getArtist());
  }, []);

  const items: any = [
    getItem("Setlist", "2", <Link to="setlist" />),
    getItem("Member", "sub1", <Link to="member" />),
    getItem("Songs", "sub2", <Link to="songs" />),
  ];

  const logout = () => {
    navigate("/signin");
  };
  const menu = (
    <Menu style={{ marginTop: -30, padding: 5 }}>
      <Menu.Item key="userInfo" style={{ padding: "10px  20px" }}>
        <Avatar
          size={35}
          src="https://img.websosanh.vn/v2/users/review/images/4wvuq0i4ozs1q.jpg?compress=85"
        />{" "}
        <span>tranvandoan</span>
      </Menu.Item>
      <Menu.Item>
        <Button icon={<LogoutOutlined />} onClick={() => logout()} type="text">
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Layout className="layout">
        <Header className="header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <EnterOutlined
              onClick={() => navigate(-1)}
              style={{
                fontSize: 20,
                cursor: "pointer",
                color: "#0647EE",
                marginTop: 10,
              }}
            />
            <Menu
              theme="dark"
              defaultSelectedKeys={["2"]}
              style={{
                background: "#C3D1F6",
                color: "blue",
                width: "100%",
              }}
              mode="horizontal"
              items={items}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SettingOutlined
              style={{
                fontSize: 20,
                cursor: "pointer",
                color: "#fff",
                marginRight: 25,
                marginTop: -2,
              }}
            />
            <Dropdown overlay={menu}>
              <span>
                <LogoutOutlined
                  style={{
                    fontSize: 20,
                    cursor: "pointer",
                    color: "#fff",
                  }}
                />
              </span>
            </Dropdown>
          </div>
        </Header>
        <div className="outlet">
          <Content style={{ padding: "0 50px", height: "100%" }}>
            <div className="site-layout-content">
              <Outlet />
            </div>
          </Content>
        </div>
      </Layout>

      {/* <Layout
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
      </Layout> */}
    </div>
  );
};

export default LayoutArtist;
