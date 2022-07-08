import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filter, getAll } from "../../../Api/Auth";
import { deleteUser, getAllUser } from "../../../Slide/AuthSlide";

const IndexGeneratePassword: React.FC = () => {

    const users = useSelector((state:any) => state.user.user)
    const dispath:any = useDispatch()
    useEffect(()=>{
        dispath(getAllUser())
    },[])
    const Search = async() => {
      const values: any = document.getElementById("search");
      const value: any = values.value;
      console.log(value);
      const {data} = await filter(value)
      console.log(data);
    };
    const onHandleRemove = (item:any) =>{
        if(item.id ===1){
            alert("bạn không thể xóa tài khoản admin")
        }else{
          const isConfirm = window.confirm("bạn muốn xóa sản phẩm này?");
          if(isConfirm){
            dispath(deleteUser(item.id))
          }
        }
    }
    console.log(users);
    
  const columns = [
    {
        title: "Tên",
        dataIndex: "name",
        key: "name",
      },
    {
      title: "Tài Khoản",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (images: any) => (
        <>
          <img src={images} width="180" />
        </>
      ),
    },

    {
      title: "Thao tác",
      dataIndex: "",
      key: "address",
      render: (item: any) => (
        <>
          <div>
            <Link
              to={`/admin/manage-generate-password/edit&&email=${item.email}&&id=${item.id}`}
            >
              <EditOutlined style={{ marginRight: 10 }} />
            </Link>
            <span onClick={() => onHandleRemove(item)}>
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
        <h3>Quản lý Generate Password</h3>
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
          <Link to="/admin/manage-generate-password/add">
            <Button
              icon={<PlusOutlined style={{ color: "#1890ff" }} />}
            ></Button>
          </Link>
        </div>
      </div>
          {
          (users) ?(
             <Table
             dataSource={users}
             columns={columns}
             rowKey={(item:any) => item.id}
           />
          ):null}
     
    </div>
  );
};

export default IndexGeneratePassword;
