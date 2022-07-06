import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { getSong } from "./../../../../Features/SongSlice/SongSlice";
import { getArtist } from "./../../../../Features/ArtistSlice/ArtistSlice";
import { addSetList } from "../../../../Features/SetListSlice/SetListSlice";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const AddSetlist = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  useEffect(() => {
    dispatch(getSong());
    dispatch(getArtist());
  }, []);
  const onFinish = (values: any) => {
    const time = new Date(values.time._d);
    const newData = {
      bpm: values.bpm,
      mic: values.mic,
      mp4: values.mp4,
      scene: values.scene,
      time: `
      ${String(time.getHours()).length == 1 && 0}${time.getHours()}:${
        String(time.getMinutes()).length == 1 ? 0 : ""
      }${time.getMinutes()}:${
        String(time.getMilliseconds()).length == 1 && 0
      }${time.getSeconds()}`,
      group_name: values.group_name,
      name_music: values.name_music,
      small_props: values.small_props,
    };
    dispatch(addSetList(newData));
    navigate("/admin/manage-setlist");
  };

  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 10,
        }}
      >
        <h3>Thêm chương trình</h3>
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
              label="Tên nhóm nhạc"
              name="group_name"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa chọn nhóm nhạc!",
                },
              ]}
            >
              <Select placeholder="Chọn nhóm nhạc">
                {dataArtist.map((item: any, index: any) => (
                  <Select.Option key={index} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Bài hát"
              name="name_music"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập tên bài hát!",
                },
              ]}
            >
              <Select placeholder="Chọn bài hát">
                {dataSongs.map((item: any, index: any) => (
                  <Select.Option key={index} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Thời gian"
              name="time"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập thời gian!",
                },
              ]}
            >
              <TimePicker defaultOpenValue={moment("00:00:00", "HH:mm:ss")} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Bpm"
              name="bpm"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập bpm!",
                },
              ]}
            >
              <Input placeholder="Bpm" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="MP4"
              name="mp4"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mp4!",
                },
              ]}
            >
              <Input placeholder="MP4" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="SCENE"
              name="scene"
              style={{ padding: "0 20px" }}
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập SCENE!",
                },
              ]}
            >
              <Input placeholder="SCENE" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="MIC"
              name="mic"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mic!",
                },
              ]}
            >
              <Input placeholder="Mic" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Đạo cụ"
              name="small_props"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập đạo cụ!",
                },
              ]}
            >
              <Input placeholder="Đạo cụ" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 20,
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
