import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const IndexSetlist = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thời gian",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "BPM",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "MP4",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "SCENE",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "MIC",
      dataIndex: "address",
      key: "address",
    },
    {
      title: " ⼩道 具",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Thao tác",
      dataIndex: "",
      key: "address",
      render: (address: any) => (
        <>
          <Link to={`edit&&name=${"ánh nắng của anh"}&&id=${"1"}`}>
            {" "}
            <EditOutlined style={{ marginRight: 10 }} />
          </Link>
          <DeleteOutlined />
        </>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 10,
        }}
      >
        <h3>Quản lý setlist</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Input
            style={{ marginRight: 10 }}
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
          />
          <Link to="add">
            <Button
              icon={<PlusOutlined style={{ color: "#1890ff" }} />}
            ></Button>
          </Link>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default IndexSetlist;
