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
      title: "Stage plot",
      dataIndex: "images",
      key: "images",
      render: (images: any) => <img src={images} alt="" width={180} />,
    },

    {
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
          alignItems: "center",
          margin: "20px 0",
          justifyContent: "space-between",
        }}
      >
        <div className="flex">
          <Input
            // onChange={(e) => search(e.target.value)}
            placeholder="Basic usage"
          />
          <Button
            style={{ background: "black", color: "#fff", marginLeft: 10 }}
          >
            Search
          </Button>
        </div>
        <div className="flex">
          <Link to={`add`}>
            <Button style={{ background: "black", color: "#fff" }}>
              <PlusOutlined />
            </Button>
          </Link>
          <span className="add" style={{ marginLeft: 10 }}>
            Create Stage Plot
          </span>
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
