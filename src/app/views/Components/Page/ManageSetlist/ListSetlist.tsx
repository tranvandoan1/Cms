import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";

import {
  getSetList,
  removeSetList,
} from "./../../../../Features/SetListSlice/SetListSlice";
import { BiPencil, BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";
const setLists: any = [
  {
    detail: "thực hành sớm đi",
    time_upload: "2022-07-18T08:53:59.547Z",
    name: "Cháy lên đi",
    artist_id: "2",
    id_song: [4, 5, 6],
    time_start: "00:15:05",
    id: 1,
  },
  {
    artist_id: "2",
    detail: "text",
    id: 2,
    name: "Cùng nhau cháy nhé",
    time_start: "\n      00:04:05",
    time_upload: "2022-07-11T06:53:42.976Z",
    id_song: [4, 5],
  },
  {
    artist_id: "3",
    detail: "text",
    id: 3,
    name: "Tháng 7 dực dỡ",
    time_start: "\n      00:09:04",
    time_upload: "2022-07-08T16:25:10.998Z",
    id_song: [],
  },
  {
    detail: "cháy đi nè",
    name: "Chuyến đi thiện nguyện",
    artist_id: "5",
    id_song: [],
    time_upload: "",
    time_start: "\n      00:05:07",
    id: 4,
  },
];
const { Column, ColumnGroup } = Table;
const ListMember: React.FC = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const setLists = useAppSelector((data: any) => data.setlist.value);
  const dataSetLists = setLists?.filter((item: any) => item.artist_id == id);

  // useEffect(() => {
  //   dispatch(getSetList());
  // }, []);

  const confirm = (id: any) => {
    dispatch(removeSetList(id));
    message.success("Successful delete");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (value: any) => {};
  return (
    <div>
      <div
        className="flex"
        style={{
          margin: "30px 0",
          justifyContent: "space-between",
        }}
      >
        <div className="flex">
          <Input
            placeholder="キーワード入力してください"
            style={{
              borderRadius: "7.3214px",
              width: "404px",
              height: "40px",
            }}
            suffix={<SearchOutlined />}
          />
          <Button
            style={{
              background: "black",
              color: "#fff",
              marginLeft: 10,
              borderRadius: "7.3214px",
              height: "40px",
            }}
          >
            検索
          </Button>
        </div>

        <div className="flex">
          <Link to={"add"}>
            <Button
              style={{
                background: "black",
                color: "#fff",
                borderRadius: "7.3214px",
                padding: "0 10px",
              }}
            >
              <PlusOutlined />
            </Button>
          </Link>

          <span
            className="add"
            style={{
              marginLeft: 10,
              marginRight: 100,
            }}
          >
            Create New SetList
          </span>
        </div>
      </div>

      <Table dataSource={dataSetLists} rowKey={(item: any) => item.id}>
        <Column
          title="No"
          dataIndex="id"
          key="id"
          width={80}
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
        <Column
          title="Created"
          width={200}
          dataIndex="time_start"
          key="time_start"
        />
        <Column
          title="Updated"
          width={200}
          dataIndex="time_upload"
          key="time_upload"
        />
        <Column title="Detailed" dataIndex="detail" key="detail" />
        <Column
          title="Generated password"
          dataIndex="id"
          width={200}
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
          width={100}
          render={(id: any, data: any) => (
            <>
              <Link to={`edit&&name_setlist=${data.name}&&id_setlist=${id}`}>
                <BiPencil
                  style={{
                    marginRight: 20,
                    color: "#fff",
                    marginTop: 5,
                    fontSize: 20,
                  }}
                />
              </Link>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                cancelText="No"
              >
                <BiTrash
                  style={{
                    color: "#FF0000",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                />
              </Popconfirm>
            </>
          )}
        />
      </Table>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        style={{ boxShadow: "0 0 10px blue" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Producer" name="producer" labelAlign="left">
            <Input.Password placeholder="Password producer" />
          </Form.Item>
          <Form.Item label="Coordinator" labelAlign="left" name="coordinator">
            <Input.Password placeholder="Password coordinator" />
          </Form.Item>
          <Form.Item labelAlign="left" label="Visitor" name="visitor">
            <Input.Password placeholder="Password visitor" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <span
              style={{ color: "#fff", cursor: "pointer" }}
              onClick={handleCancel}
            >
              キャンセル
            </span>
            <Button
              type="primary"
              htmlType="submit"
              style={{ padding: "5px 20px", marginLeft: 15 }}
            >
              保存
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ListMember;
