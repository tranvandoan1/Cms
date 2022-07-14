import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { getMember } from "../../../../Features/MemberSlice/MemberSlice";
import { getArtist } from "../../../../Features/ArtistSlice/ArtistSlice";

const IndexMember: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataMembers = useAppSelector((data: any) => data.member.value);
  const dataArtists = useAppSelector((data: any) => data.artist.value);
  const dataArtist = dataArtists?.find((item: any) => item.id == id);
  const listMember = dataMembers?.filter(
    (item: any) => item.artist_id == dataArtist?.artist_id
  );
  useEffect(() => {
    dispatch(getMember());
    dispatch(getArtist());
  }, []);

  const columns = [
    {
      title: "#No",
      dataIndex: "id",
      key: "id",
      render: (color: any, data: any, index: any) => index,
      width: "100px",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kanji",
      dataIndex: "first_letter",
      key: "first_letter",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "50px",
              background: color,
              height: "50px",
            }}
          ></div>
        </div>
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
          alignItems: "center",
          margin: "20px 0",
          justifyContent: "space-between",
        }}
      >
        <div className="flex">
          <Input placeholder="Basic usage" />
          <Button
            style={{ background: "black", color: "#fff", marginLeft: 10 }}
          >
            Search
          </Button>
        </div>
        <div className="flex">
          <Button style={{ background: "black", color: "#fff" }}>
            <PlusOutlined />
          </Button>
          <span className="add" style={{ marginLeft: 10 }}>
            Add New Member
          </span>
        </div>
      </div>
      <Table
        bordered
        rowKey={(item: any) => item.id}
        dataSource={listMember}
        columns={columns}
      />
    </div>
  );
};

export default IndexMember;
