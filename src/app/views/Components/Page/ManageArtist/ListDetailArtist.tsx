import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getArtist,
  removeArtist,
  removeArtistt,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import "../../../../Style/ListDetailArtist.css";
const ListArtist: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataArtists = useAppSelector((data: any) => data.artist.value);
  const dataArtist = dataArtists?.filter((item: any) => item.id == id);
  useEffect(() => {
    dispatch(getArtist());
  }, []);
  const deleteArtist = (id: any) => {
    const data = dataArtist.filter((item: any) => item.id !== id);
    dispatch(removeArtist(id));
    dispatch(removeArtistt(data));
  };

  const columns: any = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Created",
      dataIndex: "time_start",
      key: "time_start",
    },
    {
      title: "Updated",
      dataIndex: "time_upload",
      key: "time_upload",
    },
    {
      title: "Detailed",
      dataIndex: "time_upload",
      key: "time_upload",
    },
    {
      title: "Genpass",
      dataIndex: "time_upload",
      key: "time_upload",
      render: (id: any) => (
        <Button style={{ background: "#00B0F0", color: "#fff" }}>
          Created password
        </Button>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      render: (id: any, data: any, index: any) => (
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
            Create New Artist
          </span>
        </div>
      </div>
      <Table
        rowKey={(item: any) => item.id}
        dataSource={dataArtist}
        columns={columns}
      />
    </div>
  );
};

export default ListArtist;
