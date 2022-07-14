import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterStagePlot,
  getAllStagePlot,
  removeStagePlot,
} from "../../../Slide/StagePlot";

const IndexStagePlot: React.FC = () => {
  const StagePlot = useSelector((state: any) => state.StagePlot.StagePlot);
  const dispath: any = useDispatch();

  useEffect(() => {
    dispath(getAllStagePlot());
  }, []);

  const onHandleRemove = async (id: number) => {
    const isConfirm = window.confirm("bạn muốn xóa sản phẩm này?");

    if (isConfirm) {
      dispath(removeStagePlot(id));
    }
  };
  const Search = () => {
    const values: any = document.getElementById("search");
    const value: any = values.value;
    console.log(value);
    if (StagePlot) {
      dispath(filterStagePlot(value));
    }
  };
  console.log(StagePlot);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chữ cái đại diện",
      dataIndex: "represen",
      key: "represen",
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
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (images: any) =>(
        <img src={images} alt="" width={180} />
      )
       
      
       
      
    },

    {
      title: "Thao tác",
      dataIndex: "",
      key: "address",
      render: (item: any) => (
        <>
          <div>
            <Link
              to={`/manage-stage-plot/edit&&name=${item.name}&&id=${item.id}`}
            >
              <EditOutlined style={{ marginRight: 10 }} />
            </Link>
            <span onClick={() => onHandleRemove(item.id)}>
              <DeleteOutlined />
            </span>
          </div>
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
            type="text"
            id="search"
            style={{ marginRight: 10 }}
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
            onChange={() => Search()}
          />
          <Link to="/manage-stage-plot/add">
            <Button
              icon={<PlusOutlined style={{ color: "#1890ff" }} />}
            ></Button>
          </Link>
        </div>
      </div>
     
      <Table
        dataSource={StagePlot}
        columns={columns}
        rowKey={(item) => item.id}
      />
    </div>
  );
};

export default IndexStagePlot;
