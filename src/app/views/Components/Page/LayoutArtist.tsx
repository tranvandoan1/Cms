import {
  EnterOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import React, { useEffect } from "react";
import "../../../Style/LayoutAdmin.css";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import back from "../../../assets/images/Group26951ádsa.png";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
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
  const { id_setlist } = useParams();

  const items: any = [
    getItem("Setlist", "2", <Link to="setlist" />),
    getItem("Member", "sub1", <Link to="member" />),
    getItem("Songs", "sub2", <Link to="songs" />),
  ];

  const logout = () => {
    navigate("/signin");
  };
  const menu = (
    <Menu style={{ marginTop: 0, padding: 5 }}>
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
        <Header className="header" style={{ padding: "0 10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              onClick={() =>
                id_setlist == undefined
                  ? navigate("/list-artist")
                  : navigate(-1)
              }
              src={back}
              alt=""
              style={{
                width: "3%",
                marginTop: 10,
                marginRight: 20,
                cursor: "pointer",
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
            <AiFillSetting
              style={{
                fontSize: 30,
                cursor: "pointer",
                color: "#fff",
                marginRight: 25,
                marginTop: -2,
              }}
            />
            <Dropdown overlay={menu}>
              <BiLogOut
                className="icon-out"
                style={{
                  fontSize: 30,
                  cursor: "pointer",
                  color: "#fff",
                }}
              />
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
