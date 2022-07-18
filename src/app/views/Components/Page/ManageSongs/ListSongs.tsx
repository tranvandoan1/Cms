import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getSong,
  removeSong,
  removeSongg,
} from "../../../../Features/SongSlice/SongSlice";
import "../../../../Style/ListSong.css";
import { BiPencil, BiTrash } from "react-icons/bi";
type ListSongs = {
  idd: any;
};
const ListSongs: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const [dataSearch, setDataSearch] = useState();
  useEffect(() => {
    dispatch(getSong());
  }, []);
  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (name: any, data: any) => (
        <Link
          to={`name-song=${name}&&id-song=${data.id}`}
          style={{ width: 100, color: "#fff" }}
        >
          {name}
        </Link>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "BPM",
      dataIndex: "bpm",
      key: "",
    },
    {
      title: "♪４",
      dataIndex: "mp4",
      key: "mp4",
    },
    {
      title: "Costume",
      dataIndex: "costume",
      key: "costume",
    },
    {
      title: "Mic",
      dataIndex: "mic",
      key: "mic",
    },
    {
      title: "Small props",
      dataIndex: "small_props",
      key: "small_props",
    },
    {
      dataIndex: "id",
      key: "id",
      render: (id: any, data: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to={`edit&&name_song=${data.name}&&id_song=${id}`}
            style={{ marginTop: 5 }}
          >
            <BiPencil
              style={{ marginRight: 10, color: "#fff", fontSize: 20 }}
            />
          </Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteSong(id)}
            okText="Yes"
            cancelText="No"
          >
            <BiTrash style={{ color: "#FF0000", fontSize: 20 }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const deleteSong = (id: any) => {
    dispatch(removeSong(id));
    message.success("Successful delete");
  };

  // search
  const search = (value: any) => {
    const dataSearch = dataSongs.filter((person: any) => {
      return person.name.toLowerCase().includes(value);
    });
    setDataSearch(dataSearch);
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
          <Input
            onChange={(e) => search(e.target.value)}
            placeholder="Basic usage"
          />
          <Button
            style={{ background: "black", color: "#fff", marginLeft: 10 }}
          >
            Search
          </Button>
        </div>
        <div className="flex">
          <Link to={`/artist&&name=${name}&&id=${id}/song/add`}>
            {" "}
            <Button style={{ background: "black", color: "#fff" }}>
              <PlusOutlined />
            </Button>
          </Link>
          <span className="add" style={{ marginLeft: 10 }}>
            Create New Song
          </span>
        </div>
      </div>
      <Table
        dataSource={dataSearch == undefined ? dataSongs : dataSearch}
        columns={columns}
        rowKey={"1"}
      />
    </div>
  );
};

export default ListSongs;
