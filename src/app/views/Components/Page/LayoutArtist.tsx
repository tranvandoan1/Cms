import {
  EnterOutlined,
  LogoutOutlined,
  SettingOutlined,
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
import React, { useEffect } from "react";
import "../../../Style/LayoutAdmin.css";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../APP/Store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../Features/ArtistSlice/ArtistSlice";
const { Header, Content } = Layout;

function getItem(label: any, key: any, itemIcon: any) {
  return {
    label,
    key,
    itemIcon,
  };
}
const LayoutArtist: React.FC = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default LayoutArtist;
