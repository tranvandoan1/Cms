import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";

import "../../../../Style/ListDetailArtist.css";
import {
  getSetList,
  removeSetList,
} from "./../../../../Features/SetListSlice/SetListSlice";
import { BiPencil, BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (value: any) => {};
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
                <BiPencil
                  style={{
                    marginRight: 10,
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
          <Form.Item
            label="Producer"
            name="producer"
            labelAlign="left"
          >
            <Input.Password placeholder="Password producer" />
          </Form.Item>
          <Form.Item
            label="Coordinator"
            labelAlign="left"
            name="coordinator"
          >
            <Input.Password placeholder="Password coordinator" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label="Visitor"
            name="visitor"
          >
            <Input.Password placeholder="Password visitor" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
            <Button style={{ marginRight: 10 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListMember;
