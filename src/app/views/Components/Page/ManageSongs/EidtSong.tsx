import { Button, DatePicker, Form, Input, TimePicker } from "antd";
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
import { Editor } from "@tinymce/tinymce-react";
import {
  getSong,
  uploadSong,
  uploadSongg,
} from "./../../../../Features/SongSlice/SongSlice";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const EidtSong = (props: Props) => {
  const navigete = useNavigate();
  const { name, id } = useParams();
  const [valueText, setValueText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const dataSong = useAppSelector((data: any) => data.songs.value);
  const dataEdit = dataSong?.find((item: any) => item.id == id);

  useEffect(() => {
    dispatch(getSong());
  }, []);
  const onFinish = (values: any) => {
    const time = new Date(values.time._d);
    const editData: any = {
      name: values.name == undefined ? dataEdit?.name : values.name,
      time:
        values.time == undefined
          ? dataEdit?.time
          : `
      ${String(time.getHours()).length == 1 && 0}${time.getHours()}:${
              String(time.getMinutes()).length == 1 ? 0 : ""
            }${time.getMinutes()}:${
              String(time.getMilliseconds()).length == 1 && 0
            }${time.getSeconds()}`,
      lyrics: String(valueText).length == 0 ? dataEdit?.lyrics : valueText,
      section: values.section == undefined ? dataEdit?.section : values.section,
      bar: values.bar == undefined ? dataEdit?.bar : values.bar,
    };
    const newData: any = [];
    dataSong.map((item: any) => {
      if (item.id == id) {
        newData.push({ ...editData, id });
      } else {
        newData.push(item);
      }
    });
    dispatch(uploadSong({ id: id, data: editData }));
    dispatch(uploadSongg(newData));
    navigete("/admin/manage-songs");
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
        <h3>Sửa bài hát</h3>
      </div>
      {dataEdit !== undefined && (
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Tên bài hát" name="name" labelAlign="left">
            <Input
              defaultValue={name}
              placeholder="Tên bài hát mà công ty hợp tác, quản lý"
            />
          </Form.Item>

          <Form.Item label="Thời gian " labelAlign="left" name="time">
            <TimePicker
              defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
              defaultValue={moment(`${dataEdit.time}`, "HH:mm:ss")}
            />
          </Form.Item>
          <Form.Item label="Lời bài hát" labelAlign="left" name="lyrics">
            <Editor
              apiKey="f5r9v2m5jorsgp469noiiqpd10fc7xhmn3th5897ghxcpank"
              onEditorChange={(newText: any) => setValueText(newText)}
              value={valueText == undefined ? dataEdit.lyrics : valueText}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </Form.Item>
          <Form.Item label="Section" labelAlign="left" name="section">
            <Input defaultValue={dataEdit.section} placeholder="Section" />
          </Form.Item>
          <Form.Item label="Bar" labelAlign="left" name="bar">
            <Input defaultValue={dataEdit.bar} placeholder="Lời bài hát" />
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
export default EidtSong;
