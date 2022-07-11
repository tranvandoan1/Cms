import { Button, DatePicker, Form, Input, message } from "antd";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../../APP/Store";
import { addMember } from "../../../../Features/MemberSlice/MemberSlice";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const AddMember = (props: Props) => {
  const [color, setColor] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { name, id } = useParams();
  const onFinish = (values: any) => {
    const newData = {
      color: color,
      first_letter: values.first_letter,
      name: values.name,
      artist_id: id,
    };
    dispatch(addMember(newData));
    navigate(`/artist&&name=${name}&&id=${id}/member`);
    message.success("Edit successful");
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
        <h3 style={{ color: "#fff", marginTop: "20px" }}>Add Member</h3>
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
          label="Tên thành viên"
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên!",
            },
          ]}
        >
          <Input placeholder="Tên thành viên" />
        </Form.Item>

        <Form.Item
          label="Chữ cái"
          labelAlign="left"
          name="first_letter"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập chữ cái!",
            },
          ]}
        >
          <Input placeholder="Chữ cái dùng để tạo symbol" />
        </Form.Item>
        <Form.Item
          label="Màu để tạo symbol"
          labelAlign="left"
          name="color"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn thời gian kết thúc!",
            },
          ]}
        >
          <HexColorPicker color={color} onChange={(e: any) => setColor(e)} />
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
export default AddMember;
