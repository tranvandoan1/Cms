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
import { getArtist } from "./../../../../Features/ArtistSlice/ArtistSlice";
import { getSetList } from "../../../../Features/SetListSlice/SetListSlice";

const IndexSetlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSetList = useAppSelector((data: any) => data.setlist.value);
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  useEffect(() => {
    dispatch(getSetList());
  }, []);
  const columns = [
    {
      title: "Tên nhóm nhạc biểu diễn",
      dataIndex: "group_name",
      key: "group_name",
    },
    {
      title: "Tên bài hát",
      dataIndex: "name_music",
      key: "name_music",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "BPM",
      dataIndex: "bpm",
      key: "bpm",
    },
    {
      title: "MP4",
      dataIndex: "mp4",
      key: "mp4",
    },
    {
      title: "SCENE",
      dataIndex: "scene",
      key: "scene",
    },
    {
      title: "MIC",
      dataIndex: "mic",
      key: "mic",
    },
    {
      title: " ⼩道 具",
      dataIndex: "small_props",
      key: "small_props",
    },

    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      render: (id: any, data: any) => (
        <>
          <Link to={`edit&&name=${data.group_name}&&id=${id}`}>
            {" "}
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
        <h3>Quản lý chương trình</h3>
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
      <Table dataSource={dataSetList} columns={columns} />
    </div>
  );
};

export default IndexSetlist;
