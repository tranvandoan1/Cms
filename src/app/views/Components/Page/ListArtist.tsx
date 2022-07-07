import {
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Input, Layout, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import "../../../Style/LayoutAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../APP/Store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getArtist } from "./../../../Features/ArtistSlice/ArtistSlice";
const { Header, Content } = Layout;

const ListArtist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  useEffect(() => {
    dispatch(getArtist());
  }, []);
  const logout = () => {
    navigate("/signin");
  };

  const menu = (
    <Menu style={{ marginTop: -20, padding: 5 }}>
      <Menu.Item key="userInfo" style={{ padding: "10px  10px" }}>
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
        <Header
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="horizontal"
            items={[
              {
                key: "1",
                label: "Artist",
              },
            ]}
          />
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
                  style={{ fontSize: 20, cursor: "pointer", color: "#fff" }}
                />
              </span>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ padding: "0 50px", height: "100%" }}>
          <div className="site-layout-content">
            <div
              className="flex"
              style={{
                margin: "20px 0",
                justifyContent: "space-between",
              }}
            >
              <div className="flex">
                <Input placeholder="Basic usage" />
                <Button style={{ background: "black", color: "#fff" }}>
                  Search
                </Button>
              </div>
              <div className="flex">
                <Button style={{ background: "black", color: "#fff" }}>
                  <PlusOutlined />
                </Button>
                <span className="add" style={{ marginLeft: 10 }}>
                  Create New Artist
                </span>
              </div>
            </div>
            <Row gutter={[16, 24]}>
              {dataArtist.map((item: any, index: any) => {
                return (
                  <Col
                    key={index}
                    className="gutter-row"
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={4}
                  >
                    <div className="list-artist">
                      <Link
                        to={`/detail_artist/name=${item.name}&&id=${item.id}/manage-setlist`}
                      >
                        <div className="artist">
                          <div className="avatar">
                            <img src={item.avatar} alt="" />
                          </div>
                          <span className="name">{item.name}</span>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "10px 0",
                            }}
                          >
                            <EditOutlined />
                            <span style={{ fontSize: 10 }}>
                              最終編集 : 2022年3月1日
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ListArtist;
