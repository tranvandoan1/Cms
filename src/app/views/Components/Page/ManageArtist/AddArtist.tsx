import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  addArtist,
  getArtist,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import {
  getMember,
  uploadMember,
} from "./../../../../Features/MemberSlice/MemberSlice";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};
type Members = {
  members: any;
};

const AddArtist = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [members, setMembers]: any = useState();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataArtist = useAppSelector((data: any) => data.artist.value);
  const dataMember = useAppSelector((data: any) => data.member.value);
  useEffect(() => {
    dispatch(getArtist());
    dispatch(getMember());
  }, []);

  const onFinish = (values: any) => {
    const dataMemberUpload: any = [];
    const artist_id = Math.random();
    dataMember.map((item: any) => {
      members.map((member: any) => {
        if (member == item.id) {
          dataMemberUpload.push({ ...item, artist_id: artist_id });
        }
      });
    });
    dataMemberUpload.map(
      async (item: any) =>
        await dispatch(uploadMember({ id: item.id, data: item }))
    );

    const newData: any = {
      name: values.name,
      time_end: values.time_end,
      time_start: values.time_start,
      number_members: members,
      artist_id: artist_id
    };
    dispatch(addArtist(newData));
    navigate("/admin/manage-artist");
  };
  const handleChange = (values: any) => {
    console.log(values);

    setMembers(values);
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
        <h3>Thêm nhóm nhạc</h3>
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
          label="Thêm thành viên"
          labelAlign="left"
          name="number_members"
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Thêm thành viên"
            onChange={handleChange}
          >
            {dataMember.map((item: any, index: any) => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
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
