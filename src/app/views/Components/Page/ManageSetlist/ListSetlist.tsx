import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getArtist,
  removeArtist,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import "../../../../Style/ListDetailArtist.css";
import {
  getSetList,
  removeSetList,
} from "./../../../../Features/SetListSlice/SetListSlice";
const { Column, ColumnGroup } = Table;
const ListMember: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const setLists = useAppSelector((data: any) => data.setlist.value);
  const dataSetLists = setLists?.filter((item: any) => item.artist_id == id);
  useEffect(() => {
    dispatch(getSetList());
  }, []);

  const confirm = (id: any) => {
    dispatch(removeSetList(id));
    message.success("Successful delete");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <Link to="add">
            <Button style={{ background: "black", color: "#fff" }}>
              <PlusOutlined />
            </Button>
          </Link>
          <span className="add" style={{ marginLeft: 10 }}>
            Create New SetList
          </span>
        </div>
      </div>
      <Table dataSource={dataSetLists} rowKey={(item: any) => item.id}>
        <Column
          title="No"
          dataIndex="id"
          key="id"
          render={(name: any, data: any, index: any) => (
            <span style={{ color: "#fff" }}>{index}</span>
          )}
        />
        <Column
          title="Title"
          dataIndex="name"
          key="name"
          render={(name: any, data: any) => (
            <Link to={`name-setlist=${data.name}&&id_setlist=${data.id}`}>
              <span style={{ color: "#fff" }}>{name}</span>
            </Link>
          )}
        />
        <Column title="Created" dataIndex="time_start" key="time_start" />
        <Column title="Updated" dataIndex="time_upload" key="time_upload" />
        <Column title="Detailed" dataIndex="detail" key="detail" />
        <Column
          title="Generated password"
          dataIndex="id"
          key="id"
          render={(id: any) => (
            <Button
              onClick={showModal}
              style={{ background: "#00B0F0", color: "#fff" }}
            >
              Created password
            </Button>
          )}
        />

        <Column
          dataIndex="id"
          render={(id: any, data: any) => (
            <>
              <Link to={`edit&&name_setlist=${data.name}&&id_setlist=${id}`}>
                <EditOutlined style={{ marginRight: 10, color: "#fff" }} />
              </Link>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined style={{ color: "#FF0000" }} />
              </Popconfirm>
            </>
          )}
        />
      </Table>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ListMember;
