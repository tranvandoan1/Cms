import { Button, DatePicker, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getArtist,
  uploadArtist,
  uploadArtistt,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};
const dateFormat = "YYYY/MM/DD";
const EidtArtist = (props: Props) => {
  const navigete = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  const dataEdit = dataArtist?.find((item: any) => item.id == id);
  useEffect(() => {
    dispatch(getArtist());
  }, []);
  const onFinish = (values: any) => {
    const editData: any = {
      name: values.name == undefined ? dataEdit?.name : values.name,
      time_end:
        values.time_end == undefined ? dataEdit?.time_end : values.time_end,
      time_start:
        values.time_start == undefined
          ? dataEdit?.time_start
          : values.time_start,
    };
    const newData: any = [];
    dataArtist.map((item: any) => {
      if (item.id == id) {
        newData.push({ ...editData, id });
      } else {
        newData.push(item);
      }
    });
    dispatch(uploadArtist({ id: id, data: editData }));
    dispatch(uploadArtistt(newData));
    navigete("/manage-artist");
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
        <h3>Sửa artist</h3>
      </div>
      {dataEdit !== undefined && (
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Tên các nhóm nhạc" name="name" labelAlign="left">
            <Input
              placeholder="Tên các nhóm nhạc mà công ty hợp tác, quản lý"
              defaultValue={dataEdit?.name}
            />
          </Form.Item>

          <Form.Item
            label="Thời gian bắt đầu"
            labelAlign="left"
            name="time-start"
          >
            <DatePicker
              defaultValue={moment(`${dataEdit?.time_start}`, dateFormat)}
              format={dateFormat}
              placeholder="Ngày bắt đầu"
            />
          </Form.Item>
          <Form.Item
            label="Thời gian kết thúc"
            labelAlign="left"
            name="time-end"
          >
            <DatePicker
              defaultValue={moment(`${dataEdit?.time_end}`, dateFormat)}
              placeholder="Ngày sửa"
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
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
export default EidtArtist;
