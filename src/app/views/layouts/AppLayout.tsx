import {
  Avatar,
  Col,
  Dropdown,
  Layout,
  Menu,
  message,
  Row,
  Space,
  Breadcrumb,
} from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import "./AppLayout.css";
import "antd/dist/antd.min.css";
import { INFO_LOCALSTORAGE } from "../../shared/constants/constant";
import RouterConfig from "../../routers/RouterConfig";
import images from "./../../../res/images";
import HeaderComponent from "../../shared/components/header/HeaderComponent";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const items = [
  {
    label: <Link to="/login">menu 1</Link>,
    key: "login",
  },
  {
    label: <Link to="/home">menu 2</Link>,
    key: "app",
  },
  {
    label: <Link to="/home">menu 3</Link>,
    key: "alipay",
  },
];

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [iconEvent, setIconEvent] = useState("");
  const [iconParticipant, setIconParticipant] = useState("");
  const [iconRole, setIconRole] = useState("");
  const [iconVersion, setIconVersion] = useState("");
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((item: any) => item);
  const capatilize = (s: any) => s.charAt(0).toUpperCase() + s.slice(1);
  const [current, setCurrent] = useState("mail");

  const currentLocation = window.location.href.split("/")[3];

  useEffect(() => {
    // const obj = JSON.parse(
    //   localStorage.getItem(INFO_LOCALSTORAGE.USER_LOGGED) || ""
    // );
    // setFullName(obj.fullName);
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const onClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Layout className="layout_main">
        <Layout className="layout_main">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
              {RouterConfig.map((route, i) => {
                return (
                  <Route
                    key={i}
                    exact
                    path={route.path}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </Suspense>
        </Layout>
      </Layout>
    </>
  );
}

export default AppLayout;
