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
import vector221 from "../../../../assets/images/Vector221.png";
import pause from "../../../../assets/images/pause.png";

const ListDetailSong: React.FC = () => {
  const { name, id, name_song } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const [dataSearch, setDataSearch] = useState();

  useEffect(() => {
    dispatch(getSong());
  }, []);
  const data: any = [
    {
      id: 1,
      name: "似たような服を着て 似たような表情で",
      time: "00:01",
      section: "1B",
      bar: 4,
    },
    {
      id: 2,
      name: "似たような服を着て 似たような表情で",
      time: "00:02",
      section: "2B",
      bar: 4,
    },
    {
      id: 3,
      name: "似たような服を着て 似たような表情で",
      time: "00:03",
      section: "3B",
      bar: 4,
    },
    {
      id: 4,
      name: "似たような服を着て 似たような表情で",
      time: "00:04",
      section: "4B",
      bar: 4,
    },
    {
      id: 5,
      name: "似たような服を着て 似たような表情で",
      time: "00:05",
      section: "5B",
      bar: 4,
    },
    {
      id: 6,
      name: "似たような服を着て 似たような表情で",
      time: "00:06",
      section: "6B",
      bar: 4,
    },
    {
      id: 7,
      name: "似たような服を着て 似たような表情で",
      time: "00:07",
      section: "7B",
      bar: 4,
    },
    {
      id: 8,
      name: "似たような服を着て 似たような表情で",
      time: "00:08",
      section: "8B",
      bar: 4,
    },
    {
      id: 9,
      name: "似たような服を着て 似たような表情で",
      time: "00:09",
      section: "9B",
      bar: 4,
    },
    {
      id: 10,
      name: "似たような服を着て 似たような表情で",
      time: "00:10",
      section: "10B",
      bar: 4,
    },
  ];

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
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
      title: "Lyrics",
      dataIndex: "name",
      key: "name",
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
            Add New Line
          </span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <span style={{ color: "#fff", fontSize: 20 }}>{name_song}</span>
          <img
            src={vector221}
            alt=""
            style={{ width: "7%", cursor: "pointer", marginRight: 30 }}
          />
        </div>
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "flex-start",
            width: "50%",
          }}
        >
          <img
            src={pause}
            alt=""
            style={{ width: "5%", cursor: "pointer", marginLeft: 20 }}
          />
        </div>
      </div>
      <Table dataSource={data} columns={columns} rowKey={"1"} />
    </div>
  );
};

export default ListDetailSong;
