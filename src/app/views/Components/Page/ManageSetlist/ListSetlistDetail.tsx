import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";

import "../../../../Style/ListDetailArtist.css";
import {
  editSetList,
  getSetList,
} from "../../../../Features/SetListSlice/SetListSlice";
import { getSong } from "./../../../../Features/SongSlice/SongSlice";
import {BiTrash } from "react-icons/bi";

const ListSetlistDetail: React.FC = () => {
  const { name, id, id_setlist, name_setlist } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const setLists = useAppSelector((data: any) => data.setlist.value);
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const dataSetLists = setLists?.find((item: any) => item.id == id_setlist);
  const songOfArtist = dataSongs.filter((item: any) => item.artist_id == id);
  const newDataSongs: any = [];
  dataSongs.filter((item: any) => {
    for (let i = 0; i < dataSetLists?.id_song?.length; i++) {
      if (item.id == dataSetLists?.id_song[i]) {
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
      ...dataSetLists,
      id_song: dataSetLists.id_song.filter((mu: any) => mu !== data.id),
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
          <BiTrash
            style={{ color: "#FF0000", fontSize: 20, cursor: "pointer" }}
          />
        </Popconfirm>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (value: any) => {
    const newData = {
      ...dataSetLists,
      id_song: [...dataSetLists.id_song, ...value.id_song],
    };
    dispatch(editSetList(newData));
    setIsModalVisible(false);
    message.success("Successful add");
  };
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
          <Button
            style={{ background: "black", color: "#fff" }}
            onClick={showModal}
          >
            <PlusOutlined />
          </Button>
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
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        style={{ boxShadow: "0 0 10px blue" }}
      >
        <Form
          style={{ height: "100%" }}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên bài hát"
            name="id_song"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Chọn bài hát"
              defaultValue={""}
            >
              {songOfArtist?.map((item: any) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListSetlistDetail;
