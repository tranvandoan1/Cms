import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";

import "../../../../Style/ListDetailArtist.css";
import {
  editSetList,
  getSetList,
} from "../../../../Features/SetListSlice/SetListSlice";
import {
  getSong,
} from "./../../../../Features/SongSlice/SongSlice";
const ListSetlistDetail: React.FC = () => {
  const { name, id, id_setlist, name_setlist } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const setLists = useAppSelector((data: any) => data.setlist.value);
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const dataSetLists = setLists?.find((item: any) => item.id == id_setlist);
  const newDataSongs: any = [];
  dataSongs.filter((item: any) => {
    for (let i = 0; i < dataSetLists?.id_music?.length; i++) {
      if (item.id == dataSetLists?.id_music[i]) {
        newDataSongs.push(item);
      }
    }
  });

  useEffect(() => {
    dispatch(getSetList());
    dispatch(getSong());
  }, []);
  const deleteSetList = (data: any) => {
    let newData: any = {};
    newData = {
      artist_id: dataSetLists.artist_id,
      detail: dataSetLists.detail,
      id: dataSetLists.id,
      name: dataSetLists.name,
      time_start: dataSetLists.time_start,
      time_upload: dataSetLists.time_upload,
      id_music: dataSetLists.id_music.filter((mu: any) => mu !== data.id),
    };
    dispatch(editSetList(newData));
    message.success("Successful delete");
  };

  // search
  const [dataSearch, setDataSearch] = useState();
  const search = (value: any) => {
    const dataSearch = dataSongs?.filter((person: any) => {
      return person.name.toLowerCase().includes(value);
    });
    setDataSearch(dataSearch);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (name: any) => (
        <Link to={`stage-plot`}>
          <div style={{ width: 100, color: "#fff" }}>{name}</div>
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
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => deleteSetList(data)}
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
          justifyContent: "space-between",
          marginTop: 20,
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
      <span style={{ fontSize: 29.5714, color: "#fff", margin: "20px 0" }}>
        {name_setlist}
      </span>
      <Table
        dataSource={dataSearch == undefined ? newDataSongs : dataSearch}
        columns={columns}
        rowKey={"1"}
        style={{ marginTop: 10 }}
      />
    </div>
  );
};

export default ListSetlistDetail;
