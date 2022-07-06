import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { getMember } from "./../../../../Features/MemberSlice/MemberSlice";
import { getArtist } from "./../../../../Features/ArtistSlice/ArtistSlice";

const IndexMember: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataMember = useAppSelector((data: any) => data.member.value);
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  useEffect(() => {
    dispatch(getMember());
    dispatch(getArtist());
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nhóm nhạc",
      dataIndex: "artist_id",
      key: "artist_id",
      render: (artist_id: any, data: any) => {
        return (
          <>
            {dataArtist.map(
              (item: any) => item.artist_id == artist_id && item.name
            )}
          </>
        );
      },
    },
    {
      title: "Chữ cái đại diện",
      dataIndex: "first_letter",
      key: "first_letter",
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
      dataIndex: "id",
      key: "id",
      render: (id: any, data: any) => (
        <>
          <Link to={`edit&&name=${data.name}&&id=${id}`}>
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
        <h3>Quản lý thành viên</h3>
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
      <Table dataSource={dataMember} columns={columns} />
    </div>
  );
};

export default IndexMember;
