import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";

import { useNavigate, useParams } from "react-router-dom";
import { HexColorPicker } from "react-colorful";
import {
  getMember,
  uploadMember,
} from "./../../../../Features/MemberSlice/MemberSlice";

type Props = {};
const EidtMember = (props: Props) => {
  const navigate = useNavigate();
  const [color, setColor] = useState();
  const { name, id, id_member } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const dataMember = useAppSelector((data: any) => data.member.value);
  const dataEdit = dataMember?.find((item: any) => item.id == id_member);

  useEffect(() => {
    dispatch(getMember());
  }, []);
  const onFinish = (values: any) => {
    const editData: any = {
      name: values.name == undefined ? dataEdit?.name : values.name,
      color: color == undefined ? dataEdit?.color : color,
      first_letter:
        values.first_letter == undefined
          ? dataEdit?.first_letter
          : values.first_letter,
      artist_id: id,
    };

    dispatch(uploadMember({ id: id_member, data: editData }));
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
        <h3 style={{ color: "#fff", marginTop: "20px" }}>Edit Member</h3>
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
          <Form.Item label="Tên thành viên" name="name" labelAlign="left">
            <Input defaultValue={dataEdit.name} placeholder="Tên thành viên" />
          </Form.Item>

          <Form.Item label="Chữ cái" labelAlign="left" name="first_letter">
            <Input
              defaultValue={dataEdit.first_letter}
              placeholder="Chữ cái dùng để tạo symbol"
            />
          </Form.Item>
          <Form.Item label="Màu để tạo symbol" labelAlign="left" name="color">
            <span>
              Màu hiện tại :{" "}
              <div
                style={{
                  width: "50px",
                  background: dataEdit.color,
                  height: "50px",
                  marginBottom: 20,
                }}
              ></div>
            </span>
            <HexColorPicker color={color} onChange={(e: any) => setColor(e)} />
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
export default EidtMember;
