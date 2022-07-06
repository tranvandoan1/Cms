import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import useSelection from "antd/lib/table/hooks/useSelection";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getArtist,
  removeArtist,
  removeArtistt,
} from "../../../../Features/ArtistSlice/ArtistSlice";

const IndexArtist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  useEffect(() => {
    dispatch(getArtist());
  }, []);
  const deleteArtist = (id: any) => {
    const data = dataArtist.filter((item: any) => item.id !== id);
    dispatch(removeArtist(id));
    dispatch(removeArtistt(data));
  };

  const columns: any = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tổng số thành viên(Người)",
      dataIndex: "number_members",
      key: "number_members",
      render: (number_members: any, data: any) => {
        return (
          <>
            {data.number_members.length == 0
              ? "Chưa có thành viên"
              : data.number_members.length}
          </>
        );
      },
    },
    {
      title: "Ngày tháng tạo",
      dataIndex: "time_start",
      key: "time_start",
    },
    {
      title: "Ngày tháng sửa",
      dataIndex: "time_end",
      key: "time_end",
    },

    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      render: (id: any, data: any) => (
        <>
          <Link to={`edit&&name=${data.name}&&id=${id}`}>
            <EditOutlined style={{ marginRight: 10 }} />
          </Link>
          <DeleteOutlined onClick={() => deleteArtist(id)} />
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
        <h3>Quản lý nhóm nhạc</h3>
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
      <Table
        rowKey={(item: any) => item.id}
        dataSource={dataArtist}
        columns={columns}
      />
    </div>
  );
};

export default IndexArtist;
