import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { getSong } from "./../../../../Features/SongSlice/SongSlice";
import { addSetList } from "../../../../Features/SetListSlice/SetListSlice";
import { useNavigate, useParams } from "react-router-dom";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const AddSetlist = (props: Props) => {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const songOfArtist = dataSongs?.filter((item: any) => item.artist_id == id);
  useEffect(() => {
    dispatch(getSong());
  }, []);
  const onFinish = (values: any) => {
    const time_start = new Date(values.time_start._d);
    const newData = {
      detail: values.detail,
      name: values.name,
      artist_id: id,
      id_song: values.id_song,
      time_upload: "",
      time_start: `
      ${
        String(time_start.getHours()).length == 1 && 0
      }${time_start.getHours()}:${
        String(time_start.getMinutes()).length == 1 ? 0 : ""
      }${time_start.getMinutes()}:${
        String(time_start.getMilliseconds()).length == 1 && 0
      }${time_start.getSeconds()}`,
    };
    dispatch(addSetList(newData));
    navigate(`/artist&&name=${name}&&id=${id}/setlist`);
    message.success("Add successful");
  };

  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 30,
        }}
      >
        <h3 style={{ color: "#fff", marginTop: "20px" }}>Add setlist</h3>
      </div>
      <Form
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
        <Row>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Name setlist"
              name="name"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "You haven't entered the setlist!",
                },
              ]}
            >
              <Input placeholder="Name setlist" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Songs"
              name="id_song"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "You have not entered the song name!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Choose a song"
              >
                {songOfArtist?.map((item: any, index: any) => (
                  <Select.Option key={index} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Time start"
              name="time_start"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "No time to start yet!",
                },
              ]}
            >
              <TimePicker defaultOpenValue={moment("00:00:00", "HH:mm:ss")} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Detail"
          name="detail"
          labelAlign="left"
          wrapperCol={{
            offset: 0,
            span: 20,
          }}
          labelCol={{
            offset: 0,
            span: 4,
          }}
          style={{ padding: "0 20px" }}
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập bpm!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Detail" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddSetlist;
