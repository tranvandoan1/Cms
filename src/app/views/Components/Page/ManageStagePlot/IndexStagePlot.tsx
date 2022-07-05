import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ReactSketchCanvas } from "react-sketch-canvas";

const IndexStagePlot: React.FC = () => {
  const canvas: any = useRef<HTMLInputElement>();
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: "M",
      color: "blue",
    },
    {
      key: "2",
      name: "John",
      age: "J",
      color: "red",
    },
  ];
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chữ cái đại diện",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Màu đại diện",
      dataIndex: "color",
      key: "color",
      render: (color: any) => (
        <div style={{ width: "50px", background: color, height: "50px" }}></div>
      ),
    },

    {
      title: "Thao tác",
      dataIndex: "",
      key: "address",
      render: (address: any) => (
        <>
          <EditOutlined style={{ marginRight: 10 }} />

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
        <h3>Quản lý stage plot</h3>
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
      <ReactSketchCanvas ref={canvas} strokeWidth={1} strokeColor="black" />
      <button
        onClick={() => {
          canvas.current
            .exportImage("png")
            .then((data: any) => {
              console.log(data);
            })
            .catch((e: any) => {
              console.log(e, "dấdasd");
            });
        }}
      >
        Get Image
      </button>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default IndexStagePlot;
