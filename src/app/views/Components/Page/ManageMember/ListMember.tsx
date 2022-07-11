import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getMember,
  removeMember,
} from "../../../../Features/MemberSlice/MemberSlice";
import { getArtist } from "../../../../Features/ArtistSlice/ArtistSlice";

const IndexMember: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataMembers = useAppSelector((data: any) => data.member.value);
  const listDataArtist = dataMembers?.filter(
    (item: any) => item.artist_id == id
  );
  useEffect(() => {
    dispatch(getMember());
  }, []);

  const deleteSong = (id: any) => {
    dispatch(removeMember(id));
    message.success("Successful delete");
  };

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
      dataIndex: "id",
      key: "id",
      render: (id: any, data: any) => (
        <>
          <Link to={`edit&&name-member=${data.name}&&idMember=${id}`}>
            <EditOutlined style={{ marginRight: 10, color: "#fff" }} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteSong(id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
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
          <Link to={`/artist&&name=${name}&&id=${id}/member/add`}>
            {" "}
            <Button style={{ background: "black", color: "#fff" }}>
              <PlusOutlined />
            </Button>
          </Link>
          <span className="add" style={{ marginLeft: 10 }}>
            Add New Member
          </span>
        </div>
      </div>
      <Table
        rowKey={(item: any) => item.id}
        dataSource={listDataArtist}
        columns={columns}
      />
    </div>
  );
};

export default IndexMember;
