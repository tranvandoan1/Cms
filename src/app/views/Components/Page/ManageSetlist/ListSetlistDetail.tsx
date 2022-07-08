import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";

import "../../../../Style/ListDetailArtist.css";
import { getSetList } from "../../../../Features/SetListSlice/SetListSlice";
import {
  getSong,
  removeSong,
} from "./../../../../Features/SongSlice/SongSlice";
const ListSetlistDetail: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const setLists = useAppSelector((data: any) => data.setlist.value);
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const dataSetLists = setLists?.find((item: any) => item.id == id);

  const newDataSongs: any = [];
  dataSongs.filter((item: any) => {
    for (let i = 0; i < dataSetLists.songs?.length; i++) {
      if (item.id == dataSetLists.songs[i]) {
        newDataSongs.push(item);
      }
    }
  });

  useEffect(() => {
    dispatch(getSetList());
    dispatch(getSong());
  }, []);
  const deleteSong = (id: any) => {
    dispatch(removeSong(id));
    message.success("Successful delete");
  };

  // search
  const [dataSearch, setDataSearch] = useState();
  const search = (value: any) => {
    const dataSearch = dataSongs.filter((person: any) => {
      return person.name.toLowerCase().includes(value);
    });
    setDataSearch(dataSearch);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <div style={{ width: 100 }}>{name}</div>,
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
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => deleteSong(id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "#FF0000" }} />
        </Popconfirm>
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
            onChange={(e: any) => search(e.target.value)}
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
        dataSource={dataSearch == undefined ? newDataSongs : dataSearch}
        columns={columns}
        rowKey={"1"}
      />
    </div>
  );
};

export default ListSetlistDetail;
