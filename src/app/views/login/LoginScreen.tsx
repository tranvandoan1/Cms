import React, { Component } from "react";
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
  Form,
} from "antd";
import images from "../../../res/images";
import "./LoginScreen.css";
import InputComponent from "../../shared/components/input/InputComponent";
import ButtonComponent from "../../shared/components/button/ButtonComponent";
import {
  ERROR_CONNECT,
  INFO_LOCALSTORAGE,
  ERROR_CODE,
} from "../../shared/constants/constant";

interface ILoginState {
  email?: string;
  password?: string;
}
interface ILoginProps {}

const { Header, Sider, Content, Footer } = Layout;
class LoginScreen extends Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    email: "",
    password: "",
  };

  render() {
    return (
      <>
        <p>loginnnnnnnnnnnnnnn</p>
      </>
    );
  }
}

export default LoginScreen;
