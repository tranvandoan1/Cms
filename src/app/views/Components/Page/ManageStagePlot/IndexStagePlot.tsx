import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import Search from "antd/lib/transfer/search";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { filterStagePlot, getStagePlot,removeStagePlot } from "../../../Slide/StagePlot";

const IndexStagePlot: React.FC = () => {
  const canvas: any = useRef<HTMLInputElement>();
  const StagePlot = useSelector((state:any) => state.StagePlot.StagePlot);
  const  dispath:any = useDispatch()

  useEffect(() =>{
    dispath(getStagePlot())
  },[])

  const onHandleRemove = async (id:any) => {
    // const isConfirm = window.confirm(
    //   "bạn muốn xóa sản phẩm này vào thùng rác ?"
    // );
   
     dispath(removeStagePlot(id))
   
  };
  const Search = () =>{
    const values:any = document.getElementById("search")
    const value:any= values.value
    console.log(value);
    if(StagePlot){
      dispath(filterStagePlot(value))
    }
   
  }
  console.log(StagePlot);
  
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
      render: (item: any) => (
        <>
          <div>
            <Link to={`/admin/manage-stage-plot/edit/${item.id}`}>
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
          <Link to="/admin/manage-stage-plot/add">
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

      <Table dataSource={StagePlot} columns={columns} rowKey={item => item.id} />
    </div>
  );
};

export default IndexStagePlot;
