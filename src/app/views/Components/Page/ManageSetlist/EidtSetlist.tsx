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
  const { name, id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSetList = useAppSelector((data: any) => data.setlist.value);
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  const dataEdit = dataSetList?.find((item: any) => item.id == id);
  useEffect(() => {
    dispatch(getSetList());
    dispatch(getSong());
  }, []);
  const onFinish = (values: any) => {
    const time = new Date(values.time._d);
    const time_upload = new Date();
    const editData: any = {
      detail: values.detail == undefined ? dataEdit.detail : values.detail,
      time_upload: time_upload,
      name: values.name == undefined ? dataEdit.name : values.name_munamesic,
      artist_id: dataEdit.artist_id,
      id_music: values.songs == undefined ? dataEdit.songs : values.songs,
      time_start:
        time == undefined
          ? dataEdit.time
          : `
      ${String(time.getHours()).length == 1 && 0}${time.getHours()}:${
              String(time.getMinutes()).length == 1 ? 0 : ""
            }${time.getMinutes()}:${
              String(time.getMilliseconds()).length == 1 && 0
            }${time.getSeconds()}`,
    };

    dispatch(uploadSetList({ id: id, data: editData }));
    navigate(`/artist&&name=${name}&&id=${id}/songs`);
    message.success("Edit successful");
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
                label="Name setlist"
                name="name"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <Input
                  defaultValue={dataEdit.name}
                  placeholder="Name setlist"
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="Songs"
                name="id_music"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  defaultValue={dataEdit.id_music}
                  placeholder="Choose a song"
                >
                  {dataSongs.map((item: any, index: any) => (
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
              >
                <TimePicker
                  defaultValue={moment(`${dataEdit.time_start}`, "HH:mm:ss")}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
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
          >
            <TextArea
              defaultValue={dataEdit.detail}
              rows={4}
              placeholder="Detail"
            />
          </Form.Item>
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
      )}
    </div>
  );
};
export default EidtSetlist;
