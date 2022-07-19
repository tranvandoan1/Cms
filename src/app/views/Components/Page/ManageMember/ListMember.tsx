import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Table } from "antd";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getMember,
  removeMember,
} from "../../../../Features/MemberSlice/MemberSlice";
import { BiPencil, BiTrash } from "react-icons/bi";
const dataMembers: any = [
  {
    name: "Huynh",
    color: "#010000",
    first_letter: "H",
    artist_id: 0.7536581127978996,
    id: 1,
  },
  {
    name: "Thắng",
    color: "T",
    first_letter: "T",
    id: 2,
    artist_id: 0.6665617322581583,
  },
  {
    name: "Vũ",
    color: "#ffcdcd",
    first_letter: "V",
    artist_id: "2",
    id: 3,
  },
  {
    color: "#ffe100",
    first_letter: "K",
    name: "Kiên",
    artist_id: 0.7536581127978996,
    id: 4,
  },
  {
    color: "#60ff8f",
    first_letter: "Đ",
    name: "Đoàn",
    artist_id: 0.7536581127978996,
    id: 5,
  },
  {
    color: "#b1f0ff",
    first_letter: "H",
    name: "Hiểu",
    artist_id: 0.6665617322581583,
    id: 6,
  },
  {
    name: "Linh",
    color: "#3b1d1d",
    first_letter: "L",
    artist_id: "2",
    id: 7,
  },
  {
    name: "Hiểu",
    color: "#00ff13",
    first_letter: "H",
    artist_id: "2",
    id: 8,
  },
];
const IndexMember: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const dataMembers = useAppSelector((data: any) => data.member.value);
  const listDataArtist = dataMembers?.filter(
    (item: any) => item.artist_id == id
  );
  // useEffect(() => {
  //   dispatch(getMember());
  // }, []);

  const deleteSong = (id: any) => {
    dispatch(removeMember(id));
    message.success("Successful delete");
  };

  const columns = [
    {
      title: "No",
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
              width: "100%",
              background: color,
              height: "50px",
            }}
          ></div>
        </div>
      ),
    },
    {
      dataIndex: "color",
      key: "color",
      render: (color: any, data: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 43,
              background: color,
              height: 43,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.first_letter}
          </div>
        </div>
      ),
    },
    {
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (id: any, data: any) => (
        <>
          <Link to={`edit&&name-member=${data.name}&&idMember=${id}`}>
            <BiPencil
              style={{
                marginRight: 10,
                color: "#fff",
                marginTop: 5,
                fontSize: 20,
              }}
            />
          </Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteSong(id)}
            okText="Yes"
            cancelText="No"
          >
            <BiTrash
              style={{ color: "#FF0000", fontSize: 20, cursor: "pointer" }}
            />
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
