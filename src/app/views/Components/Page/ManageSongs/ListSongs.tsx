import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getSong,
  removeSong,
  removeSongg,
} from "../../../../Features/SongSlice/SongSlice";
import "../../../../Style/ListSong.css";
type ListSongs = {
  idd: any;
};
const ListSongs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const [showLyrics, setShowLyrics] = useState<ListSongs>();
  const dataSong = useAppSelector((data: any) => data.songs.value);
  useEffect(() => {
    dispatch(getSong());
  }, []);
  const columns = [
    {
      title: "Tên bài hát",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <div style={{ width: 100 }}>{name}</div>,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Lyrics",
      dataIndex: "lyrics",
      key: "lyrics",
      render: (lyrics: any, data: any) => (
        <div style={{ width: "350px" }}>
          <p
            style={{ width: "100%" }}
            dangerouslySetInnerHTML={{
              __html:
                showLyrics == data.id ? lyrics : `${lyrics.slice(0, 400)}...`,
            }}
          />
          {showLyrics !== data.id && (
            <span
              className="see_more"
              onClick={() =>
                setShowLyrics(
                  showLyrics == undefined
                    ? data.id
                    : showLyrics == data.id
                    ? undefined
                    : data.id
                )
              }
            >
              Xem thêm
            </span>
          )}
          {showLyrics == data.id && (
            <span className="see_more" onClick={() => setShowLyrics(undefined)}>
              Thu gọn
            </span>
          )}
        </div>
      ),
    },

    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Bar",
      dataIndex: "bar",
      key: "bar",
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
          <DeleteOutlined onClick={() => deleteSong(id)} />
        </>
      ),
    },
  ];
  const deleteSong = (id: any) => {
    const data = dataSong.filter((item: any) => item.id !== id);
    dispatch(removeSong(id));
    dispatch(removeSongg(data));
  };
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
            Create New Artist
          </span>
        </div>
      </div>
      <Table dataSource={dataSong} columns={columns} />
    </div>
  );
};

export default ListSongs;
