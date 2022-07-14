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
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { getArtist } from "../../../../Features/ArtistSlice/ArtistSlice";
import { getSetList } from "../../../../Features/SetListSlice/SetListSlice";
import {
  uploadSetList,
  uploadSetListt,
} from "../../../../Features/SetListSlice/SetListSlice";
import { getSong } from "../../../../Features/SongSlice/SongSlice";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const EidtSetlist = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSetList = useAppSelector((data: any) => data.setlist.value);
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const dataEdit = dataSetList?.find((item: any) => item.id == id);
  useEffect(() => {
    dispatch(getSetList());
    dispatch(getArtist());
    dispatch(getSong());
  }, []);
  const onFinish = (values: any) => {
    const time = new Date(values.time._d);
    const editData: any = {
      bpm: values.bpm == undefined ? dataEdit.bpm : values.bpm,
      mic: values.mic == undefined ? dataEdit.mic : values.mic,
      mp4: values.mp4 == undefined ? dataEdit.mp4 : values.mp4,
      scene: values.scene == undefined ? dataEdit.scene : values.scene,
      time:
        time == undefined
          ? dataEdit.time
          : `
      ${String(time.getHours()).length == 1 && 0}${time.getHours()}:${
              String(time.getMinutes()).length == 1 ? 0 : ""
            }${time.getMinutes()}:${
              String(time.getMilliseconds()).length == 1 && 0
            }${time.getSeconds()}`,
      group_name:
        values.group_name == undefined
          ? dataEdit.group_name
          : values.group_name,
      name_music:
        values.name_music == undefined
          ? dataEdit.name_music
          : values.name_music,
      small_props:
        values.small_props == undefined
          ? dataEdit.small_props
          : values.small_props,
    };
    const newData: any = [];
    dataArtist.map((item: any) => {
      if (item.id == id) {
        newData.push({ ...editData, id });
      } else {
        newData.push(item);
      }
    });
    dispatch(uploadSetList({ id: id, data: editData }));
    dispatch(uploadSetListt(newData));
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
        <h3>Sửa chương trình</h3>
      </div>
      {dataEdit !== undefined && (
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
              >
                <Select
                  placeholder="Chọn nhóm nhạc"
                  defaultValue={`${dataEdit.group_name}`}
                >
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
              >
                <Select
                  placeholder="Chọn bài hát"
                  defaultValue={`${dataEdit.name_music}`}
                >
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
              >
                <TimePicker
                  defaultValue={moment(`${dataEdit.time}`, "HH:mm:ss")}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="Bpm"
                name="bpm"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <Input defaultValue={dataEdit.bpm} placeholder="Bpm" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="MP4"
                name="mp4"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <Input defaultValue={dataEdit.mp4} placeholder="MP4" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="SCENE"
                name="scene"
                style={{ padding: "0 20px" }}
                labelAlign="left"
              >
                <Input defaultValue={dataEdit.scene} placeholder="SCENE" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="MIC"
                name="mic"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <Input defaultValue={dataEdit.mic} placeholder="Mic" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="Đạo cụ"
                name="small_props"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <Input
                  defaultValue={dataEdit.small_props}
                  placeholder="Đạo cụ"
                />
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
              Sửa
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default EidtSetlist;
