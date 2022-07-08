import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getArtist,
  uploadArtist,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  getMember,
  uploadMember,
} from "../../../../Features/MemberSlice/MemberSlice";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};
const dateFormat = "YYYY/MM/DD";
const EidtArtist = (props: Props) => {
  const navigete = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [members, setMembers]: any = useState();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataArtist = useAppSelector((data: any) => data.artist.value);

  const dataEdit = dataArtist?.find((item: any) => item.id == id);

  const dataMember = useAppSelector((data: any) => data.member.value);
  const dataMemberNew = dataMember?.filter(
    (item: any) => item.artist_id == dataEdit?.artist_id
  );
  useEffect(() => {
    dispatch(getMember());
    dispatch(getArtist());
  }, []);
  const onFinish = (values: any) => {
    const artist_id = Math.random();
    const clearMember: any = [];
    dataMemberNew.map((item: any) =>
      clearMember.push({ ...item, artist_id: "" })
    );
    clearMember.map(
      async (item: any) =>
        await dispatch(uploadMember({ id: item.id, data: item }))
    );

    const dataMemberUpload: any = [];
    dataMember.map((item: any) => {
      members.map((member: any) => {
        if (member == item.id) {
          dataMemberUpload.push({
            ...item,
            artist_id:
              dataEdit?.artist_id == undefined
                ? artist_id
                : dataEdit?.artist_id,
          });
        }
      });
    });
    dataMemberUpload.map(
      async (item: any) =>
        await dispatch(uploadMember({ id: item.id, data: item }))
    );

    const editData: any = {
      name: values.name == undefined ? dataEdit?.name : values.name,
      time_end:
        values.time_end == undefined ? dataEdit?.time_end : values.time_end,
      time_start:
        values.time_start == undefined
          ? dataEdit?.time_start
          : values.time_start,
      number_members: members,
      artist_id:
        dataEdit?.artist_id == undefined ? artist_id : dataEdit?.artist_id,
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
    navigete("/admin/manage-artist");
  };
  const handleChange = (values: any) => {
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
        <h3>Sửa nhóm nhạc </h3>
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
            label="Thêm thành viên"
            labelAlign="left"
            name="number_members"
          >
            <span>
              Thành viện hiện tại :{" "}
              {dataMemberNew?.map((item: any) => `${item.name}`).length == 0
                ? "Chưa có thành viên"
                : dataMemberNew?.map((item: any) => `${item.name},`)}
            </span>
            <Select
              mode="multiple"
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
              Sửa
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default EidtArtist;
