import { Button, DatePicker, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { addArtist } from "../../../../Features/ArtistSlice/ArtistSlice";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const AddArtist = (props: Props) => {
  const navigete = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const newData: any = {
      name: values.name,
      time_end: values.time_end,
      time_start: values.time_start,
    };
    console.log(newData);
    dispatch(addArtist(newData));
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
        <h3>Thêm artist</h3>
      </div>
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
        <Form.Item
          label="Tên các nhóm nhạc"
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên!",
            },
          ]}
        >
          <Input placeholder="Tên các nhóm nhạc mà công ty hợp tác, quản lý" />
        </Form.Item>

        <Form.Item
          label="Thời gian bắt đầu"
          labelAlign="left"
          name="time_start"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn thời gian bắt đầu!",
            },
          ]}
        >
          <DatePicker placeholder="Ngày bắt đầu" />
        </Form.Item>
        <Form.Item
          label="Thời gian kết thúc"
          labelAlign="left"
          name="time_end"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn thời gian kết thúc!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
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
export default AddArtist;
