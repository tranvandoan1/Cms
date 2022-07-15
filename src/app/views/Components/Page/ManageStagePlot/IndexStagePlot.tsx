import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  filterStagePlot,
  getAllStagePlot,
  removeStagePlot,
} from "../../../../Features/Slide/StagePlot";

const IndexStagePlot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const StagePlot = useSelector((state: any) => state.stagePlot.StagePlot);

  useEffect(() => {
    dispatch(getAllStagePlot());
  }, []);

  const onHandleRemove = async (id: number) => {
    const isConfirm = window.confirm("bạn muốn xóa sản phẩm này?");

    if (isConfirm) {
      dispatch(removeStagePlot(id));
    }
  };
  const Search = () => {
    const values: any = document.getElementById("search");
    const value: any = values.value;
    console.log(value);
    if (StagePlot) {
      dispatch(filterStagePlot(value));
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
